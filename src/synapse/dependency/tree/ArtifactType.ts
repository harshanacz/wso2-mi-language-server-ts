// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/ArtifactType.java by the java2ts converter (see tools/java2ts).

export class ArtifactType {
  static readonly __fields: string[] = [];



  static readonly API = new ArtifactType("API", 0);
  static readonly SEQUENCE = new ArtifactType("SEQUENCE", 1);
  static readonly ENDPOINT = new ArtifactType("ENDPOINT", 2);
  static readonly LOCAL_ENTRY = new ArtifactType("LOCAL_ENTRY", 3);
  static readonly MESSAGE_STORE = new ArtifactType("MESSAGE_STORE", 4);
  static readonly MESSAGE_PROCESSOR = new ArtifactType("MESSAGE_PROCESSOR", 5);
  static readonly PROXY_SERVICE = new ArtifactType("PROXY_SERVICE", 6);
  static readonly TEMPLATE = new ArtifactType("TEMPLATE", 7);
  static readonly INBOUND_ENDPOINT = new ArtifactType("INBOUND_ENDPOINT", 8);
  static readonly JSON_SCHEMA = new ArtifactType("JSON_SCHEMA", 9);
  static readonly SMOOKS_CONFIG = new ArtifactType("SMOOKS_CONFIG", 10);
  static readonly DATA_SERVICE = new ArtifactType("DATA_SERVICE", 11);
  static readonly DATA_MAPPER = new ArtifactType("DATA_MAPPER", 12);
  static readonly DATA_MAPPER_INPUT_SCHEMA = new ArtifactType("DATA_MAPPER_INPUT_SCHEMA", 13);
  static readonly DATA_MAPPER_OUTPUT_SCHEMA = new ArtifactType("DATA_MAPPER_OUTPUT_SCHEMA", 14);
  static readonly DATA_MAPPER_CONFIG = new ArtifactType("DATA_MAPPER_CONFIG", 15);
  static readonly XSLT = new ArtifactType("XSLT", 16);
  static readonly THROTTLE_POLICY = new ArtifactType("THROTTLE_POLICY", 17);
  static readonly DATASOURCE = new ArtifactType("DATASOURCE", 18);
  static readonly SCRIPT = new ArtifactType("SCRIPT", 19);
  static readonly XQUERY = new ArtifactType("XQUERY", 20);
  static readonly POLICY = new ArtifactType("POLICY", 21);
  static readonly WSDL = new ArtifactType("WSDL", 22);
  static readonly VALIDATE_RESOURCE = new ArtifactType("VALIDATE_RESOURCE", 23);
  static readonly VALIDATE_SCHEMA = new ArtifactType("VALIDATE_SCHEMA", 24);
  static readonly XSLT_RESOURCE = new ArtifactType("XSLT_RESOURCE", 25);
  static readonly XQUERY_VARIABLE = new ArtifactType("XQUERY_VARIABLE", 26);
  static readonly SWAGGER = new ArtifactType("SWAGGER", 27);
  static readonly CONNECTOR = new ArtifactType("CONNECTOR", 28);
  static readonly CONNECTION = new ArtifactType("CONNECTION", 29);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ArtifactType[] { return [ArtifactType.API, ArtifactType.SEQUENCE, ArtifactType.ENDPOINT, ArtifactType.LOCAL_ENTRY, ArtifactType.MESSAGE_STORE, ArtifactType.MESSAGE_PROCESSOR, ArtifactType.PROXY_SERVICE, ArtifactType.TEMPLATE, ArtifactType.INBOUND_ENDPOINT, ArtifactType.JSON_SCHEMA, ArtifactType.SMOOKS_CONFIG, ArtifactType.DATA_SERVICE, ArtifactType.DATA_MAPPER, ArtifactType.DATA_MAPPER_INPUT_SCHEMA, ArtifactType.DATA_MAPPER_OUTPUT_SCHEMA, ArtifactType.DATA_MAPPER_CONFIG, ArtifactType.XSLT, ArtifactType.THROTTLE_POLICY, ArtifactType.DATASOURCE, ArtifactType.SCRIPT, ArtifactType.XQUERY, ArtifactType.POLICY, ArtifactType.WSDL, ArtifactType.VALIDATE_RESOURCE, ArtifactType.VALIDATE_SCHEMA, ArtifactType.XSLT_RESOURCE, ArtifactType.XQUERY_VARIABLE, ArtifactType.SWAGGER, ArtifactType.CONNECTOR, ArtifactType.CONNECTION]; }
  static valueOf(name: string): ArtifactType {
    const v = ArtifactType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
