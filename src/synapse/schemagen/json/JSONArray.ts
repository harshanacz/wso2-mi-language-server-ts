// Hand port of the parts of org.json JSONArray the schema generators use.
import { JSONException } from "./JSONException.js";
import { JSONObject } from "./JSONObject.js";
import { JSONTokener } from "./JSONTokener.js";

export class JSONArray implements Iterable<any> {
  static readonly __fields: string[] = ["myArrayList"];
  private readonly myArrayList: any[] = [];

  constructor(source?: JSONTokener | string | any[]) {
    if (source === undefined) return;
    if (Array.isArray(source)) {
      for (const v of source) this.myArrayList.push(JSONObject.wrap(v));
      return;
    }
    const x = typeof source === "string" ? new JSONTokener(source) : source;
    if (x.nextClean() !== "[") {
      throw x.syntaxError("A JSONArray text must start with '['");
    }
    if (x.nextClean() !== "]") {
      x.back();
      for (;;) {
        if (x.nextClean() === ",") {
          x.back();
          this.myArrayList.push(JSONObject.NULL);
        } else {
          x.back();
          this.myArrayList.push(x.nextValue());
        }
        switch (x.nextClean()) {
          case ",":
            if (x.nextClean() === "]") return;
            x.back();
            break;
          case "]":
            return;
          default:
            throw x.syntaxError("Expected a ',' or ']'");
        }
      }
    }
  }

  [Symbol.iterator](): Iterator<any> { return this.myArrayList[Symbol.iterator](); }
  iterator(): Iterator<any> { return this.myArrayList[Symbol.iterator](); }

  get(index: number): any {
    const o = this.opt(index);
    if (o === null || o === undefined) throw new JSONException("JSONArray[" + index + "] not found.");
    return o;
  }
  opt(index: number): any { return index < 0 || index >= this.length() ? null : this.myArrayList[index]; }
  length(): number { return this.myArrayList.length; }
  isNull(index: number): boolean { return JSONObject.NULL.equals(this.opt(index)); }
  put(value: any): JSONArray {
    this.myArrayList.push(value);
    return this;
  }

  toString(): string {
    try {
      return this.toStringIndented(0);
    } catch {
      return null as unknown as string;
    }
  }
  toStringIndented(indentFactor: number): string {
    return this.write(indentFactor, 0);
  }

  write(indentFactor: number, indent: number): string {
    let out = "[";
    const length = this.length();
    if (length === 1) {
      out += JSONObject.writeValue(this.myArrayList[0], indentFactor, indent);
    } else if (length !== 0) {
      const newindent = indent + indentFactor;
      let commanate = false;
      for (let i = 0; i < length; i += 1) {
        if (commanate) out += ",";
        if (indentFactor > 0) out += "\n";
        out += JSONObject.indent(newindent);
        out += JSONObject.writeValue(this.myArrayList[i], indentFactor, newindent);
        commanate = true;
      }
      if (indentFactor > 0) out += "\n";
      out += JSONObject.indent(indent);
    }
    return out + "]";
  }
}
