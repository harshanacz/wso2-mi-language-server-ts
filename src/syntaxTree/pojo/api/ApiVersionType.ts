// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/ApiVersionType.java by the java2ts converter (see tools/java2ts).

export class ApiVersionType {


  static readonly context = new ApiVersionType("context", 0);
  static readonly url = new ApiVersionType("url", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ApiVersionType[] { return [ApiVersionType.context, ApiVersionType.url]; }
  static valueOf(name: string): ApiVersionType {
    const v = ApiVersionType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
