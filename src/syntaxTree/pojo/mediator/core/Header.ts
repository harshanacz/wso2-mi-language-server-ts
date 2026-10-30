// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Header.java by the java2ts converter (see tools/java2ts).
import { HeaderScope } from "./HeaderScope.js";
import { Mediator } from "../Mediator.js";

export class Header extends Mediator {
  any?: any;

  name?: string;

  action?: string;

  scope?: HeaderScope;

  description?: string;

  value?: string;

  expression?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Header");

  }

  getAny(): any {
    return this.any;

  }

  setAny(any: any): void {
    this.any = any;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getAction(): string {
    return this.action;

  }

  setAction(action: string): void {
    this.action = action;

  }

  getScope(): HeaderScope {
    return this.scope;

  }

  setScope(scope: HeaderScope): void {
    this.scope = scope;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
