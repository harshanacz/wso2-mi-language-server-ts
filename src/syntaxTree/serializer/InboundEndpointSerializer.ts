// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/InboundEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { Constant } from "../constant.js";
import { InboundEndpoint } from "../pojo/inbound/InboundEndpoint.js";
import { InboundEndpointParameters } from "../pojo/inbound/InboundEndpointParameters.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { SerializerUtils } from "./SerializerUtils.js";

export class InboundEndpointSerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeInboundEndpoint(inboundEndpoint: InboundEndpoint): string {
    let inboundEndpointElt = InboundEndpointSerializer.fac.createOMElement("inboundEndpoint", Constant.SYNAPSE_OMNAMESPACE);
    InboundEndpointSerializer.serializeAttributes(inboundEndpoint, inboundEndpointElt);
    InboundEndpointSerializer.serializeParameters(inboundEndpoint.getParameters(), inboundEndpointElt);

    return String(inboundEndpointElt);

  }

  static serializeAttributes(inboundEndpoint: InboundEndpoint, inboundEndpointElt: OMElement): void {
    if (inboundEndpoint.getStatistics() != null) {
        inboundEndpointElt.addAttribute("statistics", inboundEndpoint.getStatistics().name(), null);
    }
    if (inboundEndpoint.getTrace() != null) {
        inboundEndpointElt.addAttribute("trace", inboundEndpoint.getTrace().name(), null);
    }
    if (inboundEndpoint.getName() != null) {
        inboundEndpointElt.addAttribute("name", inboundEndpoint.getName(), null);
    }
    if (inboundEndpoint.getSequence() != null) {
        inboundEndpointElt.addAttribute("sequence", inboundEndpoint.getSequence(), null);
    }
    if (inboundEndpoint.getProtocol() != null) {
        inboundEndpointElt.addAttribute("protocol", inboundEndpoint.getProtocol(), null);
    }
    if (inboundEndpoint.getOnError() != null) {
        inboundEndpointElt.addAttribute("onError", inboundEndpoint.getOnError(), null);
    }
    inboundEndpointElt.addAttribute("suspend", String(inboundEndpoint.isSuspend()), null);
    if (inboundEndpoint.getClazz() != null) {
        inboundEndpointElt.addAttribute("class", inboundEndpoint.getClazz(), null);
    }

  }

  static serializeParameters(parameters: InboundEndpointParameters[], inboundEndpointElt: OMElement): void {
    if (parameters != null) {
        for (let parameter of parameters) {
            let parameterElt = InboundEndpointSerializer.serializeParameter(parameter);
            if (parameterElt != null) {
                inboundEndpointElt.addChild(parameterElt);
            }
        }
    }

  }

  static serializeParameter(parameter: InboundEndpointParameters): OMElement {
    if (parameter != null) {
        let parameterElt = InboundEndpointSerializer.fac.createOMElement("parameters", Constant.SYNAPSE_OMNAMESPACE);
        SerializerUtils.serializeParameters(parameter.getParameter(), parameterElt);
        return parameterElt;
    }
    return null;

  }
}
