// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Store.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Store extends Mediator {
  messageStore?: string;

  sequence?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Store");

  }

  getMessageStore(): string {
    return this.messageStore;

  }

  setMessageStore(messageStore: string): void {
    this.messageStore = messageStore;

  }

  getSequence(): string {
    return this.sequence;

  }

  setSequence(sequence: string): void {
    this.sequence = sequence;

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
