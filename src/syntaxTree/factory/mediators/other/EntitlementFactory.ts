// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/EntitlementFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { EntitlementService } from "../../../pojo/mediator/other/entitlement/EntitlementService.js";
import { EntitlementServiceClient } from "../../../pojo/mediator/other/entitlement/EntitlementServiceClient.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class EntitlementFactory extends AbstractMediatorFactory {
  static readonly ENTITLEMENT: string = "entitlementService";

  createSpecificMediator(element: DOMElement): Mediator {
    let entitlementService = new EntitlementService();
    entitlementService.elementNode(element);
    this.populateAttributes(entitlementService, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.ON_REJECT)) {
                let onReject = SyntaxTreeUtils.createSequence(child);
                entitlementService.setOnReject(onReject);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ON_ACCEPT)) {
                let onAccept = SyntaxTreeUtils.createSequence(child);
                entitlementService.setOnAccept(onAccept);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ADVICE)) {
                let advice = SyntaxTreeUtils.createSequence(child);
                entitlementService.setAdvice(advice);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.OBLIGATIONS)) {
                let obligations = SyntaxTreeUtils.createSequence(child);
                entitlementService.setObligations(obligations);
            }
        }
    }
    return entitlementService;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let remoteServiceUrl = element.getAttribute(Constant.REMOTE_SERVICE_URL);
    if (remoteServiceUrl != null) {
        ((node as EntitlementService)).setRemoteServiceUrl(remoteServiceUrl);
    }
    let remoteServiceUsername = element.getAttribute(Constant.REMOTE_SERVICE_USERNAME);
    if (remoteServiceUsername != null) {
        ((node as EntitlementService)).setRemoteServiceUserName(remoteServiceUsername);
    }
    let remoteServicePassword = element.getAttribute(Constant.REMOTE_SERVICE_PASSWORD);
    if (remoteServicePassword != null) {
        ((node as EntitlementService)).setRemoteServicePassword(remoteServicePassword);
    }
    let callbackClass = element.getAttribute(Constant.CALLBACK_CLASS);
    if (callbackClass != null) {
        ((node as EntitlementService)).setCallbackClass(callbackClass);
    }
    let client = element.getAttribute(Constant.CLIENT);
    let clientEnum = getEnumFromValue(client, EntitlementServiceClient);
    if (clientEnum != null) {
        ((node as EntitlementService)).setClient(clientEnum);
    }
    let thriftHost = element.getAttribute(Constant.THRIFT_HOST);
    if (thriftHost != null) {
        ((node as EntitlementService)).setThriftHost(thriftHost);
    }
    let thriftPort = element.getAttribute(Constant.THRIFT_PORT);
    if (thriftPort != null) {
        ((node as EntitlementService)).setThriftPort(thriftPort);
    }
    let onReject = element.getAttribute(Constant.ON_REJECT);
    if (onReject != null) {
        ((node as EntitlementService)).setOnRejectAttribute(onReject);
    }
    let onAccept = element.getAttribute(Constant.ON_ACCEPT);
    if (onAccept != null) {
        ((node as EntitlementService)).setOnAcceptAttribute(onAccept);
    }
    let advice = element.getAttribute(Constant.ADVICE);
    if (advice != null) {
        ((node as EntitlementService)).setAdviceAttribute(advice);
    }
    let obligations = element.getAttribute(Constant.OBLIGATIONS);
    if (obligations != null) {
        ((node as EntitlementService)).setObligationsAttribute(obligations);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as EntitlementService)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as EntitlementService)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return EntitlementFactory.ENTITLEMENT;

  }
}
