// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Loopback.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Loopback extends Mediator {
  static readonly __fields: string[] = ["description", "traceFilter"];

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Loopback");

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
