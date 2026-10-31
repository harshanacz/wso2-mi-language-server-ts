// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/ConnectorDependencyConfig.java by the java2ts converter (see tools/java2ts).
import { DependencyOverride } from "./DependencyOverride.js";

export class ConnectorDependencyConfig {
  static readonly __fields: string[] = ["omit", "omitAllDrivers", "qname", "dependencies"];

  omit?: boolean;

  omitAllDrivers?: boolean;

  qname?: string;

  dependencies?: DependencyOverride[];
}
