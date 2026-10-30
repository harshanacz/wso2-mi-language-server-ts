// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/TestFolder.java by the java2ts converter (see tools/java2ts).
import { FolderNode } from "./FolderNode.js";

export class TestFolder {
  static readonly __fields: string[] = ["wso2mi", "java"];

  wso2mi?: FolderNode;

  java?: FolderNode;

  getWso2mi(): FolderNode {
    return this.wso2mi;

  }

  setWso2mi(wso2mi: FolderNode): void {
    this.wso2mi = wso2mi;

  }

  getJava(): FolderNode {
    return this.java;

  }

  setJava(java: FolderNode): void {
    this.java = java;

  }
}
