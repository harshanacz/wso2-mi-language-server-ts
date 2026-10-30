// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/MediatorDependencyVisitor.java by the java2ts converter (see tools/java2ts).
import { format, Logger, Level, entrySet, StringUtils } from "../../../../syntaxTree/javaCompat.js";
import { AIAgent } from "../../../../syntaxTree/pojo/connector/ai/AIAgent.js";
import { AIChat } from "../../../../syntaxTree/pojo/connector/ai/AIChat.js";
import { AIConnector } from "../../../../syntaxTree/pojo/connector/ai/AIConnector.js";
import { AbstractMediatorVisitor } from "../../../AbstractMediatorVisitor.js";
import { Aggregate } from "../../../../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { ArtifactType } from "../ArtifactType.js";
import { Bam } from "../../../../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Bean } from "../../../../syntaxTree/pojo/mediator/extension/Bean.js";
import { Builder } from "../../../../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { Cache } from "../../../../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { Call } from "../../../../syntaxTree/pojo/mediator/core/call/Call.js";
import { CallTemplate } from "../../../../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Callout } from "../../../../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { Clone } from "../../../../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { ConditionalRouter } from "../../../../syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouter.js";
import { Connector } from "../../../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorDependency } from "../pojo/ConnectorDependency.js";
import { Constant } from "../../../../syntaxTree/constant.js";
import { DataServiceCall } from "../../../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { Datamapper } from "../../../../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { DbMediator } from "../../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Dependency } from "../pojo/Dependency.js";
import { DependencyLookUp } from "../DependencyLookUp.js";
import { DependencyVisitorUtils } from "../DependencyVisitorUtils.js";
import { Drop } from "../../../../syntaxTree/pojo/mediator/core/Drop.js";
import { Ejb } from "../../../../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { Enqueue } from "../../../../syntaxTree/pojo/mediator/advanced/Enqueue.js";
import { Enrich } from "../../../../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { EntitlementService } from "../../../../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { Event } from "../../../../syntaxTree/pojo/mediator/advanced/Event.js";
import { FastXSLT } from "../../../../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { Filter } from "../../../../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { Foreach } from "../../../../syntaxTree/pojo/mediator/eip/Foreach.js";
import { Header } from "../../../../syntaxTree/pojo/mediator/core/Header.js";
import { Iterate } from "../../../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { Jsontransform } from "../../../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { KnowledgeBase } from "../../../../syntaxTree/pojo/connector/ai/KnowledgeBase.js";
import { Log } from "../../../../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback } from "../../../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Makefault } from "../../../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { Mediator } from "../../../../syntaxTree/pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../../syntaxTree/pojo/endpoint/NamedEndpoint.js";
import { Ntlm } from "../../../../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { OauthService } from "../../../../syntaxTree/pojo/mediator/other/OauthService.js";
import { PayloadFactory } from "../../../../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { PojoCommand } from "../../../../syntaxTree/pojo/mediator/extension/command/PojoCommand.js";
import { Property } from "../../../../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyGroup } from "../../../../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { PublishEvent } from "../../../../syntaxTree/pojo/mediator/other/publishEvent/PublishEvent.js";
import { Respond } from "../../../../syntaxTree/pojo/mediator/core/Respond.js";
import { Rewrite } from "../../../../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";
import { Rule } from "../../../../syntaxTree/pojo/mediator/other/rule/Rule.js";
import { ScatterGather } from "../../../../syntaxTree/pojo/mediator/eip/ScatterGather.js";
import { Script } from "../../../../syntaxTree/pojo/mediator/extension/Script.js";
import { Send } from "../../../../syntaxTree/pojo/mediator/core/Send.js";
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { SequenceMediator } from "../../../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Smooks } from "../../../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Spring } from "../../../../syntaxTree/pojo/mediator/extension/Spring.js";
import { Store } from "../../../../syntaxTree/pojo/mediator/core/Store.js";
import { Switch } from "../../../../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { Throttle } from "../../../../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";
import { ThrowError } from "../../../../syntaxTree/pojo/mediator/core/ThrowError.js";
import { Transaction } from "../../../../syntaxTree/pojo/mediator/advanced/Transaction.js";
import { Validate } from "../../../../syntaxTree/pojo/mediator/core/validate/Validate.js";
import { Variable } from "../../../../syntaxTree/pojo/mediator/core/Variable.js";
import { Xquery } from "../../../../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";
import { Xslt } from "../../../../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";

