// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/Optimize.java by the java2ts converter (see tools/java2ts).

export class Optimize {


  static readonly mtom = new Optimize("mtom", 0);
  static readonly swa = new Optimize("swa", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): Optimize[] { return [Optimize.mtom, Optimize.swa]; }
  static valueOf(name: string): Optimize {
    const v = Optimize.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
