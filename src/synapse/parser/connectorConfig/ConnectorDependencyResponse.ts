// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/ConnectorDependencyResponse.java by the java2ts converter (see tools/java2ts).
import { ConnectorEffectiveData } from "./ConnectorEffectiveData.js";
import { EffectiveDependency } from "./EffectiveDependency.js";

export class ConnectorDependencyResponse {
  static readonly __fields: string[] = ["omitAllDrivers", "omitAllConnectors", "dependencies", "allConnectors"];

  omitAllDrivers: boolean = false;

  omitAllConnectors: boolean = false;

  dependencies?: EffectiveDependency[];

  allConnectors?: Map<string, ConnectorEffectiveData>;
}
