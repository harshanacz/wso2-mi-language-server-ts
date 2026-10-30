// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/StoreMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { Store } from "../../../pojo/mediator/core/Store.js";

export class StoreMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let storeMediator = (m as Store);
    let storeElt = AbstractMediatorSerializer.fac.createOMElement("store", AbstractMediatorSerializer.synNS);

    if (storeMediator.getMessageStore() != null) {
        storeElt.addAttribute("messageStore", storeMediator.getMessageStore(), null);
    }
    if (storeMediator.getSequence() != null) {
        storeElt.addAttribute("sequence", storeMediator.getSequence(), null);
    }
    if (storeMediator.getDescription() != null) {
        storeElt.addAttribute("description", storeMediator.getDescription(), null);
    }
    return storeElt;

  }

  getMediatorClassName(): string {
    return "Store";

  }
}
