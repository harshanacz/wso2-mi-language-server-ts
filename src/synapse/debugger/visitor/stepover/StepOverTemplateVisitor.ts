// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverTemplateVisitor.java by the java2ts converter (see tools/java2ts).
import { Breakpoint } from "../../entity/Breakpoint.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";
import { StepOverMediatorVisitor } from "./StepOverMediatorVisitor.js";
import { Template } from "../../../../syntaxTree/pojo/template/Template.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class StepOverTemplateVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoint", "stepOverInfo"];

  syntaxTree?: Template;

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  constructor(syntaxTree: Template, breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    this.syntaxTree = syntaxTree;
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  startVisit(): void {
    this.traverseNode(this.syntaxTree, this.breakpoint);


  }

  traverseNode(syntaxTree: Template, breakpoint: Breakpoint): void {
    if (syntaxTree == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(syntaxTree, breakpoint)) {
        let mediatorVisitor = new StepOverMediatorVisitor(breakpoint, this.stepOverInfo);
        VisitorUtils.visitMediators(syntaxTree.getSequence().getMediatorList(), mediatorVisitor);
    }

  }
}
