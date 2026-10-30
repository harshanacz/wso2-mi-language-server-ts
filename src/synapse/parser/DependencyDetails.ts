// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/DependencyDetails.java by the java2ts converter (see tools/java2ts).
import { Range } from "../lsp.js";

export class DependencyDetails {
  static readonly __fields: string[] = ["groupId", "artifact", "version", "type", "range"];

  groupId?: string;

  artifact?: string;

  version?: string;

  type?: string;

  range?: Range;

  constructor() {

  }

  setGroupId(groupId: string): void {
    this.groupId = groupId;

  }

  setArtifact(artifact: string): void {
    this.artifact = artifact;

  }

  setVersion(version: string): void {
    this.version = version;

  }

  setType(type: string): void {
    this.type = type;

  }

  setRange(range: Range): void {
    this.range = range;

  }

  getGroupId(): string {
    return this.groupId;

  }

  getArtifact(): string {
    return this.artifact;

  }

  getVersion(): string {
    return this.version;

  }

  getType(): string {
    return this.type;

  }

  getRange(): Range {
    return this.range;

  }
}
