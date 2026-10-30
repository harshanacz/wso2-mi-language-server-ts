// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointPropertyScope.java by the java2ts converter (see tools/java2ts).

export class EndpointPropertyScope {
  static readonly __fields: string[] = ["value"];

  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly TRANSPORT = new EndpointPropertyScope("TRANSPORT", 0, "transport");
  static readonly AXIS2 = new EndpointPropertyScope("AXIS2", 1, "axis2");
  static readonly AXIS2_CLIENT = new EndpointPropertyScope("AXIS2_CLIENT", 2, "axis2-client");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): EndpointPropertyScope[] { return [EndpointPropertyScope.TRANSPORT, EndpointPropertyScope.AXIS2, EndpointPropertyScope.AXIS2_CLIENT]; }
  static valueOf(name: string): EndpointPropertyScope {
    const v = EndpointPropertyScope.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
