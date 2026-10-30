/**
 * A small Jackson tree model (ObjectMapper, JsonNode, ObjectNode, ArrayNode) for the ported services.
 * Objects keep insertion order like Jackson's LinkedHashMap, and `path()` returns a MissingNode instead of null.
 */
export abstract class JsonNode implements Iterable<JsonNode> {
  isObject(): boolean { return false; }
  isArray(): boolean { return false; }
  isMissingNode(): boolean { return false; }
  isNull(): boolean { return false; }
  isTextual(): boolean { return false; }
  isNumber(): boolean { return false; }
  isBoolean(): boolean { return false; }
  isValueNode(): boolean { return !this.isObject() && !this.isArray() && !this.isMissingNode(); }
  has(_name: string | number): boolean { return false; }
  get(_name: string | number): JsonNode | null { return null; }
  path(_name: string | number): JsonNode { return MissingNode.INSTANCE; }
  size(): number { return 0; }
  asText(def: string = ""): string { return def; }
  asInt(def: number = 0): number { return def; }
  asBoolean(def: boolean = false): boolean { return def; }
  textValue(): string | null { return null; }
  fieldNames(): JavaIterator<string> { return new JavaIterator([]); }
  fields(): JavaIterator<{ getKey(): string; getValue(): JsonNode }> { return new JavaIterator([]); }
  elements(): JavaIterator<JsonNode> { return new JavaIterator([]); }
  [Symbol.iterator](): Iterator<JsonNode> { return [][Symbol.iterator](); }
  abstract toPlain(): unknown;
  toString(): string { return JSON.stringify(this.toPlain()); }
  toJSON(): unknown { return this.toPlain(); }
}

export class JavaIterator<T> implements Iterable<T> {
  private i = 0;
  constructor(readonly items: T[]) {}
  hasNext(): boolean { return this.i < this.items.length; }
  next(): T { return this.items[this.i++]; }
  forEachRemaining(fn: (t: T) => void): void { while (this.hasNext()) fn(this.next()); }
  [Symbol.iterator](): Iterator<T> { return this.items[Symbol.iterator](); }
}

export class MissingNode extends JsonNode {
  static readonly INSTANCE = new MissingNode();
  isMissingNode(): boolean { return true; }
  toPlain(): unknown { return undefined; }
  toString(): string { return ""; }
}

export class NullNode extends JsonNode {
  private static instance = new NullNode();
  static getInstance(): NullNode { return NullNode.instance; }
  isNull(): boolean { return true; }
  asText(): string { return "null"; }
  toPlain(): unknown { return null; }
}

export class ValueNode extends JsonNode {
  constructor(readonly value: string | number | boolean) { super(); }
  isTextual(): boolean { return typeof this.value === "string"; }
  isNumber(): boolean { return typeof this.value === "number"; }
  isBoolean(): boolean { return typeof this.value === "boolean"; }
  asText(): string { return String(this.value); }
  asInt(def: number = 0): number { const n = Number(this.value); return Number.isNaN(n) ? def : Math.trunc(n); }
  asBoolean(def: boolean = false): boolean { return typeof this.value === "boolean" ? this.value : this.value === "true" ? true : def; }
  textValue(): string | null { return typeof this.value === "string" ? this.value : null; }
  toPlain(): unknown { return this.value; }
}

export class ArrayNode extends JsonNode {
  readonly items: JsonNode[] = [];
  isArray(): boolean { return true; }
  size(): number { return this.items.length; }
  has(i: string | number): boolean { return typeof i === "number" && i >= 0 && i < this.items.length; }
  get(i: string | number): JsonNode | null { return typeof i === "number" ? this.items[i] ?? null : null; }
  path(i: string | number): JsonNode { return typeof i === "number" ? this.items[i] ?? MissingNode.INSTANCE : MissingNode.INSTANCE; }
  /** Adds nodes, or the elements of an ArrayNode (Jackson `addAll`), or a single value (`add`). */
  push(...nodes: Array<JsonNode | string | number | boolean>): ArrayNode {
    for (const n of nodes) this.add(n);
    return this;
  }
  add(n: JsonNode | string | number | boolean): ArrayNode { this.items.push(toNode(n)); return this; }
  addAll(other: JsonNode): ArrayNode { for (const n of other) this.items.push(n); return this; }
  remove(i: number): JsonNode | null { return this.items.splice(i, 1)[0] ?? null; }
  addObject(): ObjectNode { const o = new ObjectNode(); this.items.push(o); return o; }
  elements(): JavaIterator<JsonNode> { return new JavaIterator([...this.items]); }
  [Symbol.iterator](): Iterator<JsonNode> { return this.items[Symbol.iterator](); }
  toPlain(): unknown { return this.items.map((n) => n.toPlain()); }
}

