// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/AbstractMediatorVisitor.java by the java2ts converter (see tools/java2ts).
import { AIAgent } from "../syntaxTree/pojo/connector/ai/AIAgent.js";
import { AIChat } from "../syntaxTree/pojo/connector/ai/AIChat.js";
import { Aggregate } from "../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { Bam } from "../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Bean } from "../syntaxTree/pojo/mediator/extension/Bean.js";
import { Builder } from "../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { Cache } from "../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { Call } from "../syntaxTree/pojo/mediator/core/call/Call.js";
import { CallTemplate } from "../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Callout } from "../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { Clone } from "../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { ConditionalRouter } from "../syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouter.js";
import { Connector } from "../syntaxTree/pojo/connector/Connector.js";
import { DataServiceCall } from "../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { Datamapper } from "../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { DbMediator } from "../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Drop } from "../syntaxTree/pojo/mediator/core/Drop.js";
import { Ejb } from "../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { Enqueue } from "../syntaxTree/pojo/mediator/advanced/Enqueue.js";
import { Enrich } from "../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { EntitlementService } from "../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { Event } from "../syntaxTree/pojo/mediator/advanced/Event.js";
import { FastXSLT } from "../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { Filter } from "../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { Foreach } from "../syntaxTree/pojo/mediator/eip/Foreach.js";
import { Header } from "../syntaxTree/pojo/mediator/core/Header.js";
import { Iterate } from "../syntaxTree/pojo/mediator/eip/Iterate.js";
import { Jsontransform } from "../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { KnowledgeBase } from "../syntaxTree/pojo/connector/ai/KnowledgeBase.js";
import { Log } from "../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback } from "../syntaxTree/pojo/mediator/core/Loopback.js";
import { Makefault } from "../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { Ntlm } from "../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { OauthService } from "../syntaxTree/pojo/mediator/other/OauthService.js";
import { PayloadFactory } from "../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { PojoCommand } from "../syntaxTree/pojo/mediator/extension/command/PojoCommand.js";
import { Property } from "../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyGroup } from "../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { PublishEvent } from "../syntaxTree/pojo/mediator/other/publishEvent/PublishEvent.js";
import { Respond } from "../syntaxTree/pojo/mediator/core/Respond.js";
import { Rewrite } from "../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";
import { Rule } from "../syntaxTree/pojo/mediator/other/rule/Rule.js";
import { ScatterGather } from "../syntaxTree/pojo/mediator/eip/ScatterGather.js";
import { Script } from "../syntaxTree/pojo/mediator/extension/Script.js";
import { Send } from "../syntaxTree/pojo/mediator/core/Send.js";
import { SequenceMediator } from "../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Smooks } from "../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Spring } from "../syntaxTree/pojo/mediator/extension/Spring.js";
import { Store } from "../syntaxTree/pojo/mediator/core/Store.js";
import { Switch } from "../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { Throttle } from "../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";
import { ThrowError } from "../syntaxTree/pojo/mediator/core/ThrowError.js";
import { Transaction } from "../syntaxTree/pojo/mediator/advanced/Transaction.js";
import { Validate } from "../syntaxTree/pojo/mediator/core/validate/Validate.js";
import { Variable } from "../syntaxTree/pojo/mediator/core/Variable.js";
import { Xquery } from "../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";
import { Xslt } from "../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";

export abstract class AbstractMediatorVisitor {
  static readonly __fields: string[] = [];

  abstract visitConnector(node: Connector): void;

  abstract visitPropertyGroup(node: PropertyGroup): void;

  abstract visitJsontransform(node: Jsontransform): void;

  abstract visitMakefault(node: Makefault): void;

  abstract visitSmooks(node: Smooks): void;

  abstract visitHeader(node: Header): void;

  abstract visitDataServiceCall(node: DataServiceCall): void;

  abstract visitTransaction(node: Transaction): void;

  abstract visitDatamapper(node: Datamapper): void;

  abstract visitPojoCommand(node: PojoCommand): void;

  abstract visitPayloadFactory(node: PayloadFactory): void;

  abstract visitEntitlementService(node: EntitlementService): void;

  abstract visitThrottle(node: Throttle): void;

  abstract visitCache(node: Cache): void;

  abstract visitEnqueue(node: Enqueue): void;

  abstract visitDbreport(node: DbMediator): void;

  abstract visitDblookup(node: DbMediator): void;

  abstract visitEvent(node: Event): void;

  abstract visitRespond(node: Respond): void;

  abstract visitPublishEvent(node: PublishEvent): void;

  abstract visitSwitch(node: Switch): void;

  abstract visitSpring(node: Spring): void;

  abstract visitRule(node: Rule): void;

  abstract visitConditionalRouter(node: ConditionalRouter): void;

  abstract visitLoopback(node: Loopback): void;

  abstract visitStore(node: Store): void;

  abstract visitValidate(node: Validate): void;

  abstract visitFilter(node: Filter): void;

  abstract visitSend(node: Send): void;

  abstract visitClone(node: Clone): void;

  abstract visitClass(node: any): void;

  abstract visitAggregate(node: Aggregate): void;

  abstract visitLog(node: Log): void;

  abstract visitEjb(node: Ejb): void;

  abstract visitNTLM(node: Ntlm): void;

  abstract visitRewrite(node: Rewrite): void;

  abstract visitCallTemplate(node: CallTemplate): void;

  abstract visitCall(node: Call): void;

  abstract visitIterate(node: Iterate): void;

  abstract visitProperty(node: Property): void;

  abstract visitVariable(node: Variable): void;

  abstract visitScatterGather(node: ScatterGather): void;

  abstract visitForeach(node: Foreach): void;

  abstract visitEnrich(node: Enrich): void;

  abstract visitScript(node: Script): void;

  abstract visitBean(node: Bean): void;

  abstract visitXquery(node: Xquery): void;

  abstract visitBuilder(node: Builder): void;

  abstract visitDrop(node: Drop): void;

  abstract visitXslt(node: Xslt): void;

  abstract visitBam(node: Bam): void;

  abstract visitFastXSLT(node: FastXSLT): void;

  abstract visitOauthService(node: OauthService): void;

  abstract visitCallout(node: Callout): void;

  abstract visitSequence(node: SequenceMediator): void;

  abstract visitThrowError(node: ThrowError): void;

  abstract visitAIChat(node: AIChat): void;

  abstract visitAIAgent(node: AIAgent): void;

  abstract visitAIKnowledgeBase(node: KnowledgeBase): void;
}
