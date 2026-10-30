// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Variable.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { PropertyMediatorType } from "./PropertyMediatorType.js";

export class Variable extends Mediator {
  type?: PropertyMediatorType;

  description?: string;

  name?: string;

  action?: string;

  value?: string;

  expression?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Variable");

  }

  getType(): PropertyMediatorType {
    return this.type;

  }

  setType(type: PropertyMediatorType): void {
    this.type = type;

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
