// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/PropertyType.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class PropertyType extends STNode {
  static readonly __fields: string[] = ["value", "name"];

  value?: string;

  name?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
