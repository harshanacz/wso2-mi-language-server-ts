// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/RespondMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { Respond } from "../../../pojo/mediator/core/Respond.js";

export class RespondMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let respond = (m as Respond);
    let respondElt = AbstractMediatorSerializer.fac.createOMElement("respond", AbstractMediatorSerializer.synNS);
    if (respond.getDescription() != null) {
        respondElt.addAttribute("description", respond.getDescription(), AbstractMediatorSerializer.nullNS);
    }
    return respondElt;

  }

  getMediatorClassName(): string {
    return "Respond";

  }
}
