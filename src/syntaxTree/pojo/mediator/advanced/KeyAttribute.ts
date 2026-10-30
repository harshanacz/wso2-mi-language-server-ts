// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/KeyAttribute.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class KeyAttribute extends STNode {
  static readonly __fields: string[] = ["key", "value"];

  key?: string;

  value?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }
}
