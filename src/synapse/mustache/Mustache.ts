/**
 * A port of the subset of com.github.spullara:mustache.java used by the MI language server: the template parser
 * (including its non spec-conform whitespace handling), variables ({{x}}, {{{x}}}, {{&x}}), sections, inverted
 * sections, comments, delimiter changes and the reflection based scope lookup for maps, lists and strings.
 *
 * Values are looked up in a stack of scopes (innermost first). Maps are looked up by key; when the key is missing a few
 * well known JavaBean style accessors (size, empty) answer like the Java collections do, as the reflection based
 * ObjectHandler of mustache.java would.
 */

export class MustacheException extends Error {}

type Scopes = unknown[];

abstract class Code {
  abstract execute(out: StringWriter, scopes: Scopes): void;
}

class WriteCode extends Code {
  constructor(private readonly text: string) { super(); }
  execute(out: StringWriter): void { out.write(this.text); }
}

/** The text of a list of codes is concatenated in order. */
class Template {
  constructor(readonly codes: Code[]) {}
  run(out: StringWriter, scopes: Scopes): void {
    for (const c of this.codes) c.execute(out, scopes);
  }
}

const NOT_FOUND = Symbol("notFound");

function lookupOne(scope: unknown, name: string): unknown {
  if (scope === null || scope === undefined) return NOT_FOUND;
  if (scope instanceof Map) {
    if (scope.has(name)) return scope.get(name);
    if (name === "size") return scope.size;
    if (name === "empty") return scope.size === 0;
    return NOT_FOUND;
  }
  if (Array.isArray(scope)) {
    if (name === "size") return scope.length;
    if (name === "empty") return scope.length === 0;
    return NOT_FOUND;
  }
  if (typeof scope === "string") {
    if (name === "empty") return scope.length === 0;
    if (name === "length") return scope.length;
    return NOT_FOUND;
  }
  if (typeof scope === "object") {
    const o = scope as Record<string, unknown>;
    if (name in o && typeof o[name] !== "function") return o[name];
    const getter = "get" + name.charAt(0).toUpperCase() + name.substring(1);
    if (typeof o[getter] === "function") return (o[getter] as () => unknown).call(scope);
    const is = "is" + name.charAt(0).toUpperCase() + name.substring(1);
    if (typeof o[is] === "function") return (o[is] as () => unknown).call(scope);
    return NOT_FOUND;
  }
  return NOT_FOUND;
}

function find(name: string, scopes: Scopes): unknown {
  if (name === ".") return scopes[scopes.length - 1];
  const dot = name.indexOf(".");
  if (dot !== -1) {
    const parts = name.split(".");
    let cur: unknown = NOT_FOUND;
    for (let i = scopes.length - 1; i >= 0; i--) {
      cur = lookupOne(scopes[i], parts[0]);
      if (cur !== NOT_FOUND) break;
    }
    for (let p = 1; p < parts.length && cur !== NOT_FOUND; p++) {
      cur = lookupOne(cur, parts[p]);
    }
    return cur === NOT_FOUND ? null : cur;
  }
  for (let i = scopes.length - 1; i >= 0; i--) {
    const v = lookupOne(scopes[i], name);
    if (v !== NOT_FOUND) return v;
  }
  return null;
}

/** java.lang.String.valueOf for the value kinds that occur in the template data. */
function stringify(v: unknown): string {
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  if (Array.isArray(v)) return "[" + v.map(stringify).join(", ") + "]";
  if (v instanceof Map) return "{" + [...v.entries()].map(([k, x]) => k + "=" + stringify(x)).join(", ") + "}";
  return String(v);
}

function xmlEscape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

class ValueCode extends Code {
  constructor(private readonly name: string, private readonly encoded: boolean, private readonly encode: (s: string) => string) { super(); }
  execute(out: StringWriter, scopes: Scopes): void {
    const v = find(this.name, scopes);
    if (v !== null && v !== undefined) {
      const s = stringify(v);
      out.write(this.encoded ? this.encode(s) : s);
    }
  }
}

class IterableCode extends Code {
  constructor(private readonly name: string, private readonly body: Template) { super(); }
  execute(out: StringWriter, scopes: Scopes): void {
    const v = find(this.name, scopes);
    if (v === null || v === undefined) return;
    const next = (item: unknown): void => {
      scopes.push(item);
      try { this.body.run(out, scopes); } finally { scopes.pop(); }
    };
    if (typeof v === "boolean") {
      if (v) next(v);
    } else if (typeof v === "string") {
      if (v !== "") next(v);
    } else if (Array.isArray(v)) {
      for (const item of v) next(item);
    } else if (v instanceof Set) {
      for (const item of v) next(item);
    } else {
      next(v);
    }
  }
}

class NotIterableCode extends Code {
  constructor(private readonly name: string, private readonly body: Template) { super(); }
  execute(out: StringWriter, scopes: Scopes): void {
    const v = find(this.name, scopes);
    const next = (item: unknown): void => {
      scopes.push(item);
      try { this.body.run(out, scopes); } finally { scopes.pop(); }
    };
    if (v === null || v === undefined) next(v);
    else if (typeof v === "boolean") { if (!v) next(v); }
    else if (typeof v === "string") { if (v === "") next(v); }
    else if (Array.isArray(v)) { if (v.length === 0) next(v); }
    else if (v instanceof Set) { if (v.size === 0) next(v); }
  }
}

export class StringWriter {
  private buf = "";
  write(s: string): void { this.buf += s; }
  append(s: string): this { this.buf += s; return this; }
  toString(): string { return this.buf; }
}

