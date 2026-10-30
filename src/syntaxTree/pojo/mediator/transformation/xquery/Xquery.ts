// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/xquery/Xquery.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { XqueryVariable } from "./XqueryVariable.js";

export class Xquery extends Mediator {
  variable?: XqueryVariable[];

  key?: string;

  target?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("XQuery");

  }

  getVariable(): XqueryVariable[] {
    return this.variable;

  }

  setVariable(variable: XqueryVariable[]): void {
    this.variable = variable;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getTarget(): string {
    return this.target;

  }

  setTarget(target: string): void {
    this.target = target;

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
