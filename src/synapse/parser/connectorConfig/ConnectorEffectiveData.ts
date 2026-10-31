// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/ConnectorEffectiveData.java by the java2ts converter (see tools/java2ts).
import { EffectiveDependency } from "./EffectiveDependency.js";

export class ConnectorEffectiveData {
  static readonly __fields: string[] = ["omit", "omitAllDrivers", "dependencies"];

  omit: boolean = false;

  omitAllDrivers: boolean = false;

  dependencies?: EffectiveDependency[];
}
