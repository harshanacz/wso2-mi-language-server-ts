// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/MessageStoreType.java by the java2ts converter (see tools/java2ts).

export class MessageStoreType {


  static readonly IN_MEMORY = new MessageStoreType("IN_MEMORY", 0);
  static readonly JMS = new MessageStoreType("JMS", 1);
  static readonly WSO2_MB = new MessageStoreType("WSO2_MB", 2);
  static readonly RABBITMQ = new MessageStoreType("RABBITMQ", 3);
  static readonly JDBC = new MessageStoreType("JDBC", 4);
  static readonly RESEQUENCE = new MessageStoreType("RESEQUENCE", 5);
  static readonly CUSTOM = new MessageStoreType("CUSTOM", 6);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): MessageStoreType[] { return [MessageStoreType.IN_MEMORY, MessageStoreType.JMS, MessageStoreType.WSO2_MB, MessageStoreType.RABBITMQ, MessageStoreType.JDBC, MessageStoreType.RESEQUENCE, MessageStoreType.CUSTOM]; }
  static valueOf(name: string): MessageStoreType {
    const v = MessageStoreType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
