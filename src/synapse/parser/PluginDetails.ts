// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/PluginDetails.java by the java2ts converter (see tools/java2ts).
import { Either } from "../lsp.js";
import { Node } from "./Node.js";
import { Range } from "../lsp.js";

export class PluginDetails {
  static readonly __fields: string[] = ["miContainerPluginVersion", "unitTestPluginVersion", "projectBuildPluginVersion", "ranges"];

  miContainerPluginVersion?: Node;

  unitTestPluginVersion?: Node;

  projectBuildPluginVersion?: Node;

  ranges?: Range[];

  constructor() {
    this.ranges = [];

  }

  setMiContainerPluginVersion(miContainerPluginVersion: Node): void {
    this.miContainerPluginVersion = miContainerPluginVersion;

  }

  setUnitTestPluginVersion(unitTestPluginVersion: Node): void {
    this.unitTestPluginVersion = unitTestPluginVersion;

  }

  setProjectBuildPluginVersion(pluginVersion: string, range: Range): void {
    this.ranges.push(range);
    this.projectBuildPluginVersion = new Node(pluginVersion, Either.forRight(this.ranges));

  }

  initialiseRanges(): void {
    this.ranges = [];

  }

  getProjectBuildPluginVersion(): Node {
    return this.projectBuildPluginVersion;

  }

  getMiContainerPluginVersion(): Node {
    return this.miContainerPluginVersion;

  }

  getUnitTestPluginVersion(): Node {
    return this.unitTestPluginVersion;

  }
}
