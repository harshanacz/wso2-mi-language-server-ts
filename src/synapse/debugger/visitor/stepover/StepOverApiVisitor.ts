// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverApiVisitor.java by the java2ts converter (see tools/java2ts).
import { API } from "../../../../syntaxTree/pojo/api/API.js";
import { APIResource } from "../../../../syntaxTree/pojo/api/APIResource.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";
import { StepOverMediatorVisitor } from "./StepOverMediatorVisitor.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class StepOverApiVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoint", "stepOverInfo"];

  syntaxTree?: API;

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  constructor(syntaxTree: API, breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    this.syntaxTree = syntaxTree;
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  startVisit(): void {
    this.traverseNode(this.syntaxTree, this.breakpoint);

  }

  traverseNode(node: API, breakpoint: Breakpoint): void {
    if (node == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(node, breakpoint)) {
        let resources = node.getResource();
        for (let resource of resources) {
            if (VisitorUtils.checkNodeInRange(resource, breakpoint)) {
                this.visitResource(resource, breakpoint);
                return;
            }
        }
    }

  }

  visitResource(resource: APIResource, breakpoint: Breakpoint): void {
    if (VisitorUtils.checkNodeInRange(resource.getInSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getInSequence());
    } else if (VisitorUtils.checkNodeInRange(resource.getOutSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getOutSequence());
    } else if (VisitorUtils.checkNodeInRange(resource.getFaultSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getFaultSequence());
    }

  }

  visitMediationSequence(sequence: Sequence): void {
    let mediatorVisitor = new StepOverMediatorVisitor(this.breakpoint, this.stepOverInfo);
    VisitorUtils.visitMediators(sequence.getMediatorList(), mediatorVisitor);

  }
}
