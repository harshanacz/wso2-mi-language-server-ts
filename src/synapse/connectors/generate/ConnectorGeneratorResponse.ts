// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/generate/ConnectorGeneratorResponse.java by the java2ts converter (see tools/java2ts).

export class ConnectorGeneratorResponse {
  static readonly __fields: string[] = ["buildStatus", "connectorPath"];

  buildStatus: boolean = false;

  connectorPath?: string;

  constructor(buildStatus: boolean, connectorPath: string) {
    this.buildStatus = buildStatus;
    this.connectorPath = connectorPath;

  }
}
