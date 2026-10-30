// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/PrimaryDetails.java by the java2ts converter (see tools/java2ts).
import { Node } from "./Node.js";

export class PrimaryDetails {
  static readonly __fields: string[] = ["runtimeVersion", "projectName", "projectVersion", "projectDescription", "projectPackaging"];

  runtimeVersion?: Node;

  projectName?: Node;

  projectVersion?: Node;

  projectDescription?: Node;

  projectPackaging?: Node;

  constructor() {

  }

  setRuntimeVersion(runtimeVersion: Node): void {
    this.runtimeVersion = runtimeVersion;

  }

  setProjectVersion(projectVersion: Node): void {
    this.projectVersion = projectVersion;

  }

  setProjectDescription(projectDescription: Node): void {
    this.projectDescription = projectDescription;

  }

  setProjectName(projectName: Node): void {
    this.projectName = projectName;

  }

  setProjectPackaging(projectPackaging: Node): void {
    this.projectPackaging = projectPackaging;

  }

  getRuntimeVersion(): Node {
    return this.runtimeVersion;

  }

  getProjectVersion(): Node {
    return this.projectVersion;

  }

  getProjectDescription(): Node {
    return this.projectDescription;

  }

  getProjectName(): Node {
    return this.projectName;

  }

  getProjectPackaging(): Node {
    return this.projectPackaging;

  }
}
