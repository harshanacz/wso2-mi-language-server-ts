// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverInboundEndpointVisitor.java by the java2ts converter (see tools/java2ts).
import { Breakpoint } from "../../entity/Breakpoint.js";
import { InboundEndpoint } from "../../../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";

export class StepOverInboundEndpointVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoint", "stepOverInfo"];

  syntaxTree?: InboundEndpoint;

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  constructor(syntaxTree: InboundEndpoint, breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    this.syntaxTree = syntaxTree;
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  startVisit(): void {

  }
}
