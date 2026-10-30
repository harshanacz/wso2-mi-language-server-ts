// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/MockService.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class MockService extends STNode {
  static readonly __fields: string[] = ["name"];

  name?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
