#!/usr/bin/env python3
"""Converts the Java serializer tests to Vitest."""
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import j2t

TEST_ROOT = "/home/claude/cloned/mi-language-server/org.eclipse.lemminx/src/test/java/org/eclipse/lemminx/synapse/serializer"
OUT = "/home/claude/cloned/wso2-mi-language-server-ts/tests/syntaxTree/serializer"
SRC = "/home/claude/cloned/wso2-mi-language-server-ts/src/syntaxTree"
BASE = j2t.BASE_PKG


def ts_import_path(fq, out_dir):
    if fq == "org.eclipse.lemminx.customservice.synapse.syntaxTree.serializer.InvalidConfigurationException":
        target = SRC + "/om/errors"
    elif fq in j2t.EXTERNAL:
        target = SRC + "/" + j2t.EXTERNAL[fq][0]
    elif fq.startswith(BASE + "."):
        target = SRC + "/" + fq[len(BASE) + 1:].replace(".", "/")
    else:
        return None
    return os.path.relpath(target, out_dir).replace(os.sep, "/") + ".js"


def convert(path):
    src = j2t.strip_comments(open(path, encoding="utf-8").read())
    name = os.path.basename(path)[:-5]
    imps = j2t.parse_imports(src)
    cm = re.search(r"class\s+%s(?:\s+extends\s+(\w+))?\s*\{" % name, src)
    base = cm.group(1)
    body = src[cm.end():src.rindex("}")]
    out_dir = OUT
    lines = []
    used = set()
    helpers_used = set()

    def need(ident):
        used.add(ident)

    # constructor
    ctor = re.search(r"public\s+%s\s*\(\s*\)\s*\{(.*?)\n    \}" % name, body, re.S)
    setup = ""
    if ctor:
        for m in re.finditer(r"(\w+)\s*=\s*new\s+(\w+)\(\)\s*;", ctor.group(1)):
            setup += "  const %s = new %s();\n" % (m.group(1), m.group(2)); need(m.group(2))
    # field initialisers like `protected EndpointFactory factory = new EndpointFactory();` come from base class
    private = re.search(r"private void test\(String xml\)\s*\{(.*?)\n    \}", body, re.S)
    check_fn = None
    if private:
        pb = private.group(1)
        fm = re.search(r"(\w+)\s+\w+\s*=\s*new\s+(\w+)\(\)", pb)
        sm = re.search(r"=\s*(\w+)\.(\w+)\(\s*\w+\s*\)\s*;\s*(?:\n\s*System|\n\s*assert)", pb)
        sm = re.search(r"String\s+actual\s*=\s*(\w+)\.(\w+)\(\s*(\w+)\s*\)", pb)
        factory_cls = fm.group(2)
        need(factory_cls); need(sm.group(1))
        check_fn = "  const check = (xml: string) => checkRoundTrip((e) => new %s().create(e), (n) => %s.%s(n), xml);\n" % (
            factory_cls, sm.group(1), sm.group(2))
    elif base == "EndpointSerializerTest":
        imps["EndpointFactory"] = BASE + ".factory.endpoint.EndpointFactory"
        imps["EndpointSerializer"] = BASE + ".serializer.endpoint.EndpointSerializer"
        need("EndpointFactory"); need("EndpointSerializer")
        check_fn = "  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);\n"

    tests = []
    for m in re.finditer(r"@Test\s+(?:@\w+(?:\([^)]*\))?\s+)*public\s+void\s+(\w+)\s*\(\s*\)\s*\{", body):
        ob = m.end() - 1
        cb = j2t.match_close(body, ob, "{", "}")
        tests.append((m.group(1), body[ob + 1:cb]))

    out = []
    for tname, tb in tests:
        t = tb
        t = re.sub(r"System\.out\.println\([^;]*\);", "", t)
        t = re.sub(r"\bString\s+(\w+)\s*=", r"const \1 =", t)
        if " new " in t and "assertThrows" not in t:
            t = j2t.translate_body(t, name, name, {})
            t = j2t.indent(t, 8)
            for ident in set(re.findall(r"\b[A-Z][A-Za-z0-9_]*\b", re.sub(r'"(?:[^"\\]|\\.)*"', '""', t))):
                if ident in imps:
                    used.add(ident)
            for h in j2t.HELPERS:
                if re.search(r"\b%s\(" % h, t):
                    helpers_used.add(h)
        t = re.sub(r"testSerializeMediator\(", "checkMediator(factory, serializer, ", t)
        t = re.sub(r"testSerializeEndpoint\(", "check(", t)
        t = re.sub(r"(?<![\w.])test\(", "check(", t)
        t = re.sub(r"assertEquals\(([^,]+),\s*([^;]+)\);", r"expect(\2).toBe(\1);", t)
        # assertThrows(X.class, () -> {...});
        while True:
            am = re.search(r"assertThrows\(\s*(\w+)\.class\s*,\s*\(\)\s*->\s*\{", t)
            if not am:
                break
            ob = am.end() - 1
            cb = j2t.match_close(t, ob, "{", "}")
            close = t.index(")", cb)
            inner = t[ob + 1:cb]
            t = t[:am.start()] + "expect(() => {" + inner + "}).toThrow(%s);" % am.group(1) + t[close + 1 + (1 if t[close + 1:close + 2] == ";" else 0):]
            need(am.group(1))
        t = re.sub(r"\n\s*\n", "\n", t)
        out.append("  it(%s, () => {%s  });\n" % (repr(tname), t.rstrip() + "\n"))
    # imports
    imp_lines = ['import { describe, it, expect } from "vitest";', 'import { %s } from "../helpers.js";' % ("checkMediator, checkRoundTrip")]
    for ident in sorted(used):
        fq = imps.get(ident)
        if not fq:
            continue
        p = ts_import_path(fq, out_dir)
        if p:
            imp_lines.append('import { %s } from "%s";' % (ident, p))
    if helpers_used:
        imp_lines.append('import { %s } from "../../../src/syntaxTree/javaCompat.js";' % ", ".join(sorted(helpers_used)))
    content = "\n".join(imp_lines) + "\n\n" + 'describe("%s", () => {\n%s%s%s});\n' % (name, setup, check_fn or "", "\n".join(out))
    content = content.replace("describe('%s'" % name, 'describe("%s"' % name).replace("it('", 'it("').replace("', () =>", '", () =>')
    content = content.replace('%s", () => {' % name, '%s", () => {' % name)
    return name, content


def main():
    os.makedirs(OUT, exist_ok=True)
    n = 0
    for root, _, files in os.walk(TEST_ROOT):
        for f in sorted(files):
            if not f.endswith("Test.java") or f in ("MediatorSerializerTest.java", "EndpointSerializerTest.java"):
                continue
            try:
                name, content = convert(os.path.join(root, f))
            except Exception as e:
                print("FAIL", f, repr(e)); continue
            open(os.path.join(OUT, name + ".test.ts"), "w").write(content)
            n += 1
    print("wrote", n)


main()
