// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/WithParam.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class WithParam extends STNode {
  static readonly __fields: string[] = ["name", "value", "description"];

  name?: string;

  value?: string;

  description?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
