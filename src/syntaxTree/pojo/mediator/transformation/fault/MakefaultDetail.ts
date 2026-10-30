// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/fault/MakefaultDetail.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class MakefaultDetail extends STNode {
  static readonly __fields: string[] = ["expression"];

  expression?: string;

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }
}
