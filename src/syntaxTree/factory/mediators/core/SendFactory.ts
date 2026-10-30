// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/SendFactory.java by the java2ts converter (see tools/java2ts).
import { parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { EndpointFactory } from "../../endpoint/EndpointFactory.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../pojo/endpoint/NamedEndpoint.js";
import { STNode } from "../../../stNode.js";
import { Send } from "../../../pojo/mediator/core/Send.js";
import { Utils } from "../../../utils.js";

export class SendFactory extends AbstractMediatorFactory {
  static readonly SEND: string = "send";

  createSpecificMediator(element: DOMElement): Mediator {
    let send = new Send();
    send.elementNode(element);
    this.populateAttributes(send, element);
    let children = element.getChildren();
    let endpoints = [];
    let endpointNode = Utils.getChildNodeByName(element, Constant.ENDPOINT);
    if (endpointNode != null) {
        let endpointFactory = new EndpointFactory();
        let namedEndpoint = (endpointFactory.create((endpointNode as DOMElement)) as NamedEndpoint);
        send.setEndpoint(namedEndpoint);
        try {
            if (namedEndpoint.getKey() == null && namedEndpoint.getKeyExpression() == null) {
                let document = element.getOwnerDocument();
                let startOffset = document.offsetAt(namedEndpoint.getRange().startTagRange.start);
                let endOffset = document.offsetAt(namedEndpoint.getRange().endTagRange.end);
                let endpointXml = document.getText().substring(startOffset, endOffset);
                send.setInlineEndpointXml(endpointXml);
            }
        } catch (ignored) {}
    }
    return send;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let send = (node as Send);
    let receive = element.getAttribute(Constant.RECEIVE);
    if (receive != null) {
        send.setReceive(receive);
    }
    let buildmessage = element.getAttribute(Constant.BUILDMESSAGE);
    if (buildmessage != null) {
        send.setBuildmessage(parseBoolean(buildmessage));
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        send.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        send.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return SendFactory.SEND;

  }
}
