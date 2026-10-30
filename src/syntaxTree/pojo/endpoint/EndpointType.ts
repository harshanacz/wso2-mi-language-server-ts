// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/EndpointType.java by the java2ts converter (see tools/java2ts).

export class EndpointType {
  static readonly __fields: string[] = [];



  static readonly ADDRESS_ENDPOINT = new EndpointType("ADDRESS_ENDPOINT", 0);
  static readonly DEFAULT_ENDPOINT = new EndpointType("DEFAULT_ENDPOINT", 1);
  static readonly FAIL_OVER_ENDPOINT = new EndpointType("FAIL_OVER_ENDPOINT", 2);
  static readonly HTTP_ENDPOINT = new EndpointType("HTTP_ENDPOINT", 3);
  static readonly LOAD_BALANCE_ENDPOINT = new EndpointType("LOAD_BALANCE_ENDPOINT", 4);
  static readonly NAMED_ENDPOINT = new EndpointType("NAMED_ENDPOINT", 5);
  static readonly RECIPIENT_LIST_ENDPOINT = new EndpointType("RECIPIENT_LIST_ENDPOINT", 6);
  static readonly TEMPLATE_ENDPOINT = new EndpointType("TEMPLATE_ENDPOINT", 7);
  static readonly WSDL_ENDPOINT = new EndpointType("WSDL_ENDPOINT", 8);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): EndpointType[] { return [EndpointType.ADDRESS_ENDPOINT, EndpointType.DEFAULT_ENDPOINT, EndpointType.FAIL_OVER_ENDPOINT, EndpointType.HTTP_ENDPOINT, EndpointType.LOAD_BALANCE_ENDPOINT, EndpointType.NAMED_ENDPOINT, EndpointType.RECIPIENT_LIST_ENDPOINT, EndpointType.TEMPLATE_ENDPOINT, EndpointType.WSDL_ENDPOINT]; }
  static valueOf(name: string): EndpointType {
    const v = EndpointType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
