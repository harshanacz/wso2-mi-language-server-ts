// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/CallQueryWithParam.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class CallQueryWithParam extends STNode {
  name?: string;

  queryParam?: string;

  column?: string;

  param?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getQueryParam(): string {
    return this.queryParam;

  }

  setQueryParam(queryParam: string): void {
    this.queryParam = queryParam;

  }

  getColumn(): string {
    return this.column;

  }

  setColumn(column: string): void {
    this.column = column;

  }

  getParam(): string {
    return this.param;

  }

  setParam(param: string): void {
    this.param = param;

  }
}
