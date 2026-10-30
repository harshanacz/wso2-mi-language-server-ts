// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/ProxyPolicyType.java by the java2ts converter (see tools/java2ts).

export class ProxyPolicyType {


  static readonly in = new ProxyPolicyType("in", 0);
  static readonly out = new ProxyPolicyType("out", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ProxyPolicyType[] { return [ProxyPolicyType.in, ProxyPolicyType.out]; }
  static valueOf(name: string): ProxyPolicyType {
    const v = ProxyPolicyType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
