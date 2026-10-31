// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/SequenceVisitor.java by the java2ts converter (see tools/java2ts).
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { NamedSequence } from "../../../../../syntaxTree/pojo/NamedSequence.js";
import { Position } from "../../../../lsp.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Utils } from "./Utils.js";

export class SequenceVisitor {
  static readonly __fields: string[] = ["projectPath"];

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    if (node instanceof NamedSequence) {
      this.visitNamedSequence(node, info, request);
    }
  }

  visitNamedSequence(sequence: NamedSequence, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
          let line = request.getLine();
          let column = request.getColumn();
          let position = new Position(line, column);
          if (Utils.checkNodeInRange(sequence, position)) {
              let mediatorList = sequence.getMediatorList();
              if (mediatorList != null) {
                  Utils.visitMediators(this.projectPath, mediatorList, info, position);
              }
          }
  }
}
