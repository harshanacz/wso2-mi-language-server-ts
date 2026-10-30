// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/HeaderMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Header } from "../../../pojo/mediator/core/Header.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class HeaderMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let headerMediator = (m as Header);
    let headerElt = AbstractMediatorSerializer.fac.createOMElement("header", AbstractMediatorSerializer.synNS);

    if (headerMediator.getName() != null) {
        SerializerUtils.serializeExpression(headerMediator.getName(), headerElt, "name", headerMediator);
    }
    if (headerMediator.getAction() != null) {
        headerElt.addAttribute("action", headerMediator.getAction(), null);
    }
    if (headerMediator.getScope() != null) {
        headerElt.addAttribute("scope", headerMediator.getScope().getValue(), null);
    }
    if (headerMediator.getAction() != null) {
        let action = headerMediator.getAction();
        if (equals("set", action)) {
            if (headerMediator.getValue() != null) {
                headerElt.addAttribute("value", headerMediator.getValue(), null);
            } else if (headerMediator.getAny() != null) {
                let inline = String(headerMediator.getAny());
                let inlineElt = SerializerUtils.stringToOM(inline);
                headerElt.addChild(inlineElt);
            } else if (headerMediator.getExpression() != null) {
                SerializerUtils.serializeExpression(headerMediator.getExpression(), headerElt,
                        "expression", headerMediator);
            }
        } else if (!equals("remove", action)) {
            this.handleException("Invalid action for header mediator. Action should be either 'set' or 'remove'");
        }
    }
    if (headerMediator.getDescription() != null) {
        headerElt.addAttribute("description", headerMediator.getDescription(), null);
    }
    return headerElt;

  }

  getMediatorClassName(): string {
    return "Header";

  }
}
