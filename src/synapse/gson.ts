/**
 * A Gson tree model (JsonObject, JsonArray, JsonPrimitive, JsonNull, JsonParser) over plain JS values.
 * The services build UI schemas with these classes, so keeping the same API lets the ported code stay close to
 * the Java. Output order is insertion order, like Gson's LinkedTreeMap.
 */
export abstract class JsonElement {
  isJsonObject(): boolean { return this instanceof JsonObject; }
  isJsonArray(): boolean { return this instanceof JsonArray; }
  isJsonPrimitive(): boolean { return this instanceof JsonPrimitive; }
  isJsonNull(): boolean { return this instanceof JsonNull; }
  getAsJsonObject(): JsonObject {
    if (this instanceof JsonObject) return this;
    throw new IllegalStateException("Not a JSON Object: " + this.toString());
  }
  getAsJsonArray(): JsonArray {
    if (this instanceof JsonArray) return this;
    throw new IllegalStateException("Not a JSON Array: " + this.toString());
  }
  getAsJsonPrimitive(): JsonPrimitive {
    if (this instanceof JsonPrimitive) return this;
    throw new IllegalStateException("Not a JSON Primitive: " + this.toString());
  }
  getAsString(): string { throw new UnsupportedOperationException(this.constructor.name); }
  getAsInt(): number { throw new UnsupportedOperationException(this.constructor.name); }
  getAsLong(): number { return this.getAsInt(); }
  getAsDouble(): number { return this.getAsInt(); }
  getAsBoolean(): boolean { throw new UnsupportedOperationException(this.constructor.name); }
  abstract deepCopy(): JsonElement;
  abstract toJSON(): unknown;
  toString(): string { return stringifyOrdered(this) ?? "null"; }
}

class IllegalStateException extends Error {}
class UnsupportedOperationException extends Error {}

export class JsonNull extends JsonElement {
  static readonly INSTANCE = new JsonNull();
  deepCopy(): JsonElement { return this; }
  toJSON(): unknown { return null; }
}

export class JsonPrimitive extends JsonElement {
  /** `raw` keeps the source text of a number, like Gson's LazilyParsedNumber. */
  constructor(readonly value: string | number | boolean, readonly raw?: string) { super(); }
  isString(): boolean { return typeof this.value === "string"; }
  isNumber(): boolean { return typeof this.value === "number"; }
  isBoolean(): boolean { return typeof this.value === "boolean"; }
  getAsString(): string { return this.raw ?? String(this.value); }
  getAsInt(): number {
    if (typeof this.value === "number") return Math.trunc(this.value);
    const n = Number(this.value);
    if (Number.isNaN(n)) throw new Error("NumberFormatException: " + this.value);
    return Math.trunc(n);
  }
  getAsDouble(): number { return Number(this.value); }
  getAsBoolean(): boolean { return typeof this.value === "boolean" ? this.value : String(this.value).toLowerCase() === "true"; }
  deepCopy(): JsonElement { return this; }
  toJSON(): unknown { return this.value; }
  equals(o: unknown): boolean { return o instanceof JsonPrimitive && o.value === this.value; }
}

export class JsonArray extends JsonElement implements Iterable<JsonElement> {
  private items: JsonElement[] = [];
  add(e: JsonElement | string | number | boolean | null): void { this.items.push(wrap(e)); }
  /** Alias used where the converter rewrote List.add(x). */
  push(...e: (JsonElement | string | number | boolean | null)[]): void { e.forEach((x) => this.add(x)); }
  addAll(other: JsonArray): void { this.items.push(...other.items); }
  get(i: number): JsonElement { return this.items[i]; }
  set(i: number, e: JsonElement): JsonElement { const old = this.items[i]; this.items[i] = e; return old; }
  remove(i: number | JsonElement): any {
    if (typeof i === "number") return this.items.splice(i, 1)[0];
    const idx = this.items.indexOf(i);
    if (idx >= 0) { this.items.splice(idx, 1); return true; }
    return false;
  }
  size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
  contains(e: JsonElement): boolean { return this.items.some((x) => x === e || (x instanceof JsonPrimitive && x.equals(e))); }
  asList(): JsonElement[] { return this.items; }
  forEach(fn: (e: JsonElement) => void): void { this.items.forEach((x) => fn(x)); }
  [Symbol.iterator](): Iterator<JsonElement> { return this.items[Symbol.iterator](); }
  iterator(): Iterator<JsonElement> { return this.items[Symbol.iterator](); }
  getAsString(): string { return this.items[0].getAsString(); }
  deepCopy(): JsonElement { const a = new JsonArray(); this.items.forEach((x) => a.add(x.deepCopy())); return a; }
  toJSON(): unknown { return this.items.map((x) => x.toJSON()); }
}

