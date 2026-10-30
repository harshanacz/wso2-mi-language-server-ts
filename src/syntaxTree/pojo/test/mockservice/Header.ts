// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/Header.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class Header extends STNode {
  static readonly __fields: string[] = ["name", "value"];

  name?: string;

  value?: string;

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
}
