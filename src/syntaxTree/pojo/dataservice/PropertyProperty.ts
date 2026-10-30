// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/PropertyProperty.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class PropertyProperty extends STNode {
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
