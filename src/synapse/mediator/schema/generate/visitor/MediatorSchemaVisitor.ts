// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/MediatorSchemaVisitor.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, StringUtils } from "../../../../../syntaxTree/javaCompat.js";
import { AIAgent } from "../../../../../syntaxTree/pojo/connector/ai/AIAgent.js";
import { AIChat } from "../../../../../syntaxTree/pojo/connector/ai/AIChat.js";
import { AbstractMediatorVisitor } from "../../../../AbstractMediatorVisitor.js";
import { Aggregate } from "../../../../../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { Bam } from "../../../../../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Bean } from "../../../../../syntaxTree/pojo/mediator/extension/Bean.js";
import { Builder } from "../../../../../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { Cache } from "../../../../../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { Call } from "../../../../../syntaxTree/pojo/mediator/core/call/Call.js";
import { CallTemplate } from "../../../../../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Callout } from "../../../../../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { Clone } from "../../../../../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { ConditionalRouter } from "../../../../../syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouter.js";
import { ConfigFinder } from "../../../../utils/ConfigFinder.js";
import { Connector } from "../../../../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorHolder } from "../../../../connectors/ConnectorHolder.js";
import { Constant } from "../../../../../syntaxTree/constant.js";
import { DataServiceCall } from "../../../../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { Datamapper } from "../../../../../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { DbMediator } from "../../../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Drop } from "../../../../../syntaxTree/pojo/mediator/core/Drop.js";
import { Ejb } from "../../../../../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { Enqueue } from "../../../../../syntaxTree/pojo/mediator/advanced/Enqueue.js";
import { Enrich } from "../../../../../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { EntitlementService } from "../../../../../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { Event } from "../../../../../syntaxTree/pojo/mediator/advanced/Event.js";
import { FastXSLT } from "../../../../../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { Filter } from "../../../../../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { Foreach } from "../../../../../syntaxTree/pojo/mediator/eip/Foreach.js";
import { Header } from "../../../../../syntaxTree/pojo/mediator/core/Header.js";
import { Iterate } from "../../../../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { JsonObject } from "../../../../gson.js";
import { JsonPrimitive } from "../../../../gson.js";
import { Jsontransform } from "../../../../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { KnowledgeBase } from "../../../../../syntaxTree/pojo/connector/ai/KnowledgeBase.js";
import { Log } from "../../../../../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback } from "../../../../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Makefault } from "../../../../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { Ntlm } from "../../../../../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { OauthService } from "../../../../../syntaxTree/pojo/mediator/other/OauthService.js";
import { PayloadFactory } from "../../../../../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { PojoCommand } from "../../../../../syntaxTree/pojo/mediator/extension/command/PojoCommand.js";
import { Position } from "../../../../lsp.js";
import { Utils as SynUtils } from "../../../../../syntaxTree/utils.js";
import { Property as TryoutProperty } from "../../../tryout/pojo/Property.js";
import { PropertyScope } from "../../../../../syntaxTree/pojo/mediator/core/PropertyScope.js";
import { Property } from "../../../../../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyGroup } from "../../../../../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { PublishEvent } from "../../../../../syntaxTree/pojo/mediator/other/publishEvent/PublishEvent.js";
import { Respond } from "../../../../../syntaxTree/pojo/mediator/core/Respond.js";
import { Rewrite } from "../../../../../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";
import { Rule } from "../../../../../syntaxTree/pojo/mediator/other/rule/Rule.js";
import { ScatterGather } from "../../../../../syntaxTree/pojo/mediator/eip/ScatterGather.js";
import { Script } from "../../../../../syntaxTree/pojo/mediator/extension/Script.js";
import { Send } from "../../../../../syntaxTree/pojo/mediator/core/Send.js";
import { SequenceMediator } from "../../../../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Smooks } from "../../../../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Spring } from "../../../../../syntaxTree/pojo/mediator/extension/Spring.js";
import { Store } from "../../../../../syntaxTree/pojo/mediator/core/Store.js";
import { Switch } from "../../../../../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { Throttle } from "../../../../../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";
import { ThrowError } from "../../../../../syntaxTree/pojo/mediator/core/ThrowError.js";
import { Transaction } from "../../../../../syntaxTree/pojo/mediator/advanced/Transaction.js";
import { Utils } from "./Utils.js";
import { Validate } from "../../../../../syntaxTree/pojo/mediator/core/validate/Validate.js";
import { Variable } from "../../../../../syntaxTree/pojo/mediator/core/Variable.js";
import { Xquery } from "../../../../../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";
import { Xslt } from "../../../../../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";
import { JFile } from "../../../../host/JFile.js";

export class MediatorSchemaVisitor extends AbstractMediatorVisitor {
  static readonly __fields: string[] = ["projectPath", "info", "position"];

  projectPath?: string;

  info?: MediatorTryoutInfo;

  position?: Position;

