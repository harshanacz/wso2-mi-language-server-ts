// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/PropertyMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { Property } from "../../../pojo/mediator/core/Property.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { Utils } from "../../../utils.js";

export class PropertyMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let property = (m as Property);
    let propertyElt = AbstractMediatorSerializer.fac.createOMElement("property", AbstractMediatorSerializer.synNS);

    if (property.getName() != null) {
        propertyElt.addAttribute("name", property.getName(), AbstractMediatorSerializer.nullNS);
    } else {
        this.handleException("Invalid property mediator. Name is required");
    }

    if (property.getValue() != null) {
        propertyElt.addAttribute("value", property.getValue(), AbstractMediatorSerializer.nullNS);
    } else if (property.getAny() != null) {
        let inline = SerializerUtils.stringToOM(String(property.getAny()));
        if (inline != null) {
            propertyElt.addChild(inline);
        }
    } else if (property.getExpression() != null) {
        SerializerUtils.serializeExpression(property.getExpression(), propertyElt, "expression", property);
    } else if (equals("set", property.getAction())) {
        this.handleException("Invalid property mediator. Value or expression is required");
    }

    if (property.getScope() != null) {
        propertyElt.addAttribute("scope", property.getScope().getValue(), AbstractMediatorSerializer.nullNS);
    }

    if (equals("remove", property.getAction())) {
        propertyElt.addAttribute("action", property.getAction(), AbstractMediatorSerializer.nullNS);
    } else if (property.getType() != null) {
        propertyElt.addAttribute("type", property.getType().name(), AbstractMediatorSerializer.nullNS);
    }

    if (property.getPattern() != null) {
        propertyElt.addAttribute("pattern", property.getPattern(), AbstractMediatorSerializer.nullNS);
        let group = Utils.parseInt(property.getGroup());
        if (group >= 0) {
            propertyElt.addAttribute("group", property.getGroup(), AbstractMediatorSerializer.nullNS);
        }
    }

    if (property.getDescription() != null) {
        propertyElt.addAttribute("description", property.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    return propertyElt;

  }

  getMediatorClassName(): string {
    return "Property";

  }
}
