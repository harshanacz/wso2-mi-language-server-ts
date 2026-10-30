// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/TemplateVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { Template } from "../../../../syntaxTree/pojo/template/Template.js";

export class TemplateVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

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
    let template = (node as Template);

    if (template.getEndpoint() != null) {
        let dependency =
                DependencyVisitorUtils.visitEndpoint(template.getEndpoint(), this.projectPath, this.dependencyLookUp);
        this.addDependency(dependency);
    } else if (template.getSequence() != null) {
        let dependencies =
                DependencyVisitorUtils.visitMediators(template.getSequence().getMediatorList(), this.projectPath,
                        this.dependencyLookUp);
        this.addDependencies(dependencies);
    }

  }
}
