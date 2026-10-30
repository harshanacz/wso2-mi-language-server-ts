// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/EvaluatorType.java by the java2ts converter (see tools/java2ts).

export class EvaluatorType {
  static readonly __fields: string[] = [];



  static readonly xml = new EvaluatorType("xml", 0);
  static readonly json = new EvaluatorType("json", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): EvaluatorType[] { return [EvaluatorType.xml, EvaluatorType.json]; }
  static valueOf(name: string): EvaluatorType {
    const v = EvaluatorType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
