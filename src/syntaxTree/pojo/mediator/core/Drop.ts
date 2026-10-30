// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Drop.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Drop extends Mediator {
  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Drop");

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
