// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/StatementParameterType.java by the java2ts converter (see tools/java2ts).

export class StatementParameterType {


  static readonly CHAR = new StatementParameterType("CHAR", 0);
  static readonly VARCHAR = new StatementParameterType("VARCHAR", 1);
  static readonly LONGVARCHAR = new StatementParameterType("LONGVARCHAR", 2);
  static readonly NUMERIC = new StatementParameterType("NUMERIC", 3);
  static readonly DECIMAL = new StatementParameterType("DECIMAL", 4);
  static readonly BIT = new StatementParameterType("BIT", 5);
  static readonly TINYINT = new StatementParameterType("TINYINT", 6);
  static readonly SMALLINT = new StatementParameterType("SMALLINT", 7);
  static readonly INTEGER = new StatementParameterType("INTEGER", 8);
  static readonly BIGINT = new StatementParameterType("BIGINT", 9);
  static readonly REAL = new StatementParameterType("REAL", 10);
  static readonly FLOAT = new StatementParameterType("FLOAT", 11);
  static readonly DOUBLE = new StatementParameterType("DOUBLE", 12);
  static readonly DATE = new StatementParameterType("DATE", 13);
  static readonly TIME = new StatementParameterType("TIME", 14);
  static readonly TIMESTAMP = new StatementParameterType("TIMESTAMP", 15);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): StatementParameterType[] { return [StatementParameterType.CHAR, StatementParameterType.VARCHAR, StatementParameterType.LONGVARCHAR, StatementParameterType.NUMERIC, StatementParameterType.DECIMAL, StatementParameterType.BIT, StatementParameterType.TINYINT, StatementParameterType.SMALLINT, StatementParameterType.INTEGER, StatementParameterType.BIGINT, StatementParameterType.REAL, StatementParameterType.FLOAT, StatementParameterType.DOUBLE, StatementParameterType.DATE, StatementParameterType.TIME, StatementParameterType.TIMESTAMP]; }
  static valueOf(name: string): StatementParameterType {
    const v = StatementParameterType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
