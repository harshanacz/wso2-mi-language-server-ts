// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/APIVisitor.java by the java2ts converter (see tools/java2ts).
import { API } from "../../../../syntaxTree/pojo/api/API.js";
import { APIResource } from "../../../../syntaxTree/pojo/api/APIResource.js";
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { ArtifactType } from "../ArtifactType.js";
import { Dependency } from "../pojo/Dependency.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";

export class APIVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

  constructor(projectPath: string, dependencyLookUp: DependencyLookUp);
  constructor(dependencyTree: DependencyTree, projectPath: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        if (typeof args[0] === 'string') {
          const [projectPath, dependencyLookUp] = args;


                  super(new DependencyTree(), projectPath, dependencyLookUp);

        } else if (args[0] instanceof DependencyTree) {
          const [dependencyTree, projectPath] = args;


                  super(dependencyTree, projectPath, new DependencyLookUp());

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  visit(node: STNode): void {
    let api = (node as API);

    let resources = api.getResource();
    for (let resource of resources) {
        this.processResource(resource);
    }

    let publishSwagger = api.getPublishSwagger();
    if (publishSwagger != null) {
        let path = DependencyVisitorUtils.getDependencyPath(publishSwagger, "swagger", this.projectPath);
        let dependency = new Dependency(publishSwagger, ArtifactType.SWAGGER, path);
        this.addDependency(dependency);
    }

  }

  processResource(resource: APIResource): void {
    this.processResourceSequence(resource.getInSequenceAttribute(), resource.getInSequence());
    this.processResourceSequence(resource.getOutSequenceAttribute(), resource.getOutSequence());
    this.processResourceSequence(resource.getFaultSequenceAttribute(), resource.getFaultSequence());

  }

  processResourceSequence(sequenceAttribute: string, sequence: Sequence): void {
    if (sequenceAttribute != null) {
        let dependency =
                DependencyVisitorUtils.visitSequence(this.projectPath, sequenceAttribute, this.dependencyLookUp);
        this.addDependency(dependency);
    } else if (sequence != null) {
        let dependencies =
                DependencyVisitorUtils.visitAnonymousSequence(sequence, this.projectPath, this.dependencyLookUp);
        this.addDependencies(dependencies);
    }

  }
}
