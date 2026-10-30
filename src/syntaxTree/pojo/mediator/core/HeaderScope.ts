// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/HeaderScope.java by the java2ts converter (see tools/java2ts).

export class HeaderScope {
  static readonly __fields: string[] = ["value"];

  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly DEFAULT = new HeaderScope("DEFAULT", 0, "default");
  static readonly TRANSPORT = new HeaderScope("TRANSPORT", 1, "transport");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): HeaderScope[] { return [HeaderScope.DEFAULT, HeaderScope.TRANSPORT]; }
  static valueOf(name: string): HeaderScope {
    const v = HeaderScope.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
