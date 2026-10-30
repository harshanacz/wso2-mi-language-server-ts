// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectorInfoResponse.java by the java2ts converter (see tools/java2ts).
import { ConnectorInfoDto } from "./ConnectorInfoDto.js";

export class ConnectorInfoResponse {
  static readonly __fields: string[] = ["connectors"];

  connectors?: ConnectorInfoDto[];

  constructor(connectors: ConnectorInfoDto[]) {
    this.connectors = connectors;

  }

  getConnectors(): ConnectorInfoDto[] {
    return this.connectors;

  }

  setConnectors(connectors: ConnectorInfoDto[]): void {
    this.connectors = connectors;

  }
}