export class MediatorDependencyVisitor extends AbstractMediatorVisitor {
  static readonly __fields: string[] = ["projectPath", "dependencies", "dependencyLookUp"];

  static readonly LOGGER: Logger = Logger.getLogger("MediatorDependencyVisitor");

  projectPath?: string;

  dependencies?: Dependency[];

  dependencyLookUp?: DependencyLookUp;

  constructor(projectPath: string, dependencyLookUp: DependencyLookUp) {
    super();
    this.projectPath = projectPath;
    this.dependencyLookUp = dependencyLookUp;
    this.dependencies = [];

  }

  visit(mediator: Mediator): void {
    if (mediator == null) {
        return;
    }
    let tag = mediator.getTag();
    let visitFn = "visit" + tag.substring(0, 1).toUpperCase() + tag.substring(1);
    try {
        let method = AbstractMediatorVisitor.getDeclaredMethod(visitFn, mediator.constructor);
        method.setAccessible(true);
        method.invoke(this, mediator);
    } catch (e) {
        MediatorDependencyVisitor.LOGGER.log(Level.SEVERE, format("Error while visiting mediator: %s", tag), e);
    }

  }

  addSimpleDependency(name: string, from: string, type: ArtifactType): void {
    let path = DependencyVisitorUtils.getDependencyPath(name, from, this.projectPath);
    let dependency = new Dependency(name, type, path);
    this.dependencies.push(dependency);

  }

  addSequenceDependency(name: string): void {
    let dependency = DependencyVisitorUtils.visitSequence(this.projectPath, name, this.dependencyLookUp);
    if (dependency != null) {
        this.dependencies.push(dependency);
    }

  }

