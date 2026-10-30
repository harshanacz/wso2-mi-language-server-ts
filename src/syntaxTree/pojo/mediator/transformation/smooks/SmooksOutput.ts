// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/smooks/SmooksOutput.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { SmooksOutputType } from "./SmooksOutputType.js";

export class SmooksOutput extends STNode {
  static readonly __fields: string[] = ["type", "property", "action", "expression"];

  type?: SmooksOutputType;

  property?: string;

  action?: string;

  expression?: string;

  getType(): SmooksOutputType {
    return this.type;

  }

  setType(type: SmooksOutputType): void {
    this.type = type;

  }

  getProperty(): string {
    return this.property;

  }

  setProperty(property: string): void {
    this.property = property;

  }

  getAction(): string {
    return this.action;

  }

  setAction(action: string): void {
    this.action = action;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }
}
