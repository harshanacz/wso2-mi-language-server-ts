// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/template/TemplateArtifactType.java by the java2ts converter (see tools/java2ts).

export class TemplateArtifactType {


  static readonly ADDRESS_ENDPOINT = new TemplateArtifactType("ADDRESS_ENDPOINT", 0);
  static readonly DEFAULT_ENDPOINT = new TemplateArtifactType("DEFAULT_ENDPOINT", 1);
  static readonly FAIL_OVER_ENDPOINT = new TemplateArtifactType("FAIL_OVER_ENDPOINT", 2);
  static readonly HTTP_ENDPOINT = new TemplateArtifactType("HTTP_ENDPOINT", 3);
  static readonly LOAD_BALANCE_ENDPOINT = new TemplateArtifactType("LOAD_BALANCE_ENDPOINT", 4);
  static readonly NAMED_ENDPOINT = new TemplateArtifactType("NAMED_ENDPOINT", 5);
  static readonly RECIPIENT_LIST_ENDPOINT = new TemplateArtifactType("RECIPIENT_LIST_ENDPOINT", 6);
  static readonly TEMPLATE_ENDPOINT = new TemplateArtifactType("TEMPLATE_ENDPOINT", 7);
  static readonly WSDL_ENDPOINT = new TemplateArtifactType("WSDL_ENDPOINT", 8);
  static readonly SEQUENCE = new TemplateArtifactType("SEQUENCE", 9);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): TemplateArtifactType[] { return [TemplateArtifactType.ADDRESS_ENDPOINT, TemplateArtifactType.DEFAULT_ENDPOINT, TemplateArtifactType.FAIL_OVER_ENDPOINT, TemplateArtifactType.HTTP_ENDPOINT, TemplateArtifactType.LOAD_BALANCE_ENDPOINT, TemplateArtifactType.NAMED_ENDPOINT, TemplateArtifactType.RECIPIENT_LIST_ENDPOINT, TemplateArtifactType.TEMPLATE_ENDPOINT, TemplateArtifactType.WSDL_ENDPOINT, TemplateArtifactType.SEQUENCE]; }
  static valueOf(name: string): TemplateArtifactType {
    const v = TemplateArtifactType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
