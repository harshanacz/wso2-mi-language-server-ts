// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/FilterMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Filter } from "../../../pojo/mediator/filter/filter/Filter.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class FilterMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let filter = (m as Filter);
    let filterElt = AbstractMediatorSerializer.fac.createOMElement("filter", AbstractMediatorSerializer.synNS);

    if (filter.getSource() != null && filter.getRegex() != null) {
        filterElt.addAttribute("source", filter.getSource(), null);
        filterElt.addAttribute("regex", filter.getRegex(), null);
    } else if (filter.getXpath() != null) {
        SerializerUtils.serializeExpression(filter.getXpath(), filterElt, "xpath", filter);
    } else {
        this.handleException("Invalid filter mediator. " +
                "Should have either a 'source' and a 'regex' OR an 'xpath' ");
    }

    this.serializeThenElse(filterElt, filter, "then");
    this.serializeThenElse(filterElt, filter, "else");

    if (filter.getDescription() != null) {
        filterElt.addAttribute("description", filter.getDescription(), null);
    }
    return filterElt;

  }

  serializeThenElse(filterElt: OMElement, filter: Filter, tagName: string): void {
    if (filter.getThen() != null) {
        let thenMediatorList = filter.getThen().getMediatorList();
        let thenElement = AnonymousSequenceSerializer.serializeAnonymousSequence(thenMediatorList);
        thenElement.setLocalName(tagName);
        filterElt.addChild(thenElement);
    }

  }

  getMediatorClassName(): string {
    return "Filter";

  }
}
