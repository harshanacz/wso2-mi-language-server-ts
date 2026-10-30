// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/StepOverInfo.java by the java2ts converter (see tools/java2ts).
import { isEmpty, size } from "../../../syntaxTree/javaCompat.js";
import { Breakpoint } from "./Breakpoint.js";

export class StepOverInfo {
  static readonly __fields: string[] = ["stepOverBreakpoints"];

  stepOverBreakpoints?: Breakpoint[];

  constructor() {
    this.stepOverBreakpoints = [];

  }

  add(breakpoint: Breakpoint): void {
    this.stepOverBreakpoints.push(breakpoint);

  }

  isEmpty(): boolean {
    return isEmpty(this.stepOverBreakpoints);

  }

  size(): number {
    return size(this.stepOverBreakpoints);

  }

  getStepOverBreakpoints(): Breakpoint[] {
    return this.stepOverBreakpoints;

  }
}