export class JsonObject extends JsonElement {
  private props = new Map<string, JsonElement>();
  add(key: string, value: JsonElement | null): void { this.props.set(key, wrap(value)); }
  addProperty(key: string, value: string | number | boolean | null | undefined): void {
    this.props.set(key, value === null || value === undefined ? JsonNull.INSTANCE : new JsonPrimitive(value));
  }
  /** Returns null when the member is absent (like Gson). */
  get(key: string): JsonElement | null { return this.props.get(key) ?? null; }
  has(key: string): boolean { return this.props.has(key); }
  remove(key: string): JsonElement | null { const v = this.props.get(key) ?? null; this.props.delete(key); return v; }
  getAsJsonObject(key?: string): JsonObject {
    if (key === undefined) return super.getAsJsonObject();
    return this.props.get(key) as JsonObject;
  }
  getAsJsonArray(key?: string): JsonArray {
    if (key === undefined) return super.getAsJsonArray();
    return this.props.get(key) as JsonArray;
  }
  getAsJsonPrimitive(key?: string): JsonPrimitive {
    if (key === undefined) return super.getAsJsonPrimitive();
    return this.props.get(key) as JsonPrimitive;
  }
  keySet(): string[] { return [...this.props.keys()]; }
  entrySet(): { getKey(): string; getValue(): JsonElement }[] {
    return [...this.props.entries()].map(([k, v]) => ({ getKey: () => k, getValue: () => v }));
  }
  size(): number { return this.props.size; }
  isEmpty(): boolean { return this.props.size === 0; }
  asMap(): Map<string, JsonElement> { return this.props; }
  deepCopy(): JsonElement { const o = new JsonObject(); this.props.forEach((v, k) => o.add(k, v.deepCopy())); return o; }
  toJSON(): unknown {
    const out: Record<string, unknown> = {};
    this.props.forEach((v, k) => { out[k] = v.toJSON(); });
    return out;
  }
}

function wrap(e: JsonElement | string | number | boolean | null | undefined): JsonElement {
  if (e === null || e === undefined) return JsonNull.INSTANCE;
  if (e instanceof JsonElement) return e;
  return new JsonPrimitive(e);
}

/** Converts parsed JSON (or any plain value) to a Gson tree. */
export function fromPlain(v: unknown): JsonElement {
  if (v === null || v === undefined) return JsonNull.INSTANCE;
  if (v instanceof JsonElement) return v;
  if (Array.isArray(v)) { const a = new JsonArray(); v.forEach((x) => a.add(fromPlain(x))); return a; }
  if (v instanceof Map) { const o = new JsonObject(); v.forEach((x, k) => o.add(String(k), fromPlain(x))); return o; }
  if (typeof v === "object") {
    const o = new JsonObject();
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      if (x === undefined || typeof x === "function") continue;
      o.add(k, fromPlain(x));
    }
    return o;
  }
  return new JsonPrimitive(v as string | number | boolean);
}

export class JsonSyntaxException extends Error {}

export const JsonParser = {
  parseString(s: string): JsonElement {
    try {
      return new OrderedJsonParser(s).parseDocument();
    } catch (e) {
      throw new JsonSyntaxException(String(e));
    }
  },
};

/** Strict JSON text to Gson tree: keeps member order (JS objects would move integer like keys first) and number text. */
class OrderedJsonParser {
  private i = 0;
  constructor(private readonly s: string) {}
  parseDocument(): JsonElement {
    this.ws();
    if (this.i >= this.s.length) return JsonNull.INSTANCE; // JsonParser.parse("") yields JsonNull
    const v = this.value();
    this.ws();
    if (this.i < this.s.length) throw new Error("Did not consume the entire document.");
    return v;
  }
  private ws(): void { while (this.i < this.s.length && " \t\n\r".includes(this.s[this.i])) this.i++; }
  private value(): JsonElement {
    this.ws();
    const c = this.s[this.i];
    if (c === "{") {
      this.i++;
      const o = new JsonObject();
      this.ws();
      if (this.s[this.i] === "}") { this.i++; return o; }
      for (;;) {
        this.ws();
        if (this.s[this.i] !== '"') throw new Error("Expected name at " + this.i);
        const k = this.str();
        this.ws();
        if (this.s[this.i++] !== ":") throw new Error("Expected ':' at " + (this.i - 1));
        o.add(k, this.value());
        this.ws();
        const d = this.s[this.i++];
        if (d === "}") return o;
        if (d !== ",") throw new Error("Expected ',' or '}' at " + (this.i - 1));
      }
    }
    if (c === "[") {
      this.i++;
      const a = new JsonArray();
      this.ws();
      if (this.s[this.i] === "]") { this.i++; return a; }
      for (;;) {
        a.add(this.value());
        this.ws();
        const d = this.s[this.i++];
        if (d === "]") return a;
        if (d !== ",") throw new Error("Expected ',' or ']' at " + (this.i - 1));
      }
    }
    if (c === '"') return new JsonPrimitive(this.str());
    if (this.s.startsWith("true", this.i)) { this.i += 4; return new JsonPrimitive(true); }
    if (this.s.startsWith("false", this.i)) { this.i += 5; return new JsonPrimitive(false); }
    if (this.s.startsWith("null", this.i)) { this.i += 4; return JsonNull.INSTANCE; }
    const m = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(this.s.substring(this.i));
    if (!m) throw new Error("Unexpected character at " + this.i);
    this.i += m[0].length;
    return new JsonPrimitive(Number(m[0]), m[0]);
  }
  private str(): string {
    const start = this.i;
    this.i++; // opening quote
    while (this.i < this.s.length && this.s[this.i] !== '"') this.i += this.s[this.i] === "\\" ? 2 : 1;
    if (this.i >= this.s.length) throw new Error("Unterminated string");
    this.i++;
    return JSON.parse(this.s.substring(start, this.i));
  }
}