export class Mustache {
  constructor(private readonly template: Template, readonly name: string) {}
  /** Renders the template with `scope` as the root scope and returns the writer. */
  execute(writer: StringWriter, scope: unknown): StringWriter {
    this.template.run(writer, [scope]);
    return writer;
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Parser (port of com.github.mustachejava.MustacheParser with specConformWhitespace=false)
// ---------------------------------------------------------------------------------------------------------------

class Reader {
  private pos = 0;
  private markPos = 0;
  constructor(private readonly text: string) {}
  read(): number { return this.pos < this.text.length ? this.text.charCodeAt(this.pos++) : -1; }
  mark(): void { this.markPos = this.pos; }
  reset(): void { this.pos = this.markPos; }
}

class State {
  currentLine = 0;
}

export class MustacheFactory {
  /** XML escaping used by SynapseMustacheFactory.encode. */
  encode(value: string): string { return xmlEscape(value); }

  compile(text: string, name: string): Mustache {
    return this.parse(new Reader(text), null, new State(), name, "{{", "}}", true);
  }

  private parse(br: Reader, tag: string | null, state: State, file: string, sm: string, em: string, startOfLineIn: boolean): Mustache {
    let startOfLine = startOfLineIn;
    let sawCR = false;
    const startLine = state.currentLine;
    const codes: Code[] = [];
    let onlywhitespace = true;
    let iterable = state.currentLine !== 0;
    if (state.currentLine === 0) state.currentLine = 1;
    let out = "";
    const write = (): string => {
      if (out.length > 0) codes.push(new WriteCode(out));
      return "";
    };
    let c: number;
    while ((c = br.read()) !== -1) {
      if (c === 13) { sawCR = true; continue; }
      if (c === 10) {
        state.currentLine++;
        if (!iterable || (iterable && !onlywhitespace)) {
          if (sawCR) out += "\r";
          out += "\n";
        }
        out = write();
        iterable = false;
        onlywhitespace = true;
        startOfLine = true;
        continue;
      }
      sawCR = false;
      if (c === sm.charCodeAt(0)) {
        br.mark();
        if (sm.length === 1 || br.read() === sm.charCodeAt(1)) {
          let sb = "";
          br.mark();
          c = br.read();
          let delimiter = c === 61; // '='
          if (delimiter) {
            sb += String.fromCharCode(c);
          } else {
            br.reset();
          }
          while ((c = br.read()) !== -1) {
            br.mark();
            if (delimiter) {
              if (c === 61) delimiter = false;
              else sb += String.fromCharCode(c);
              continue;
            }
            if (c === em.charCodeAt(0)) {
              if (em.length > 1) {
                if (br.read() === em.charCodeAt(1)) break;
                br.reset();
              } else break;
            }
            sb += String.fromCharCode(c);
          }
          const command = sb;
          if (command.length === 0) throw new MustacheException("Empty mustache in " + file + ":" + state.currentLine);
          const ch = command.charAt(0);
          const variable = command.substring(1).trim();
          switch (ch) {
            case "#":
            case "^": {
              startOfLine = startOfLine && onlywhitespace;
              const line = state.currentLine;
              const mustache = this.parse(br, variable, state, file, sm, em, startOfLine);
              const lines = state.currentLine - line;
              if (!onlywhitespace || lines === 0) {
                if (out.length > 0) codes.push(new WriteCode(out));
              }
              out = "";
              const body = (mustache as unknown as { template: Template }).template;
              codes.push(ch === "#" ? new IterableCode(variable, body) : new NotIterableCode(variable, body));
              iterable = lines !== 0;
              break;
            }
            case "/": {
              if (!startOfLine || !onlywhitespace) {
                out = write();
              }
              // otherwise the pending whitespace of a standalone closing tag line is dropped
              if (variable !== tag) {
                throw new MustacheException("Mismatched start/end tags: " + tag + " != " + variable + " in " + file + ":" + state.currentLine);
              }
              return new Mustache(new Template(codes), file);
            }
            case "{": {
              out = write();
              let name = variable;
              if (em.charAt(1) !== "}") {
                name = variable.substring(0, variable.length - 1);
              } else if (br.read() !== 125) {
                throw new MustacheException("Improperly closed variable: " + variable + " in " + file + ":" + state.currentLine);
              }
              codes.push(new ValueCode(name, false, (s) => this.encode(s)));
              break;
            }
            case "&":
              out = write();
              codes.push(new ValueCode(variable, false, (s) => this.encode(s)));
              break;
            case "!":
              out = write();
              break;
            case "=": {
              out = write();
              const trimmed = command.substring(1).trim();
              const split = trimmed.split(/\s+/);
              if (split.length !== 2) throw new MustacheException("Invalid delimiter string: " + trimmed);
              sm = split[0];
              em = split[1];
              break;
            }
            case "<":
            case "?":
            case "$":
            case ">":
            case "%":
              throw new MustacheException("Unsupported mustache construct '" + ch + "' in " + file + ":" + state.currentLine);
            default: {
              if (c === -1) throw new MustacheException("Improperly closed variable in " + file + ":" + state.currentLine);
              out = write();
              codes.push(new ValueCode(command.trim(), true, (s) => this.encode(s)));
              break;
            }
          }
          startOfLine = false;
          continue;
        } else {
          br.reset();
        }
      }
      onlywhitespace = onlywhitespace && (c === 32 || c === 9 || c === 13);
      out += String.fromCharCode(c);
    }
    write();
    if (tag !== null) throw new MustacheException("Failed to close '" + tag + "' tag in " + file + ":" + startLine);
    return new Mustache(new Template(codes), file);
  }
}
