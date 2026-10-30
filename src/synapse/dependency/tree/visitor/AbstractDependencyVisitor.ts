// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/AbstractDependencyVisitor.java by the java2ts converter (see tools/java2ts).
import { Logger, Level } from "../../../../syntaxTree/javaCompat.js";
import { Dependency } from "../pojo/Dependency.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { SyntaxTreeGenerator } from "../../../../syntaxTree/SyntaxTreeGenerator.js";
import { Utils } from "../../../../syntaxTree/utils.js";
import { JFile } from "../../../host/JFile.js";

export abstract class AbstractDependencyVisitor {
  static readonly __fields: string[] = ["dependencyLookUp", "dependencyTree", "projectPath"];

  static readonly LOGGER: Logger = Logger.getLogger("AbstractDependencyVisitor");

  dependencyLookUp?: DependencyLookUp;

  dependencyTree?: DependencyTree;

  projectPath?: string;

  constructor(dependencyTree: DependencyTree, projectPath: string, dependencyLookUp: DependencyLookUp) {
    this.dependencyTree = dependencyTree;
    this.projectPath = projectPath;
    this.dependencyLookUp = dependencyLookUp;

  }

  visit(artifactPath: string): void;
  visit(node: STNode): void;
  visit(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'string') {
          const [artifactPath] = args;


                  try {
                      let document = Utils.getDOMDocument(new JFile(artifactPath));
                      if (document != null) {
                          let node = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
                          this.visit(node);
                      }
                  } catch (e) {
                      AbstractDependencyVisitor.LOGGER.log(Level.SEVERE, "Error while reading the artifact file", e);
                  }

        } else if (args[0] instanceof STNode) {
          const [node] = args;
        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  addDependency(dependency: Dependency): void {
    if (dependency != null) {
        if (this.dependencyLookUp.getDependency(dependency.getPath()) == null) {
            this.dependencyLookUp.addDependency(dependency.getPath(), dependency);
        }
        this.dependencyTree.addDependency(dependency);
    }

  }

  addDependencies(dependencies: Dependency[]): void {
    for (let dependency of dependencies) {
        this.addDependency(dependency);
    }

  }

  getDependencyTree(): DependencyTree {
    return this.dependencyTree;

  }
}
