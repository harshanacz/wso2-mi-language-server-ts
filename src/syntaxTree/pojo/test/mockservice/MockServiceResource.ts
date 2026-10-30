// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/MockServiceResource.java by the java2ts converter (see tools/java2ts).
import { MockServiceResourceRequest } from "./MockServiceResourceRequest.js";
import { MockServiceResourceResponse } from "./MockServiceResourceResponse.js";
import { STNode } from "../../../stNode.js";

export class MockServiceResource extends STNode {
  static readonly __fields: string[] = ["subContext", "method", "request", "response"];

  subContext?: STNode;

  method?: STNode;

  request?: MockServiceResourceRequest;

  response?: MockServiceResourceResponse;

  getSubContext(): STNode {
    return this.subContext;

  }

  setSubContext(subContext: STNode): void {
    this.subContext = subContext;

  }

  getMethod(): STNode {
    return this.method;

  }

  setMethod(method: STNode): void {
    this.method = method;

  }

  getRequest(): MockServiceResourceRequest {
    return this.request;

  }

  setRequest(request: MockServiceResourceRequest): void {
    this.request = request;

  }

  getResponse(): MockServiceResourceResponse {
    return this.response;

  }

  setResponse(response: MockServiceResourceResponse): void {
    this.response = response;

  }
}
