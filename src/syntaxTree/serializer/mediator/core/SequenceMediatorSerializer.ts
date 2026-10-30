// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/SequenceMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { matches } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SequenceMediator } from "../../../pojo/mediator/SequenceMediator.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class SequenceMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let sequenceMediator = (m as SequenceMediator);
    let sequenceElt = AbstractMediatorSerializer.fac.createOMElement("sequence", AbstractMediatorSerializer.synNS);

    if (sequenceMediator.getKey() != null) {
        let key = sequenceMediator.getKey();
        sequenceElt.addAttribute("key", key, AbstractMediatorSerializer.nullNS);
        if (matches(key, "^\\{.*}$")) {
            SerializerUtils.serializeNamespaces(sequenceMediator, sequenceElt);
        }
    } else {
        this.handleException("The 'key' attribute is required for the Sequence mediator");
    }

    if (sequenceMediator.getDescription() != null) {
        sequenceElt.addAttribute("description", sequenceMediator.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    return sequenceElt;

  }

  getMediatorClassName(): string {
    return "SequenceMediator";

  }
}
