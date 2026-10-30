// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/PropertyScope.java by the java2ts converter (see tools/java2ts).

export class PropertyScope {
  static readonly __fields: string[] = ["value"];

  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly DEFAULT = new PropertyScope("DEFAULT", 0, "default");
  static readonly AXIS2 = new PropertyScope("AXIS2", 1, "axis2");
  static readonly TRANSPORT = new PropertyScope("TRANSPORT", 2, "transport");
  static readonly AXIS2_CLIENT = new PropertyScope("AXIS2_CLIENT", 3, "axis2-client");
  static readonly OPERATION = new PropertyScope("OPERATION", 4, "operation");
  static readonly REGISTRY = new PropertyScope("REGISTRY", 5, "registry");
  static readonly SYSTEM = new PropertyScope("SYSTEM", 6, "system");
  static readonly SYNAPSE = new PropertyScope("SYNAPSE", 7, "synapse");
  static readonly ENVIRONMENT = new PropertyScope("ENVIRONMENT", 8, "environment");
  static readonly FILE = new PropertyScope("FILE", 9, "file");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): PropertyScope[] { return [PropertyScope.DEFAULT, PropertyScope.AXIS2, PropertyScope.TRANSPORT, PropertyScope.AXIS2_CLIENT, PropertyScope.OPERATION, PropertyScope.REGISTRY, PropertyScope.SYSTEM, PropertyScope.SYNAPSE, PropertyScope.ENVIRONMENT, PropertyScope.FILE]; }
  static valueOf(name: string): PropertyScope {
    const v = PropertyScope.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
