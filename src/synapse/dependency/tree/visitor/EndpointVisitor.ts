// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/EndpointVisitor.java by the java2ts converter (see tools/java2ts).
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { ArtifactType } from "../ArtifactType.js";
import { ChildEndpoint } from "../../../../syntaxTree/pojo/endpoint/ChildEndpoint.js";
import { Dependency } from "../pojo/Dependency.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { EndpointEnableSec } from "../../../../syntaxTree/pojo/endpoint/common/EndpointEnableSec.js";
import { EndpointType } from "../../../../syntaxTree/pojo/endpoint/EndpointType.js";
import { NamedEndpoint } from "../../../../syntaxTree/pojo/endpoint/NamedEndpoint.js";
import { STNode } from "../../../../syntaxTree/stNode.js";

export class EndpointVisitor extends AbstractDependencyVisitor {
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
    let endpoint = (node as NamedEndpoint);
    switch (endpoint.getType()) {
        case HTTP_ENDPOINT:
            let httpEndpoint = endpoint.getHttp();
            if (httpEndpoint != null) {
                let configs =
                        httpEndpoint.getEnableSecAndEnableRMAndEnableAddressing();
                if (configs != null) {
                    if (configs.getEnableSec() != null && (configs.getEnableSec() != null)) {
                        let enableSec = configs.getEnableSec();
                        this.visitEnableSec(enableSec);
                    }
                }
            }
            break;
        case ADDRESS_ENDPOINT:
            let addressEndpoint = endpoint.getAddress();
            if (addressEndpoint != null) {
                let enableSec = addressEndpoint.getEnableSec();
                if (enableSec != null) {
                    this.visitEnableSec(enableSec);
                }
            }
            break;
        case DEFAULT_ENDPOINT:
            let defaultEndpoint = endpoint.get_default();
            if (defaultEndpoint != null) {
                let enableSec = defaultEndpoint.getEnableSec();
                if (enableSec != null) {
                    this.visitEnableSec(enableSec);
                }
            }
            break;
        case FAIL_OVER_ENDPOINT:
            let failOver = endpoint.getFailover();
            if (failOver != null) {
                let endpoints = failOver.getEndpoint();
                if (endpoints != null) {
                    for (let childEndpoint of endpoints) {
                        this.visitChildEndpoint(childEndpoint);
                    }
                }
            }
            break;
        case LOAD_BALANCE_ENDPOINT:
            let loadBalance = endpoint.getLoadbalance();
            if (loadBalance != null) {
                let endpointOrMembers = loadBalance.getEndpointOrMember();
                if (endpointOrMembers != null) {
                    for (let endpointOrMember of endpointOrMembers) {
                        if (endpointOrMember.isEndpoint()) {
                            this.visitChildEndpoint(endpointOrMember.getEndpoint());
                        }
                    }
                }
            }
            break;
        case RECIPIENT_LIST_ENDPOINT:
            let recipientListEp = endpoint.getRecipientlist();
            if (recipientListEp != null) {
                let childEndpoints = recipientListEp.getEndpoint();
                if (childEndpoints != null) {
                    for (let childEndpoint of childEndpoints) {
                        this.visitChildEndpoint(childEndpoint);
                    }
                }
            }
            break;
        case TEMPLATE_ENDPOINT:
            let template = endpoint.getTemplate();
            if (template != null) {
                this.addDependency(DependencyVisitorUtils.visitTemplate(this.projectPath, template, this.dependencyLookUp));
            }
            break;
        case WSDL_ENDPOINT:
            let wsdlEndpoint = endpoint.getWsdl();
            if (wsdlEndpoint != null) {
                let enableSec = wsdlEndpoint.getEnableSec();
                if (enableSec != null) {
                    this.visitEnableSec(enableSec);
                }
            }
            break;
    }

  }

  visitChildEndpoint(childEndpoint: ChildEndpoint): void {
    let endpoint = new NamedEndpoint();
    if (endpoint.get_default() != null) {
        endpoint.set_default(childEndpoint.get_default());
        endpoint.setType(EndpointType.DEFAULT_ENDPOINT);
    } else if (childEndpoint.getHttp() != null) {
        endpoint.setHttp(childEndpoint.getHttp());
        endpoint.setType(EndpointType.HTTP_ENDPOINT);
    } else if (childEndpoint.getAddress() != null) {
        endpoint.setAddress(childEndpoint.getAddress());
        endpoint.setType(EndpointType.ADDRESS_ENDPOINT);
    } else if (childEndpoint.getWsdl() != null) {
        endpoint.setWsdl(childEndpoint.getWsdl());
        endpoint.setType(EndpointType.WSDL_ENDPOINT);
    } else if (childEndpoint.getLoadbalance() != null) {
        endpoint.setLoadbalance(childEndpoint.getLoadbalance());
        endpoint.setType(EndpointType.LOAD_BALANCE_ENDPOINT);
    } else if (childEndpoint.getFailover() != null) {
        endpoint.setFailover(childEndpoint.getFailover());
        endpoint.setType(EndpointType.FAIL_OVER_ENDPOINT);
    }
    this.visit(endpoint);

  }

  visitEnableSec(enableSec: EndpointEnableSec): void {
    let policy = enableSec.getPolicy();
    if (policy != null) {
        this.addPolicyDependency(policy);
    }
    let inboundPolicy = enableSec.getInboundPolicy();
    if (inboundPolicy != null) {
        this.addPolicyDependency(inboundPolicy);
    }
    let outboundPolicy = enableSec.getOutboundPolicy();
    if (outboundPolicy != null) {
        this.addPolicyDependency(outboundPolicy);
    }

  }

  addPolicyDependency(policyKey: string): void {
    let policyPath =
            DependencyVisitorUtils.getDependencyPath(policyKey, ArtifactType.POLICY.name(), this.projectPath);
    this.addDependency(new Dependency(policyKey, ArtifactType.POLICY, policyPath));

  }
}
