// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/JsonTransformMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Jsontransform } from "../../../pojo/mediator/transformation/Jsontransform.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class JsonTransformMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let jsontransform = (m as Jsontransform);
    let jsontransformElt = AbstractMediatorSerializer.fac.createOMElement("jsontransform", AbstractMediatorSerializer.synNS);

    if (jsontransform.getSchema() != null) {
        jsontransformElt.addAttribute("schema", jsontransform.getSchema(), AbstractMediatorSerializer.nullNS);
    }
    if (jsontransform.getDescription() != null) {
        jsontransformElt.addAttribute("description", jsontransform.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    if (jsontransform.getProperty() != null) {
        this.serializeMediatorProperties(jsontransformElt, jsontransform.getProperty());
    }

    return jsontransformElt;

  }

  getMediatorClassName(): string {
    return "Jsontransform";

  }
}
