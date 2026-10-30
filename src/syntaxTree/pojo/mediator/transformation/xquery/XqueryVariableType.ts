// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/xquery/XqueryVariableType.java by the java2ts converter (see tools/java2ts).

export class XqueryVariableType {
  static readonly __fields: string[] = [];



  static readonly STRING = new XqueryVariableType("STRING", 0);
  static readonly DOUBLE = new XqueryVariableType("DOUBLE", 1);
  static readonly INT = new XqueryVariableType("INT", 2);
  static readonly INTEGER = new XqueryVariableType("INTEGER", 3);
  static readonly BOOLEAN = new XqueryVariableType("BOOLEAN", 4);
  static readonly BYTE = new XqueryVariableType("BYTE", 5);
  static readonly LONG = new XqueryVariableType("LONG", 6);
  static readonly SHORT = new XqueryVariableType("SHORT", 7);
  static readonly FLOAT = new XqueryVariableType("FLOAT", 8);
  static readonly DOCUMENT = new XqueryVariableType("DOCUMENT", 9);
  static readonly DOCUMENT_ELEMENT = new XqueryVariableType("DOCUMENT_ELEMENT", 10);
  static readonly ELEMENT = new XqueryVariableType("ELEMENT", 11);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): XqueryVariableType[] { return [XqueryVariableType.STRING, XqueryVariableType.DOUBLE, XqueryVariableType.INT, XqueryVariableType.INTEGER, XqueryVariableType.BOOLEAN, XqueryVariableType.BYTE, XqueryVariableType.LONG, XqueryVariableType.SHORT, XqueryVariableType.FLOAT, XqueryVariableType.DOCUMENT, XqueryVariableType.DOCUMENT_ELEMENT, XqueryVariableType.ELEMENT]; }
  static valueOf(name: string): XqueryVariableType {
    const v = XqueryVariableType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
