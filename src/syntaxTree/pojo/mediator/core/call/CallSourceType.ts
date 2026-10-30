// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/call/CallSourceType.java by the java2ts converter (see tools/java2ts).

export class CallSourceType {
  static readonly __fields: string[] = [];



  static readonly custom = new CallSourceType("custom", 0);
  static readonly inline = new CallSourceType("inline", 1);
  static readonly property = new CallSourceType("property", 2);
  static readonly body = new CallSourceType("body", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): CallSourceType[] { return [CallSourceType.custom, CallSourceType.inline, CallSourceType.property, CallSourceType.body]; }
  static valueOf(name: string): CallSourceType {
    const v = CallSourceType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
