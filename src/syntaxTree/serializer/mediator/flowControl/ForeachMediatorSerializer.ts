// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/ForeachMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Foreach } from "../../../pojo/mediator/eip/Foreach.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class ForeachMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let foreachMediator = (m as Foreach);
    let foreachElt = AbstractMediatorSerializer.fac.createOMElement("foreach", AbstractMediatorSerializer.synNS);

    if (foreachMediator.getId() != null) {
        foreachElt.addAttribute("id", foreachMediator.getId(), null);
    }
    if (foreachMediator.getExpression() != null) {
        SerializerUtils.serializeExpression(foreachMediator.getExpression(), foreachElt, "expression",
                foreachMediator);
    } else {
        this.handleException("Invalid Foreach mediator. " +
                "Should have an 'expression' ");
    }

    if (foreachMediator.getSequenceAttribute() != null) {
        foreachElt.addAttribute("sequence", foreachMediator.getSequenceAttribute(), null);
    } else if (foreachMediator.getSequence() != null) {
        let sequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(foreachMediator.getSequence());
        foreachElt.addChild(sequenceElt);
    } else {
        this.handleException("Invalid Foreach mediator. " +
                "Should have a 'sequence' ");
    }

    if (foreachMediator.getDescription() != null) {
        foreachElt.addAttribute("description", foreachMediator.getDescription(), null);
    }

    return foreachElt;

  }

  getMediatorClassName(): string {
    return "Foreach";

  }
}
