// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/UnitTestArtifacts.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestArtifact } from "./TestArtifact.js";
import { TestConnectorResources } from "./TestConnectorResources.js";
import { TestRegistryResources } from "./TestRegistryResources.js";
import { TestSupportiveArtifacts } from "./TestSupportiveArtifacts.js";

export class UnitTestArtifacts extends STNode {
  testArtifact?: TestArtifact;

  supportiveArtifacts?: TestSupportiveArtifacts;

  registryResources?: TestRegistryResources;

  connectorResources?: TestConnectorResources;

  getTestArtifact(): TestArtifact {
    return this.testArtifact;

  }

  setTestArtifact(testArtifact: TestArtifact): void {
    this.testArtifact = testArtifact;

  }

  getSupportiveArtifact(): TestSupportiveArtifacts {
    return this.supportiveArtifacts;

  }

  setSupportiveArtifact(supportiveArtifact: TestSupportiveArtifacts): void {
    this.supportiveArtifacts = supportiveArtifact;

  }

  getRegistryResource(): TestRegistryResources {
    return this.registryResources;

  }

  setRegistryResource(registryResource: TestRegistryResources): void {
    this.registryResources = registryResource;

  }

  getConnectorResource(): TestConnectorResources {
    return this.connectorResources;

  }

  setConnectorResource(connectorResource: TestConnectorResources): void {
    this.connectorResources = connectorResource;

  }
}
