// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/smooks/SmooksInput.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { SmooksInputType } from "./SmooksInputType.js";

export class SmooksInput extends STNode {
  type?: SmooksInputType;

  expression?: string;

  getType(): SmooksInputType {
    return this.type;

  }

  setType(type: SmooksInputType): void {
    this.type = type;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }
}
