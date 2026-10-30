// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/Assertion.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class Assertion extends STNode {
  static readonly __fields: string[] = ["actual", "message"];

  actual?: STNode;

  message?: STNode;

  getActual(): STNode {
    return this.actual;

  }

  setActual(actual: STNode): void {
    this.actual = actual;

  }

  getMessage(): STNode {
    return this.message;

  }

  setMessage(message: STNode): void {
    this.message = message;

  }
}
