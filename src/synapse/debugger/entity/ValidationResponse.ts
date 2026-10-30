// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/ValidationResponse.java by the java2ts converter (see tools/java2ts).
import { BreakpointValidity } from "./BreakpointValidity.js";

export class ValidationResponse {
  static readonly __fields: string[] = ["breakpointValidity"];

  breakpointValidity?: BreakpointValidity[];

  constructor(breakpointValidity: BreakpointValidity[]) {
    this.breakpointValidity = breakpointValidity;

  }
}
