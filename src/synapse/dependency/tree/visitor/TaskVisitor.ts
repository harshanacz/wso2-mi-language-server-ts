// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/TaskVisitor.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase } from "../../../../syntaxTree/javaCompat.js";
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { Task } from "../../../../syntaxTree/pojo/task/Task.js";

export class TaskVisitor extends AbstractDependencyVisitor {
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
    let task = (node as Task);
    let mediatorProperties = task.getProperty();
    if (mediatorProperties != null) {
        for (let mediatorProperty of mediatorProperties) {
            let value = mediatorProperty.getValue();
            if (value != null && equalsIgnoreCase("sequenceName", mediatorProperty.getName())) {
                let dependency = DependencyVisitorUtils.visitSequence(this.projectPath, value, this.dependencyLookUp);
                this.addDependency(dependency);
            }
        }
    }

  }
}