/** JSON text that keeps Map and JsonObject member order. `undefined` for values that have no JSON form. */
export function stringifyOrdered(v: unknown): string | undefined {
  if (v === null) return "null";
  if (v === undefined || typeof v === "function") return undefined;
  if (v instanceof JsonObject) {
    const parts: string[] = [];
    for (const [k, x] of v.asMap()) parts.push(JSON.stringify(k) + ":" + (stringifyOrdered(x) ?? "null"));
    return "{" + parts.join(",") + "}";
  }
  if (v instanceof JsonArray) return "[" + v.asList().map((x) => stringifyOrdered(x) ?? "null").join(",") + "]";
  if (v instanceof JsonPrimitive) {
    if (typeof v.value === "number") return v.raw ?? JSON.stringify(v.value);
    return JSON.stringify(v.value);
  }
  if (v instanceof JsonNull) return "null";
  if (v instanceof Map) {
    const parts: string[] = [];
    for (const [k, x] of v) {
      const t = stringifyOrdered(x);
      if (t !== undefined) parts.push(JSON.stringify(String(k)) + ":" + t);
    }
    return "{" + parts.join(",") + "}";
  }
  if (Array.isArray(v)) return "[" + v.map((x) => stringifyOrdered(x) ?? "null").join(",") + "]";
  return JSON.stringify(v);
}

/** Declared instance fields of a class chain in Gson order (the most derived class first), when known. */
function fieldOrder(v: object): string[] | null {
  const names: string[] = [];
  let found = false;
  for (let c: any = (v as any).constructor; c && c !== Object; c = Object.getPrototypeOf(c)) {
    if (Object.prototype.hasOwnProperty.call(c, "__fields")) {
      found = true;
      for (const f of c.__fields as string[]) if (!names.includes(f)) names.push(f);
    }
  }
  return found ? names : null;
}

/** Gson's serialisation rules: Map as object, objects with toJSON() (enums, Either) unwrapped, declared field order. */
function plain(v: unknown, nulls: boolean): unknown {
  if (v === null || v === undefined) return nulls ? null : undefined;
  if (v instanceof JsonElement) return v;
  if (v instanceof Map) {
    const o = new Map<string, unknown>();
    v.forEach((x, k) => { const p = plain(x, nulls); if (p !== undefined) o.set(String(k), p); });
    return o;
  }
  if (v instanceof Set) return [...v].map((x) => plain(x, nulls) ?? null);
  if (Array.isArray(v)) return v.map((x) => plain(x, nulls) ?? null);
  if (typeof v === "object") {
    const maybe = v as { toJSON?: () => unknown };
    if (typeof maybe.toJSON === "function") return plain(maybe.toJSON(), nulls);
    const o = new Map<string, unknown>();
    const order = fieldOrder(v as object);
    const keys = order ?? Object.keys(v as object);
    for (const k of keys) {
      const x = (v as Record<string, unknown>)[k];
      if (typeof x === "function") continue;
      const p = plain(x, nulls);
      // fields named like their boolean getter (isX / isX()) are stored as _isX
      if (p !== undefined) o.set(/^_is[A-Z]/.test(k) ? k.slice(1) : k, p);
    }
    return o;
  }
  if (typeof v === "function") return undefined;
  return v;
}

export class Gson {
  constructor(private readonly nulls = false) {}
  toJson(value: unknown): string { return stringifyOrdered(plain(value, this.nulls)) ?? "null"; }
  toJsonTree(value: unknown): JsonElement { return fromPlain(plain(value, this.nulls)); }
  /** Rehydrates plain JSON into an instance of the given class (fields only, like Gson reflection). */
  fromJson<T>(json: string | JsonElement, type: new (...args: any[]) => T): T {
    const text = typeof json === "string" ? json : json.toString();
    const data = JSON.parse(text);
    if (data === null || typeof data !== "object") return data as T;
    const inst = Object.create(type.prototype);
    for (const [k, x] of Object.entries(data)) {
      inst[/^is[A-Z]/.test(k) && !(k in inst) && ("_" + k) in new (type as any)() ? "_" + k : k] = x;
    }
    return inst;
  }
}

export class GsonBuilder {
  private nulls = false;
  registerTypeAdapter(..._a: unknown[]): GsonBuilder { return this; }
  registerTypeHierarchyAdapter(..._a: unknown[]): GsonBuilder { return this; }
  setPrettyPrinting(): GsonBuilder { return this; }
  serializeNulls(): GsonBuilder { this.nulls = true; return this; }
  disableHtmlEscaping(): GsonBuilder { return this; }
  create(): Gson { return new Gson(this.nulls); }
}
