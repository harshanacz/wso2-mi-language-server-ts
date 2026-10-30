// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Property.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { PropertyMediatorType } from "./PropertyMediatorType.js";
import { PropertyScope } from "./PropertyScope.js";

export class Property extends Mediator {
  static readonly __fields: string[] = ["any", "scope", "type", "pattern", "group", "description", "name", "action", "value", "expression", "traceFilter"];

  any?: any;

  scope?: PropertyScope;

  type?: PropertyMediatorType;

  pattern?: string;

  group?: string;

  description?: string;

  name?: string;

  action?: string;

  value?: string;

  expression?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Property");

  }

  getAny(): any {
    return this.any;

  }

  setAny(any: any): void {
    this.any = any;

  }

  getScope(): PropertyScope {
    return this.scope;

  }

  setScope(scope: PropertyScope): void {
    this.scope = scope;

  }

  getType(): PropertyMediatorType {
    return this.type;

  }

  setType(type: PropertyMediatorType): void {
    this.type = type;

  }

  getPattern(): string {
    return this.pattern;

  }

  setPattern(pattern: string): void {
    this.pattern = pattern;

  }

  getGroup(): string {
    return this.group;

  }

  setGroup(group: string): void {
    this.group = group;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

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
