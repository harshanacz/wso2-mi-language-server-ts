// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/MessageStoreVisitor.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase } from "../../../../syntaxTree/javaCompat.js";
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { MessageStore } from "../../../../syntaxTree/pojo/MessageStore.js";
import { STNode } from "../../../../syntaxTree/stNode.js";

export class MessageStoreVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

  static readonly FAIL_OVER_MESSAGE_PARAMETER: string = "store.failover.message.store.name";

  constructor(dependencyTree: DependencyTree, projectPath: string);
  constructor(projectPath: string, dependencyLookUp: DependencyLookUp);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        if (args[0] instanceof DependencyTree) {
          const [dependencyTree, projectPath] = args;


                  super(dependencyTree, projectPath, new DependencyLookUp());

        } else if (typeof args[0] === 'string') {
          const [projectPath, dependencyLookUp] = args;


                  super(new DependencyTree(), projectPath, dependencyLookUp);

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  visit(node: STNode): void {
    let messageStore = (node as MessageStore);
    let parameters = messageStore.getParameter();
    if (parameters != null) {
        for (let parameter of parameters) {
            if (equalsIgnoreCase(MessageStoreVisitor.FAIL_OVER_MESSAGE_PARAMETER, parameter.getName())) {
                this.addDependency(DependencyVisitorUtils.visitMessageStore(parameter.getContent(), this.projectPath,
                        this.dependencyLookUp));
            }
        }
    }

  }
}
