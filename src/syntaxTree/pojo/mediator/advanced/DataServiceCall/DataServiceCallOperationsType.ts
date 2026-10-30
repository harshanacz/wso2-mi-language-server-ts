// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsType.java by the java2ts converter (see tools/java2ts).

export class DataServiceCallOperationsType {
  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly SINGLE = new DataServiceCallOperationsType("SINGLE", 0, "single");
  static readonly BATCH = new DataServiceCallOperationsType("BATCH", 1, "batch");
  static readonly REQUEST_BOX = new DataServiceCallOperationsType("REQUEST_BOX", 2, "request-box");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): DataServiceCallOperationsType[] { return [DataServiceCallOperationsType.SINGLE, DataServiceCallOperationsType.BATCH, DataServiceCallOperationsType.REQUEST_BOX]; }
  static valueOf(name: string): DataServiceCallOperationsType {
    const v = DataServiceCallOperationsType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
