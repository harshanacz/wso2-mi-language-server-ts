// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/ParamValidatePattern.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class ParamValidatePattern extends STNode {
  static readonly __fields: string[] = ["pattern"];

  pattern?: string;

  getPattern(): string {
    return this.pattern;

  }

  setPattern(pattern: string): void {
    this.pattern = pattern;

  }
}
