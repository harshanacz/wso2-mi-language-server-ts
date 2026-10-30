// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Sparql.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class Sparql extends STNode {
  static readonly __fields: string[] = ["value"];

  value?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }
}
