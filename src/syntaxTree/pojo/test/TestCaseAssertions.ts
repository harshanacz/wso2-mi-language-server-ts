// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestCaseAssertions.java by the java2ts converter (see tools/java2ts).
import { Assertion } from "./Assertion.js";
import { STNode } from "../../stNode.js";

export class TestCaseAssertions extends STNode {
  assertions?: Assertion[];

  getAssertions(): Assertion[] {
    return this.assertions;

  }

  setAssertions(assertions: Assertion[]): void {
    this.assertions = assertions;

  }
}
