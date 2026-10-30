// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/ConflictingDependency.java by the java2ts converter (see tools/java2ts).

export class ConflictingDependency {
  static readonly __fields: string[] = ["groupId", "artifactId", "version", "conflictingArtifacts", "conflictingConnectors"];

  groupId?: string;

  artifactId?: string;

  version?: string;

  conflictingArtifacts?: string[];

  conflictingConnectors?: string[];

  constructor(groupId: string, artifactId: string, version: string, conflictingArtifacts: string[], conflictingConnectors: string[]) {
    this.groupId = groupId;
    this.artifactId = artifactId;
    this.version = version;
    this.conflictingArtifacts = conflictingArtifacts;
    this.conflictingConnectors = conflictingConnectors;

  }

  getGroupId(): string {
    return this.groupId;

  }

  getArtifactId(): string {
    return this.artifactId;

  }

  getVersion(): string {
    return this.version;

  }

  getConflictingArtifacts(): string[] {
    return this.conflictingArtifacts;

  }

  getConflictingConnectors(): string[] {
    return this.conflictingConnectors;

  }
}
