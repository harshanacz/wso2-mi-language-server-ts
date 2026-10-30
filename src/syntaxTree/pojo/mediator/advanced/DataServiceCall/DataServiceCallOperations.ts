// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallOperations.java by the java2ts converter (see tools/java2ts).
import { DataServiceCallOperationsOperation } from "./DataServiceCallOperationsOperation.js";
import { DataServiceCallOperationsType } from "./DataServiceCallOperationsType.js";
import { STNode } from "../../../../stNode.js";

export class DataServiceCallOperations extends STNode {
  static readonly __fields: string[] = ["operation", "type"];

  operation?: DataServiceCallOperationsOperation[];

  type?: DataServiceCallOperationsType;

  getOperation(): DataServiceCallOperationsOperation[] {
    return this.operation;

  }

  setOperation(operation: DataServiceCallOperationsOperation[]): void {
    this.operation = operation;

  }

  getType(): DataServiceCallOperationsType {
    return this.type;

  }

  setType(type: DataServiceCallOperationsType): void {
    this.type = type;

  }
}
