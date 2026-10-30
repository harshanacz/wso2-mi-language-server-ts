// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestCaseInput.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestProperties } from "./TestProperties.js";

export class TestCaseInput extends STNode {
  requestPath?: STNode;

  requestMethod?: STNode;

  requestProtocol?: STNode;

  payload?: STNode;

  properties?: TestProperties;

  getRequestPath(): STNode {
    return this.requestPath;

  }

  setRequestPath(requestPath: STNode): void {
    this.requestPath = requestPath;

  }

  getRequestMethod(): STNode {
    return this.requestMethod;

  }

  setRequestMethod(requestMethod: STNode): void {
    this.requestMethod = requestMethod;

  }

  getRequestProtocol(): STNode {
    return this.requestProtocol;

  }

  setRequestProtocol(requestProtocol: STNode): void {
    this.requestProtocol = requestProtocol;

  }

  getPayload(): STNode {
    return this.payload;

  }

  setPayload(payload: STNode): void {
    this.payload = payload;

  }

  getProperties(): TestProperties {
    return this.properties;

  }

  setProperties(properties: TestProperties): void {
    this.properties = properties;

  }
}
