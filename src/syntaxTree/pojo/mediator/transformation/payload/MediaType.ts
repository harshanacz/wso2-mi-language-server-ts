// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/MediaType.java by the java2ts converter (see tools/java2ts).

export class MediaType {


  static readonly xml = new MediaType("xml", 0);
  static readonly json = new MediaType("json", 1);
  static readonly text = new MediaType("text", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): MediaType[] { return [MediaType.xml, MediaType.json, MediaType.text]; }
  static valueOf(name: string): MediaType {
    const v = MediaType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
