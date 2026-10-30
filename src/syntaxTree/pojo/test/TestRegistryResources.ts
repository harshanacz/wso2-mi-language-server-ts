// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestRegistryResources.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestRegistryResource } from "./TestRegistryResource.js";

export class TestRegistryResources extends STNode {
  static readonly __fields: string[] = ["registryResources"];

  registryResources?: TestRegistryResource[];

  getRegistryResources(): TestRegistryResource[] {
    return this.registryResources;

  }

  setRegistryResources(registryResources: TestRegistryResource[]): void {
    this.registryResources = registryResources;

  }
}
