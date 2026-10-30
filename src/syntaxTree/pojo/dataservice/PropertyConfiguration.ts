// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/PropertyConfiguration.java by the java2ts converter (see tools/java2ts).
import { PropertyConfigurationEntry } from "./PropertyConfigurationEntry.js";
import { STNode } from "../../stNode.js";

export class PropertyConfiguration extends STNode {
  static readonly __fields: string[] = ["entry"];

  entry?: PropertyConfigurationEntry[];

  getEntry(): PropertyConfigurationEntry[] {
    return this.entry;

  }

  setEntry(entry: PropertyConfigurationEntry[]): void {
    this.entry = entry;

  }
}
