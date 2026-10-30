// Hand port of the parts of org.json JSONObject the schema generators use (LinkedHashMap ordering like the Java).
import { JSONArray } from "./JSONArray.js";
import { JSONException } from "./JSONException.js";
import { JSONTokener } from "./JSONTokener.js";
import { JDouble, JLong, isJavaNumber } from "./JSONNumber.js";

class Null {
  equals(object: unknown): boolean { return object === null || object === undefined || object === this; }
  toString(): string { return "null"; }
}

export class JSONObject {
  static readonly __fields: string[] = ["map"];
  static readonly NULL: Null = new Null();

  private readonly map = new Map<string, any>();

  constructor(source?: JSONTokener | string | Map<string, any> | Record<string, any>) {
    if (source === undefined || source === null) return;
    if (source instanceof Map) {
      for (const [k, v] of source) if (v !== null && v !== undefined) this.map.set(k, JSONObject.wrap(v));
      return;
    }
    if (!(typeof source === "string" || source instanceof JSONTokener)) {
      for (const [k, v] of Object.entries(source)) if (v !== null && v !== undefined) this.map.set(k, JSONObject.wrap(v));
      return;
    }
    const x = typeof source === "string" ? new JSONTokener(source) : source;
    let c: string;
    let key: string;
    if (x.nextClean() !== "{") {
      throw x.syntaxError("A JSONObject text must begin with '{'");
    }
    for (;;) {
      c = x.nextClean();
      switch (c) {
        case "\0":
          throw x.syntaxError("A JSONObject text must end with '}'");
        case "}":
          return;
        default:
          x.back();
          key = String(x.nextValue());
      }
      c = x.nextClean();
      if (c !== ":") throw x.syntaxError("Expected a ':' after a key");
      this.putOnce(key, x.nextValue());
      switch (x.nextClean()) {
        case ";":
        case ",":
          if (x.nextClean() === "}") return;
          x.back();
          break;
        case "}":
          return;
        default:
          throw x.syntaxError("Expected a ',' or '}'");
      }
    }
  }

  accumulate(key: string, value: any): JSONObject {
    JSONObject.testValidity(value);
    const object = this.opt(key);
    if (object === null || object === undefined) {
      this.put(key, value instanceof JSONArray ? new JSONArray().put(value) : value);
    } else if (object instanceof JSONArray) {
      object.put(value);
    } else {
      this.put(key, new JSONArray().put(object).put(value));
    }
    return this;
  }

  append(key: string, value: any): JSONObject {
    JSONObject.testValidity(value);
    const object = this.opt(key);
    if (object === null || object === undefined) {
      this.put(key, new JSONArray().put(value));
    } else if (object instanceof JSONArray) {
      this.put(key, object.put(value));
    } else {
      throw new JSONException("JSONObject[" + key + "] is not a JSONArray.");
    }
    return this;
  }

  get(key: string): any {
    if (key === null || key === undefined) throw new JSONException("Null key.");
    const object = this.opt(key);
    if (object === null || object === undefined) throw new JSONException("JSONObject[" + JSONObject.quote(key) + "] not found.");
    return object;
  }

  has(key: string): boolean { return this.map.has(key); }
  keys(): Iterator<string> { return this.map.keys(); }
  keySet(): Set<string> { return new Set(this.map.keys()); }
  length(): number { return this.map.size; }
  opt(key: string): any { return key === null || key === undefined ? null : (this.map.get(key) ?? null); }
  optJSONObject(key: string): JSONObject | null {
    const o = this.opt(key);
    return o instanceof JSONObject ? o : null;
  }
  optString(key: string, defaultValue = ""): string {
    const object = this.opt(key);
    return JSONObject.NULL.equals(object) ? defaultValue : String(object);
  }
  isNull(key: string): boolean { return JSONObject.NULL.equals(this.opt(key)); }

  put(key: string, value: any): JSONObject {
    if (key === null || key === undefined) throw new Error("Null key.");
    if (value !== null && value !== undefined) {
      JSONObject.testValidity(value);
      this.map.set(key, value);
    } else {
      this.remove(key);
    }
    return this;
  }
  putOnce(key: string, value: any): JSONObject {
    if (key !== null && key !== undefined && value !== null && value !== undefined) {
      if (this.opt(key) !== null) throw new JSONException('Duplicate key "' + key + '"');
      this.put(key, value);
    }
    return this;
  }
  putOpt(key: string, value: any): JSONObject {
    if (key !== null && key !== undefined && value !== null && value !== undefined) this.put(key, value);
    return this;
  }
  remove(key: string): any {
    const v = this.map.get(key) ?? null;
    this.map.delete(key);
    return v;
  }

