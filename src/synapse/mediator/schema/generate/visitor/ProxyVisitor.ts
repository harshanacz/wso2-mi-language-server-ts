// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/ProxyVisitor.java by the java2ts converter (see tools/java2ts).
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { Position } from "../../../../lsp.js";
import { Proxy } from "../../../../../syntaxTree/pojo/proxy/Proxy.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Utils } from "./Utils.js";

export class ProxyVisitor {
  static readonly __fields: string[] = ["projectPath"];

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    let proxy = (node as Proxy);
    let position = new Position(request.getLine(), request.getColumn());
    if (Utils.checkNodeInRange(proxy.getTarget().getInSequence(), position) ||
            Utils.checkNodeInRange(proxy.getTarget().getOutSequence(), position)) {
        Utils.visitSequence(this.projectPath, proxy.getTarget().getInSequence(), info, position);
        Utils.visitSequence(this.projectPath, proxy.getTarget().getOutSequence(), info, position);
    } else if (Utils.checkNodeInRange(proxy.getTarget().getFaultSequence(), position)) {
        Utils.visitSequence(this.projectPath, proxy.getTarget().getFaultSequence(), info, position);
    }

  }
}
