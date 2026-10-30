// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/MessageProcessorVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { MessageProcessor } from "../../../../syntaxTree/pojo/MessageProcessor.js";
import { STNode } from "../../../../syntaxTree/stNode.js";

export class MessageProcessorVisitor extends AbstractDependencyVisitor {
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
    let messageProcessor = (node as MessageProcessor);

    if (messageProcessor.getMessageStore() != null) {
        let dependency =
                DependencyVisitorUtils.visitMessageStore(messageProcessor.getMessageStore(), this.projectPath,
                        this.dependencyLookUp);
        this.addDependency(dependency);
    }

    if (messageProcessor.getTargetEndpoint() != null) {
        let dependency =
                DependencyVisitorUtils.visitEndpoint(this.projectPath, messageProcessor.getTargetEndpoint(),
                        this.dependencyLookUp);
        this.addDependency(dependency);
    }

  }
}
