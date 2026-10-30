// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/MockService.java by the java2ts converter (see tools/java2ts).
import { MockServiceResources } from "./MockServiceResources.js";
import { STNode } from "../../../stNode.js";

export class MockService extends STNode {
  serviceName?: STNode;

  port?: STNode;

  context?: STNode;

  resources?: MockServiceResources;

  getServiceName(): STNode {
    return this.serviceName;

  }

  setServiceName(serviceName: STNode): void {
    this.serviceName = serviceName;

  }

  getPort(): STNode {
    return this.port;

  }

  setPort(port: STNode): void {
    this.port = port;

  }

  getContext(): STNode {
    return this.context;

  }

  setContext(context: STNode): void {
    this.context = context;

  }

  getResources(): MockServiceResources {
    return this.resources;

  }

  setResources(resources: MockServiceResources): void {
    this.resources = resources;

  }
}
