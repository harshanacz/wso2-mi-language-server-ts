// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/fault/MakefaultCode.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class MakefaultCode extends STNode {
  value?: string;

  expression?: string;

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
