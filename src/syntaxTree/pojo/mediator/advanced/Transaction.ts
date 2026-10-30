// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/Transaction.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { TransactionAction } from "./TransactionAction.js";

export class Transaction extends Mediator {
  action?: TransactionAction;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Transaction");

  }

  getAction(): TransactionAction {
    return this.action;

  }

  setAction(action: TransactionAction): void {
    this.action = action;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
