// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/SequenceVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { LocalEntry } from "../../../../syntaxTree/pojo/LocalEntry.js";
import { NamedSequence } from "../../../../syntaxTree/pojo/NamedSequence.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { SyntaxTreeGenerator } from "../../../../syntaxTree/SyntaxTreeGenerator.js";
import { Utils } from "../../../../syntaxTree/utils.js";

export class SequenceVisitor extends AbstractDependencyVisitor {
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
    if (node instanceof NamedSequence) {
        this.visitSequence(node);
    } else if (node instanceof LocalEntry) {
        this.visitLocalEntry(node);
    }

  }

  visitSequence(node: STNode): void {
    let sequence = (node as NamedSequence);
    if (sequence.getOnError() != null) {
        let dependency =
                DependencyVisitorUtils.visitSequence(this.projectPath, sequence.getOnError(), this.dependencyLookUp);
        this.addDependency(dependency);
    }
    if (sequence.getMediatorList() != null) {
        let dependencyList =
                DependencyVisitorUtils.visitMediators(sequence.getMediatorList(), this.projectPath, this.dependencyLookUp);
        this.addDependencies(dependencyList);
    }

  }

  visitLocalEntry(node: STNode): void {
    let localEntry = (node as LocalEntry);
    let content = localEntry.getContent();
    if (content != null) {
        let document = Utils.getDOMDocument(content);
        if (document != null) {
            let sequenceNode = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
            this.visit(sequenceNode);
        }
    }

  }
}
