// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/EnableDisable.java by the java2ts converter (see tools/java2ts).

export class EnableDisable {


  static readonly enable = new EnableDisable("enable", 0);
  static readonly disable = new EnableDisable("disable", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): EnableDisable[] { return [EnableDisable.enable, EnableDisable.disable]; }
  static valueOf(name: string): EnableDisable {
    const v = EnableDisable.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
