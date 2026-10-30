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
  if (typeof x.size === "function") return x.size() === 0;
  return x.length === 0;
}
export function isBlank(x: string): boolean { return x.trim().length === 0; }
export function contains(c: any, v: any): boolean {
  if (typeof c === "string") return c.includes(v);
  if (c instanceof Map || c instanceof Set) return c.has(v);
  return c.includes(v);
}
export function size(c: any): number {
  if (c instanceof Map || c instanceof Set) return c.size;
  if (typeof c.size === "function") return c.size();
  return c.length;
}
export function get(c: any, k: any): any {
  if (c instanceof Map) return c.get(k);
  if (!Array.isArray(c) && typeof c.get === "function") return c.get(k);
  if (k < 0 || k >= c.length) throw new RangeError("IndexOutOfBoundsException");
  return c[k];
}
export function removeFrom(c: any, k: any): any {
  if (c instanceof Map) { const v = c.get(k); c.delete(k); return v; }
  if (c instanceof Set) return c.delete(k);
  if (!Array.isArray(c) && typeof c.remove === "function") return c.remove(k);
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
/** Port of Utils.getEnumFromValue: Enum.valueOf by name, falling back to matching getValue(). */
export function getEnumFromValue(value: string | null | undefined, enumClass: any): any {
  if (value !== null && value !== undefined) {
    try {
      return enumClass.valueOf(value);
    } catch {
      for (const e of enumClass.values()) {
        if (typeof e.getValue === "function" && e.getValue() === value) return e;
      }
    }
  }
  return null;
}
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
  setLength(n: number): void { this.s = n <= this.s.length ? this.s.substring(0, n) : this.s + "\0".repeat(n - this.s.length); }
  isEmpty(): boolean { return this.s.length === 0; }
  insert(i: number, v: any): this { this.s = this.s.substring(0, i) + v + this.s.substring(i); return this; }
  charAt(i: number): string { return this.s.charAt(i); }
}

export const StringUtils = {
  EMPTY: "",
  isEmpty: (s: string | null | undefined): boolean => s === null || s === undefined || s.length === 0,
  isNotEmpty: (s: string | null | undefined): boolean => !(s === null || s === undefined || s.length === 0),
  isBlank: (s: string | null | undefined): boolean => s === null || s === undefined || s.trim().length === 0,
  isNotBlank: (s: string | null | undefined): boolean => !(s === null || s === undefined || s.trim().length === 0),
  equals: (a: string | null | undefined, b: string | null | undefined): boolean => (a ?? null) === (b ?? null),
  equalsIgnoreCase: (a: string | null | undefined, b: string | null | undefined): boolean =>
    a === null || a === undefined || b === null || b === undefined ? a == b : a.toLowerCase() === b.toLowerCase(),
  containsIgnoreCase: (a: string | null | undefined, b: string | null | undefined): boolean =>
    a !== null && a !== undefined && b !== null && b !== undefined && a.toLowerCase().includes(b.toLowerCase()),
  capitalize: (s: string): string => (s ? s.charAt(0).toUpperCase() + s.substring(1) : s),
  join: (items: any[], sep: string): string => items.join(sep),
  trim: (s: string | null | undefined): string | null | undefined => (s === null || s === undefined ? s : s.trim()),
  defaultString: (s: string | null | undefined, d = ""): string => (s === null || s === undefined ? d : s),
  substringAfter: (s: string, sep: string): string => { const i = s.indexOf(sep); return i < 0 ? "" : s.substring(i + sep.length); },
  substringBefore: (s: string, sep: string): string => { const i = s.indexOf(sep); return i < 0 ? s : s.substring(0, i); },
  substringAfterLast: (s: string, sep: string): string => { const i = s.lastIndexOf(sep); return i < 0 ? "" : s.substring(i + sep.length); },
  substringBeforeLast: (s: string, sep: string): string => { const i = s.lastIndexOf(sep); return i < 0 ? s : s.substring(0, i); },
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
const systemProps = new Map<string, string>([["user.home", "/home/user"], ["file.separator", "/"], ["line.separator", "\n"]]);
export const System = {
  arraycopy,
  lineSeparator: () => "\n",
  getProperty: (k: string, d?: string) => systemProps.get(k) ?? d,
  setProperty: (k: string, v: string) => { systemProps.set(k, v); },
  getenv: (_k: string) => undefined as string | undefined,
  currentTimeMillis: () => Date.now(),
};
export const Integer = { MAX_VALUE: 2147483647, MIN_VALUE: -2147483648, parseInt: (s: string) => parseInt(s, 10), valueOf: (s: any) => Number(s), toString: (n: number) => String(n) };
export class IllegalStateException extends Error {}
export class UnsupportedOperationException extends Error {}

/** java.util.Collection/Map.clear(): arrays are emptied in place, maps and sets use their own clear(). */
export function clear(c: any): void {
  if (Array.isArray(c)) {
    c.length = 0;
  } else {
    c.clear();
  }
}

export class MapEntry<K, V> {
  constructor(private readonly key: K, private readonly value: V) {}
  getKey(): K { return this.key; }
  getValue(): V { return this.value; }
}

/** Map.entrySet() with Map.Entry style accessors. */
export function entrySet<K = any, V = any>(m: any): MapEntry<K, V>[] {
  if (typeof (m as any).entrySet === "function") {
    return (m as any).entrySet();
  }
  const entries: [any, V][] = m instanceof Map ? [...m.entries()] : Object.entries(m);
  return entries.map(([k, v]) => new MapEntry<K, V>(k, v));
}

export function unmodifiable<T>(c: T): T { return c; }

/** java.util.Comparator factory methods as plain compare functions. */
export type Compare<T> = ((a: T, b: T) => number) & { thenComparing: (next: any, keyCmp?: any) => Compare<T>; reversed: () => Compare<T> };

function cmpValues(a: any, b: any): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  return a < b ? -1 : a > b ? 1 : 0;
}

function decorate<T>(fn: (a: T, b: T) => number): Compare<T> {
  const c = fn as Compare<T>;
  c.thenComparing = (next: any, keyCmp?: any) => {
    const second: (a: T, b: T) => number = next.length === 2 && !keyCmp ? next : (a: T, b: T) => (keyCmp ?? cmpValues)(next(a), next(b));
    return decorate<T>((a, b) => fn(a, b) || second(a, b));
  };
  c.reversed = () => decorate<T>((a, b) => fn(b, a));
  return c;
}

export const Comparator = {
  comparing: <T>(key: (x: T) => any, keyCmp?: (a: any, b: any) => number): Compare<T> =>
    decorate<T>((a, b) => (keyCmp ?? cmpValues)(key(a), key(b))),
  comparingInt: <T>(key: (x: T) => number): Compare<T> => decorate<T>((a, b) => key(a) - key(b)),
  comparingLong: <T>(key: (x: T) => number): Compare<T> => decorate<T>((a, b) => key(a) - key(b)),
  naturalOrder: <T>(): Compare<T> => decorate<T>(cmpValues),
  reverseOrder: <T>(): Compare<T> => decorate<T>((a, b) => cmpValues(b, a)),
};

/** Map.computeIfAbsent */
export function computeIfAbsent<K, V>(m: Map<K, V>, key: K, fn: (k: K) => V): V {
  let v = m.get(key);
  if (v === undefined || v === null) {
    v = fn(key);
    if (v !== null && v !== undefined) {
      m.set(key, v);
    }
  }
  return v as V;
}
