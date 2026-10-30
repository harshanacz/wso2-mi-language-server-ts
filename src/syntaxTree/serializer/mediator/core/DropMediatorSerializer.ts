// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/DropMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Drop } from "../../../pojo/mediator/core/Drop.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class DropMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let drop = (m as Drop);
    let dropElt = AbstractMediatorSerializer.fac.createOMElement("drop", AbstractMediatorSerializer.synNS);

    if (drop.getDescription() != null) {
        dropElt.addAttribute("description", drop.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    return dropElt;

  }

  getMediatorClassName(): string {
    return "Drop";

  }
}
