// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/CallMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Call } from "../../../pojo/mediator/core/call/Call.js";
import { CallSource } from "../../../pojo/mediator/core/call/CallSource.js";
import { CallTarget } from "../../../pojo/mediator/core/call/CallTarget.js";
import { EndpointSerializer } from "../../endpoint/EndpointSerializer.js";
import "../../endpoint/registerEndpointSerializers.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class CallMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let call = (m as Call);
    let callElt = AbstractMediatorSerializer.fac.createOMElement("call", AbstractMediatorSerializer.synNS);

    this.serializeEndpoint(call.getEndpoint(), callElt);
    this.serializeSource(call.getSource(), callElt);
    this.serializeTarget(call.getTarget(), callElt);

    if (call.isBlocking()) {
        callElt.addAttribute("blocking", "true", AbstractMediatorSerializer.nullNS);
        if (!call.getInitAxis2ClientOptions()) {
            callElt.addAttribute("initAxis2ClientOptions", "false", AbstractMediatorSerializer.nullNS);
        }
    }

    if (call.getDescription() != null) {
        callElt.addAttribute("description", call.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    return callElt;

  }

  serializeEndpoint(endpoint: NamedEndpoint, callElt: OMElement): void {
    if (endpoint != null) {
        let endpointElt: OMElement | undefined;
        if (endpoint.getKey() != null) {
            endpointElt = AbstractMediatorSerializer.fac.createOMElement("endpoint", AbstractMediatorSerializer.synNS);
            endpointElt.addAttribute("key", endpoint.getKey(), AbstractMediatorSerializer.nullNS);
        } else {
            endpointElt = EndpointSerializer.serializeEndpoint(endpoint);
        }
        callElt.addChild(endpointElt);
    } else {
        this.handleException("Endpoint is required for the Call mediator");
    }

  }

  serializeSource(source: CallSource, callElt: OMElement): void {
    if (source != null) {
        let sourceElt = AbstractMediatorSerializer.fac.createOMElement("source", AbstractMediatorSerializer.synNS);
        let sourceType = source.getType().name();
        switch (sourceType) {
            case "body":
                sourceElt.addAttribute("type", "body", AbstractMediatorSerializer.nullNS);
                break;
            case "property":
                sourceElt.addAttribute("type", "property", AbstractMediatorSerializer.nullNS);
                sourceElt.addAttribute("contentType", source.getContentType(), AbstractMediatorSerializer.nullNS);
                let property = source.getTextNode();
                sourceElt.setText(property);
                break;
            case "inline":
                sourceElt.addAttribute("type", "inline", AbstractMediatorSerializer.nullNS);
                sourceElt.addAttribute("contentType", source.getContentType(), AbstractMediatorSerializer.nullNS);
                if (source.getContent() != null) {
                    let contentElt = SerializerUtils.stringToOM(String(source.getContent()));
                    if (contentElt != null) {
                        sourceElt.addChild(contentElt);
                    }
                }
                break;
            case "custom":
                sourceElt.addAttribute("type", "custom", AbstractMediatorSerializer.nullNS);
                sourceElt.addAttribute("contentType", source.getContentType(), AbstractMediatorSerializer.nullNS);
                let xpath = source.getTextNode();
                sourceElt.setText(xpath);
                SerializerUtils.serializeNamespaces(source, sourceElt);
                break;
        }
        callElt.addChild(sourceElt);
    }

  }

  serializeTarget(target: CallTarget, callElt: OMElement): void {
    if (target != null) {
        let targetElt = AbstractMediatorSerializer.fac.createOMElement("target", AbstractMediatorSerializer.synNS);
        let targetType = target.getType().name();
        switch (targetType) {
            case "body":
                targetElt.addAttribute("type", "body", AbstractMediatorSerializer.nullNS);
                break;
            case "property":
                targetElt.addAttribute("type", "property", AbstractMediatorSerializer.nullNS);
                let property = target.getTextNode();
                targetElt.setText(property);
                break;
        }
        callElt.addChild(targetElt);
    }

  }

  getMediatorClassName(): string {
    return "Call";

  }
}
