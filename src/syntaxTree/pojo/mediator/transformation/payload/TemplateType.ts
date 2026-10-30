// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/TemplateType.java by the java2ts converter (see tools/java2ts).

export class TemplateType {
  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly DEFAULT = new TemplateType("DEFAULT", 0, "default");
  static readonly FREE_MARKER = new TemplateType("FREE_MARKER", 1, "freemarker");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): TemplateType[] { return [TemplateType.DEFAULT, TemplateType.FREE_MARKER]; }
  static valueOf(name: string): TemplateType {
    const v = TemplateType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
