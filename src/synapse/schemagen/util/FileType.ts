// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/FileType.java by the java2ts converter (see tools/java2ts).

export class FileType {
  static readonly __fields: string[] = [];



  static readonly XML = new FileType("XML", 0);
  static readonly JSON = new FileType("JSON", 1);
  static readonly CSV = new FileType("CSV", 2);
  static readonly XSD = new FileType("XSD", 3);
  static readonly JSONSCHEMA = new FileType("JSONSCHEMA", 4);
  static readonly CONNECTOR = new FileType("CONNECTOR", 5);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): FileType[] { return [FileType.XML, FileType.JSON, FileType.CSV, FileType.XSD, FileType.JSONSCHEMA, FileType.CONNECTOR]; }
  static valueOf(name: string): FileType {
    const v = FileType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
