// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/QueryElements.java by the java2ts converter (see tools/java2ts).
import { Expression } from "./Expression.js";
import { Param } from "./Param.js";
import { QueryProperties } from "./QueryProperties.js";
import { Sparql } from "./Sparql.js";
import { Sql } from "./Sql.js";

export class QueryElements {
  sql?: Sql | undefined;

  expression?: Expression | undefined;

  sparql?: Sparql | undefined;

  properties?: QueryProperties | undefined;

  result?: any | undefined;

  param?: Param | undefined;

  getSql(): Sql | undefined {
    return this.sql;

  }

  setSql(sql: Sql | undefined): void {
    this.sql = sql;

  }

  getExpression(): Expression | undefined {
    return this.expression;

  }

  setExpression(expression: Expression | undefined): void {
    this.expression = expression;

  }

  getSparql(): Sparql | undefined {
    return this.sparql;

  }

  setSparql(sparql: Sparql | undefined): void {
    this.sparql = sparql;

  }

  getProperties(): QueryProperties | undefined {
    return this.properties;

  }

  setProperties(properties: QueryProperties | undefined): void {
    this.properties = properties;

  }

  getResult(): any | undefined {
    return this.result;

  }

  setResult(result: any | undefined): void {
    this.result = result;

  }

  getParam(): Param | undefined {
    return this.param;

  }

  setParam(param: Param | undefined): void {
    this.param = param;

  }
}
