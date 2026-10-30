// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/TemplateVisitor.java by the java2ts converter (see tools/java2ts).
import { size, get } from "../../../../syntaxTree/javaCompat.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { BreakpointMediatorVisitor } from "./BreakpointMediatorVisitor.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { Template } from "../../../../syntaxTree/pojo/template/Template.js";
import { TemplateDebugInfo } from "../../entity/debuginfo/TemplateDebugInfo.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class TemplateVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoints", "breakpointInfoMap", "templateDebugInfo"];

  syntaxTree?: Template;

  breakpoints?: Breakpoint[];

  breakpointInfoMap?: Map<Breakpoint, IDebugInfo>;

  templateDebugInfo?: TemplateDebugInfo;

  constructor(syntaxTree: Template, breakpoints: Breakpoint[], breakpointInfoMap: Map<Breakpoint, IDebugInfo>) {
    this.syntaxTree = syntaxTree;
    this.breakpoints = breakpoints;
    this.breakpointInfoMap = breakpointInfoMap;

  }

  startVisit(): void {
    while (size(this.breakpoints) > 0) {
        let breakpoint = get(this.breakpoints, 0);
        this.templateDebugInfo = new TemplateDebugInfo();
        this.traverseNode(this.syntaxTree, breakpoint);
    }

  }

  traverseNode(syntaxTree: Template, breakpoint: Breakpoint): void {
    if (syntaxTree == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(syntaxTree, breakpoint)) {
        this.templateDebugInfo.setTemplateKey(syntaxTree.getName());
        if (syntaxTree.getSequence() != null) {
            let mediatorVisitor = new BreakpointMediatorVisitor(this.breakpoints,
                    this.templateDebugInfo);
            VisitorUtils.visitMediators(syntaxTree.getSequence().getMediatorList(), mediatorVisitor,
                    this.breakpointInfoMap);
            if (!mediatorVisitor.isDone()) {
                this.markAsInvalid(mediatorVisitor.breakpoint, "Invalid breakpoint in Template");
            }
        }
    } else {
        this.markAsInvalid(breakpoint, "Breakpoint is not in the range of the template");
    }

  }

  markAsInvalid(breakpoint: Breakpoint, error: string): void {
    VisitorUtils.markAsInvalid(breakpoint, error, this.templateDebugInfo, this.breakpointInfoMap, this.breakpoints);

  }
}
