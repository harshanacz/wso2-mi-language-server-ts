/** Small runtime helpers that keep the machine translated Java readable and behaviour compatible. */

export function equals(a: any, b: any): boolean {
  if (a === null || a === undefined) throw new TypeError("NullPointerException");
  if (a && typeof a.equals === "function") return a.equals(b);
  return a === b;
}
export function equalsIgnoreCase(a: string | null | undefined, b: string | null | undefined): boolean {
  if (a === null || a === undefined) throw new TypeError("NullPointerException");
  if (b === null || b === undefined) return false;
  return a.toLowerCase() === b.toLowerCase();
}
export function isEmpty(x: any): boolean {
  if (x === null || x === undefined) throw new TypeError("NullPointerException");
  if (x instanceof Map || x instanceof Set) return x.size === 0;
  return x.length === 0;
}
export function isBlank(x: string): boolean { return x.trim().length === 0; }
export function contains(c: any, v: any): boolean {
  if (typeof c === "string") return c.includes(v);
  if (c instanceof Map) return c.has(v);
  return c.includes(v);
}
export function size(c: any): number { return c instanceof Map || c instanceof Set ? c.size : c.length; }
export function get(c: any, k: any): any {
  if (c instanceof Map) return c.get(k);
  if (k < 0 || k >= c.length) throw new RangeError("IndexOutOfBoundsException");
  return c[k];
}
export function removeFrom(c: any, k: any): any {
  if (c instanceof Map) { const v = c.get(k); c.delete(k); return v; }
  if (typeof k === "number") return c.splice(k, 1)[0];
  const i = c.indexOf(k); if (i >= 0) c.splice(i, 1); return i >= 0;
}
export function parseBoolean(s: string | null | undefined): boolean { return s != null && s.toLowerCase() === "true"; }
export function matches(s: string, re: string): boolean { return new RegExp("^(?:" + re + ")$").test(s); }
export function jreplace(s: string, a: string, b: string): string { return s.split(a).join(b); }
export function replaceAll(s: string, re: string, rep: string): string {
  return s.replace(new RegExp(re, "g"), rep.replace(/\$(\d)/g, "$$$1"));
}
export function jsplit(s: string, re: string): string[] {
  const parts = s.split(new RegExp(re));
  while (parts.length > 1 && parts[parts.length - 1] === "") parts.pop();
  return s === "" ? [""] : parts;
}
export function joinStr(sep: string, items: string[]): string { return items.join(sep); }
export function format(fmt: string, ...args: any[]): string {
  let i = 0;
  return fmt.replace(/%[sd%]/g, (m) => (m === "%%" ? "%" : String(args[i++])));
}
export function enumValueOf(enumClass: any, name: string): any { return enumClass.valueOf(name); }
export { getEnumFromValue } from "./utils.js";
export class Logger {
  static getLogger(_name?: any): Logger { return new Logger(); }
  log(..._a: any[]): void {}
  info(..._a: any[]): void {}
  warning(..._a: any[]): void {}
  severe(..._a: any[]): void {}
  fine(..._a: any[]): void {}
}
export const Level = { INFO: "INFO", WARNING: "WARNING", SEVERE: "SEVERE", FINE: "FINE" };
export class StringBuilder {
  private s = "";
  constructor(init = "") { this.s = init; }
  append(v: any): this { this.s += v; return this; }
  toString(): string { return this.s; }
  length(): number { return this.s.length; }
}

export const StringUtils = {
  EMPTY: "",
  isEmpty: (s: string | null | undefined): boolean => s === null || s === undefined || s.length === 0,
  isNotEmpty: (s: string | null | undefined): boolean => !(s === null || s === undefined || s.length === 0),
  isBlank: (s: string | null | undefined): boolean => s === null || s === undefined || s.trim().length === 0,
  isNotBlank: (s: string | null | undefined): boolean => !(s === null || s === undefined || s.trim().length === 0),
};
export const Objects = {
  nonNull: (o: any): boolean => o !== null && o !== undefined,
  isNull: (o: any): boolean => o === null || o === undefined,
  equals: (a: any, b: any): boolean => (a === null || a === undefined ? b === null || b === undefined : a === b),
  requireNonNullElse: (a: any, b: any): any => (a === null || a === undefined ? b : a),
};
function arraycopy(src: any[], sp: number, dest: any, dp: number, len: number): void {
  if (!Array.isArray(dest)) throw new TypeError("ArrayStoreException");
  for (let i = 0; i < len; i++) dest[dp + i] = src[sp + i];
}
export const System = { arraycopy, lineSeparator: () => "\n", getProperty: (_k: string) => undefined as string | undefined, getenv: (_k: string) => undefined as string | undefined };
export const Integer = { MAX_VALUE: 2147483647, MIN_VALUE: -2147483648, parseInt: (s: string) => parseInt(s, 10), valueOf: (s: any) => Number(s), toString: (n: number) => String(n) };
export class IllegalStateException extends Error {}
export class UnsupportedOperationException extends Error {}
