// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/SendMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { EndpointSerializer } from "../../endpoint/EndpointSerializer.js";
import "../../endpoint/registerEndpointSerializers.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../../om/om.js";
import { Send } from "../../../pojo/mediator/core/Send.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class SendMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let sendMediator = (m as Send);
    let sendElt = AbstractMediatorSerializer.fac.createOMElement("send", AbstractMediatorSerializer.synNS);

    if (sendMediator.getReceive() != null) {
        SerializerUtils.serializeExpression(sendMediator.getReceive(), sendElt, "receive", sendMediator);
    }
    if (sendMediator.isBuildmessage()) {
        sendElt.addAttribute("buildmessage", "true", null);
    }
    if (sendMediator.getDescription() != null) {
        sendElt.addAttribute("description", sendMediator.getDescription(), null);
    }

    this.serializeEndpoint(sendMediator.getEndpoint(), sendElt);
    return sendElt;

  }

  serializeEndpoint(endpoint: NamedEndpoint, sendElt: OMElement): void {
    if (endpoint != null) {
        let endpointElt: OMElement | undefined;
        if (endpoint.getKey() != null) {
            endpointElt = AbstractMediatorSerializer.fac.createOMElement("endpoint", AbstractMediatorSerializer.synNS);
            endpointElt.addAttribute("key", endpoint.getKey(), AbstractMediatorSerializer.nullNS);
        } else {
            endpointElt = EndpointSerializer.serializeEndpoint(endpoint);
        }
        sendElt.addChild(endpointElt);
    } else {
        this.handleException("Endpoint is required for the Call mediator");
    }

  }

  getMediatorClassName(): string {
    return "Send";

  }
}
