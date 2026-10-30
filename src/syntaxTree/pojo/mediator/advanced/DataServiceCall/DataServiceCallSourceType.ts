// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallSourceType.java by the java2ts converter (see tools/java2ts).

export class DataServiceCallSourceType {
  static readonly __fields: string[] = [];



  static readonly inline = new DataServiceCallSourceType("inline", 0);
  static readonly body = new DataServiceCallSourceType("body", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): DataServiceCallSourceType[] { return [DataServiceCallSourceType.inline, DataServiceCallSourceType.body]; }
  static valueOf(name: string): DataServiceCallSourceType {
    const v = DataServiceCallSourceType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
