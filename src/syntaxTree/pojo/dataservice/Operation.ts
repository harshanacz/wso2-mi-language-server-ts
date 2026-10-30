// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Operation.java by the java2ts converter (see tools/java2ts).
import { CallQuery } from "./CallQuery.js";
import { STNode } from "../../stNode.js";

export class Operation extends STNode {
  static readonly __fields: string[] = ["description", "callQuery", "name", "disableStreaming", "returnRequestStatus"];

  description?: STNode;

  callQuery?: CallQuery;

  name?: string;

  disableStreaming: boolean = false;

  returnRequestStatus: boolean = false;

  getDescription(): STNode {
    return this.description;

  }

  setDescription(description: STNode): void {
    this.description = description;

  }

  getCallQuery(): CallQuery {
    return this.callQuery;

  }

  setCallQuery(callQuery: CallQuery): void {
    this.callQuery = callQuery;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  isDisableStreaming(): boolean {
    return this.disableStreaming;

  }

  setDisableStreaming(disableStreaming: boolean): void {
    this.disableStreaming = disableStreaming;

  }

  isReturnRequestStatus(): boolean {
    return this.returnRequestStatus;

  }

  setReturnRequestStatus(returnRequestStatus: boolean): void {
    this.returnRequestStatus = returnRequestStatus;

  }
}
