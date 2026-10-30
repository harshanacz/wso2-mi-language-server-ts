// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectionUIParam.java by the java2ts converter (see tools/java2ts).

export class ConnectionUIParam {
  static readonly __fields: string[] = ["connectorName", "connectionType", "documentUri"];

  connectorName?: string;

  connectionType?: string;

  documentUri?: string;

  constructor(connectorName: string, connectionType: string);
  constructor(documentUri: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        const [connectorName, connectionType] = args;


                this.connectorName = connectorName;
                this.connectionType = connectionType;

        break;
      }
      case 1: {
        const [documentUri] = args;


                this.documentUri = documentUri;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getConnectorName(): string {
    return this.connectorName;

  }

  setConnectorName(connectorName: string): void {
    this.connectorName = connectorName;

  }

  getConnectionType(): string {
    return this.connectionType;

  }

  setConnectionType(connectionType: string): void {
    this.connectionType = connectionType;

  }

  getDocumentUri(): string {
    return this.documentUri;

  }

  setDocumentUri(documentUri: string): void {
    this.documentUri = documentUri;

  }
}
