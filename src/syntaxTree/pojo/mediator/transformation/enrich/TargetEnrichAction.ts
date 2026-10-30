// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/TargetEnrichAction.java by the java2ts converter (see tools/java2ts).

export class TargetEnrichAction {
  static readonly __fields: string[] = [];



  static readonly replace = new TargetEnrichAction("replace", 0);
  static readonly child = new TargetEnrichAction("child", 1);
  static readonly sibling = new TargetEnrichAction("sibling", 2);
  static readonly remove = new TargetEnrichAction("remove", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): TargetEnrichAction[] { return [TargetEnrichAction.replace, TargetEnrichAction.child, TargetEnrichAction.sibling, TargetEnrichAction.remove]; }
  static valueOf(name: string): TargetEnrichAction {
    const v = TargetEnrichAction.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
