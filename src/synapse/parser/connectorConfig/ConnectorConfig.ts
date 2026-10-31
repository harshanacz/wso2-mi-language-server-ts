// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/ConnectorConfig.java by the java2ts converter (see tools/java2ts).
import { ConnectorDependencyConfig } from "./ConnectorDependencyConfig.js";

export class ConnectorConfig {
  static readonly __fields: string[] = ["version", "omitAllDrivers", "omitAllConnectors", "connectors"];

  version?: string;

  omitAllDrivers?: boolean;

  omitAllConnectors?: boolean;

  connectors: Map<string, ConnectorDependencyConfig> = new Map();
}
