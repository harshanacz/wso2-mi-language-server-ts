#!/usr/bin/env python3
"""
Java -> TypeScript converter for the very regular style used in the MI language server's
syntaxTree package (POJOs, factories, serializers). Not a general Java compiler: it handles the
subset of Java found there and reports anything it cannot translate.
"""
import os, re, sys, json, collections

JAVA_ROOT = "/home/claude/cloned/mi-language-server/org.eclipse.lemminx/src/main/java"
BASE_PKG = "org.eclipse.lemminx.customservice.synapse.syntaxTree"
SRC_ROOT = JAVA_ROOT + "/" + BASE_PKG.replace(".", "/")
OUT_ROOT = "/home/claude/cloned/wso2-mi-language-server-ts/src/syntaxTree"

# External classes -> (ts module relative to src/syntaxTree, exported name)
EXTERNAL = {
    "org.eclipse.lemminx.dom.DOMNode": ("dom/dom", "DOMNode"),
    "org.eclipse.lemminx.dom.DOMElement": ("dom/dom", "DOMElement"),
    "org.eclipse.lemminx.dom.DOMDocument": ("dom/dom", "DOMDocument"),
    "org.eclipse.lemminx.dom.DOMAttr": ("dom/dom", "DOMAttr"),
    "org.eclipse.lemminx.dom.DOMText": ("dom/dom", "DOMText"),
    "org.eclipse.lemminx.dom.DOMComment": ("dom/dom", "DOMComment"),
    "org.eclipse.lemminx.customservice.synapse.utils.Constant": ("constant", "Constant"),
    "org.eclipse.lemminx.customservice.synapse.utils.Utils": ("utils", "Utils"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.STNode": ("stNode", "STNode"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.Space": ("stNode", "Space"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.Spaces": ("stNode", "Spaces"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.TagRanges": ("stNode", "TagRanges"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.TagSpaces": ("stNode", "TagSpaces"),
    "org.eclipse.lemminx.customservice.synapse.syntaxTree.serializer.InvalidConfigurationException": ("om/errors", "InvalidConfigurationException"),
    "org.apache.axiom.om.OMElement": ("om/om", "OMElement"),
    "org.apache.axiom.om.OMFactory": ("om/om", "OMFactory"),
    "org.apache.axiom.om.OMNamespace": ("om/om", "OMNamespace"),
    "org.apache.axiom.om.OMAbstractFactory": ("om/om", "OMAbstractFactory"),
    "org.apache.axiom.om.OMText": ("om/om", "OMText"),
    "org.apache.axiom.om.OMAttribute": ("om/om", "OMAttribute"),
    "org.apache.axiom.om.OMNode": ("om/om", "OMNode"),
    "org.apache.axiom.om.OMComment": ("om/om", "OMComment"),
    "org.apache.axiom.om.OMContainer": ("om/om", "OMContainer"),
}
# Classes that never need an import (handled by runtime helpers or mapped to JS builtins)
JAVA_BUILTIN = set("""String Object Integer Long Double Float Boolean Character Byte Short Math System
StringBuilder List ArrayList Map HashMap Set HashSet LinkedHashMap Collections Arrays Objects Optional Iterator
Collection Exception RuntimeException IllegalArgumentException NumberFormatException IOException Logger Level
Pattern Matcher Stream Collectors Override Enum Class Void Number CharSequence Comparator Function Predicate
Supplier Consumer StandardCharsets Files Paths Path File URI URL Entry QName""".split())

HELPERS = ["equals", "equalsIgnoreCase", "isEmpty", "contains", "size", "get", "parseBoolean", "isBlank",
           "matches", "jreplace", "replaceAll", "jsplit", "format", "Logger", "Level", "StringBuilder",
           "getEnumFromValue", "enumValueOf", "removeFrom", "joinStr", "StringUtils", "Objects", "System", "Integer", "IllegalStateException", "UnsupportedOperationException", "jlastIndexOf", "jtrim"]

report = collections.defaultdict(list)


def warn(file, msg):
    report[file].append(msg)


# ------------------------------------------------------------------ comment stripping

def strip_comments(src):
    out = []
    i, n = 0, len(src)
    while i < n:
        c = src[i]
        if c == '"':
            j = i + 1
            while j < n and src[j] != '"':
                j += 2 if src[j] == "\\" else 1
            out.append(src[i:j + 1]); i = j + 1
        elif c == "'":
            j = i + 1
            while j < n and src[j] != "'":
                j += 2 if src[j] == "\\" else 1
            out.append(src[i:j + 1]); i = j + 1
        elif src.startswith("//", i):
            j = src.find("\n", i)
            i = n if j < 0 else j
        elif src.startswith("/*", i):
            j = src.find("*/", i + 2)
            i = n if j < 0 else j + 2
        else:
            out.append(c); i += 1
    return "".join(out)


# ------------------------------------------------------------------ scanning helpers

def match_close(s, i, open_c, close_c):
    """index of the bracket matching s[i]==open_c, honouring strings."""
    depth = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c in "\"'":
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == "\\" else 1
            i = j
        elif c == open_c:
            depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1


def split_args(s):
    """split a call argument string on top-level commas."""
    args, depth, cur, i, n = [], 0, [], 0, len(s)
    while i < n:
        c = s[i]
        if c in "\"'":
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == "\\" else 1
            cur.append(s[i:j + 1]); i = j + 1; continue
        if c in "([{<" and not (c == "<" and not re.match(r"<[A-Za-z?]", s[i:i + 2])):
            depth += 1
        elif c in ")]}>" and depth > 0 and not (c == ">" and i > 0 and s[i - 1] == "-"):
            depth -= 1
        if c == "," and depth == 0:
            args.append("".join(cur).strip()); cur = []
        else:
            cur.append(c)
        i += 1
    last = "".join(cur).strip()
    if last or args:
        args.append(last)
    return args


def receiver_start(s, end):
    """start index of the postfix expression ending right before s[end] (a '.')."""
    i = end - 1
    while i >= 0 and s[i].isspace():
        i -= 1
    while True:
        # consume one operand ending at i
        if i < 0:
            return 0
        c = s[i]
        if c in ")]":
            open_c = "(" if c == ")" else "["
            depth = 0
            while i >= 0:
                if s[i] == c:
                    depth += 1
                elif s[i] == open_c:
                    depth -= 1
                    if depth == 0:
                        break
                i -= 1
            i -= 1
            while i >= 0 and s[i].isspace():
                i -= 1
            # a call/index: must be preceded by identifier (method name) or another ) ]  or generic
            if c == ")" and i >= 0 and (s[i].isalnum() or s[i] in "_$"):
                while i >= 0 and (s[i].isalnum() or s[i] in "_$"):
                    i -= 1
                m = re.search(r"\bnew\s+$", s[:i + 1])
                if m:
                    i = m.start() - 1
                    return i + 1
            elif c == ")" :
                # parenthesised expression (or cast): operand is just the group
                return i + 1
            elif c == "]" and i >= 0 and (s[i].isalnum() or s[i] in "_$)]"):
                continue_chain = True
                continue
        elif c in "\"'":
            j = i - 1
            while j >= 0 and not (s[j] == c and (j == 0 or s[j - 1] != "\\")):
                j -= 1
            i = j - 1
        elif c.isalnum() or c in "_$":
            while i >= 0 and (s[i].isalnum() or s[i] in "_$"):
                i -= 1
            m = re.search(r"\bnew\s+$", s[:i + 1])
            if m:
                i = m.start() - 1
                return i + 1
        else:
            return i + 1
        # after an operand: continue if preceded by '.'
        j = i
        while j >= 0 and s[j].isspace():
            j -= 1
        if j >= 0 and s[j] == ".":
            i = j - 1
            while i >= 0 and s[i].isspace():
                i -= 1
            continue
        return i + 1


def find_calls(s, method):
    """yield (dot_index, open_paren_index, close_paren_index) for `.method(...)` occurrences."""
    for m in re.finditer(r"\.\s*" + re.escape(method) + r"\s*\(", s):
        op = m.end() - 1
        cl = match_close(s, op, "(", ")")
        if cl > 0:
            yield m.start(), op, cl


def rewrite_call(s, method, builder):
    """Replace every `R.method(args)` by builder(R, [args]) -> str (iteratively, innermost last)."""
    changed = True
    guard = 0
    while changed and guard < 2000:
        changed = False
        guard += 1
        best = None
        for dot, op, cl in find_calls(s, method):
            best = (dot, op, cl)  # take the last (rightmost) so nested receivers resolve first
        if best is None:
            break
        # choose the rightmost occurrence whose args contain no further occurrences of `method`... simple: rightmost
        dot, op, cl = best
        rs = receiver_start(s, dot)
        recv = s[rs:dot].strip()
        args = split_args(s[op + 1:cl])
        args = [a for a in args if a != ""] if not (len(args) == 1 and args[0] == "") else []
        new = builder(recv, args)
        s = s[:rs] + new + s[cl + 1:]
        changed = True
    return s


# ------------------------------------------------------------------ types

PRIMS = {"int": "number", "long": "number", "short": "number", "double": "number", "float": "number",
         "byte": "number", "Integer": "number", "Long": "number", "Double": "number", "Float": "number",
         "Short": "number", "boolean": "boolean", "Boolean": "boolean", "char": "string",
         "Character": "string", "String": "string", "Object": "any", "void": "void", "Number": "number",
         "CharSequence": "string", "var": "any"}
LISTS = {"List", "ArrayList", "Collection", "Set", "HashSet", "LinkedList", "Iterable"}
MAPS = {"Map", "HashMap", "LinkedHashMap", "TreeMap"}


def parse_type(t):
    t = t.strip()
    arr = 0
    while t.endswith("[]"):
        arr += 1; t = t[:-2].strip()
    t = re.sub(r"^final\s+", "", t)
    m = re.match(r"^([\w.]+)\s*(<.*>)?$", t, re.S)
    if not m:
        return "any"
    name, gen = m.group(1), m.group(2)
    name = name.split(".")[-1]
    args = []
    if gen:
        args = [parse_type(a) for a in split_args(gen[1:-1])] if gen[1:-1].strip() else []
    if name in PRIMS:
        r = PRIMS[name]
    elif name in LISTS:
        r = (args[0] if args else "any") + "[]" if "|" not in (args[0] if args else "") else "(" + args[0] + ")[]"
    elif name in MAPS:
        r = "Map<%s, %s>" % (args[0] if args else "any", args[1] if len(args) > 1 else "any")
    elif name == "Optional":
        r = (args[0] if args else "any") + " | undefined"
    elif name in ("Class",):
        r = "any"
    elif name == "?":
        r = "any"
    else:
        r = name + ("<%s>" % ", ".join(args) if args else "")
    return r + "[]" * arr


def java_type_default(t):
    t = t.strip()
    if t in ("boolean",):
        return "false"
    if t in ("int", "long", "short", "double", "float", "byte", "char"):
        return "0"
    return None


# ------------------------------------------------------------------ class index

class ClassInfo:
    def __init__(self):
        self.fqcn = ""
        self.name = ""
        self.kind = "class"
        self.super_fq = None
        self.methods = {}  # name -> is_static
        self.path = ""


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def parse_imports(src):
    imps = {}
    for m in re.finditer(r"^import\s+(static\s+)?([\w.]+)(\.\*)?;", src, re.M):
        if m.group(1) or m.group(3):
            continue
        fq = m.group(2)
        imps[fq.split(".")[-1]] = fq
    return imps


def build_index():
    idx = {}
    for root, _, files in os.walk(SRC_ROOT):
        for f in files:
            if not f.endswith(".java"):
                continue
            p = os.path.join(root, f)
            rel = os.path.relpath(p, JAVA_ROOT)[:-5].replace(os.sep, ".")
            src = strip_comments(read(p))
            ci = ClassInfo()
            ci.fqcn = rel
            ci.name = f[:-5]
            ci.path = p
            m = re.search(r"\b(class|interface|enum)\s+" + ci.name + r"\b([^{]*)\{", src)
            if m:
                ci.kind = m.group(1)
                em = re.search(r"\bextends\s+([\w.]+)", m.group(2))
                if em and ci.kind == "class":
                    imps = parse_imports(src)
                    sn = em.group(1).split(".")[-1]
                    pkg = rel.rsplit(".", 1)[0]
                    ci.super_fq = imps.get(sn) or (pkg + "." + sn)
            for mm in re.finditer(r"^(?: {4}|\t)(?=[A-Za-z<])(?:(?:public|private|protected|static|final|abstract|synchronized)\s+)*"
                                  r"(?:<[^>]+>\s+)?[\w.<>\[\], ?]+\s+(\w+)\s*\(", src, re.M):
                line = mm.group(0)
                if re.search(r"\b(return|new|else|throw)\b", line.split("(")[0]):
                    continue
                ci.methods[mm.group(1)] = "static" in line.split("(")[0]
            idx[rel] = ci
    return idx


def inherited_methods(idx, ci, seen=None):
    seen = seen or set()
    res = dict(ci.methods)
    if ci.super_fq and ci.super_fq not in seen:
        seen.add(ci.super_fq)
        if ci.super_fq in idx:
            for k, v in inherited_methods(idx, idx[ci.super_fq], seen).items():
                res.setdefault(k, v)
        elif ci.super_fq == "org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.STNode":
            for k in ("elementNode", "addNamespace", "getTag"):
                res.setdefault(k, False)
    return res


# ------------------------------------------------------------------ expression / statement rewriting

KEYWORDS = {"return", "throw", "new", "else", "case", "break", "continue", "delete", "typeof", "yield", "if",
            "for", "while", "switch", "do", "try", "catch", "finally", "this", "super", "assert", "import"}


def match_type_prefix(s, i):
    """If a Java type starts at s[i], return end index of the type; else -1."""
    m = re.match(r"[A-Za-z_][\w.]*", s[i:])
    if not m:
        return -1
    j = i + m.end()
    if j < len(s) and s[j] == "<":
        k = match_close(s, j, "<", ">")
        if k < 0:
            return -1
        j = k + 1
    while s[j:j + 2] == "[]":
        j += 2
    return j


def convert_declarations(s, file, cls_name):
    """Turn `Type name = expr;` / `Type name;` statements into `let name = expr;`."""
    out = []
    # operate line-by-line but only at statement starts: after ';', '{', '}' or line start
    pos = 0
    n = len(s)
    res = []
    pat = re.compile(r"(?:(?<=[;{}\n])|^)(\s*)(final\s+)?(?=[A-Za-z_])")
    i = 0
    last = 0
    for m in pat.finditer(s):
        start = m.end()
        # skip if we already consumed past
        if m.start() < last:
            continue
        w = re.match(r"[A-Za-z_]\w*", s[start:])
        if not w or w.group(0) in KEYWORDS:
            continue
        tend = match_type_prefix(s, start)
        if tend < 0:
            continue
        rest = s[tend:]
        nm = re.match(r"\s+([A-Za-z_]\w*)\s*(=(?!=)|;|,|:)", rest)
        if not nm:
            continue
        if nm.group(2) == ":":
            continue  # for-each handled elsewhere
        typ = s[start:tend]
        name = nm.group(1)
        # `a.b c` style fully qualified type fine; reject `x.y = ..` (no space) already by regex
        kind = nm.group(2)
        decl_end = tend + nm.end()
        res.append((m.start(), decl_end, m.group(1), typ, name, kind))
        last = decl_end
    for (a, b, ws, typ, name, kind) in reversed(res):
        ts = parse_type(typ)
        if kind == "=":
            rep = "%slet %s%s =" % (ws, name, ": " + ts if ts in ("any",) or typ.strip() in () else "")
            # keep inference except when initialiser is null (handled later by regex)
        elif kind == ";":
            rep = "%slet %s: %s | undefined;" % (ws, name, ts)
        else:
            rep = "%slet %s: %s | undefined," % (ws, name, ts)
        s = s[:a] + rep + s[b:]
    return s


def convert_foreach(s):
    def repl(m):
        return "for (let %s of %s)" % (m.group(2), "XXX")
    # for (Type x : expr) -> for (const x of expr)
    out = []
    i = 0
    for m in re.finditer(r"\bfor\s*\(", s):
        pass
    res = s
    pos = 0
    while True:
        m = re.search(r"\bfor\s*\(\s*(?:final\s+)?([\w.<>\[\], ?]+?)\s+(\w+)\s*:\s*", res[pos:])
        if not m:
            break
        a = pos + m.start()
        op = res.index("(", a)
        cl = match_close(res, op, "(", ")")
        inner = res[op + 1:cl]
        mm = re.match(r"\s*(?:final\s+)?[\w.<>\[\], ?]+?\s+(\w+)\s*:\s*(.*)$", inner, re.S)
        if not mm:
            pos = a + 3
            continue
        new = "for (let %s of %s)" % (mm.group(1), mm.group(2).strip())
        res = res[:a] + new + res[cl + 1:]
        pos = a + len(new)
    return res


def convert_classic_for(s):
    return re.sub(r"\bfor\s*\(\s*(?:int|long|double)\s+(\w+)\s*=", r"for (let \1 =", s)


def convert_casts(s):
    """(Type) expr  ->  (expr as Type)   for capitalised/primitive types."""
    guard = 0
    while guard < 3000:
        guard += 1
        found = None
        for m in re.finditer(r"\(\s*((?:[A-Z]\w*(?:\.\w+)*(?:<[^()]*>)?|int|long|double|float|boolean|char|short|byte)(?:\[\])*)\s*\)\s*(?=[\w(\"'!-])", s):
            # make sure it's not a method call / declaration: previous non-space char must not be identifier char
            before = s[:m.start()].rstrip()
            if before and (before[-1].isalnum() or before[-1] in "_$"):
                if not re.search(r"\b(return|throw|case|else)\s*$", before):
                    continue
            if before.endswith(")") and False:
                continue
            found = m
            break
        if not found:
            break
        m = found
        j = m.end()
        # operand: unary prefix then postfix chain
        k = j
        if s[k] in "!-":
            k += 1
        if s[k] == "(":
            cl = match_close(s, k, "(", ")")
            e = cl + 1
        elif s[k] in "\"'":
            q = s[k]; e = k + 1
            while s[e] != q:
                e += 2 if s[e] == "\\" else 1
            e += 1
        else:
            mm = re.match(r"(?:new\s+)?[\w$]+", s[k:])
            e = k + mm.end() if mm else k
        # postfix chain
        while e < len(s):
            if s[e] == "(":
                e = match_close(s, e, "(", ")") + 1
            elif s[e] == "[":
                e = match_close(s, e, "[", "]") + 1
            elif s[e] == "." and re.match(r"\.\s*[\w$]", s[e:]):
                mm = re.match(r"\.\s*[\w$]+", s[e:])
                e += mm.end()
            else:
                break
        operand = s[j:e]
        typ = parse_type(m.group(1))
        s = s[:m.start()] + "(%s as %s)" % (operand, typ) + s[e:]
    return s


def convert_new_arrays(s):
    s = re.sub(r"new\s+[\w.]+(?:<[^>]*>)?\s*\[\s*\]\s*\{", "[", s)  # new T[] { a, b }  -> [ a, b }
    # fix closing of the above: find "[" inserted by array initialiser is ambiguous; handle explicitly:
    return s


def convert_collections(s):
    s = re.sub(r"new\s+(?:ArrayList|LinkedList|HashSet|ArrayDeque)\s*<[^()]*>\s*\(\s*\)", "[]", s)
    s = re.sub(r"new\s+(?:ArrayList|LinkedList|HashSet)\s*\(\s*\)", "[]", s)
    s = re.sub(r"new\s+(?:ArrayList|LinkedList|HashSet)\s*<[^()]*>\s*\(", "Array.from(", s)
    s = re.sub(r"new\s+(?:HashMap|LinkedHashMap|TreeMap)\s*<[^()]*>\s*\(\s*\)", "new Map()", s)
    s = re.sub(r"new\s+(?:HashMap|LinkedHashMap)\s*\(\s*\)", "new Map()", s)
    s = re.sub(r"\bCollections\.emptyList\(\)", "[]", s)
    s = re.sub(r"\bCollections\.emptyMap\(\)", "new Map()", s)
    s = re.sub(r"\b(?:Arrays\.asList|List\.of)\s*\(", "__ARR__(", s)
    # turn __ARR__( ... ) into [ ... ]
    while "__ARR__(" in s:
        a = s.index("__ARR__(")
        op = a + len("__ARR__")
        cl = match_close(s, op, "(", ")")
        s = s[:a] + "[" + s[op + 1:cl] + "]" + s[cl + 1:]
    return s


def convert_new_array_init(s):
    # new T[n] -> new Array(n) ; new T[]{a,b} -> [a,b]
    while True:
        m = re.search(r"new\s+[\w.]+(?:<[^>]*>)?\s*\[\s*\]\s*\{", s)
        if not m:
            break
        ob = m.end() - 1
        cb = match_close(s, ob, "{", "}")
        s = s[:m.start()] + "[" + s[ob + 1:cb] + "]" + s[cb + 1:]
    s = re.sub(r"new\s+[\w.]+(?:<[^>]*>)?\s*\[\s*([^\]]*?)\s*\]", r"new Array(\1)", s)
    return s


def convert_calls(s):
    s = rewrite_call(s, "equalsIgnoreCase", lambda r, a: "equalsIgnoreCase(%s, %s)" % (r, a[0]))
    s = rewrite_call(s, "equals", lambda r, a: "equals(%s, %s)" % (r, a[0]))
    s = rewrite_call(s, "isEmpty", lambda r, a: "isEmpty(%s)" % r)
    s = rewrite_call(s, "isBlank", lambda r, a: "isBlank(%s)" % r)
    s = rewrite_call(s, "contains", lambda r, a: "contains(%s, %s)" % (r, a[0]))
    s = rewrite_call(s, "size", lambda r, a: "size(%s)" % r)
    s = rewrite_call(s, "get", lambda r, a: "get(%s, %s)" % (r, a[0]) if a else r + ".get__()")
    s = rewrite_call(s, "add", lambda r, a: "%s.push(%s)" % (r, ", ".join(a)))
    s = rewrite_call(s, "addAll", lambda r, a: "%s.push(...%s)" % (r, a[0]))
    s = rewrite_call(s, "put", lambda r, a: "%s.set(%s)" % (r, ", ".join(a)))
    s = rewrite_call(s, "containsKey", lambda r, a: "%s.has(%s)" % (r, a[0]))
    s = rewrite_call(s, "getOrDefault", lambda r, a: "(%s.get(%s) ?? %s)" % (r, a[0], a[1]))
    s = rewrite_call(s, "keySet", lambda r, a: "[...%s.keys()]" % r)
    s = rewrite_call(s, "entrySet", lambda r, a: "[...%s.entries()]" % r)
    s = rewrite_call(s, "toArray", lambda r, a: "%s.slice()" % r)
    s = rewrite_call(s, "isPresent", lambda r, a: "(%s != null)" % r)
    s = rewrite_call(s, "length", lambda r, a: "%s.length" % r)
    s = rewrite_call(s, "matches", lambda r, a: "matches(%s, %s)" % (r, a[0]))
    s = rewrite_call(s, "replace", lambda r, a: "jreplace(%s, %s, %s)" % (r, a[0], a[1]))
    s = rewrite_call(s, "replaceAll", lambda r, a: "replaceAll(%s, %s, %s)" % (r, a[0], a[1]))
    s = rewrite_call(s, "split", lambda r, a: "jsplit(%s, %s)" % (r, a[0]))
    s = rewrite_call(s, "lastIndexOf", lambda r, a: "%s.lastIndexOf(%s)" % (r, ", ".join(a)))
    s = rewrite_call(s, "toString", lambda r, a: "String(%s)" % (a[0] if a else (r or "this")))
    s = rewrite_call(s, "concat", lambda r, a: "(%s + %s)" % (r, a[0]))
    s = rewrite_call(s, "getClass", lambda r, a: "%s.constructor" % r)
    s = s.replace(".constructor.getName__()", ".constructor.name")
    s = rewrite_call(s, "getName", lambda r, a: "%s.name" % r if r in ("c", "clazz", "cls") else r + ".getName__()")
    s = rewrite_call(s, "getSimpleName", lambda r, a: "%s.name" % r)
    s = rewrite_call(s, "intValue", lambda r, a: "%s" % r)
    s = rewrite_call(s, "remove", lambda r, a: "removeFrom(%s, %s)" % (r, a[0]))
    # static-ish helpers
    s = s.replace(".get__()", "").replace(".getName__()", ".getName()")
    s = re.sub(r"Boolean\.valueOf\(", "parseBoolean(", s)
    s = re.sub(r"(?<![&])&(?![&])", "&&", s) if " & " in s else s
    s = s.replace("java.util.", "")
    s = re.sub(r"\b(\w+)\.newInstance\(\)", r"new \1()", s)
    s = re.sub(r"\bBoolean\.TRUE\b", "true", s)
    s = re.sub(r"\bBoolean\.FALSE\b", "false", s)
    s = re.sub(r"\.getStartTagRange\(\)", ".startTagRange", s)

    s = re.sub(r"\.getEndTagRange\(\)", ".endTagRange", s)
    s = re.sub(r"\b(startTagRange|endTagRange)\.get(Start|End)\(\)", lambda m: m.group(1) + "." + m.group(2).lower(), s)
    s = re.sub(r"\bAXIOMUtil\.stringToOM\(", "parseOM(", s)
    s = re.sub(r"\bString\.valueOf\(", "String(", s)
    s = re.sub(r"\b(?:Integer|Long|Short)\.parseInt\(|\bLong\.parseLong\(", "parseInt(", s)
    s = re.sub(r"\bDouble\.parseDouble\(", "parseFloat(", s)
    s = re.sub(r"\bBoolean\.parseBoolean\(", "parseBoolean(", s)
    s = re.sub(r"\bString\.format\(", "format(", s)
    s = re.sub(r"\bString\.join\(", "joinStr(", s)
    s = re.sub(r"\bInteger\.valueOf\(", "Number(", s)
    s = re.sub(r"\bOptional\.(?:of|ofNullable)\(", "(", s)
    s = re.sub(r"\bOptional\.empty\(\)", "undefined", s)
    s = re.sub(r"\bObjects\.nonNull\(([^()]*)\)", r"(\1 != null)", s)
    s = re.sub(r"\bObjects\.isNull\(([^()]*)\)", r"(\1 == null)", s)
    s = re.sub(r"\bObjects\.equals\(", "equals(", s)
    s = re.sub(r"\bObjects\.requireNonNull\(", "(", s)
    s = re.sub(r"\bUtils\.getEnumFromValue\(\s*([^,()]+),\s*([\w.]+)\.class\s*\)", r"getEnumFromValue(\1, \2)", s)
    s = re.sub(r"\b(\w+)\.valueOf\(", lambda m: "enumValueOf(%s, " % m.group(1) if m.group(1)[0].isupper() and m.group(1) not in ("String", "Integer", "Boolean", "Double", "Long") else m.group(0), s)
    s = re.sub(r"\b([A-Za-z_]\w*)\.class\.getName\(\)", r'"\1"', s)
    s = re.sub(r"\b([A-Za-z_]\w*)\.class\b", r"\1", s)
    s = re.sub(r"\bnew\s+StringBuilder\(", "new StringBuilder(", s)
    return s


def convert_misc(s):
    s = s.replace("java.util.", "")
    s = re.sub(r"\bthrows\s+[\w., ]+(?=\{)", "", s)
    s = re.sub(r"\bcatch\s*\(\s*(?:final\s+)?[\w.| ]+\s+(\w+)\s*\)", r"catch (\1)", s)
    s = re.sub(r"@\w+(?:\([^)]*\))?\s*", "", s)
    s = re.sub(r"\binstanceof\s+([\w.]+)(?:<[^>]*>)?", r"instanceof \1", s)
    s = re.sub(r"\b(\d+)[lLfFdD]\b", r"\1", s)
    s = re.sub(r"\bfinal\s+", "", s)
    s = re.sub(r"\bLevel\.(\w+)", r"Level.\1", s)
    return s


def prefix_this(s, methods, cls_name):
    """prefix bare calls to the class's own (or inherited) methods with this./ClassName."""
    out = []
    last = 0
    for m in re.finditer(r"(?<![\w$.])([A-Za-z_]\w*)\s*\(", s):
        name = m.group(1)
        if name in KEYWORDS or name not in methods:
            continue
        before = s[:m.start()].rstrip()
        if before.endswith(".") or before.endswith("new") and (len(before) == 3 or not (before[-4].isalnum() or before[-4] == "_")):
            continue
        out.append(s[last:m.start()])
        out.append(("%s.%s(" % (cls_name, name)) if methods[name] else ("this.%s(" % name))
        last = m.end()
    out.append(s[last:])
    return "".join(out)


# ------------------------------------------------------------------ class translation

def split_members(body):
    """split class body (without outer braces) into top-level member strings."""
    members = []
    i, n = 0, len(body)
    start = 0
    depth_paren = 0
    while i < n:
        c = body[i]
        if c in "\"'":
            j = i + 1
            while j < n and body[j] != c:
                j += 2 if body[j] == "\\" else 1
            i = j
        elif c == "(":
            depth_paren += 1
        elif c == ")":
            depth_paren -= 1
        elif c == "{":
            cl = match_close(body, i, "{", "}")
            # array initialiser inside field: `= {`  or `= new T[] {` -> include until ;
            head = body[start:i]
            if re.search(r"=\s*(new\s+[\w.<>\[\]]+\s*)?$", head):
                semi = body.find(";", cl)
                members.append(body[start:semi + 1].strip()); i = semi; start = semi + 1
            else:
                members.append(body[start:cl + 1].strip()); i = cl; start = cl + 1
        elif c == ";" and depth_paren == 0:
            members.append(body[start:i + 1].strip()); start = i + 1
        i += 1
    tail = body[start:].strip()
    if tail:
        members.append(tail)
    return [m for m in members if m]


MOD_RE = re.compile(r"^((?:(?:public|private|protected|static|final|abstract|synchronized|native|transient|volatile|default)\s+)*)")


def outside_strings(s, fn):
    out = []
    i, n = 0, len(s)
    seg_start = 0
    while i < n:
        c = s[i]
        if c in "\"'":
            out.append(fn(s[seg_start:i]))
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == "\\" else 1
            out.append(s[i:j + 1])
            i = j + 1
            seg_start = i
        else:
            i += 1
    out.append(fn(s[seg_start:]))
    return "".join(out)


def prefix_statics(s, statics, cls):
    for f in statics:
        pat = re.compile(r"(?<![\w$.])" + re.escape(f) + r"(?![\w$])(?!\s*:)")
        s = outside_strings(s, lambda seg: pat.sub(cls + "." + f, seg))
    return s


def prefix_fields(s, fields):
    for f in fields:
        pat = re.compile(r"(?<![\w$.])" + re.escape(f) + r"(?![\w$])(?!\s*:)")
        s = outside_strings(s, lambda seg: pat.sub("this." + f, seg))
    return s


RESERVED = ("export", "var", "function", "delete", "in", "with", "default", "typeof", "enum", "package", "let", "yield", "arguments")


def rename_reserved(params, body):
    for r in RESERVED:
        if re.search(r"\b%s\b" % r, params):
            params = re.sub(r"\b%s\b" % r, r + "_", params)
            body = re.sub(r"(?<![\w$.])%s(?![\w$])(?!\s*:)" % r, r + "_", body)
    return params, body


def translate_params(params):
    out = []
    for p in split_args(params):
        if not p:
            continue
        p = re.sub(r"\bfinal\s+", "", p).strip()
        varargs = "..." in p
        p = p.replace("...", "[] ")
        m = re.match(r"^(.*\S)\s+(\w+)$", p, re.S)
        if not m:
            out.append(p); continue
        ts = parse_type(m.group(1))
        out.append("%s%s: %s" % ("..." if varargs else "", m.group(2), ts))
    return ", ".join(out)


def translate_body(body, file, cls_name, methods):
    s = body
    s = convert_misc(s)
    s = convert_new_array_init(s)
    s = convert_collections(s)
    s = convert_foreach(s)
    s = convert_classic_for(s)
    s = convert_declarations(s, file, cls_name)
    s = convert_casts(s)
    s = convert_calls(s)
    s = prefix_this(s, methods, cls_name)
    s = re.sub(r"(?m)^\s*assert\s+[^;]*;", "", s)
    for r in RESERVED:
        if re.search(r"\blet\s+%s\b" % r, s):
            s = re.sub(r"(?<![\w$.])%s(?![\w$])(?!\s*:)" % r, r + "_", s)
    return s


def translate_class(idx, ci, src_raw):
    file = ci.name
    src = re.sub(r"@\w+(?:\([^)]*\))?[ \t]*", "", strip_comments(src_raw))
    imps = parse_imports(src)
    pkg = ci.fqcn.rsplit(".", 1)[0]
    # class header
    hm = re.search(r"((?:public|abstract|final)\s+)*(class|interface|enum)\s+" + ci.name + r"(\s*<[^{]*?>)?([^{]*)\{", src)
    if not hm:
        warn(file, "no class header"); return None
    kind = hm.group(2)
    header_rest = hm.group(4)
    ob = hm.end() - 1
    cb = match_close(src, ob, "{", "}")
    body = src[ob + 1:cb]
    abstract = "abstract" in src[hm.start():hm.end()].split("class")[0]
    ext = re.search(r"\bextends\s+([\w.]+)(?:<[^{]*?>)?", header_rest)
    impl = re.search(r"\bimplements\s+([\w.<>, ]+)", header_rest)
    methods = inherited_methods(idx, ci)
    used = set()

    members = split_members(body)
    out_lines = []
    method_recs = []
    ctor_super = bool(ext)
    fields = set()
    statics = set()
    inh_statics = {}
    sup = ci.super_fq
    while sup and sup in idx:
        sci = idx[sup]
        for mm_ in re.finditer(r"\bstatic\s+(?:final\s+)?[\w.<>\[\], ?]+?\s+(\w+)\s*=", strip_comments(read(sci.path))):
            inh_statics.setdefault(mm_.group(1), sci.name)
        sup = sci.super_fq
    for mem in members:
        mm0 = MOD_RE.match(mem)
        r0 = mem[len(mm0.group(1)):].strip()
        if "static" in mm0.group(1):
            sm = re.match(r"^[\w.<>\[\], ?]+?\s+(\w+)\s*(=|;)", r0)
            if sm:
                statics.add(sm.group(1))
            continue
        fm0 = re.match(r"^([\w.<>\[\], ?]+?)\s+(\w+)\s*(=.*)?;$", r0, re.S)
        if fm0 and "(" not in r0.split("=")[0]:
            fields.add(fm0.group(2))

    if kind == "enum":
        return translate_enum(idx, ci, body, imps, pkg, src)

    for mem in members:
        mm = MOD_RE.match(mem)
        mods = mm.group(1)
        rest = mem[len(mods):].strip()
        is_static = "static" in mods
        # method or constructor?
        mmatch = re.match(r"^(?:<[^>]+>\s+)?(?:([\w.<>\[\], ?]+?)\s+)?(\w+)\s*\(", rest)
        if mmatch and not re.match(r"^\s*=", rest[mmatch.end():]) and "(" in rest.split("=")[0]:
            ret, name = mmatch.group(1), mmatch.group(2)
            op = mmatch.end() - 1
            cl = match_close(rest, op, "(", ")")
            params = rest[op + 1:cl]
            after = rest[cl + 1:].strip()
            after = re.sub(r"^throws\s+[\w., ]+", "", after).strip()
            has_body = after.startswith("{")
            is_ctor = ret is None and name == ci.name
            if ret is None and not is_ctor:
                warn(file, "unrecognised member: " + rest[:60]); continue
            if has_body:
                bcl = match_close(after, 0, "{", "}")
                mb = after[1:bcl]
                tb = translate_body(mb, file, ci.name, methods)
                pnames = set(re.findall(r"(\w+)\s*(?:,|$)", re.sub(r"<[^>]*>", "", params)))
                shadow = set(re.findall(r"\blet\s+(\w+)", tb)) | set(re.findall(r"\bconst\s+(\w+)", tb)) | set(re.findall(r"(\w+)\s*(?:,|$)", re.sub(r"<[^>]*>", "", params)))
                tb = prefix_statics(tb, statics - shadow, ci.name)
                for nm_, cn_ in inh_statics.items():
                    if nm_ not in statics and nm_ not in shadow:
                        tb = prefix_statics(tb, [nm_], cn_)
                tb = prefix_fields(tb, fields - pnames - set(re.findall(r"\blet\s+(\w+)", tb)))
            else:
                tb = None
            if tb is not None:
                params, tb = rename_reserved(params, tb)
            ps = translate_params(params)
            pnames_ = [x.split(":")[0].replace("...", "").strip() for x in split_args(ps) if x]
            rts = None if is_ctor else parse_type(ret)
            method_recs.append(dict(name=name, ctor=is_ctor, static=is_static, abstract="abstract" in mods,
                                    ps=ps, pnames=pnames_, rts=rts, tb=tb))
        else:
            # field
            fm = re.match(r"^([\w.<>\[\], ?]+?)\s+(\w+)\s*(=\s*(.*))?;$", rest, re.S)
            if not fm:
                warn(file, "unrecognised field: " + rest[:60]); continue
            jt, name, _, init = fm.group(1), fm.group(2), fm.group(3), fm.group(4)
            ts = parse_type(jt)
            prefix = "static " if is_static else ""
            if "final" in mods and is_static:
                prefix = "static readonly "
            if init is not None:
                init_t = translate_body(init, file, ci.name, methods)
                if is_static:
                    init_t = prefix_statics(init_t, statics - {name}, ci.name)
                    for nm_, cn_ in inh_statics.items():
                        if nm_ not in statics and nm_ != name:
                            init_t = prefix_statics(init_t, [nm_], cn_)
                if init_t.strip().startswith("{"):
                    init_t = "[" + init_t.strip()[1:-1] + "]"
                if is_static and "getInstance()" in init_t:
                    out_lines.append("  static get %s(): %s {\n    return %s;\n  }" % (name, ts, init_t))
                else:
                    out_lines.append("  %s%s: %s = %s;" % (prefix, name, ts, init_t))
            else:
                dflt = java_type_default(jt)
                if dflt is not None and not is_static:
                    out_lines.append("  %s%s: %s = %s;" % (prefix, name, ts, dflt))
                else:
                    out_lines.append("  %s%s?: %s;" % (prefix, name, ts))

    groups = collections.OrderedDict()
    for r in method_recs:
        groups.setdefault(("constructor" if r["ctor"] else r["name"], r["static"]), []).append(r)
    for (gname, gstatic), recs in groups.items():
        prefix = "static " if gstatic else ""
        if recs[0]["abstract"]:
            prefix += "abstract "
        if len(recs) == 1:
            r = recs[0]
            if r["ctor"]:
                lines = ["  constructor(%s) {" % r["ps"]]
                if ctor_super:
                    lines.append("    super();")
                lines.append(indent(r["tb"] or "", 4))
                lines.append("  }")
                out_lines.append("\n".join(lines))
            elif r["tb"] is None:
                out_lines.append("  %s%s(%s): %s;" % (prefix, r["name"], r["ps"], r["rts"]))
            else:
                out_lines.append("  %s%s(%s): %s {\n%s\n  }" % (prefix, r["name"], r["ps"], r["rts"], indent(r["tb"], 4)))
            continue
        by_arity = collections.OrderedDict()
        for r in recs:
            by_arity.setdefault(len(r["pnames"]), []).append(r)
        sigs = []
        for r in recs:
            sigs.append(("  constructor(%s);" % r["ps"]) if r["ctor"] else "  %s%s(%s): %s;" % (prefix, r["name"], r["ps"], r["rts"]))

        def ptypes(r):
            return [x.split(":", 1)[1].strip() if ":" in x else "any" for x in split_args(r["ps"]) if x]

        def cond(t, k):
            if t.endswith("[]"):
                return "Array.isArray(args[%d])" % k
            if t in ("string", "number", "boolean"):
                return "typeof args[%d] === '%s'" % (k, t)
            return "args[%d] instanceof %s" % (k, re.sub(r"<.*", "", t))

        cases = []
        for n, group in by_arity.items():
            def body_of(r):
                decl = ("const [%s] = args;\n" % ", ".join(r["pnames"])) if r["pnames"] else ""
                return decl + (r["tb"] or "")
            if len(group) == 1:
                cases.append("      case %d: {\n%s\n        break;\n      }" % (n, indent(body_of(group[0]), 8)))
            else:
                tl = [ptypes(r) for r in group]
                k = next((i for i in range(n) if len(set(t[i] for t in tl)) > 1), 0)
                parts = []
                for r, t in zip(group, tl):
                    parts.append("if (%s) {\n%s\n        }" % (cond(t[k], k), indent(body_of(r), 10)))
                cases.append("      case %d: {\n        %s\n        break;\n      }" % (n, " else ".join(parts)))
        head = "constructor(...args: any[])" if gname == "constructor" else "%s%s(...args: any[]): any" % (prefix, gname)
        sup = "    super();\n" if gname == "constructor" and ctor_super else ""
        out_lines.append("\n".join(sigs) + "\n  %s {\n%s    switch (args.length) {\n%s\n      default: throw new Error('no matching overload');\n    }\n  }" % (head, sup, "\n".join(cases)))

    header = "export %sclass %s" % ("abstract " if abstract else "", ci.name)
    if kind == "interface":
        header = "export interface %s" % ci.name
    if ext:
        header += " extends " + ext.group(1).split(".")[-1]
    if impl and kind != "interface":
        pass
    text = header + " {\n" + "\n\n".join(out_lines) + "\n}\n"
    return finalize(idx, ci, text, imps, pkg)


def translate_enum(idx, ci, body, imps, pkg, src):
    # constants until the first ';' at depth 0
    depth = 0
    semi = -1
    for i, c in enumerate(body):
        if c in "({":
            depth += 1
        elif c in ")}":
            depth -= 1
        elif c == ";" and depth == 0:
            semi = i; break
    consts_txt = body if semi < 0 else body[:semi]
    rest = "" if semi < 0 else body[semi + 1:]
    consts = [c for c in split_args(consts_txt) if c.strip()]
    lines = []
    names = []
    for ordn, c in enumerate(consts):
        m = re.match(r"^(\w+)\s*(?:\((.*)\))?$", c.strip(), re.S)
        if not m:
            warn(ci.name, "enum const: " + c[:40]); continue
        nm, args = m.group(1), m.group(2)
        names.append(nm)
        lines.append("  static readonly %s = new %s(\"%s\", %d%s);" % (nm, ci.name, nm, ordn, ", " + args if args else ""))
    extra = []
    has_value = False
    ctor_params = ""
    for mem in split_members(rest):
        mm = MOD_RE.match(mem)
        mods = mm.group(1); r = mem[len(mods):].strip()
        if re.match(r"^%s\s*\(" % ci.name, r):
            op = r.index("("); cl = match_close(r, op, "(", ")")
            ctor_params = translate_params(r[op + 1:cl])
            bb = r[r.index("{", cl) + 1:r.rindex("}")]
            has_value = True
            ctor_body = translate_body(bb, ci.name, ci.name, {})
            continue
        fm = re.match(r"^([\w.<>\[\], ?]+?)\s+(\w+)\s*;$", r)
        if fm:
            extra.append("  %s: %s;" % (fm.group(2), parse_type(fm.group(1))))
            continue
        mmeth = re.match(r"^([\w.<>\[\], ?]+?)\s+(\w+)\s*\(", r)
        if mmeth:
            op = r.index("("); cl = match_close(r, op, "(", ")")
            bb = r[r.index("{", cl) + 1:r.rindex("}")]
            tb = prefix_fields(translate_body(bb, ci.name, ci.name, {"name": False}), set(re.findall(r"^\s+(\w+):", "\n".join(extra), re.M)) | {"value"})
            extra.append("  %s(%s): %s {\n%s\n  }" % (mmeth.group(2), translate_params(r[op + 1:cl]), parse_type(mmeth.group(1)), indent(tb, 4)))
    ctor = "  private constructor(private readonly _name: string, private readonly _ordinal: number%s) {\n%s  }" % (
        (", " + ctor_params) if ctor_params else "", indent(ctor_body, 4) + "\n" if ctor_params else "")
    text = "export class %s {\n%s\n\n%s\n\n%s\n  name(): string { return this._name; }\n  ordinal(): number { return this._ordinal; }\n  toString(): string { return this._name; }\n  toJSON(): string { return %s; }\n  static values(): %s[] { return [%s]; }\n  static valueOf(name: string): %s {\n    const v = %s.values().find((e) => e._name === name);\n    if (!v) throw new Error('No enum constant ' + name);\n    return v;\n  }\n}\n" % (
        ci.name, "\n".join(extra), "\n".join(lines), ctor,
        "this.getValue()" if "getValue" in rest else "this._name",
        ci.name, ", ".join("%s.%s" % (ci.name, n) for n in names), ci.name, ci.name)
    return finalize(idx, ci, text, imps, pkg)


def indent(t, n):
    pad = " " * n
    lines = [l for l in t.strip("\n").split("\n")]
    # normalise indentation: strip common leading whitespace
    ind = min((len(l) - len(l.lstrip()) for l in lines if l.strip()), default=0)
    return "\n".join(pad + l[ind:] if l.strip() else "" for l in lines)


def ts_path_for_fq(fq):
    if fq in EXTERNAL:
        return EXTERNAL[fq][0], EXTERNAL[fq][1]
    if fq.startswith(BASE_PKG + "."):
        rel = fq[len(BASE_PKG) + 1:].replace(".", "/")
        return rel, fq.split(".")[-1]
    return None, None


def finalize(idx, ci, text, imps, pkg):
    # determine identifiers used and add imports
    file_dir = os.path.dirname(ci.fqcn[len(BASE_PKG) + 1:].replace(".", "/"))
    idents = set(re.findall(r"\b[A-Z][A-Za-z0-9_]*\b", re.sub(r'"(?:[^"\\]|\\.)*"', '""', text)))
    lines = []
    helpers_used = [h for h in HELPERS if re.search(r"\b%s\b" % h, re.sub(r'"(?:[^"\\]|\\.)*"', '""', text))]
    if helpers_used:
        rel = os.path.relpath("javaCompat", file_dir or ".").replace(os.sep, "/")
        rel = rel if rel.startswith(".") else "./" + rel
        lines.append('import { %s } from "%s.js";' % (", ".join(helpers_used), rel))
    seen = set()
    for ident in sorted(idents):
        if ident == ci.name or ident in HELPERS:
            continue
        fq = imps.get(ident)
        if ident in JAVA_BUILTIN and not (fq and fq.startswith(BASE_PKG)):
            continue
        if fq is None:
            cand = pkg + "." + ident
            if cand in idx:
                fq = cand
        if fq is None:
            continue
        p, nm = ts_path_for_fq(fq)
        if p is None:
            continue
        rel = os.path.relpath(p + ".ts", file_dir or ".").replace(os.sep, "/")[:-3]
        rel = rel if rel.startswith(".") else "./" + rel
        key = (rel, nm)
        if key in seen:
            continue
        seen.add(key)
        lines.append('import { %s } from "%s.js";' % (nm, rel))
    if "parseOM(" in text:
        rel = os.path.relpath("om/om", file_dir or ".").replace(os.sep, "/")
        rel = rel if rel.startswith(".") else "./" + rel
        lines.append('import { parseOM } from "%s.js";' % rel)
    head = "// @ts-nocheck\n// Generated from %s.java by the java2ts converter (see tools/java2ts).\n" % ci.fqcn.replace(".", "/")
    return head + "\n".join(lines) + ("\n\n" if lines else "\n") + text


def main():
    idx = build_index()
    only = sys.argv[1:]
    count = 0
    for fq, ci in sorted(idx.items()):
        rel = fq[len(BASE_PKG) + 1:].replace(".", "/")
        if only and not any(o in rel for o in only):
            continue
        if fq in EXTERNAL:
            continue
        src = read(ci.path)
        try:
            out = translate_class(idx, ci, src)
        except Exception as e:
            warn(ci.name, "EXCEPTION %r" % (e,)); continue
        if out is None:
            continue
        dest = os.path.join(OUT_ROOT, rel + ".ts")
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "w", encoding="utf-8") as f:
            f.write(out)
        count += 1
    print("wrote", count, "files")
    for f, msgs in sorted(report.items()):
        for m in msgs:
            print("WARN %s: %s" % (f, m))


if __name__ == "__main__":
    main()
