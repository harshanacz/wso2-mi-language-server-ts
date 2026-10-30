// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/PayloadFactoryArgsArg.java by the java2ts converter (see tools/java2ts).
import { EvaluatorType } from "./EvaluatorType.js";
import { STNode } from "../../../../stNode.js";

export class PayloadFactoryArgsArg extends STNode {
  value?: string;

  evaluator?: EvaluatorType;

  expression?: string;

  literal: boolean = false;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getEvaluator(): EvaluatorType {
    return this.evaluator;

  }

  setEvaluator(evaluator: EvaluatorType): void {
    this.evaluator = evaluator;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  isLiteral(): boolean {
    return this.literal;

  }

  setLiteral(literal: boolean): void {
    this.literal = literal;

  }
}
