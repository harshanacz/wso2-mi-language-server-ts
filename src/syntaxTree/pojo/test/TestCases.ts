// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestCases.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestCase } from "./TestCase.js";

export class TestCases extends STNode {
  static readonly __fields: string[] = ["testCases"];

  testCases?: TestCase[];

  getTestCases(): TestCase[] {
    return this.testCases;

  }

  setTestCases(testCases: TestCase[]): void {
    this.testCases = testCases;

  }
}
