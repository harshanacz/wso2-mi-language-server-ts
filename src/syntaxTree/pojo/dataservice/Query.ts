// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Query.java by the java2ts converter (see tools/java2ts).
import { Expression } from "./Expression.js";
import { Param } from "./Param.js";
import { QueryProperties } from "./QueryProperties.js";
import { Result } from "./Result.js";
import { STNode } from "../../stNode.js";
import { Sparql } from "./Sparql.js";
import { Sql } from "./Sql.js";

export class Query extends STNode {
  static readonly __fields: string[] = ["sql", "expression", "sparql", "properties", "result", "params", "id", "useConfig", "returnGeneratedKeys", "inputEventTrigger", "keyColumns", "returnUpdatedRowCount"];

  sql?: Sql;

  expression?: Expression;

  sparql?: Sparql;

  properties?: QueryProperties;

  result?: Result;

  params?: Param[];

  id?: string;

  useConfig?: string;

  returnGeneratedKeys: boolean = false;

  inputEventTrigger?: string;

  keyColumns?: string;

  returnUpdatedRowCount?: string;

  getSql(): Sql {
    return this.sql;

  }

  setSql(sql: Sql): void {
    this.sql = sql;

  }

  getExpression(): Expression {
    return this.expression;

  }

  setExpression(expression: Expression): void {
    this.expression = expression;

  }

  getSparql(): Sparql {
    return this.sparql;

  }

  setSparql(sparql: Sparql): void {
    this.sparql = sparql;

  }

  getProperties(): QueryProperties {
    return this.properties;

  }

  setProperties(properties: QueryProperties): void {
    this.properties = properties;

  }

  getResult(): Result {
    return this.result;

  }

  setResult(result: Result): void {
    this.result = result;

  }

  getParams(): Param[] {
    return this.params;

  }

  setParams(params: Param[]): void {
    this.params = params;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getUseConfig(): string {
    return this.useConfig;

  }

  setUseConfig(useConfig: string): void {
    this.useConfig = useConfig;

  }

  isReturnGeneratedKeys(): boolean {
    return this.returnGeneratedKeys;

  }

  setReturnGeneratedKeys(returnGeneratedKeys: boolean): void {
    this.returnGeneratedKeys = returnGeneratedKeys;

  }

  getInputEventTrigger(): string {
    return this.inputEventTrigger;

  }

  setInputEventTrigger(inputEventTrigger: string): void {
    this.inputEventTrigger = inputEventTrigger;

  }

  getKeyColumns(): string {
    return this.keyColumns;

  }

  setKeyColumns(keyColumns: string): void {
    this.keyColumns = keyColumns;

  }

  getReturnUpdatedRowCount(): string {
    return this.returnUpdatedRowCount;

  }

  setReturnUpdatedRowCount(returnUpdatedRowCount: string): void {
    this.returnUpdatedRowCount = returnUpdatedRowCount;

  }
}
