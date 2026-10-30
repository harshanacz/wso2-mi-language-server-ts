// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/RewriteRuleActionType.java by the java2ts converter (see tools/java2ts).

export class RewriteRuleActionType {


  static readonly set = new RewriteRuleActionType("set", 0);
  static readonly append = new RewriteRuleActionType("append", 1);
  static readonly prepend = new RewriteRuleActionType("prepend", 2);
  static readonly replace = new RewriteRuleActionType("replace", 3);
  static readonly remove = new RewriteRuleActionType("remove", 4);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): RewriteRuleActionType[] { return [RewriteRuleActionType.set, RewriteRuleActionType.append, RewriteRuleActionType.prepend, RewriteRuleActionType.replace, RewriteRuleActionType.remove]; }
  static valueOf(name: string): RewriteRuleActionType {
    const v = RewriteRuleActionType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
