// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Resource.java by the java2ts converter (see tools/java2ts).
import { CallQuery } from "./CallQuery.js";
import { STNode } from "../../stNode.js";

export class Resource extends STNode {
  static readonly __fields: string[] = ["description", "callQuery", "path", "method", "disableStreaming", "returnRequestStatus"];

  description?: STNode;

  callQuery?: CallQuery;

  path?: string;

  method?: string;

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

  getPath(): string {
    return this.path;

  }

  setPath(path: string): void {
    this.path = path;

  }

  getMethod(): string {
    return this.method;

  }

  setMethod(method: string): void {
    this.method = method;

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
