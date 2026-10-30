// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/MockServiceResources.java by the java2ts converter (see tools/java2ts).
import { MockServiceResource } from "./MockServiceResource.js";
import { STNode } from "../../../stNode.js";

export class MockServiceResources extends STNode {
  resources?: MockServiceResource[];

  constructor() {
    super();
    this.resources = [];

  }

  getResources(): MockServiceResource[] {
    return this.resources;

  }

  setResources(resources: MockServiceResource[]): void {
    this.resources = resources;

  }

  addResource(resource: MockServiceResource): void {
    this.resources.push(resource);

  }
}
