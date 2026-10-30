// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/InboundEndpointVisitor.java by the java2ts converter (see tools/java2ts).
import { size, get } from "../../../../syntaxTree/javaCompat.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { InboundDebugInfo } from "../../entity/debuginfo/InboundDebugInfo.js";
import { InboundEndpoint } from "../../../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class InboundEndpointVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoints", "breakpointInfoMap", "inboundDebugInfo"];

  syntaxTree?: InboundEndpoint;

  breakpoints?: Breakpoint[];

  breakpointInfoMap?: Map<Breakpoint, IDebugInfo>;

  inboundDebugInfo?: InboundDebugInfo;

  constructor(syntaxTree: InboundEndpoint, breakpoints: Breakpoint[], breakpointInfoMap: Map<Breakpoint, IDebugInfo>) {
    this.syntaxTree = syntaxTree;
    this.breakpoints = breakpoints;
    this.breakpointInfoMap = breakpointInfoMap;

  }

  startVisit(): void {
    while (size(this.breakpoints) > 0) {
        let breakpoint = get(this.breakpoints, 0);
        this.inboundDebugInfo = new InboundDebugInfo();
        this.traverseNode(this.syntaxTree, breakpoint);
    }

  }

  traverseNode(syntaxTree: InboundEndpoint, breakpoint: Breakpoint): void {
    if (syntaxTree == null) {
        return;
    }

    this.markAsInvalid(breakpoint, "Breakpoint is not supported in inbound endpoint. Please add the breakpoint " +
            "inside the respective sequence");

  }

  markAsInvalid(breakpoint: Breakpoint, error: string): void {
    VisitorUtils.markAsInvalid(breakpoint, error, this.inboundDebugInfo, this.breakpointInfoMap, this.breakpoints);

  }
}
