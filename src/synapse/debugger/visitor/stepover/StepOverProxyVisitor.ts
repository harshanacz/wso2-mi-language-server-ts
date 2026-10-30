// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverProxyVisitor.java by the java2ts converter (see tools/java2ts).
import { Breakpoint } from "../../entity/Breakpoint.js";
import { Proxy } from "../../../../syntaxTree/pojo/proxy/Proxy.js";
import { ProxyTarget } from "../../../../syntaxTree/pojo/proxy/ProxyTarget.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";
import { StepOverMediatorVisitor } from "./StepOverMediatorVisitor.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class StepOverProxyVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoint", "stepOverInfo"];

  syntaxTree?: Proxy;

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  constructor(syntaxTree: Proxy, breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    this.syntaxTree = syntaxTree;
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  startVisit(): void {
    this.traverseNode(this.syntaxTree, this.breakpoint);


  }

  traverseNode(node: Proxy, breakpoint: Breakpoint): void {
    if (node == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(node, breakpoint)) {
        this.visitTargetSequence(node.getTarget(), breakpoint);
    }

  }

  visitTargetSequence(target: ProxyTarget, breakpoint: Breakpoint): void {
    if (target == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(target.getInSequence(), breakpoint)) {
        this.visitMediationSequence(target.getInSequence());
    } else if (VisitorUtils.checkNodeInRange(target.getOutSequence(), breakpoint)) {
        this.visitMediationSequence(target.getOutSequence());
    } else if (VisitorUtils.checkNodeInRange(target.getFaultSequence(), breakpoint)) {
        this.visitMediationSequence(target.getFaultSequence());
    }

  }

  visitMediationSequence(sequence: Sequence): void {
    let mediatorVisitor = new StepOverMediatorVisitor(this.breakpoint, this.stepOverInfo);
    VisitorUtils.visitMediators(sequence.getMediatorList(), mediatorVisitor);

  }
}
