// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatement.java by the java2ts converter (see tools/java2ts).
import { DbMediatorStatementParameter } from "./DbMediatorStatementParameter.js";
import { DbMediatorStatementResult } from "./DbMediatorStatementResult.js";
import { STNode } from "../../../../stNode.js";

export class DbMediatorStatement extends STNode {
  static readonly __fields: string[] = ["sql", "parameter", "result"];

  sql?: string;

  parameter?: DbMediatorStatementParameter[];

  result?: DbMediatorStatementResult[];

  getSql(): string {
    return this.sql;

  }

  setSql(sql: string): void {
    this.sql = sql;

  }

  getParameter(): DbMediatorStatementParameter[] {
    return this.parameter;

  }

  setParameter(parameter: DbMediatorStatementParameter[]): void {
    this.parameter = parameter;

  }

  getResult(): DbMediatorStatementResult[] {
    return this.result;

  }

  setResult(result: DbMediatorStatementResult[]): void {
    this.result = result;

  }
}
