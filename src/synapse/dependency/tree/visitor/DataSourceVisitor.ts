// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/DataSourceVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { STNode } from "../../../../syntaxTree/stNode.js";

export class DataSourceVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

  constructor(dependencyTree: DependencyTree, projectPath: string) {
    super(dependencyTree, projectPath, new DependencyLookUp());

  }

  visit(node: STNode): void {


  }
}
