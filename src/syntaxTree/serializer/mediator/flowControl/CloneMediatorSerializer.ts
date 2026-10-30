// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/CloneMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Clone } from "../../../pojo/mediator/advanced/Clone/Clone.js";
import { CloneTarget } from "../../../pojo/mediator/advanced/Clone/CloneTarget.js";
import { EndpointSerializer } from "../../endpoint/EndpointSerializer.js";
import "../../endpoint/registerEndpointSerializers.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class CloneMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let cloneMediator = (m as Clone);
    let cloneElt = AbstractMediatorSerializer.fac.createOMElement("clone", AbstractMediatorSerializer.synNS);

    if (cloneMediator.getId() != null) {
        cloneElt.addAttribute("id", cloneMediator.getId(), null);
    }
    if (cloneMediator.isContinueParent()) {
        cloneElt.addAttribute("continueParent", "true", null);
    }
    if (cloneMediator.isSequential()) {
        cloneElt.addAttribute("sequential", "true", null);
    }
    if (cloneMediator.getDescription() != null) {
        cloneElt.addAttribute("description", cloneMediator.getDescription(), null);
    }

    this.serializeTargets(cloneElt, cloneMediator);

    return cloneElt;

  }

  serializeTargets(cloneElt: OMElement, cloneMediator: Clone): void {
    let targets = cloneMediator.getTarget();
    if (targets != null) {
        for (let target of targets) {
            let targetEle = this.serializeTarget(target);
            cloneElt.addChild(targetEle);
        }
    }

  }

  serializeTarget(target: CloneTarget): OMElement {
    let targetElt = null;
    if (target != null) {
        targetElt = AbstractMediatorSerializer.fac.createOMElement("target", AbstractMediatorSerializer.synNS);
        if (target.getTo() != null) {
            targetElt.addAttribute("to", target.getTo(), null);
        }
        if (target.getSoapAction() != null) {
            targetElt.addAttribute("soapAction", target.getSoapAction(), null);
        }

        if (target.getSequenceAttribute() != null) {
            targetElt.addAttribute("sequence", target.getSequenceAttribute(), null);
        } else if (target.getSequence() != null) {
            let sequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(target.getSequence());
            targetElt.addChild(sequenceElt);
        }

        if (target.getEndpointAttribute() != null) {
            targetElt.addAttribute("endpoint", target.getEndpointAttribute(), null);
        } else if (target.getEndpoint() != null) {
            let endpointElt = EndpointSerializer.serializeEndpoint(target.getEndpoint());
            targetElt.addChild(endpointElt);
        }
    }
    return targetElt;

  }

  getMediatorClassName(): string {
    return "Clone";

  }
}
