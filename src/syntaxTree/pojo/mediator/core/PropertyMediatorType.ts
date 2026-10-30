// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/PropertyMediatorType.java by the java2ts converter (see tools/java2ts).

export class PropertyMediatorType {


  static readonly STRING = new PropertyMediatorType("STRING", 0);
  static readonly INTEGER = new PropertyMediatorType("INTEGER", 1);
  static readonly BOOLEAN = new PropertyMediatorType("BOOLEAN", 2);
  static readonly DOUBLE = new PropertyMediatorType("DOUBLE", 3);
  static readonly FLOAT = new PropertyMediatorType("FLOAT", 4);
  static readonly LONG = new PropertyMediatorType("LONG", 5);
  static readonly SHORT = new PropertyMediatorType("SHORT", 6);
  static readonly OM = new PropertyMediatorType("OM", 7);
  static readonly JSON = new PropertyMediatorType("JSON", 8);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): PropertyMediatorType[] { return [PropertyMediatorType.STRING, PropertyMediatorType.INTEGER, PropertyMediatorType.BOOLEAN, PropertyMediatorType.DOUBLE, PropertyMediatorType.FLOAT, PropertyMediatorType.LONG, PropertyMediatorType.SHORT, PropertyMediatorType.OM, PropertyMediatorType.JSON]; }
  static valueOf(name: string): PropertyMediatorType {
    const v = PropertyMediatorType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
