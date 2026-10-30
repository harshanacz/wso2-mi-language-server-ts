// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/TargetType.java by the java2ts converter (see tools/java2ts).

export class TargetType {
  static readonly __fields: string[] = [];



  static readonly property = new TargetType("property", 0);
  static readonly body = new TargetType("body", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): TargetType[] { return [TargetType.property, TargetType.body]; }
  static valueOf(name: string): TargetType {
    const v = TargetType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
