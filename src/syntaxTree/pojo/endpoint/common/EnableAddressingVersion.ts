// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EnableAddressingVersion.java by the java2ts converter (see tools/java2ts).

export class EnableAddressingVersion {
  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly SUBMISSION = new EnableAddressingVersion("SUBMISSION", 0, "submission");
  static readonly FINAL = new EnableAddressingVersion("FINAL", 1, "final");
  static readonly DISCARD = new EnableAddressingVersion("DISCARD", 2, "discard");
  static readonly FAULT = new EnableAddressingVersion("FAULT", 3, "fault");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): EnableAddressingVersion[] { return [EnableAddressingVersion.SUBMISSION, EnableAddressingVersion.FINAL, EnableAddressingVersion.DISCARD, EnableAddressingVersion.FAULT]; }
  static valueOf(name: string): EnableAddressingVersion {
    const v = EnableAddressingVersion.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
