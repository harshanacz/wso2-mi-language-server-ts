// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/HttpMethod.java by the java2ts converter (see tools/java2ts).
import { get } from "../../../javaCompat.js";

export class HttpMethod {


  static readonly get = new HttpMethod("get", 0);
  static readonly post = new HttpMethod("post", 1);
  static readonly patch = new HttpMethod("patch", 2);
  static readonly delete = new HttpMethod("delete", 3);
  static readonly put = new HttpMethod("put", 4);
  static readonly options = new HttpMethod("options", 5);
  static readonly head = new HttpMethod("head", 6);
  static readonly GET = new HttpMethod("GET", 7);
  static readonly POST = new HttpMethod("POST", 8);
  static readonly PATCH = new HttpMethod("PATCH", 9);
  static readonly DELETE = new HttpMethod("DELETE", 10);
  static readonly PUT = new HttpMethod("PUT", 11);
  static readonly OPTIONS = new HttpMethod("OPTIONS", 12);
  static readonly HEAD = new HttpMethod("HEAD", 13);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): HttpMethod[] { return [HttpMethod.get, HttpMethod.post, HttpMethod.patch, HttpMethod.delete, HttpMethod.put, HttpMethod.options, HttpMethod.head, HttpMethod.GET, HttpMethod.POST, HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.OPTIONS, HttpMethod.HEAD]; }
  static valueOf(name: string): HttpMethod {
    const v = HttpMethod.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
