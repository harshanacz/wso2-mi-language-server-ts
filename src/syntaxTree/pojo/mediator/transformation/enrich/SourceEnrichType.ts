// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/SourceEnrichType.java by the java2ts converter (see tools/java2ts).

export class SourceEnrichType {
  static readonly __fields: string[] = [];



  static readonly custom = new SourceEnrichType("custom", 0);
  static readonly envelope = new SourceEnrichType("envelope", 1);
  static readonly body = new SourceEnrichType("body", 2);
  static readonly property = new SourceEnrichType("property", 3);
  static readonly inline = new SourceEnrichType("inline", 4);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): SourceEnrichType[] { return [SourceEnrichType.custom, SourceEnrichType.envelope, SourceEnrichType.body, SourceEnrichType.property, SourceEnrichType.inline]; }
  static valueOf(name: string): SourceEnrichType {
    const v = SourceEnrichType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
