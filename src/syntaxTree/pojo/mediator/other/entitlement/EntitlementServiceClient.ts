// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/entitlement/EntitlementServiceClient.java by the java2ts converter (see tools/java2ts).

export class EntitlementServiceClient {
  static readonly __fields: string[] = [];



  static readonly soap = new EntitlementServiceClient("soap", 0);
  static readonly basicAuth = new EntitlementServiceClient("basicAuth", 1);
  static readonly thrift = new EntitlementServiceClient("thrift", 2);
  static readonly wsXacml = new EntitlementServiceClient("wsXacml", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): EntitlementServiceClient[] { return [EntitlementServiceClient.soap, EntitlementServiceClient.basicAuth, EntitlementServiceClient.thrift, EntitlementServiceClient.wsXacml]; }
  static valueOf(name: string): EntitlementServiceClient {
    const v = EntitlementServiceClient.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