  addEndpointDependency(endpoint: NamedEndpoint): void;
  addEndpointDependency(endpoint: string): void;
  addEndpointDependency(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof NamedEndpoint) {
          const [endpoint] = args;


                  let dependency = DependencyVisitorUtils.visitEndpoint(endpoint, this.projectPath, this.dependencyLookUp);
                  if (dependency != null) {
                      this.dependencies.push(dependency);
                  }

        } else if (typeof args[0] === 'string') {
          const [endpoint] = args;


                  let endpointObj = new NamedEndpoint();
                  endpointObj.setName(endpoint);
                  let dependency = DependencyVisitorUtils.visitEndpoint(endpointObj, this.projectPath, this.dependencyLookUp);
                  if (dependency != null) {
                      this.dependencies.push(dependency);
                  }

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getDependencies(): Dependency[] {
    return this.dependencies;

  }

  visitConnector(node: Connector): void {
    if (node.getConfigKey() != null) {
        this.addSimpleDependency(node.getConfigKey(), "connector", ArtifactType.CONNECTION);
    }
    this.addConnectorUsageDependency(node);

  }

  addConnectorUsageDependency(node: Connector): void {
    let dependency = new ConnectorDependency(node.getConnectorName(), ArtifactType.CONNECTOR, null);
    dependency.setOperationName(node.getMethod());
    this.dependencies.push(dependency);

  }

  visitPropertyGroup(node: PropertyGroup): void {


  }

  visitJsontransform(node: Jsontransform): void {
    if (node.getSchema() != null) {
        this.addSimpleDependency(node.getSchema(), ArtifactType.JSON_SCHEMA.name(), ArtifactType.JSON_SCHEMA);
    }

  }

  visitMakefault(node: Makefault): void {



  }

  visitSmooks(node: Smooks): void {
    if (node.getConfigKey() != null) {
        this.addSimpleDependency(node.getConfigKey(), ArtifactType.SMOOKS_CONFIG.name(), ArtifactType.SMOOKS_CONFIG);
    }

  }

  visitHeader(node: Header): void {


  }

  visitDataServiceCall(node: DataServiceCall): void {
    if (node.getServiceName() != null) {
        this.addSimpleDependency(node.getServiceName(), "data-services", ArtifactType.DATA_SERVICE);
    }

  }

  visitTransaction(node: Transaction): void {


  }

  visitDatamapper(node: Datamapper): void {
    if (node.getInputSchema() != null) {
        this.addSimpleDependency(node.getInputSchema(), ArtifactType.DATA_MAPPER_INPUT_SCHEMA.name(),
                ArtifactType.DATA_MAPPER_INPUT_SCHEMA);
    }
    if (node.getOutputSchema() != null) {
        this.addSimpleDependency(node.getOutputSchema(), ArtifactType.DATA_MAPPER_OUTPUT_SCHEMA.name(),
                ArtifactType.DATA_MAPPER_OUTPUT_SCHEMA);
    }
    if (node.getConfig() != null) {
        this.addSimpleDependency(node.getConfig(), ArtifactType.DATA_MAPPER_CONFIG.name(),
                ArtifactType.DATA_MAPPER_CONFIG);
    }
    if (node.getXsltStyleSheet() != null) {
        this.addSimpleDependency(node.getXsltStyleSheet(), ArtifactType.XSLT.name(), ArtifactType.XSLT);
    }

  }

  visitPojoCommand(node: PojoCommand): void {


  }

  visitPayloadFactory(node: PayloadFactory): void {


  }

  visitEntitlementService(node: EntitlementService): void {
    this.addAnonymousOrAttributeSequence(node.getOnAccept(), node.getOnAcceptAttribute());
    this.addAnonymousOrAttributeSequence(node.getOnReject(), node.getOnRejectAttribute());
    this.addAnonymousOrAttributeSequence(node.getAdvice(), node.getAdviceAttribute());
    this.addAnonymousOrAttributeSequence(node.getObligations(), node.getObligationsAttribute());

  }

  addAnonymousOrAttributeEndpoint(endpoint: NamedEndpoint, attribute: string): void {
    if (endpoint != null) {
        let dependency = DependencyVisitorUtils.visitEndpoint(endpoint, this.projectPath, this.dependencyLookUp);
        if (dependency != null) {
            this.dependencies.push(dependency);
        }
    } else if (attribute != null) {
        this.addEndpointDependency(attribute);
    }

  }

  addAnonymousOrAttributeSequence(sequence: Sequence, attribute: string): void;
  addAnonymousOrAttributeSequence(sequence: Mediator[], attribute: string): void;
  addAnonymousOrAttributeSequence(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (args[0] instanceof Sequence) {
          const [sequence, attribute] = args;


                  if (sequence != null) {
                      let dependencyList =
                              DependencyVisitorUtils.visitAnonymousSequence(sequence, this.projectPath, this.dependencyLookUp);
                      this.dependencies.push(...dependencyList);
                  } else if (attribute != null) {
                      this.addSequenceDependency(attribute);
                  }

        } else if (Array.isArray(args[0])) {
          const [sequence, attribute] = args;


                  if (sequence != null) {
                      let dependencyList =
                              DependencyVisitorUtils.visitMediators(sequence, this.projectPath, this.dependencyLookUp);
                      this.dependencies.push(...dependencyList);
                  } else if (attribute != null) {
                      this.addSequenceDependency(attribute);
                  }

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  visitThrottle(node: Throttle): void {
    this.addAnonymousOrAttributeSequence(node.getOnAccept(), node.getOnAcceptAttribute());
    this.addAnonymousOrAttributeSequence(node.getOnReject(), node.getOnRejectAttribute());
    if (node.getPolicies() != null && node.getPolicies().getKey() != null) {
        this.addSimpleDependency(node.getPolicies().getKey(), ArtifactType.THROTTLE_POLICY.name(),
                ArtifactType.THROTTLE_POLICY);
    }

  }

  visitCache(node: Cache): void {
    this.addAnonymousOrAttributeSequence(node.getOnCacheHit().getMediatorList(), node.getOnCacheHit().getSequence());

  }

  visitEnqueue(node: Enqueue): void {
    if (node.getSequence() != null) {
        this.addSequenceDependency(node.getSequence());
    }

  }

  visitDbreport(node: DbMediator): void {
    if (node.getConnection() != null && node.getConnection().getPool() != null &&
            node.getConnection().getPool().getDsName() != null &&
            node.getConnection().getPool().getDsName().getValue() != null) {
        this.addSimpleDependency(node.getConnection().getPool().getDsName().getValue(), ArtifactType.DATASOURCE.name(),
                ArtifactType.DATASOURCE);
    }

  }

  visitDblookup(node: DbMediator): void {
    if (node.getConnection() != null && node.getConnection().getPool() != null &&
            node.getConnection().getPool().getDsName() != null &&
            node.getConnection().getPool().getDsName().getValue() != null) {
        this.addSimpleDependency(node.getConnection().getPool().getDsName().getValue(), ArtifactType.DATASOURCE.name(),
                ArtifactType.DATASOURCE);
    }

  }

  visitEvent(node: Event): void {


  }

  visitRespond(node: Respond): void {


  }

  visitPublishEvent(node: PublishEvent): void {


  }

  visitSwitch(node: Switch): void {
    if (node.get_default() != null) {
        this.addAnonymousOrAttributeSequence(node.get_default().getMediatorList(), null);
    }
    let cases = node.get_case();
    if (cases != null) {
        for (let case1 of cases) {
            this.addAnonymousOrAttributeSequence(case1.getMediatorList(), null);
        }
    }

  }

  visitSpring(node: Spring): void {


  }

  visitRule(node: Rule): void {


  }

  visitConditionalRouter(node: ConditionalRouter): void {
    let routes = node.getConditionalRoute();
    if (routes != null) {
        for (let route of routes) {
            if (route.getTarget() != null && route.getTarget().getSequenceAttribute() != null) {
                this.addSequenceDependency(route.getTarget().getSequenceAttribute());
            }
        }
    }

  }

  visitLoopback(node: Loopback): void {


  }

  visitStore(node: Store): void {
    if (node.getMessageStore() != null) {
        let dependency =
                DependencyVisitorUtils.visitMessageStore(node.getMessageStore(), this.projectPath, this.dependencyLookUp);
        if (dependency != null) {
            this.dependencies.push(dependency);
        }
    }
    if (node.getSequence() != null) {
        this.addSequenceDependency(node.getSequence());
    }

  }

  visitValidate(node: Validate): void {
    let resources = node.getResource();
    if (resources != null) {
        for (let resource of resources) {
            if (resource.getKey() != null) {
                this.addSimpleDependency(resource.getKey(), ArtifactType.VALIDATE_RESOURCE.name(),
                        ArtifactType.VALIDATE_RESOURCE);
            }
        }
    }

    let schemas = node.getSchema();
    if (schemas != null) {
        for (let schema of schemas) {
            if (schema.getKey() != null) {
                this.addSimpleDependency(schema.getKey(), ArtifactType.VALIDATE_SCHEMA.name(),
                        ArtifactType.VALIDATE_SCHEMA);
            }
        }
    }

    if (node.getOnFail() != null && node.getOnFail().getMediatorList() != null) {
        this.addAnonymousOrAttributeSequence(node.getOnFail().getMediatorList(), null);
    }

  }

  visitFilter(node: Filter): void {
    if (node.getThen() != null) {
        this.addAnonymousOrAttributeSequence(node.getThen().getMediatorList(), node.getThen().getSequence());
    }
    if (node.getElse_() != null) {
        this.addAnonymousOrAttributeSequence(node.getElse_().getMediatorList(), node.getElse_().getSequence());
    }

  }

  visitSend(node: Send): void {
    if (node.getEndpoint() != null) {
        this.addEndpointDependency(node.getEndpoint());
    }
    if (node.getReceive() != null) {
        this.addSequenceDependency(node.getReceive());
    }

  }

  visitClone(node: Clone): void {
    let targets = node.getTarget();
    if (targets != null) {
        for (let target of targets) {
            if (target.getSequence() != null) {
                this.addAnonymousOrAttributeSequence(target.getSequence(), target.getSequenceAttribute());
            }
            if (target.getEndpoint() != null) {
                this.addAnonymousOrAttributeEndpoint(target.getEndpoint(), target.getEndpointAttribute());
            }
        }
    }

  }

  visitClass(node: any): void {


  }

  visitAggregate(node: Aggregate): void {
    if (node.getCorrelateOnOrCompleteConditionOrOnComplete() != null) {
        let onComplete = node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete();
        this.addAnonymousOrAttributeSequence(onComplete.getMediatorList(), onComplete.getSequenceAttribute());
    }

  }

  visitLog(node: Log): void {


  }

  visitEjb(node: Ejb): void {


  }

  visitNTLM(node: Ntlm): void {


  }

  visitRewrite(node: Rewrite): void {


  }

  visitCallTemplate(node: CallTemplate): void {
    if (node.getTarget() != null) {
        this.addSimpleDependency(node.getTarget(), "templates", ArtifactType.TEMPLATE);
    }
    if (node.getOnError() != null) {
        this.addSequenceDependency(node.getOnError());
    }

  }

  visitCall(node: Call): void {
    if (node.getEndpoint() != null) {
        this.addEndpointDependency(node.getEndpoint());
    }

  }

  visitIterate(node: Iterate): void {
    if (node.getTarget() != null) {
        this.addAnonymousOrAttributeSequence(node.getTarget().getSequence(), node.getTarget().getSequenceAttribute());
    }

  }

  visitProperty(node: Property): void {


  }

  visitVariable(node: Variable): void {


  }

  visitScatterGather(node: ScatterGather): void {
    let targets = node.getTargets();
    if (targets != null) {
        for (let target of targets) {
            if (target.getSequence() != null) {
                this.addAnonymousOrAttributeSequence(target.getSequence(), target.getSequenceAttribute());
            }
        }
    }

  }

  visitForeach(node: Foreach): void {
    this.addAnonymousOrAttributeSequence(node.getSequence(), node.getSequenceAttribute());

  }

  visitEnrich(node: Enrich): void {


  }

  visitScript(node: Script): void {
    if (node.getKey() != null) {
        this.addSimpleDependency(node.getKey(), ArtifactType.SCRIPT.name(), ArtifactType.SCRIPT);
    }

  }

  visitBean(node: Bean): void {


  }

  visitXquery(node: Xquery): void {
    if (node.getKey() != null) {
        this.addSimpleDependency(node.getKey(), ArtifactType.XQUERY.name(), ArtifactType.XQUERY);
    }

    let variables = node.getVariable();
    if (variables != null) {
        for (let variable of variables) {
            if (variable.getKey() != null) {
                this.addSimpleDependency(variable.getKey(), ArtifactType.XQUERY_VARIABLE.name(),
                        ArtifactType.XQUERY_VARIABLE);
            }
        }
    }

  }

  visitBuilder(node: Builder): void {


  }

  visitDrop(node: Drop): void {


  }

  visitXslt(node: Xslt): void {
    if (node.getKey() != null) {
        this.addSimpleDependency(node.getKey(), ArtifactType.XSLT.name(), ArtifactType.XSLT);
    }

    let resources = node.getResource();
    if (resources != null) {
        for (let resource of resources) {
            if (resource.getKey() != null) {
                this.addSimpleDependency(resource.getKey(), ArtifactType.XSLT_RESOURCE.name(),
                        ArtifactType.XSLT_RESOURCE);
            }
        }
    }

  }

  visitBam(node: Bam): void {


  }

  visitFastXSLT(node: FastXSLT): void {
    if (node.getKey() != null) {
        this.addSimpleDependency(node.getKey(), ArtifactType.XSLT.name(), ArtifactType.XSLT);
    }

  }

  visitOauthService(node: OauthService): void {


  }

  visitCallout(node: Callout): void {
    if (node.getEndpointKey() != null) {
        this.addEndpointDependency(node.getEndpointKey());
    }

    let enableSec = node.getSourceOrTargetOrConfiguration().getEnableSec();
    if (enableSec.getPolicy() != null) {
        this.addSimpleDependency(enableSec.getPolicy(), ArtifactType.POLICY.name(), ArtifactType.POLICY);
    } else {
        if (enableSec.getInboundPolicy() != null) {
            this.addSimpleDependency(enableSec.getInboundPolicy(), ArtifactType.POLICY.name(), ArtifactType.POLICY);
        }
        if (enableSec.getOutboundPolicy() != null) {
            this.addSimpleDependency(enableSec.getOutboundPolicy(), ArtifactType.POLICY.name(), ArtifactType.POLICY);
        }
    }

  }

  visitSequence(node: SequenceMediator): void {
    if (node.getKey() != null) {
        this.addSequenceDependency(node.getKey());
    }

  }

  visitAIConnector(node: AIConnector): void {
    let connectionMap = node.getConnections();
    if (connectionMap == null) {
        return;
    }
    for (let entry of entrySet(connectionMap)) {
        let connection = entry.getValue();
        if (connection != null && StringUtils.isNotEmpty(connection.getName())) {
            this.addSimpleDependency(connection.getName(), Constant.CONNECTOR, ArtifactType.CONNECTION);
        }
    }

  }

  visitAIChat(node: AIChat): void {
    this.visitAIConnector(node);

  }

  visitAIAgent(node: AIAgent): void {
    this.visitAIConnector(node);
    if (node.getTools() != null && node.getTools().getTools() != null) {
        for (let tool of node.getTools().getTools()) {
            if (tool.getTemplate() != null) {
                this.addSimpleDependency(tool.getTemplate(), Constant.CONNECTOR, ArtifactType.TEMPLATE);
            }
        }
    }
    this.addConnectorUsageDependency(node);

  }

  visitAIKnowledgeBase(node: KnowledgeBase): void {
    this.visitAIConnector(node);

  }

  visitThrowError(node: ThrowError): void {


  }
}
