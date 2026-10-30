// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/AdvanceDetails.java by the java2ts converter (see tools/java2ts).
import { Node } from "./Node.js";
import { PluginDetails } from "./PluginDetails.js";

export class AdvanceDetails {
  static readonly __fields: string[] = ["projectGroupId", "projectArtifactId", "pluginDetails"];

  projectGroupId?: Node;

  projectArtifactId?: Node;

  pluginDetails?: PluginDetails;

  constructor() {
    this.pluginDetails = new PluginDetails();

  }

  setProjectGroupId(projectGroupId: Node): void {
    this.projectGroupId = projectGroupId;

  }

  setProjectArtifactId(projectArtifactId: Node): void {
    this.projectArtifactId = projectArtifactId;

  }

  getPluginDetails(): PluginDetails {
    return this.pluginDetails;

  }

  getProjectGroupId(): Node {
    return this.projectGroupId;

  }

  getProjectArtifactId(): Node {
    return this.projectArtifactId;

  }
}
