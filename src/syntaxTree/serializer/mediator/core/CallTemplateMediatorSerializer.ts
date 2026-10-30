// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/CallTemplateMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { matches } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { CallTemplate } from "../../../pojo/mediator/core/CallTemplate.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { WithParam } from "../../../pojo/mediator/core/WithParam.js";

export class CallTemplateMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let callTemplate = (m as CallTemplate);
    let callTemplateElt = AbstractMediatorSerializer.fac.createOMElement("call-template", AbstractMediatorSerializer.synNS);

    if (callTemplate.getTarget() != null) {
        callTemplateElt.addAttribute("target", callTemplate.getTarget(), AbstractMediatorSerializer.nullNS);
    }

    if (callTemplate.getOnError() != null) {
        callTemplateElt.addAttribute("onError", callTemplate.getOnError(), AbstractMediatorSerializer.nullNS);
    }

    let withParams = callTemplate.getWithParam();

    this.serializeParams(withParams, callTemplateElt);

    if (callTemplate.getDescription() != null) {
        callTemplateElt.addAttribute("description", callTemplate.getDescription(), AbstractMediatorSerializer.nullNS);
    }
    return callTemplateElt;

  }

  serializeParams(withParams: WithParam[], callTemplateElt: OMElement): void {
    if (withParams != null) {
        for (let withParam of withParams) {
            let withParamElt = AbstractMediatorSerializer.fac.createOMElement("with-param", AbstractMediatorSerializer.synNS);
            if (withParam.getName() != null) {
                withParamElt.addAttribute("name", withParam.getName(), AbstractMediatorSerializer.nullNS);
            }
            let value = withParam.getValue();
            if (value != null) {
                withParamElt.addAttribute("value", value, AbstractMediatorSerializer.nullNS);
                if (matches(value, "^\\{.*}$")) {
                    SerializerUtils.serializeNamespaces(withParam, withParamElt);
                }
            }
            callTemplateElt.addChild(withParamElt);
        }
    }

  }

  getMediatorClassName(): string {
    return "CallTemplate";

  }
}
