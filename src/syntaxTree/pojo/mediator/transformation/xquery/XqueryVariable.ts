// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/xquery/XqueryVariable.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { XqueryVariableType } from "./XqueryVariableType.js";

export class XqueryVariable extends STNode {
  static readonly __fields: string[] = ["name", "type", "expression", "value", "key"];

  name?: string;

  type?: XqueryVariableType;

  expression?: string;

  value?: string;

  key?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getType(): XqueryVariableType {
    return this.type;

  }

  setType(type: XqueryVariableType): void {
    this.type = type;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }
}
