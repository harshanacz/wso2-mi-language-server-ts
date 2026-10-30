// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestConnectorResources.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class TestConnectorResources extends STNode {
  connectorResources?: STNode[];

  getConnectorResources(): STNode[] {
    return this.connectorResources;

  }

  setConnectorResources(connectorResources: STNode[]): void {
    this.connectorResources = connectorResources;

  }
}
