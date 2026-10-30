// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/smooks/SmooksInputType.java by the java2ts converter (see tools/java2ts).

export class SmooksInputType {


  static readonly text = new SmooksInputType("text", 0);
  static readonly xml = new SmooksInputType("xml", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): SmooksInputType[] { return [SmooksInputType.text, SmooksInputType.xml]; }
  static valueOf(name: string): SmooksInputType {
    const v = SmooksInputType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
