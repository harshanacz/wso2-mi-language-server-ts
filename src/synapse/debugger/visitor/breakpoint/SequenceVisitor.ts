// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/SequenceVisitor.java by the java2ts converter (see tools/java2ts).
import { size, get, removeFrom } from "../../../../syntaxTree/javaCompat.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { BreakpointMediatorVisitor } from "./BreakpointMediatorVisitor.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { NamedSequence } from "../../../../syntaxTree/pojo/NamedSequence.js";
import { SequenceDebugInfo } from "../../entity/debuginfo/SequenceDebugInfo.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class SequenceVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoints", "breakpointInfoMap", "sequenceDebugInfo"];

  syntaxTree?: NamedSequence;

  breakpoints?: Breakpoint[];

  breakpointInfoMap?: Map<Breakpoint, IDebugInfo>;

  sequenceDebugInfo?: SequenceDebugInfo;

  constructor(syntaxTree: NamedSequence, breakpoints: Breakpoint[], breakpointInfoMap: Map<Breakpoint, IDebugInfo>) {
    this.syntaxTree = syntaxTree;
    this.breakpoints = breakpoints;
    this.breakpointInfoMap = breakpointInfoMap;

  }

  startVisit(): void {
    while (size(this.breakpoints) > 0) {
        let breakpoint = get(this.breakpoints, 0);
        this.sequenceDebugInfo = new SequenceDebugInfo();
        this.traverseNode(this.syntaxTree, breakpoint);
    }

  }

  traverseNode(syntaxTree: NamedSequence, breakpoint: Breakpoint): void {
    if (syntaxTree == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(syntaxTree, breakpoint)) {
        this.sequenceDebugInfo.setSequenceKey(syntaxTree.getName());
        let mediatorVisitor = new BreakpointMediatorVisitor(this.breakpoints,
                this.sequenceDebugInfo);
        VisitorUtils.visitMediators(syntaxTree.getMediatorList(), mediatorVisitor, this.breakpointInfoMap);
        if (!mediatorVisitor.isDone()) {
            removeFrom(this.breakpoints, mediatorVisitor.breakpoint);
            this.sequenceDebugInfo.setValid(false);
            this.sequenceDebugInfo.setError("Invalid breakpoint in Sequence");
            this.breakpointInfoMap.set(mediatorVisitor.breakpoint, this.sequenceDebugInfo);
        }
    } else {
        this.markAsInvalid(breakpoint, "Breakpoint is not in the range of the sequence");
    }

  }

  markAsInvalid(breakpoint: Breakpoint, error: string): void {
    VisitorUtils.markAsInvalid(breakpoint, error, this.sequenceDebugInfo, this.breakpointInfoMap, this.breakpoints);

  }
}
