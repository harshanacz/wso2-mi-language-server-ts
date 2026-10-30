// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestArtifact.java by the java2ts converter (see tools/java2ts).
import { Artifact } from "./Artifact.js";
import { STNode } from "../../stNode.js";

export class TestArtifact extends STNode {
  static readonly __fields: string[] = ["artifact"];

  artifact?: Artifact;

  getArtifact(): Artifact {
    return this.artifact;

  }

  setArtifact(artifact: Artifact): void {
    this.artifact = artifact;

  }
}
