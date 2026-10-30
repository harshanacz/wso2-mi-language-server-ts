// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/CallFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Call } from "../../../pojo/mediator/core/call/Call.js";
import { CallSource } from "../../../pojo/mediator/core/call/CallSource.js";
import { CallSourceType } from "../../../pojo/mediator/core/call/CallSourceType.js";
import { CallTarget } from "../../../pojo/mediator/core/call/CallTarget.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { EndpointFactory } from "../../endpoint/EndpointFactory.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../pojo/endpoint/NamedEndpoint.js";
import { STNode } from "../../../stNode.js";
import { TargetType } from "../../../pojo/misc/TargetType.js";
import { Utils } from "../../../utils.js";

export class CallFactory extends AbstractMediatorFactory {
  static readonly CALL: string = "call";

  createSpecificMediator(element: DOMElement): Mediator {
    let call = new Call();
    call.elementNode(element);
    this.populateAttributes(call, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            if (equalsIgnoreCase(node.getNodeName(), Constant.SOURCE)) {
                let callSource = this.createCallSource((node as DOMElement));
                call.setSource(callSource);
            } else if (equalsIgnoreCase(node.getNodeName(), Constant.TARGET)) {
                let callTarget = new CallTarget();
                callTarget.elementNode((node as DOMElement));
                this.populateTargetAttributes(callTarget, (node as DOMElement));
                call.setTarget(callTarget);
            } else if (equalsIgnoreCase(node.getNodeName(), Constant.ENDPOINT)) {
                let endpointFactory = new EndpointFactory();
                let namedEndpoint = (endpointFactory.create((node as DOMElement)) as NamedEndpoint);
                call.setEndpoint(namedEndpoint);
                try {
                    if (namedEndpoint.getKey() == null && namedEndpoint.getKeyExpression() == null) {
                        let document = element.getOwnerDocument();
                        let startOffset = document.offsetAt(namedEndpoint.getRange().startTagRange.start);
                        let endOffset = document.offsetAt(namedEndpoint.getRange().endTagRange.end);
                        let endpointXml = document.getText().substring(startOffset, endOffset);
                        call.setInlineEndpointXml(endpointXml);
                    }
                } catch (ignored) {}
            }
        }
    }
    return call;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let blocking = element.getAttribute(Constant.BLOCKING);
    if (blocking != null) {
        ((node as Call)).setBlocking(parseBoolean(blocking));
    }
    let initAxis2ClientOptions = element.getAttribute(Constant.INIT_AXIS2_CLIENT_OPTIONS);
    if (initAxis2ClientOptions != null) {
        ((node as Call)).setInitAxis2ClientOptions(parseBoolean(initAxis2ClientOptions));
    } else {
        ((node as Call)).setInitAxis2ClientOptions(true);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Call)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Call)).setTraceFilter(traceFilter);
    }

  }

  createCallSource(element: DOMElement): CallSource {
    let callSource = new CallSource();
    callSource.elementNode(element);
    if (element.getFirstChild() != null) {
        let content = Utils.getInlineString(element.getFirstChild());
        callSource.setContent(content);
    }

    let contentType = element.getAttribute(Constant.CONTENT_TYPE);
    if (contentType != null) {
        callSource.setContentType(contentType);
    }
    let type = element.getAttribute(Constant.TYPE);
    let callSourceType = getEnumFromValue(type, CallSourceType);
    if (callSourceType != null) {
        callSource.setType(callSourceType);
    }
    return callSource;

  }

  populateTargetAttributes(callTarget: CallTarget, element: DOMElement): void {
    let type = element.getAttribute(Constant.TYPE);
    let targetType = getEnumFromValue(type, TargetType);
    if (targetType != null) {
        callTarget.setType(targetType);
    }

  }

  getTagName(): string {
    return CallFactory.CALL;

  }
}
