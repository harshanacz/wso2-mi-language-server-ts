// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/CallTemplate.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { WithParam } from "./WithParam.js";

export class CallTemplate extends Mediator {
  withParam?: WithParam[];

  target?: string;

  onError?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Call Template");

  }

  getWithParam(): WithParam[] {
    return this.withParam;

  }

  setWithParam(withParam: WithParam[]): void {
    this.withParam = withParam;

  }

  getTarget(): string {
    return this.target;

  }

  setTarget(target: string): void {
    this.target = target;

  }

  getOnError(): string {
    return this.onError;

  }

  setOnError(onError: string): void {
    this.onError = onError;

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