export class ObjectNode extends JsonNode {
  readonly props = new Map<string, JsonNode>();
  isObject(): boolean { return true; }
  size(): number { return this.props.size; }
  has(n: string | number): boolean { return this.props.has(String(n)); }
  get(n: string | number): JsonNode | null { return this.props.get(String(n)) ?? null; }
  path(n: string | number): JsonNode { return this.props.get(String(n)) ?? MissingNode.INSTANCE; }
  set(name: string, v: JsonNode | null): ObjectNode { this.props.set(name, v ?? NullNode.getInstance()); return this; }
  put(name: string, v: string | number | boolean | null): ObjectNode { this.props.set(name, toNode(v)); return this; }
  putObject(name: string): ObjectNode { const o = new ObjectNode(); this.props.set(name, o); return o; }
  putArray(name: string): ArrayNode { const a = new ArrayNode(); this.props.set(name, a); return a; }
  remove(name: string): JsonNode | null { const v = this.props.get(name) ?? null; this.props.delete(name); return v; }
  fieldNames(): JavaIterator<string> { return new JavaIterator([...this.props.keys()]); }
  fields(): JavaIterator<{ getKey(): string; getValue(): JsonNode }> {
    return new JavaIterator([...this.props.entries()].map(([k, v]) => ({ getKey: () => k, getValue: () => v })));
  }
  elements(): JavaIterator<JsonNode> { return new JavaIterator([...this.props.values()]); }
  [Symbol.iterator](): Iterator<JsonNode> { return this.props.values(); }
  toPlain(): unknown {
    const o: Record<string, unknown> = {};
    for (const [k, v] of this.props) o[k] = v.toPlain();
    return o;
  }
}

function toNode(v: JsonNode | string | number | boolean | null | undefined): JsonNode {
  if (v === null || v === undefined) return NullNode.getInstance();
  if (v instanceof JsonNode) return v;
  return new ValueNode(v);
}

export function fromPlainNode(v: unknown): JsonNode {
  if (v === null || v === undefined) return NullNode.getInstance();
  if (Array.isArray(v)) {
    const a = new ArrayNode();
    for (const x of v) a.items.push(fromPlainNode(x));
    return a;
  }
  if (typeof v === "object") {
    const o = new ObjectNode();
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) o.props.set(k, fromPlainNode(x));
    return o;
  }
  return new ValueNode(v as string | number | boolean);
}

import { parse as parseYaml } from "yaml";

export class YAMLFactory {}
export const JsonInclude = { Include: { NON_NULL: "NON_NULL", NON_EMPTY: "NON_EMPTY" } };

export class ObjectMapper {
  constructor(private readonly factory?: YAMLFactory) {}
  readTree(text: string): JsonNode {
    if (this.factory instanceof YAMLFactory) {
      return fromPlainNode(parseYaml(text));
    }
    return fromPlainNode(JSON.parse(text));
  }
  createObjectNode(): ObjectNode { return new ObjectNode(); }
  createArrayNode(): ArrayNode { return new ArrayNode(); }
  writeValueAsString(v: unknown): string {
    return JSON.stringify(v instanceof JsonNode ? v.toPlain() : v, (_k, x) => (x instanceof Map ? Object.fromEntries(x) : x));
  }
  writerWithDefaultPrettyPrinter(): { writeValueAsString(v: unknown): string } {
    return {
      writeValueAsString: (v: unknown) =>
        JSON.stringify(v instanceof JsonNode ? v.toPlain() : v, (_k, x) => (x instanceof Map ? Object.fromEntries(x) : x), 2),
    };
  }
  valueToTree(v: unknown): JsonNode { return fromPlainNode(JSON.parse(this.writeValueAsString(v))); }
  /** Reads JSON (or YAML with a YAMLFactory) from text or a file; `Map` as the target type gives a Map of the top level. */
  readValue(src: string | { readText(): string }, type?: unknown): any {
    const text = typeof src === "string" ? src : src.readText();
    const value = this.factory instanceof YAMLFactory ? parseYaml(text) : JSON.parse(text);
    if (type === Map && value !== null && typeof value === "object" && !Array.isArray(value)) {
      return new Map(Object.entries(value));
    }
    return value;
  }
}
