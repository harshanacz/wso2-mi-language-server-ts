// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/ScriptLanguage.java by the java2ts converter (see tools/java2ts).

export class ScriptLanguage {
  static readonly __fields: string[] = [];



  static readonly js = new ScriptLanguage("js", 0);
  static readonly graalJs = new ScriptLanguage("graalJs", 1);
  static readonly rb = new ScriptLanguage("rb", 2);
  static readonly groovy = new ScriptLanguage("groovy", 3);
  static readonly nashornJs = new ScriptLanguage("nashornJs", 4);
  static readonly rhinoJs = new ScriptLanguage("rhinoJs", 5);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ScriptLanguage[] { return [ScriptLanguage.js, ScriptLanguage.graalJs, ScriptLanguage.rb, ScriptLanguage.groovy, ScriptLanguage.nashornJs, ScriptLanguage.rhinoJs]; }
  static valueOf(name: string): ScriptLanguage {
    const v = ScriptLanguage.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
