// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/AggregateElementType.java by the java2ts converter (see tools/java2ts).

export class AggregateElementType {


  static readonly root = new AggregateElementType("root", 0);
  static readonly child = new AggregateElementType("child", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): AggregateElementType[] { return [AggregateElementType.root, AggregateElementType.child]; }
  static valueOf(name: string): AggregateElementType {
    const v = AggregateElementType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
