// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/smooks/SmooksOutputType.java by the java2ts converter (see tools/java2ts).

export class SmooksOutputType {
  static readonly __fields: string[] = [];



  static readonly text = new SmooksOutputType("text", 0);
  static readonly xml = new SmooksOutputType("xml", 1);
  static readonly java = new SmooksOutputType("java", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): SmooksOutputType[] { return [SmooksOutputType.text, SmooksOutputType.xml, SmooksOutputType.java]; }
  static valueOf(name: string): SmooksOutputType {
    const v = SmooksOutputType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
