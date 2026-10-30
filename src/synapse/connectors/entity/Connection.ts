// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/Connection.java by the java2ts converter (see tools/java2ts).
import { ConnectionParameter } from "./ConnectionParameter.js";

export class Connection {
  static readonly __fields: string[] = ["connectorName", "name", "connectionType", "path", "parameters"];

  connectorName?: string;

  name?: string;

  connectionType?: string;

  path?: string;

  parameters?: ConnectionParameter[];

  constructor(connectorName: string, name: string, connectionType: string, parameters: ConnectionParameter[], path: string) {
    this.connectorName = connectorName;
    this.name = name;
    this.connectionType = connectionType;
    this.path = path;
    this.parameters = parameters;

  }

  getConnectorName(): string {
    return this.connectorName;

  }

  getName(): string {
    return this.name;

  }

  getConnectionType(): string {
    return this.connectionType;

  }

  getParameters(): ConnectionParameter[] {
    return this.parameters;

  }

  getPath(): string {
    return this.path;

  }
}
