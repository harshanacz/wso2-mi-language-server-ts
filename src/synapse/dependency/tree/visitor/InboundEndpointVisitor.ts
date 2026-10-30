// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/InboundEndpointVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { InboundEndpoint } from "../../../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { STNode } from "../../../../syntaxTree/stNode.js";

export class InboundEndpointVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

  constructor(dependencyTree: DependencyTree, projectPath: string);
  constructor(dependencyTree: DependencyTree, projectPath: string, dependencyLookUp: DependencyLookUp);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        const [dependencyTree, projectPath] = args;


                super(dependencyTree, projectPath, new DependencyLookUp());

        break;
      }
      case 3: {
        const [dependencyTree, projectPath, dependencyLookUp] = args;


                super(dependencyTree, projectPath, dependencyLookUp);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  visit(node: STNode): void {
    let inboundEndpoint = (node as InboundEndpoint);

    if (inboundEndpoint.getSequence() != null) {
        let dependency =
                DependencyVisitorUtils.visitSequence(this.projectPath, inboundEndpoint.getSequence(), this.dependencyLookUp);
        this.addDependency(dependency);
    }

    if (inboundEndpoint.getOnError() != null) {
        let dependency =
                DependencyVisitorUtils.visitSequence(this.projectPath, inboundEndpoint.getOnError(), this.dependencyLookUp);
        this.addDependency(dependency);
    }

  }
}
