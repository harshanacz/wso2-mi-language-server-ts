// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/other/LoopbackMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Loopback } from "../../../pojo/mediator/core/Loopback.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class LoopbackMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let loopback = (m as Loopback);
    let loopbackElt = AbstractMediatorSerializer.fac.createOMElement("loopback", AbstractMediatorSerializer.synNS);
    if (loopback.getDescription() != null) {
        loopbackElt.addAttribute("description", loopback.getDescription(), null);
    }
    return loopbackElt;

  }

  getMediatorClassName(): string {
    return "Loopback";

  }
}
