// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestCase.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestCaseAssertions } from "./TestCaseAssertions.js";
import { TestCaseInput } from "./TestCaseInput.js";

export class TestCase extends STNode {
  static readonly __fields: string[] = ["input", "assertions", "name"];

  input?: TestCaseInput;

  assertions?: TestCaseAssertions;

  name?: string;

  getInput(): TestCaseInput {
    return this.input;

  }

  setInput(input: TestCaseInput): void {
    this.input = input;

  }

  getAssertions(): TestCaseAssertions {
    return this.assertions;

  }

  setAssertions(assertions: TestCaseAssertions): void {
    this.assertions = assertions;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
