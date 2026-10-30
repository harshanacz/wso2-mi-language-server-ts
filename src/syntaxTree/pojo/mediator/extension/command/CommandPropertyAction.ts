// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/command/CommandPropertyAction.java by the java2ts converter (see tools/java2ts).

export class CommandPropertyAction {
  static readonly __fields: string[] = [];



  static readonly ReadContext = new CommandPropertyAction("ReadContext", 0);
  static readonly UpdateContext = new CommandPropertyAction("UpdateContext", 1);
  static readonly ReadAndUpdateContext = new CommandPropertyAction("ReadAndUpdateContext", 2);
  static readonly ReadMessage = new CommandPropertyAction("ReadMessage", 3);
  static readonly UpdateMessage = new CommandPropertyAction("UpdateMessage", 4);
  static readonly ReadAndUpdateMessage = new CommandPropertyAction("ReadAndUpdateMessage", 5);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): CommandPropertyAction[] { return [CommandPropertyAction.ReadContext, CommandPropertyAction.UpdateContext, CommandPropertyAction.ReadAndUpdateContext, CommandPropertyAction.ReadMessage, CommandPropertyAction.UpdateMessage, CommandPropertyAction.ReadAndUpdateMessage]; }
  static valueOf(name: string): CommandPropertyAction {
    const v = CommandPropertyAction.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
