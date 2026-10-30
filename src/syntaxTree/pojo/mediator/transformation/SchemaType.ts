// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/SchemaType.java by the java2ts converter (see tools/java2ts).

export class SchemaType {
  static readonly __fields: string[] = [];



  static readonly XML = new SchemaType("XML", 0);
  static readonly JSON = new SchemaType("JSON", 1);
  static readonly CSV = new SchemaType("CSV", 2);
  static readonly XSD = new SchemaType("XSD", 3);
  static readonly JSONSCHEMA = new SchemaType("JSONSCHEMA", 4);
  static readonly CONNECTOR = new SchemaType("CONNECTOR", 5);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): SchemaType[] { return [SchemaType.XML, SchemaType.JSON, SchemaType.CSV, SchemaType.XSD, SchemaType.JSONSCHEMA, SchemaType.CONNECTOR]; }
  static valueOf(name: string): SchemaType {
    const v = SchemaType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
