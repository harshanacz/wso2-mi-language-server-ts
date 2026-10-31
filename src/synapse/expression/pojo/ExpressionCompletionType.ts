// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/ExpressionCompletionType.java by the java2ts converter (see tools/java2ts).

export class ExpressionCompletionType {
  static readonly __fields: string[] = [];



  static readonly ROOT_LEVEL = new ExpressionCompletionType("ROOT_LEVEL", 0);
  static readonly OBJECT_TRAVERSAL = new ExpressionCompletionType("OBJECT_TRAVERSAL", 1);
  static readonly OPERATOR = new ExpressionCompletionType("OPERATOR", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ExpressionCompletionType[] { return [ExpressionCompletionType.ROOT_LEVEL, ExpressionCompletionType.OBJECT_TRAVERSAL, ExpressionCompletionType.OPERATOR]; }
  static valueOf(name: string): ExpressionCompletionType {
    const v = ExpressionCompletionType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
