// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/ProxyServiceVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { ArtifactType } from "../ArtifactType.js";
import { Dependency } from "../pojo/Dependency.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { NamedEndpoint } from "../../../../syntaxTree/pojo/endpoint/NamedEndpoint.js";
import { Proxy } from "../../../../syntaxTree/pojo/proxy/Proxy.js";
import { ProxyPolicy } from "../../../../syntaxTree/pojo/proxy/ProxyPolicy.js";
import { ProxyPublishWSDL } from "../../../../syntaxTree/pojo/proxy/ProxyPublishWSDL.js";
import { ProxyTarget } from "../../../../syntaxTree/pojo/proxy/ProxyTarget.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";

export class ProxyServiceVisitor extends AbstractDependencyVisitor {
  static readonly __fields: string[] = [];

  constructor(dependencyTree: DependencyTree, projectPath: string) {
    super(dependencyTree, projectPath, new DependencyLookUp());

  }

  visit(node: STNode): void {
    let proxy = (node as Proxy);

    let target = proxy.getTarget();
    if (target != null) {
        this.visitProxyTarget(target);
    }

    let publishWSDL = proxy.getPublishWSDL();
    if (publishWSDL != null) {
        this.visitPublishWSDL(publishWSDL);
    }

    let policies = proxy.getPolicies();
    if (policies != null) {
        this.visitPolicies(policies);
    }


  }

  visitProxyTarget(target: ProxyTarget): void {
    this.processTargetSequence(target.getInSequenceAttribute(), target.getInSequence());
    this.processTargetSequence(target.getOutSequenceAttribute(), target.getOutSequence());
    this.processTargetSequence(target.getFaultSequenceAttribute(), target.getFaultSequence());
    this.processTargetEndpoint(target.getEndpointAttribute(), target.getEndpoint());

  }

  processTargetEndpoint(endpointAttribute: string, endpoint: NamedEndpoint): void {
    if (endpointAttribute != null) {
        let dependency =
                DependencyVisitorUtils.visitEndpoint(endpointAttribute, this.projectPath, this.dependencyLookUp);
        this.addDependency(dependency);
    } else if (endpoint != null) {
        let dependency = DependencyVisitorUtils.visitEndpoint(endpoint, this.projectPath, this.dependencyLookUp);
        this.addDependency(dependency);
    }

  }

  processTargetSequence(sequenceAttribute: string, sequence: Sequence): void {
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

  visitPublishWSDL(publishWSDL: ProxyPublishWSDL): void {
    if (publishWSDL.getUri() != null) {
        let dependency = new Dependency(publishWSDL.getKey(), ArtifactType.WSDL, publishWSDL.getUri());
        this.addDependency(dependency);
    }

    if (publishWSDL.getKey() != null) {
        let path = DependencyVisitorUtils.getDependencyPath(publishWSDL.getKey(), ArtifactType.WSDL.name(),
                this.projectPath);
        if (path != null) {
            let dependency = new Dependency(publishWSDL.getKey(), ArtifactType.WSDL, path);
            this.addDependency(dependency);
        }
    }

    if (publishWSDL.getEndpoint() != null) {
        let dependency =
                DependencyVisitorUtils.visitEndpoint(publishWSDL.getEndpoint(), this.projectPath, this.dependencyLookUp);
        this.addDependency(dependency);
    }

  }

  visitPolicies(policies: ProxyPolicy[]): void {
    for (let policy of policies) {
        this.visitPolicy(policy);
    }

  }

  visitPolicy(policy: ProxyPolicy): void {
    let policyKey = policy.getKey();
    if (policyKey != null) {
        let path = DependencyVisitorUtils.getDependencyPath(policyKey, ArtifactType.POLICY.name(), this.projectPath);
        if (path != null) {
            let dependency = new Dependency(policyKey, ArtifactType.POLICY, path);
            this.addDependency(dependency);
        }
    }

  }
}
