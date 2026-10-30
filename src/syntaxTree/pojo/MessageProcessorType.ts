// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/MessageProcessorType.java by the java2ts converter (see tools/java2ts).

export class MessageProcessorType {
  static readonly __fields: string[] = [];



  static readonly MESSAGE_SAMPLING = new MessageProcessorType("MESSAGE_SAMPLING", 0);
  static readonly SCHEDULED_MESSAGE_FORWARDING = new MessageProcessorType("SCHEDULED_MESSAGE_FORWARDING", 1);
  static readonly SCHEDULED_FAILOVER_MESSAGE_FORWARDING = new MessageProcessorType("SCHEDULED_FAILOVER_MESSAGE_FORWARDING", 2);
  static readonly CUSTOM = new MessageProcessorType("CUSTOM", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): MessageProcessorType[] { return [MessageProcessorType.MESSAGE_SAMPLING, MessageProcessorType.SCHEDULED_MESSAGE_FORWARDING, MessageProcessorType.SCHEDULED_FAILOVER_MESSAGE_FORWARDING, MessageProcessorType.CUSTOM]; }
  static valueOf(name: string): MessageProcessorType {
    const v = MessageProcessorType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
