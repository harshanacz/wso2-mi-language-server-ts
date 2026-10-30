// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/evaluators/Equal.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class Equal extends STNode {
  type?: string;

  source?: string;

  value?: string;

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

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }
}
