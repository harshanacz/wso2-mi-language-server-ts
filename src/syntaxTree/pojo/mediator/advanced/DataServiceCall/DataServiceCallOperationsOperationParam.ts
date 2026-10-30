// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperationParam.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class DataServiceCallOperationsOperationParam extends STNode {
  name?: string;

  value?: string;

  expression?: string;

  evaluator?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

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

  getEvaluator(): string {
    return this.evaluator;

  }

  setEvaluator(evaluator: string): void {
    this.evaluator = evaluator;

  }
}
