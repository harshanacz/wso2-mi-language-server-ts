// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/DefinitionType.java by the java2ts converter (see tools/java2ts).
import { ConfigurationType } from "./ConfigurationType.js";
import { STNode } from "../../stNode.js";

export class DefinitionType extends STNode {
  static readonly __fields: string[] = ["configuration", "type"];

  configuration?: ConfigurationType;

  type?: string;

  getConfiguration(): ConfigurationType {
    return this.configuration;

  }

  setConfiguration(configuration: ConfigurationType): void {
    this.configuration = configuration;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }
}
