// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestSupportiveArtifacts.java by the java2ts converter (see tools/java2ts).
import { Artifact } from "./Artifact.js";
import { STNode } from "../../stNode.js";

export class TestSupportiveArtifacts extends STNode {
  static readonly __fields: string[] = ["artifacts"];

  artifacts?: Artifact[];

  getArtifacts(): Artifact[] {
    return this.artifacts;

  }

  setArtifacts(artifacts: Artifact[]): void {
    this.artifacts = artifacts;

  }
}
