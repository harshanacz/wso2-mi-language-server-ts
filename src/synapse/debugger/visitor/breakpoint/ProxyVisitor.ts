// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/ProxyVisitor.java by the java2ts converter (see tools/java2ts).
import { size, get } from "../../../../syntaxTree/javaCompat.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { BreakpointMediatorVisitor } from "./BreakpointMediatorVisitor.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { Proxy } from "../../../../syntaxTree/pojo/proxy/Proxy.js";
import { ProxyDebugInfo } from "../../entity/debuginfo/ProxyDebugInfo.js";
import { ProxyTarget } from "../../../../syntaxTree/pojo/proxy/ProxyTarget.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class ProxyVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoints", "breakpointInfoMap", "proxyDebugInfo"];

  syntaxTree?: Proxy;

  breakpoints?: Breakpoint[];

  breakpointInfoMap?: Map<Breakpoint, IDebugInfo>;

  proxyDebugInfo?: ProxyDebugInfo;

  constructor(syntaxTree: Proxy, breakpoints: Breakpoint[], breakpointInfoMap: Map<Breakpoint, IDebugInfo>) {
    this.syntaxTree = syntaxTree;
    this.breakpoints = breakpoints;
    this.breakpointInfoMap = breakpointInfoMap;

  }

  startVisit(): void {
    while (size(this.breakpoints) > 0) {
        let breakpoint = get(this.breakpoints, 0);
        this.proxyDebugInfo = new ProxyDebugInfo();
        this.traverseNode(this.syntaxTree, breakpoint);
    }

  }

  traverseNode(node: Proxy, breakpoint: Breakpoint): void {
    if (node == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(node, breakpoint)) {
        this.proxyDebugInfo.setProxyKey(node.getName());
        this.visitTargetSequence(node.getTarget(), breakpoint);
    } else {
        this.markAsInvalid(breakpoint, "Breakpoint is not in the range of the proxy");
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
    } else {
        this.markAsInvalid(breakpoint, "Breakpoint is not in the proxy target sequence");
    }

  }

  visitMediationSequence(sequence: Sequence): void {
    this.proxyDebugInfo.setSequenceType("proxy_" + sequence.getTag().substring(0, sequence.getTag().length - 5).toLowerCase());
    let mediatorVisitor = new BreakpointMediatorVisitor(this.breakpoints, this.proxyDebugInfo);
    VisitorUtils.visitMediators(sequence.getMediatorList(), mediatorVisitor, this.breakpointInfoMap);
    if (!mediatorVisitor.isDone()) {
        this.markAsInvalid(mediatorVisitor.breakpoint, "Invalid breakpoint in Proxy");
    }

  }

  markAsInvalid(breakpoint: Breakpoint, error: string): void {
    VisitorUtils.markAsInvalid(breakpoint, error, this.proxyDebugInfo, this.breakpointInfoMap, this.breakpoints);

  }
}
