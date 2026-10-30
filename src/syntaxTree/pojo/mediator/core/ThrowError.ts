// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/ThrowError.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class ThrowError extends Mediator {
  type?: string;

  errorMessage?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("ThrowError");

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getErrorMessage(): string {
    return this.errorMessage;

  }

  setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;

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
