// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/TestConnectionRequest.java by the java2ts converter (see tools/java2ts).

export class TestConnectionRequest {
  static readonly __fields: string[] = ["connectorName", "connectionType", "parameters"];

  connectorName?: string;

  connectionType?: string;

  parameters?: Map<string, any>;

  getConnectorName(): string {
    return this.connectorName;

  }

  setConnectorName(connectorName: string): void {
    this.connectorName = connectorName;

  }

  getParameters(): Map<string, any> {
    return this.parameters;

  }

  setParameters(parameters: Map<string, any>): void {
    this.parameters = parameters;

  }

  getConnectionType(): string {
    return this.connectionType;

  }

  setConnectionType(connectionType: string): void {
    this.connectionType = connectionType;

  }

  addParameter(key: string, value: string): void {
    this.parameters.set(key, value);

  }
}
