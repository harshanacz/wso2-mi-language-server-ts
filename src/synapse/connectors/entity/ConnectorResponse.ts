// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectorResponse.java by the java2ts converter (see tools/java2ts).
import { Connector } from "./Connector.js";

export class ConnectorResponse {
  static readonly __fields: string[] = ["connectors"];

  connectors?: Connector[];

  constructor(connectors: Connector[]) {
    this.connectors = connectors;

  }

  getConnectors(): Connector[] {
    return this.connectors;

  }

  setConnectors(connectors: Connector[]): void {
    this.connectors = connectors;

  }
}
