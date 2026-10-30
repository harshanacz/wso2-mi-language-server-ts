// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperation.java by the java2ts converter (see tools/java2ts).
import { DataServiceCallOperationsOperationParam } from "./DataServiceCallOperationsOperationParam.js";
import { STNode } from "../../../../stNode.js";

export class DataServiceCallOperationsOperation extends STNode {
  static readonly __fields: string[] = ["param", "name"];

  param?: DataServiceCallOperationsOperationParam[];

  name?: string;

  getParam(): DataServiceCallOperationsOperationParam[] {
    return this.param;

  }

  setParam(param: DataServiceCallOperationsOperationParam[]): void {
    this.param = param;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
