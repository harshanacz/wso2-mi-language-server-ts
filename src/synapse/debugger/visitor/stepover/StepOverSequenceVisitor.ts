// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverSequenceVisitor.java by the java2ts converter (see tools/java2ts).
import { Breakpoint } from "../../entity/Breakpoint.js";
import { NamedSequence } from "../../../../syntaxTree/pojo/NamedSequence.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";
import { StepOverMediatorVisitor } from "./StepOverMediatorVisitor.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class StepOverSequenceVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoint", "stepOverInfo"];

  syntaxTree?: NamedSequence;

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  constructor(syntaxTree: NamedSequence, breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    this.syntaxTree = syntaxTree;
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  startVisit(): void {
    this.traverseNode(this.syntaxTree, this.breakpoint);

  }

  traverseNode(syntaxTree: NamedSequence, breakpoint: Breakpoint): void {
    if (syntaxTree == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(syntaxTree, breakpoint)) {
        let mediatorVisitor = new StepOverMediatorVisitor(breakpoint, this.stepOverInfo);
        VisitorUtils.visitMediators(syntaxTree.getMediatorList(), mediatorVisitor);
    }


  }
}
