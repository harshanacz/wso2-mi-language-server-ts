// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/ParamValidateLongRange.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class ParamValidateLongRange extends STNode {
  minimum: number = 0;

  maximum: number = 0;

  getMinimum(): number {
    return this.minimum;

  }

  setMinimum(minimum: number): void {
    this.minimum = minimum;

  }

  getMaximum(): number {
    return this.maximum;

  }

  setMaximum(maximum: number): void {
    this.maximum = maximum;

  }
}
