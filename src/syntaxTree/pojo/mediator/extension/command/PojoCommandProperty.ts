// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/command/PojoCommandProperty.java by the java2ts converter (see tools/java2ts).
import { CommandPropertyAction } from "./CommandPropertyAction.js";
import { STNode } from "../../../../stNode.js";

export class PojoCommandProperty extends STNode {
  any?: any[];

  name?: string;

  contextName?: string;

  action?: CommandPropertyAction;

  value?: string;

  expression?: string;

  getAny(): any[] {
    return this.any;

  }

  setAny(any: any[]): void {
    this.any = any;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getContextName(): string {
    return this.contextName;

  }

  setContextName(contextName: string): void {
    this.contextName = contextName;

  }

  getAction(): CommandPropertyAction {
    return this.action;

  }

  setAction(action: CommandPropertyAction): void {
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
}