  /** org.json JSONObject.stringToValue: Boolean/null keywords, Double for decimals and exponents, Long (int when it fits). */
  static stringToValue(string: string): any {
    if (string === "") return string;
    const lower = string.toLowerCase();
    if (lower === "true") return true;
    if (lower === "false") return false;
    if (lower === "null") return JSONObject.NULL;
    const b = string.charAt(0);
    if ((b >= "0" && b <= "9") || b === "-") {
      if (string.indexOf(".") > -1 || string.indexOf("e") > -1 || string.indexOf("E") > -1) {
        const m = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)[fFdD]?$/.exec(string.trim());
        if (m) {
          const d = Number(m[1]);
          if (Number.isFinite(d)) return new JDouble(d);
        }
      } else if (/^[+-]?\d+$/.test(string)) {
        const v = BigInt(string);
        if (v >= -(2n ** 63n) && v <= 2n ** 63n - 1n && v.toString() === string) return new JLong(v);
      }
    }
    return string;
  }

  static numberToString(number: JLong | JDouble | number): string {
    if (number === null || number === undefined) throw new JSONException("Null pointer");
    JSONObject.testValidity(number);
    let string = String(number);
    if (string.indexOf(".") > 0 && string.indexOf("e") < 0 && string.indexOf("E") < 0) {
      while (string.endsWith("0")) string = string.substring(0, string.length - 1);
      if (string.endsWith(".")) string = string.substring(0, string.length - 1);
    }
    return string;
  }

  static quote(string: string | null): string {
    if (string === null || string === undefined || string.length === 0) return '""';
    let out = '"';
    let c = "\0";
    for (let i = 0; i < string.length; i += 1) {
      const b = c;
      c = string.charAt(i);
      switch (c) {
        case "\\":
        case '"':
          out += "\\" + c;
          break;
        case "/":
          if (b === "<") out += "\\";
          out += c;
          break;
        case "\b": out += "\\b"; break;
        case "\t": out += "\\t"; break;
        case "\n": out += "\\n"; break;
        case "\f": out += "\\f"; break;
        case "\r": out += "\\r"; break;
        default: {
          const code = c.charCodeAt(0);
          if (code < 0x20 || (code >= 0x80 && code < 0xa0) || (code >= 0x2000 && code < 0x2100)) {
            const hhhh = code.toString(16);
            out += "\\u" + "0000".substring(0, 4 - hhhh.length) + hhhh;
          } else {
            out += c;
          }
        }
      }
    }
    return out + '"';
  }

  static testValidity(o: unknown): void {
    if (o instanceof JDouble && (!Number.isFinite(o.value))) {
      throw new JSONException("JSON does not allow non-finite numbers.");
    }
  }

  static valueToString(value: any): string {
    if (value === null || value === undefined || JSONObject.NULL.equals(value)) return "null";
    if (isJavaNumber(value) || typeof value === "number") return JSONObject.numberToString(value);
    if (typeof value === "boolean" || value instanceof JSONObject || value instanceof JSONArray) return value.toString();
    return JSONObject.quote(String(value));
  }

  static wrap(object: any): any {
    if (object === null || object === undefined) return JSONObject.NULL;
    if (object instanceof JSONObject || object instanceof JSONArray || JSONObject.NULL.equals(object) ||
        isJavaNumber(object) || typeof object === "boolean" || typeof object === "string") {
      return object;
    }
    if (typeof object === "number") return Number.isInteger(object) ? new JLong(BigInt(object)) : new JDouble(object);
    if (Array.isArray(object) || object instanceof Set) return new JSONArray(Array.from(object));
    if (object instanceof Map) return new JSONObject(object);
    if (typeof object === "object") return new JSONObject(object);
    return String(object);
  }

  static indent(indent: number): string { return " ".repeat(indent); }

  static writeValue(value: any, indentFactor: number, indent: number): string {
    if (value === null || value === undefined || JSONObject.NULL.equals(value)) return "null";
    if (value instanceof JSONObject) return value.write(indentFactor, indent);
    if (value instanceof JSONArray) return value.write(indentFactor, indent);
    if (isJavaNumber(value) || typeof value === "number") return JSONObject.numberToString(value);
    if (typeof value === "boolean") return String(value);
    return JSONObject.quote(String(value));
  }

  toString(): string {
    try {
      return this.toStringIndented(0);
    } catch {
      return null as unknown as string;
    }
  }
  toStringIndented(indentFactor: number): string { return this.write(indentFactor, 0); }

  write(indentFactor: number, indent: number): string {
    let out = "{";
    const length = this.length();
    const keys = [...this.map.keys()];
    if (length === 1) {
      const key = keys[0];
      out += JSONObject.quote(key) + ":";
      if (indentFactor > 0) out += " ";
      out += JSONObject.writeValue(this.map.get(key), indentFactor, indent);
    } else if (length !== 0) {
      const newindent = indent + indentFactor;
      let commanate = false;
      for (const key of keys) {
        if (commanate) out += ",";
        if (indentFactor > 0) out += "\n";
        out += JSONObject.indent(newindent);
        out += JSONObject.quote(key) + ":";
        if (indentFactor > 0) out += " ";
        out += JSONObject.writeValue(this.map.get(key), indentFactor, newindent);
        commanate = true;
      }
      if (indentFactor > 0) out += "\n";
      out += JSONObject.indent(indent);
    }
    return out + "}";
  }
}