  constructor(projectPath: string, info: MediatorTryoutInfo, position: Position) {
    super();
    this.projectPath = projectPath;
    this.info = info;
    this.position = position;

  }

  visitConnector(node: Connector): void {
    if (node.getConnectorName() == null) {
        return;
    }
    this.handleResponseVariable(node);
    this.handleTargetVariable(node);

  }

  visitPropertyGroup(node: PropertyGroup): void {
    let properties = node.getProperty();
    if (properties != null) {
        for (let property of properties) {
            this.visitProperty(property);
        }
    }

  }

  visitJsontransform(node: Jsontransform): void {


  }

  visitMakefault(node: Makefault): void {

  }

  visitSmooks(node: Smooks): void {

  }

  visitHeader(node: Header): void {
    if (equalsIgnoreCase(Constant.SET, node.getAction())) {
        let name = node.getName();
        let value = node.getValue() != null ? node.getValue() : node.getExpression();
        let property =
                new TryoutProperty(name, value);
        this.info.addOutputHeader(property);
    } else if (equalsIgnoreCase(Constant.REMOVE, node.getAction())) {
        let name = node.getName();
        this.info.removeOutputHeader(name);
    }

  }

  visitDataServiceCall(node: DataServiceCall): void {

  }

  visitTransaction(node: Transaction): void {

  }

  visitDatamapper(node: Datamapper): void {


  }

  visitPojoCommand(node: PojoCommand): void {

  }

