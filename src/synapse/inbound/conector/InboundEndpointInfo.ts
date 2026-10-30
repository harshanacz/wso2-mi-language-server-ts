// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/inbound/conector/InboundEndpointInfo.java by the java2ts converter (see tools/java2ts).
import { OperationParameter } from "../../connectors/entity/OperationParameter.js";

export class InboundEndpointInfo {
  static readonly __fields: string[] = ["name", "id", "displayName", "description", "type", "source", "parameters"];

  name?: string;

  id?: string;

  displayName?: string;

  description?: string;

  type?: string;

  source?: string;

  parameters: OperationParameter[] = [];

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

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

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getSource(): string {
    return this.source;

  }

  setSource(source: string): void {
    this.source = source;

  }

  getParameters(): OperationParameter[] {
    return this.parameters;

  }

  setParameters(parameters: OperationParameter[]): void {
    this.parameters = parameters;

  }
}
