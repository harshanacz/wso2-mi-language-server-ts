// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/ApiVisitor.java by the java2ts converter (see tools/java2ts).
import { StringEscapeUtils } from "../../../host/commonsIo.js";
import { size, get, StringBuilder } from "../../../../syntaxTree/javaCompat.js";
import { API } from "../../../../syntaxTree/pojo/api/API.js";
import { APIResource } from "../../../../syntaxTree/pojo/api/APIResource.js";
import { ApiDebugInfo } from "../../entity/debuginfo/ApiDebugInfo.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { BreakpointMediatorVisitor } from "./BreakpointMediatorVisitor.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { VisitorUtils } from "../VisitorUtils.js";

export class ApiVisitor {
  static readonly __fields: string[] = ["syntaxTree", "breakpoints", "breakpointInfoMap", "apiDebugInfo"];

  syntaxTree?: API;

  breakpoints?: Breakpoint[];

  breakpointInfoMap?: Map<Breakpoint, IDebugInfo>;

  apiDebugInfo?: ApiDebugInfo;

  constructor(syntaxTree: API, breakpoints: Breakpoint[], breakpointInfoMap: Map<Breakpoint, IDebugInfo>) {
    this.syntaxTree = syntaxTree;
    this.breakpoints = breakpoints;
    this.breakpointInfoMap = breakpointInfoMap;

  }

  startVisit(): void {
    while (size(this.breakpoints) > 0) {
        let breakpoint = get(this.breakpoints, 0);
        this.apiDebugInfo = new ApiDebugInfo();
        this.traverseNode(this.syntaxTree, breakpoint);
    }

  }

  traverseNode(node: API, breakpoint: Breakpoint): void {
    if (node == null) {
        return;
    }
    if (VisitorUtils.checkNodeInRange(node, breakpoint)) {
        let key = new StringBuilder();
        key.append(node.getName());
        if (node.getVersion() != null) {
            key.append(":v").append(node.getVersion());
        }
        this.apiDebugInfo.setApiKey(String(key));
        let resources = node.getResource();
        for (let resource of resources) {
            if (VisitorUtils.checkNodeInRange(resource, breakpoint)) {
                this.apiDebugInfo.setMethod(resource.getMethods()[0]);
                let uriTemplate = StringEscapeUtils.unescapeHtml4(resource.getUriTemplate());
                this.apiDebugInfo.setUriTemplate(uriTemplate);
                let urlMapping = StringEscapeUtils.unescapeHtml4(resource.getUrlMapping());
                this.apiDebugInfo.setUrlMapping(urlMapping);
                this.visitResource(resource, breakpoint);
                return;
            }
        }
    }
    this.markAsInvalid(breakpoint, "Invalid breakpoint in API");

  }

  visitResource(resource: APIResource, breakpoint: Breakpoint): void {
    if (VisitorUtils.checkNodeInRange(resource.getInSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getInSequence());
    } else if (VisitorUtils.checkNodeInRange(resource.getOutSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getOutSequence());
    } else if (VisitorUtils.checkNodeInRange(resource.getFaultSequence(), breakpoint)) {
        this.visitMediationSequence(resource.getFaultSequence());
    } else {
        this.markAsInvalid(breakpoint, "Invalid breakpoint in API");
    }

  }

  visitMediationSequence(sequence: Sequence): void {
    this.apiDebugInfo.setSequenceType("api_" + sequence.getTag().substring(0, sequence.getTag().length - 5).toLowerCase());
    let mediatorVisitor = new BreakpointMediatorVisitor(this.breakpoints, this.apiDebugInfo);
    VisitorUtils.visitMediators(sequence.getMediatorList(), mediatorVisitor, this.breakpointInfoMap);
    if (!mediatorVisitor.isDone()) {
        this.markAsInvalid(mediatorVisitor.breakpoint, "Invalid breakpoint in API");
    }

  }

  markAsInvalid(breakpoint: Breakpoint, error: string): void {
    VisitorUtils.markAsInvalid(breakpoint, error, this.apiDebugInfo, this.breakpointInfoMap, this.breakpoints);

  }
}
