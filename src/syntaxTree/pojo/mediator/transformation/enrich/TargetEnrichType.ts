// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/TargetEnrichType.java by the java2ts converter (see tools/java2ts).

export class TargetEnrichType {
  static readonly __fields: string[] = [];



  static readonly custom = new TargetEnrichType("custom", 0);
  static readonly envelope = new TargetEnrichType("envelope", 1);
  static readonly body = new TargetEnrichType("body", 2);
  static readonly property = new TargetEnrichType("property", 3);
  static readonly key = new TargetEnrichType("key", 4);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): TargetEnrichType[] { return [TargetEnrichType.custom, TargetEnrichType.envelope, TargetEnrichType.body, TargetEnrichType.property, TargetEnrichType.key]; }
  static valueOf(name: string): TargetEnrichType {
    const v = TargetEnrichType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
