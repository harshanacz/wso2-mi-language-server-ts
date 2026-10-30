// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/qos/ThrottleMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { Throttle } from "../../../pojo/mediator/filter/throttle/Throttle.js";
import { ThrottlePolicies } from "../../../pojo/mediator/filter/throttle/ThrottlePolicies.js";

export class ThrottleMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let throttle = (m as Throttle);
    let throttleElement = AbstractMediatorSerializer.fac.createOMElement("throttle", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(throttleElement, throttle);

    if (throttle.getPolicies() != null) {
        this.serializePolicies(throttleElement, throttle.getPolicies());
    }

    this.serializeSequences(throttleElement, throttle);

    return throttleElement;

  }

  serializeAttributes(throttleElement: OMElement, throttle: Throttle): void {
    if (throttle.getId() != null) {
        throttleElement.addAttribute("id", throttle.getId(), null);
    }

    if (throttle.getDescription() != null) {
        throttleElement.addAttribute("description", throttle.getDescription(), null);
    }


  }

  serializePolicies(throttleElement: OMElement, policies: ThrottlePolicies): void {

  }

  serializeSequences(throttleElement: OMElement, throttle: Throttle): void {
    if (throttle.getOnAcceptAttribute() != null) {
        throttleElement.addAttribute("onAccept", throttle.getOnAcceptAttribute(), null);
    } else {
        let onAcceptElement: OMElement | undefined;
        if (throttle.getOnAccept() != null) {
            onAcceptElement = AnonymousSequenceSerializer.serializeAnonymousSequence(throttle.getOnAccept());
            onAcceptElement.setLocalName("onAccept");
        } else {
            onAcceptElement = AbstractMediatorSerializer.fac.createOMElement("onAccept", AbstractMediatorSerializer.synNS);
        }
        throttleElement.addChild(onAcceptElement);
    }

    if (throttle.getOnRejectAttribute() != null) {
        throttleElement.addAttribute("onReject", throttle.getOnRejectAttribute(), null);
    } else {
        let onRejectElement: OMElement | undefined;
        if (throttle.getOnReject() != null) {
            onRejectElement = AnonymousSequenceSerializer.serializeAnonymousSequence(throttle.getOnReject());
            onRejectElement.setLocalName("onReject");
        } else {
            onRejectElement = AbstractMediatorSerializer.fac.createOMElement("onReject", AbstractMediatorSerializer.synNS);
        }
        throttleElement.addChild(onRejectElement);
    }

  }

  getMediatorClassName(): string {
    return "Throttle";

  }
}
