// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/PropertyGroupMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { PropertyGroup } from "../../../pojo/mediator/core/PropertyGroup.js";
import { PropertyMediatorSerializer } from "./PropertyMediatorSerializer.js";

export class PropertyGroupMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let propertyGroup = (m as PropertyGroup);
    let propertyGroupElt = AbstractMediatorSerializer.fac.createOMElement("propertyGroup", AbstractMediatorSerializer.synNS);

    let properties = propertyGroup.getProperty();
    if (properties != null) {
        let propertyMediatorSerializer = new PropertyMediatorSerializer();
        for (let property of properties) {
            let propertyElt = propertyMediatorSerializer.serializeSpecificMediator(property);
            propertyGroupElt.addChild(propertyElt);
        }
    }

    if (propertyGroup.getDescription() != null) {
        propertyGroupElt.addAttribute("description", propertyGroup.getDescription(), AbstractMediatorSerializer.nullNS);
    }
    return propertyGroupElt;

  }

  getMediatorClassName(): string {
    return "PropertyGroup";

  }
}
