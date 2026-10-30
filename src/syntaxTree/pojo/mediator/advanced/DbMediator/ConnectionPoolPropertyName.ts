// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/ConnectionPoolPropertyName.java by the java2ts converter (see tools/java2ts).

export class ConnectionPoolPropertyName {
  static readonly __fields: string[] = [];



  static readonly autocommit = new ConnectionPoolPropertyName("autocommit", 0);
  static readonly isolation = new ConnectionPoolPropertyName("isolation", 1);
  static readonly initialsize = new ConnectionPoolPropertyName("initialsize", 2);
  static readonly maxactive = new ConnectionPoolPropertyName("maxactive", 3);
  static readonly maxidle = new ConnectionPoolPropertyName("maxidle", 4);
  static readonly maxopenstatements = new ConnectionPoolPropertyName("maxopenstatements", 5);
  static readonly maxwait = new ConnectionPoolPropertyName("maxwait", 6);
  static readonly minidle = new ConnectionPoolPropertyName("minidle", 7);
  static readonly poolstatements = new ConnectionPoolPropertyName("poolstatements", 8);
  static readonly testonborrow = new ConnectionPoolPropertyName("testonborrow", 9);
  static readonly testwhileidle = new ConnectionPoolPropertyName("testwhileidle", 10);
  static readonly validationquery = new ConnectionPoolPropertyName("validationquery", 11);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ConnectionPoolPropertyName[] { return [ConnectionPoolPropertyName.autocommit, ConnectionPoolPropertyName.isolation, ConnectionPoolPropertyName.initialsize, ConnectionPoolPropertyName.maxactive, ConnectionPoolPropertyName.maxidle, ConnectionPoolPropertyName.maxopenstatements, ConnectionPoolPropertyName.maxwait, ConnectionPoolPropertyName.minidle, ConnectionPoolPropertyName.poolstatements, ConnectionPoolPropertyName.testonborrow, ConnectionPoolPropertyName.testwhileidle, ConnectionPoolPropertyName.validationquery]; }
  static valueOf(name: string): ConnectionPoolPropertyName {
    const v = ConnectionPoolPropertyName.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
