// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/RewriteRuleActionFragment.java by the java2ts converter (see tools/java2ts).

export class RewriteRuleActionFragment {
  static readonly __fields: string[] = [];



  static readonly protocol = new RewriteRuleActionFragment("protocol", 0);
  static readonly user = new RewriteRuleActionFragment("user", 1);
  static readonly host = new RewriteRuleActionFragment("host", 2);
  static readonly port = new RewriteRuleActionFragment("port", 3);
  static readonly path = new RewriteRuleActionFragment("path", 4);
  static readonly query = new RewriteRuleActionFragment("query", 5);
  static readonly ref = new RewriteRuleActionFragment("ref", 6);
  static readonly full = new RewriteRuleActionFragment("full", 7);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): RewriteRuleActionFragment[] { return [RewriteRuleActionFragment.protocol, RewriteRuleActionFragment.user, RewriteRuleActionFragment.host, RewriteRuleActionFragment.port, RewriteRuleActionFragment.path, RewriteRuleActionFragment.query, RewriteRuleActionFragment.ref, RewriteRuleActionFragment.full]; }
  static valueOf(name: string): RewriteRuleActionFragment {
    const v = RewriteRuleActionFragment.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
