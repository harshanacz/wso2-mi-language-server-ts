// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/IterateMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Iterate } from "../../../pojo/mediator/eip/Iterate.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { Target } from "../../../pojo/misc/targets/Target.js";

export class IterateMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let iterateMediator = (m as Iterate);
    let iterateElt = AbstractMediatorSerializer.fac.createOMElement("iterate", AbstractMediatorSerializer.synNS);

    if (iterateMediator.getId() != null) {
        iterateElt.addAttribute("id", iterateMediator.getId(), null);
    }
    if (iterateMediator.getExpression() != null) {
        SerializerUtils.serializeExpression(iterateMediator.getExpression(), iterateElt, "expression",
                iterateMediator);
    } else {
        this.handleException("Invalid Iterate mediator. " +
                "Should have an 'expression' ");
    }
    if (iterateMediator.getAttachPath() != null) {
        SerializerUtils.serializeExpression(iterateMediator.getAttachPath(), iterateElt, "attachPath",
                iterateMediator);
    }
    if (iterateMediator.isPreservePayload()) {
        iterateElt.addAttribute("preservePayload", "true", null);
    }
    if (iterateMediator.isContinueParent()) {
        iterateElt.addAttribute("continueParent", "true", null);
    }
    if (iterateMediator.isSequential()) {
        iterateElt.addAttribute("sequential", "true", null);
    }
    if (iterateMediator.getDescription() != null) {
        iterateElt.addAttribute("description", iterateMediator.getDescription(), null);
    }

    this.serializeTarget(iterateElt, iterateMediator.getTarget());

    return iterateElt;

  }

  serializeTarget(iterateElt: OMElement, target: Target): void {
    if (target != null) {
        let targetEle = AbstractMediatorSerializer.fac.createOMElement("target", AbstractMediatorSerializer.synNS);
        if (target.getSequenceAttribute() != null) {
            targetEle.addAttribute("sequence", target.getSequenceAttribute(), null);
        } else if (target.getSequence() != null) {
            let sequenceElement = AnonymousSequenceSerializer.serializeAnonymousSequence(target.getSequence());
            targetEle.addChild(sequenceElement);
        } else {
            this.handleException("Invalid target mediator. " +
                    "Should have a 'sequence' ");
        }
        iterateElt.addChild(targetEle);
    } else {
        this.handleException("Invalid Iterate mediator. " +
                "Should have a 'target' ");
    }

  }

  getMediatorClassName(): string {
    return "Iterate";

  }
}
