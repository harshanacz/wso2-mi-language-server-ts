// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/fault/FaultVersion.java by the java2ts converter (see tools/java2ts).

export class FaultVersion {


  static readonly soap11 = new FaultVersion("soap11", 0);
  static readonly soap12 = new FaultVersion("soap12", 1);
  static readonly pox = new FaultVersion("pox", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): FaultVersion[] { return [FaultVersion.soap11, FaultVersion.soap12, FaultVersion.pox]; }
  static valueOf(name: string): FaultVersion {
    const v = FaultVersion.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
