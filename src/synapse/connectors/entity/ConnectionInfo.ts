// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectionInfo.java by the java2ts converter (see tools/java2ts).
import { OperationParameter } from "./OperationParameter.js";

export class ConnectionInfo {
  static readonly __fields: string[] = ["name", "displayName", "description", "uiSchemaPath", "parameters"];

  name?: string;

  displayName?: string;

  description?: string;

  uiSchemaPath?: string;

  parameters: OperationParameter[] = [];

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getDisplayName(): string {
    return this.displayName;

  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getUiSchemaPath(): string {
    return this.uiSchemaPath;

  }

  setUiSchemaPath(uiSchemaPath: string): void {
    this.uiSchemaPath = uiSchemaPath;

  }

  getParameters(): OperationParameter[] {
    return this.parameters;

  }

  setParameters(parameters: OperationParameter[]): void {
    this.parameters = parameters;

  }
}
