// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/BeanAction.java by the java2ts converter (see tools/java2ts).

export class BeanAction {
  static readonly __fields: string[] = [];



  static readonly CREATE = new BeanAction("CREATE", 0);
  static readonly REMOVE = new BeanAction("REMOVE", 1);
  static readonly SET_PROPERTY = new BeanAction("SET_PROPERTY", 2);
  static readonly GET_PROPERTY = new BeanAction("GET_PROPERTY", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): BeanAction[] { return [BeanAction.CREATE, BeanAction.REMOVE, BeanAction.SET_PROPERTY, BeanAction.GET_PROPERTY]; }
  static valueOf(name: string): BeanAction {
    const v = BeanAction.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
