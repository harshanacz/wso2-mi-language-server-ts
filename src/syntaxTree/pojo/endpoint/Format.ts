// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/Format.java by the java2ts converter (see tools/java2ts).
import { get } from "../../javaCompat.js";

export class Format {


  static readonly rest = new Format("rest", 0);
  static readonly soap11 = new Format("soap11", 1);
  static readonly soap12 = new Format("soap12", 2);
  static readonly pox = new Format("pox", 3);
  static readonly get = new Format("get", 4);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): Format[] { return [Format.rest, Format.soap11, Format.soap12, Format.pox, Format.get]; }
  static valueOf(name: string): Format {
    const v = Format.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
