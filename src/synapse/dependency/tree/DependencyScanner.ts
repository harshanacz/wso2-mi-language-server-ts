// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/DependencyScanner.java by the java2ts converter (see tools/java2ts).
import { replaceAll, Logger, Level } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { DOMDocument } from "../../../syntaxTree/dom/dom.js";
import { DependencyTree } from "./pojo/DependencyTree.js";
import { DependencyVisitorFactory } from "./visitor/DependencyVisitorFactory.js";
import { SyntaxTreeGenerator } from "../../../syntaxTree/SyntaxTreeGenerator.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export class DependencyScanner {
  static readonly __fields: string[] = ["projectPath"];

  static readonly LOGGER: Logger = Logger.getLogger("DependencyScanner");

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  analyzeArtifact(artifactPath: string): DependencyTree {
    let dependencyTree = new DependencyTree();
    artifactPath = Utils.getAbsolutePath(artifactPath);
    dependencyTree.setPath(artifactPath);
    try {
        let document = Utils.getDOMDocument(new JFile(artifactPath));
        if (document != null) {
            this.processDocument(document, dependencyTree);
        }
    } catch (e) {
        DependencyScanner.LOGGER.log(Level.SEVERE, "Error occurred while analyzing the artifact: " + artifactPath, e);
    }
    return dependencyTree;

  }

  processDocument(document: DOMDocument, dependencyTree: DependencyTree): void {
    let artifactName = this.getArtifactName(document);
    if (artifactName != null) {
        dependencyTree.setName(artifactName);
    }
    let node = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
    let dependencyVisitorFactory = new DependencyVisitorFactory(this.projectPath);
    let visitor = dependencyVisitorFactory.createVisitor(node.getTag(), dependencyTree);
    if (visitor != null) {
        visitor.visit(node);
        dependencyTree.setType(replaceAll(node.getTag(), "([a-z])([A-Z])", "$1_$2").toUpperCase());
    }

  }

  getArtifactName(document: DOMDocument): string {
    let rootElement = document.getDocumentElement();
    if (rootElement != null) {
        if (rootElement.hasAttribute(Constant.NAME)) {
            return rootElement.getAttribute(Constant.NAME);
        } else if (rootElement.hasAttribute(Constant.KEY)) {
            return rootElement.getAttribute(Constant.KEY);
        } else {
            let childElement = Utils.getChildNodeByName(rootElement, Constant.NAME);
            if (childElement != null) {
                return childElement.getTextContent();
            }
        }
    }
    return null;

  }
}
