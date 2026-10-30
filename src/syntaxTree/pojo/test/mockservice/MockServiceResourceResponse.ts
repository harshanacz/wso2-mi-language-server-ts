// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/MockServiceResourceResponse.java by the java2ts converter (see tools/java2ts).
import { Headers } from "./Headers.js";
import { STNode } from "../../../stNode.js";

export class MockServiceResourceResponse extends STNode {
  static readonly __fields: string[] = ["statusCode", "payload", "headers"];

  statusCode?: STNode;

  payload?: STNode;

  headers?: Headers;

  getStatusCode(): STNode {
    return this.statusCode;

  }

  setStatusCode(statusCode: STNode): void {
    this.statusCode = statusCode;

  }

  getPayload(): STNode {
    return this.payload;

  }

  setPayload(payload: STNode): void {
    this.payload = payload;

  }

  getHeaders(): Headers {
    return this.headers;

  }

  setHeaders(headers: Headers): void {
    this.headers = headers;

  }
}
