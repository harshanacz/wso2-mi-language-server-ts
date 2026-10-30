// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/api/ResourceSerializer.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase } from "../../javaCompat.js";
import { APIResource } from "../../pojo/api/APIResource.js";
import { AnonymousSequenceSerializer } from "../AnonymousSequenceSerializer.js";
import { Constant } from "../../constant.js";
import { OMAbstractFactory } from "../../om/om.js";
import { OMElement } from "../../om/om.js";
import { OMFactory } from "../../om/om.js";

export class ResourceSerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeResource(resource: APIResource): OMElement {
    let resourceElt = ResourceSerializer.fac.createOMElement("resource", Constant.SYNAPSE_OMNAMESPACE);
    let methods = resource.getMethods();
    if (methods.length > 0) {
        let value = "";
        for (let method of methods) {
            value += method + " ";
        }
        resourceElt.addAttribute("methods", value.trim(), null);
    }

    if (resource.getProtocol() != null && resource.getProtocol().length == 1) {
        if (equalsIgnoreCase("http", resource.getProtocol()[0])) {
            resourceElt.addAttribute("protocol", "http", null);
        } else if (equalsIgnoreCase("https", resource.getProtocol()[0])) {
            resourceElt.addAttribute("protocol", "https", null);
        }
    }

    if (resource.getUriTemplate() != null) {
        resourceElt.addAttribute("uri-template", resource.getUriTemplate(), null);
    } else if (resource.getUrlMapping() != null) {
        resourceElt.addAttribute("url-mapping", resource.getUrlMapping(), null);
    }

    if (resource.getInSequenceAttribute() != null) {
        resourceElt.addAttribute("inSequence", resource.getInSequenceAttribute(), null);
    } else {
        let inSequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(resource.getInSequence());
        inSequenceElt.setLocalName("inSequence");
        resourceElt.addChild(inSequenceElt);
    }

    if (resource.getOutSequenceAttribute() != null) {
        resourceElt.addAttribute("outSequence", resource.getOutSequenceAttribute(), null);
    } else if (resource.getOutSequence() != null) {
        let outSequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(resource.getOutSequence());
        outSequenceElt.setLocalName("outSequence");
        resourceElt.addChild(outSequenceElt);
    }

    if (resource.getFaultSequenceAttribute() != null) {
        resourceElt.addAttribute("faultSequence", resource.getFaultSequenceAttribute(), null);
    } else {
        let faultSequenceElt =
                AnonymousSequenceSerializer.serializeAnonymousSequence(resource.getFaultSequence());
        faultSequenceElt.setLocalName("faultSequence");
        resourceElt.addChild(faultSequenceElt);
    }

    return resourceElt;

  }
}
