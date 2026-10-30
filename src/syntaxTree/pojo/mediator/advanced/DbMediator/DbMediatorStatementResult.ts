// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatementResult.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class DbMediatorStatementResult extends STNode {
  static readonly __fields: string[] = ["name", "column"];

  name?: string;

  column?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getColumn(): string {
    return this.column;

  }

  setColumn(column: string): void {
    this.column = column;

  }
}
