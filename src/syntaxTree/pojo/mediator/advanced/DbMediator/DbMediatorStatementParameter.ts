// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatementParameter.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { StatementParameterType } from "./StatementParameterType.js";

export class DbMediatorStatementParameter extends STNode {
  static readonly __fields: string[] = ["type", "value", "expression"];

  type?: StatementParameterType;

  value?: string;

  expression?: string;

  getType(): StatementParameterType {
    return this.type;

  }

  setType(type: StatementParameterType): void {
    this.type = type;

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
