// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/ScatterGatherAggregation.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class ScatterGatherAggregation extends STNode {
  static readonly __fields: string[] = ["expression", "condition", "completeTimeout", "minMessages", "maxMessages"];

  expression?: string;

  condition?: string;

  completeTimeout?: string;

  minMessages?: string;

  maxMessages?: string;

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  getCondition(): string {
    return this.condition;

  }

  setCondition(condition: string): void {
    this.condition = condition;

  }

  getCompleteTimeout(): string {
    return this.completeTimeout;

  }

  setCompleteTimeout(completeTimeout: string): void {
    this.completeTimeout = completeTimeout;

  }

  getMinMessages(): string {
    return this.minMessages;

  }

  setMinMessages(minMessages: string): void {
    this.minMessages = minMessages;

  }

  getMaxMessages(): string {
    return this.maxMessages;

  }

  setMaxMessages(maxMessages: string): void {
    this.maxMessages = maxMessages;

  }
}