  visitPayloadFactory(node: PayloadFactory): void {
    let content = (node.getFormat().getContent() as string);
    if (!StringUtils.isEmpty(content)) {
        this.info.setOutputPayload(new JsonPrimitive(content));
    } else if (node.getFormat().getKey() != null) {
        try {
            let path =
                    ConfigFinder.findEsbComponentPath(node.getFormat().getKey(), Constant.RESOURCE, this.projectPath);
            let regContent = SynUtils.readFile(new JFile(path));
            this.info.setOutputPayload(new JsonPrimitive(regContent));
        } catch (e) {
            this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));
        }
    } else {
        this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));
    }

  }

  visitEntitlementService(node: EntitlementService): void {

  }

  visitThrottle(node: Throttle): void {


  }

  visitCache(node: Cache): void {


  }

  visitEnqueue(node: Enqueue): void {

  }

  visitDbreport(node: DbMediator): void {

  }

  visitDblookup(node: DbMediator): void {

  }

  visitEvent(node: Event): void {

  }

  visitRespond(node: Respond): void {


  }

  visitPublishEvent(node: PublishEvent): void {

  }

  visitSwitch(node: Switch): void {

  }

  visitSpring(node: Spring): void {

  }

  visitRule(node: Rule): void {

  }

  visitConditionalRouter(node: ConditionalRouter): void {

  }

  visitLoopback(node: Loopback): void {


  }

  visitStore(node: Store): void {

  }

  visitValidate(node: Validate): void {

  }

  visitFilter(node: Filter): void {
    if (node.getThen() != null && Utils.checkNodeInRange(node.getThen(), this.position)) {
        Utils.visitMediators(this.projectPath, node.getThen().getMediatorList(), this.info, this.position);
    } else if (node.getElse_() != null && Utils.checkNodeInRange(node.getElse_(), this.position)) {
        Utils.visitMediators(this.projectPath, node.getElse_().getMediatorList(), this.info, this.position);
    } else {
        Utils.visitMediators(this.projectPath, node.getThen().getMediatorList(), this.info, this.position);
        Utils.visitMediators(this.projectPath, node.getElse_().getMediatorList(), this.info, this.position);
    }

  }

  visitSend(node: Send): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitClone(node: Clone): void {


  }

  visitClass(node: any): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitAggregate(node: Aggregate): void {

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
        Utils.visitSequenceTemplate(this.projectPath, node.getTarget(), this.info, this.position);
    }

  }

  visitCall(node: Call): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitIterate(node: Iterate): void {
    let target = node.getTarget();
    if (target != null) {
        Utils.visitSequence(this.projectPath, target.getSequence(), this.info, this.position, true);
    }

  }

  visitProperty(node: Property): void {
    let propertyName = node.getName();
    let scope = node.getScope();
    let property =
            new TryoutProperty(propertyName,
                    node.getValue() != null ? node.getValue() : node.getExpression());
    if (scope != null) {
        switch (scope) {
            case PropertyScope.AXIS2:
                this.info.addOutputAxis2Properties(property);
                break;
            case PropertyScope.AXIS2_CLIENT:
                this.info.addOutputAxis2ClientProperties(property);
                break;
            case PropertyScope.OPERATION:
                this.info.addOutputAxis2OperationProperties(property);
                break;
            case PropertyScope.TRANSPORT:
                this.info.addOutputAxis2TransportProperties(property);
                break;
            default:
                this.info.addOutputSynapseProperties(property);
        }
    } else {
        this.info.addOutputSynapseProperties(property);
    }

  }

  visitVariable(node: Variable): void {
    let action = node.getAction();
    let name = node.getName();
    if (equalsIgnoreCase(Constant.SET, action)) {
        let value = node.getValue() != null ? node.getValue() : node.getExpression();
        this.info.addOutputVariable(name, value);
    } else if (equalsIgnoreCase(Constant.REMOVE, action)) {
        this.info.removeOutputVariable(name);
    }

  }

  visitScatterGather(node: ScatterGather): void {
    if (!Utils.checkNodeInRange(node, this.position) && node.getResultTarget() != null) {
        if (equalsIgnoreCase(Constant.VARIABLE, node.getResultTarget())) {
            this.info.addOutputVariable(node.getVariableName(), StringUtils.EMPTY);
        } else {
            this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));
        }
    }

  }

  visitForeach(node: Foreach): void {
    let sequence = node.getSequence();
    if (sequence != null) {
        let initialPayload = this.info.getInput().getPayload().getAsString();
        let collectionToIterate = node.getCollection();
        let iterateContent = Utils.getIterateContent(this.info, collectionToIterate);
        this.info.setOutputPayload(new JsonPrimitive(iterateContent));
        Utils.visitSequence(this.projectPath, sequence, this.info, this.position, true);
        if (!Utils.checkNodeInRange(node, this.position)) {
            if (!node.isContinueWithoutAggregation()) {
                if (node.isUpdateOriginal()) {
                    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));
                } else {
                    this.info.addOutputVariable(node.getVariableName(), this.info.getOutput().getPayload().getAsString());
                    this.info.setOutputPayload(new JsonPrimitive(initialPayload));
                }
            }
        }
    }

  }

  visitEnrich(node: Enrich): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitScript(node: Script): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitBean(node: Bean): void {

  }

  visitXquery(node: Xquery): void {

  }

  visitBuilder(node: Builder): void {

  }

  visitDrop(node: Drop): void {


  }

  visitXslt(node: Xslt): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitBam(node: Bam): void {

  }

  visitFastXSLT(node: FastXSLT): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitOauthService(node: OauthService): void {

  }

  visitCallout(node: Callout): void {

    this.info.setOutputPayload(new JsonPrimitive(StringUtils.EMPTY));

  }

  visitSequence(node: SequenceMediator): void {
    if (node.getKey() != null) {
        Utils.visitNamedSequence(this.projectPath, node.getKey(), this.info, this.position);
    } else {
        Utils.visitMediators(this.projectPath, node.getMediatorList(), this.info, this.position);
    }

  }

  visitThrowError(node: ThrowError): void {

  }

  visitAIChat(node: AIChat): void {
    this.visitConnector(node);

  }

  visitAIAgent(node: AIAgent): void {
    this.visitConnector(node);

  }

  visitAIKnowledgeBase(node: KnowledgeBase): void {
    this.visitConnector(node);

  }

  handleResponseVariable(node: Connector): void {
    let responseVariableParameter = node.getParameter(Constant.RESPONSE_VARIABLE);
    if (responseVariableParameter == null || StringUtils.isEmpty(responseVariableParameter.getValue())) {
        return;
    }
    let responseVariable = responseVariableParameter.getValue();
    let connector =
            ConnectorHolder.getInstance().getConnector(node.getConnectorName());
    if (connector != null) {
        let action = connector.getAction(node.getMethod());
        if (action != null && action.getOutputSchema() != null) {
            let property =
                    action.getOutputSchema();
            property.setKey(responseVariable);

            let overwriteMsgInMsgCtxParam = node.getParameter(Constant.OVERWRITE_BODY);
            if (overwriteMsgInMsgCtxParam != null) {
                let paramValue = overwriteMsgInMsgCtxParam.getValue();
                if (equalsIgnoreCase("true", paramValue)) {
                    let payload =
                            (property.getProperties().filter(p => equals(p.getKey(), Constant.PAYLOAD))[0] ?? null);
                    if (payload != null) {
                        let payloadObj = new JsonObject();
                        Utils.convertToJsonObject(payload, payloadObj);
                        this.info.setOutputPayload(new JsonPrimitive(String(payloadObj)));
                    }
                    property.deleteProperty(Constant.PAYLOAD);
                }
            }
            if (property.getProperties() != null && !isEmpty(property.getProperties())) {
                this.info.addOutputVariable(property);
            }
        }
    }

  }

  handleTargetVariable(node: Connector): void {
    let targetVariableParameter = node.getParameter(Constant.CONN_TARGET_VARIABLE);
    if (targetVariableParameter == null || StringUtils.isEmpty(targetVariableParameter.getValue())) {
        return;
    }
    let targetVariable = targetVariableParameter.getValue();
    let connector =
            ConnectorHolder.getInstance().getConnector(node.getConnectorName());
    if (connector != null) {
        let action = connector.getAction(node.getMethod());
        if (action != null) {
            this.info.addOutputVariable(targetVariable, StringUtils.EMPTY);
        }
    }

  }
}
