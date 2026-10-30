// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/ConnectorDependency.java by the java2ts converter (see tools/java2ts).
import { ArtifactType } from "../ArtifactType.js";
import { Dependency } from "./Dependency.js";

export class ConnectorDependency extends Dependency {
  static readonly __fields: string[] = ["operationName"];

  operationName?: string;

  constructor(name: string, type: ArtifactType, path: string) {
    super(name, type, path);

  }

  getOperationName(): string {
    return this.operationName;

  }

  setOperationName(operationName: string): void {
    this.operationName = operationName;

  }
}
