// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/LocalEntryVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DOMDocument } from "../../../../syntaxTree/dom/dom.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorFactory } from "./DependencyVisitorFactory.js";
import { LocalEntry } from "../../../../syntaxTree/pojo/LocalEntry.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { SyntaxTreeGenerator } from "../../../../syntaxTree/SyntaxTreeGenerator.js";
import { Utils } from "../../../../syntaxTree/utils.js";
import { JFile } from "../../../host/JFile.js";

export class LocalEntryVisitor extends AbstractDependencyVisitor {
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
    let localEntry = (node as LocalEntry);
    try {
        let document = this.getDomDocument(localEntry);
        if (document != null && document.getDocumentElement() != null) {
            let childNode = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
            if (childNode != null) {
                let dependencyVisitorFactory = new DependencyVisitorFactory(this.projectPath);
                let visitor =
                        dependencyVisitorFactory.createVisitor(childNode.getTag(), this.getDependencyTree());
                if (visitor != null) {
                    visitor.visit(childNode);
                }
            }
        }
    } catch (e) {
    }


  }

  getDomDocument(localEntry: LocalEntry): DOMDocument {
    let content = localEntry.getContent();
    if (content != null) {
        return Utils.getDOMDocument(content);
    }
    let path = localEntry.getSrc();
    if (path != null && path.endsWith(".xml")) {
        let file = new JFile(path);
        if (file.exists()) {
            return Utils.getDOMDocument(file);
        }
    }
    return null;

  }
}
