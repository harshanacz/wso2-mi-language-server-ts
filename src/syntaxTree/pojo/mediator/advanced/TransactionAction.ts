// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/TransactionAction.java by the java2ts converter (see tools/java2ts).

export class TransactionAction {
  static readonly __fields: string[] = ["value"];

  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly NEW = new TransactionAction("NEW", 0, "new");
  static readonly COMMIT = new TransactionAction("COMMIT", 1, "commit");
  static readonly ROLLBACK = new TransactionAction("ROLLBACK", 2, "rollback");
  static readonly SUSPEND = new TransactionAction("SUSPEND", 3, "suspend");
  static readonly RESUME = new TransactionAction("RESUME", 4, "resume");
  static readonly USE_EXISTING_OR_NEW = new TransactionAction("USE_EXISTING_OR_NEW", 5, "use-existing-or-new");
  static readonly FAULT_IF_NO_TX = new TransactionAction("FAULT_IF_NO_TX", 6, "fault-if-no-tx");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): TransactionAction[] { return [TransactionAction.NEW, TransactionAction.COMMIT, TransactionAction.ROLLBACK, TransactionAction.SUSPEND, TransactionAction.RESUME, TransactionAction.USE_EXISTING_OR_NEW, TransactionAction.FAULT_IF_NO_TX]; }
  static valueOf(name: string): TransactionAction {
    const v = TransactionAction.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
