// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestProperty.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class TestProperty extends STNode {
  name?: string;

  value?: string;

  scope?: string;

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

  getScope(): string {
    return this.scope;

  }

  setScope(scope: string): void {
    this.scope = scope;

  }
}
