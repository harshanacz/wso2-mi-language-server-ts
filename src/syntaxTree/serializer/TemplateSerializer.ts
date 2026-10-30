// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/TemplateSerializer.java by the java2ts converter (see tools/java2ts).
import { get, Logger, Level } from "../javaCompat.js";
import { AnonymousSequenceSerializer } from "./AnonymousSequenceSerializer.js";
import { Constant } from "../constant.js";
import { EndpointSerializer } from "./endpoint/EndpointSerializer.js";
import "./endpoint/registerEndpointSerializers.js";
import { InvalidConfigurationException } from "../om/errors.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { Template } from "../pojo/template/Template.js";
import { TemplateParameter } from "../pojo/template/TemplateParameter.js";

export class TemplateSerializer {
  static log: Logger = Logger.getLogger("TemplateSerializer");

  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeTemplate(template: Template): string {
    let templateElt = TemplateSerializer.fac.createOMElement("template", Constant.SYNAPSE_OMNAMESPACE);

    TemplateSerializer.serializeAttributes(template, templateElt);
    TemplateSerializer.serializeChildren(template, templateElt);

    return String(templateElt);

  }

  static serializeAttributes(template: Template, templateElt: OMElement): void {
    if (template.getName() != null) {
        templateElt.addAttribute("name", template.getName(), null);
    }
    if (template.getOnError() != null) {
        templateElt.addAttribute("onError", template.getOnError(), null);
    }

  }

  static serializeChildren(template: Template, templateElt: OMElement): void {
    if (template.getParameter() != null) {
        TemplateSerializer.serializeParameters(template.getParameter(), templateElt);
    }
    if (template.getEndpoint() != null) {
        let endpointElt = EndpointSerializer.serializeEndpoint(template.getEndpoint());
        templateElt.addChild(endpointElt);
    } else if (template.getSequence() != null) {
        let sequenceElt =
                AnonymousSequenceSerializer.serializeAnonymousSequence(template.getSequence().getMediatorList());
        templateElt.addChild(sequenceElt);
    } else {
        TemplateSerializer.handleException("Template must have either an endpoint or a sequence");
    }


  }

  static serializeParameters(parameter: TemplateParameter[], templateElt: OMElement): void {
    for (let param of parameter) {

        let paramElt = TemplateSerializer.fac.createOMElement("parameter", Constant.SYNAPSE_OMNAMESPACE);
        let paramNSPrefix = param.getParamNamespacePrefix();
        if (paramNSPrefix != null) {
            let uri = get(param.getNamespaces(), "xmlns:" + paramNSPrefix);
            if (uri != null) {
                paramElt.setNamespace(TemplateSerializer.fac.createOMNamespace(uri, paramNSPrefix));
            } else {
                TemplateSerializer.handleException("Namespace:" + paramNSPrefix + " is not defined in the parameter");
            }
        }
        if (param.getName() != null) {
            paramElt.addAttribute("name", param.getName(), null);
        } else {
            TemplateSerializer.handleException("Parameter name is required");
        }
        if (param.getDefaultValue() != null) {
            paramElt.addAttribute("defaultValue", param.getDefaultValue(), null);
        }
        paramElt.addAttribute("isMandatory", String(param.getIsMandatory()), null);
        templateElt.addChild(paramElt);
    }

  }

  static handleException(s: string): void {
    TemplateSerializer.log.log(Level.SEVERE, s);
    throw new InvalidConfigurationException(s);

  }
}
