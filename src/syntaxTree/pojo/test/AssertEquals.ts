// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/AssertEquals.java by the java2ts converter (see tools/java2ts).
import { Assertion } from "./Assertion.js";
import { STNode } from "../../stNode.js";

export class AssertEquals extends Assertion {
  expected?: STNode;

  getExpected(): STNode {
    return this.expected;

  }

  setExpected(expected: STNode): void {
    this.expected = expected;

  }
}
