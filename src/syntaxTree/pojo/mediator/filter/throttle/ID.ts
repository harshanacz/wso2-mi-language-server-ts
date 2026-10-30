// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/throttle/ID.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class ID extends STNode {
  static readonly __fields: string[] = ["value", "type"];

  value?: string;

  type?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }
}
