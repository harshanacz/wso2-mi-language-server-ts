// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/BreakpointsRequest.java by the java2ts converter (see tools/java2ts).
import { Breakpoint } from "./Breakpoint.js";

export class BreakpointsRequest {
  static readonly __fields: string[] = ["filePath", "breakpoints", "breakpoint"];

  filePath?: string;

  breakpoints?: Breakpoint[];

  breakpoint?: Breakpoint;
}
