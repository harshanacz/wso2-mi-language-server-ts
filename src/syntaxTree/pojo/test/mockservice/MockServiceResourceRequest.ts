// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/MockServiceResourceRequest.java by the java2ts converter (see tools/java2ts).
import { Headers } from "./Headers.js";
import { STNode } from "../../../stNode.js";

export class MockServiceResourceRequest extends STNode {
  headers?: Headers;

  payload?: STNode;

  getHeaders(): Headers {
    return this.headers;

  }

  setHeaders(headers: Headers): void {
    this.headers = headers;

  }

  getPayload(): STNode {
    return this.payload;

  }

  setPayload(payload: STNode): void {
    this.payload = payload;

  }
}
