// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Feature.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class Feature extends STNode {
  name?: string;

  value: boolean = false;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  isValue(): boolean {
    return this.value;

  }

  setValue(value: boolean): void {
    this.value = value;

  }
}
