// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/ProxySerializer.java by the java2ts converter (see tools/java2ts).
import { AnonymousSequenceSerializer } from "./AnonymousSequenceSerializer.js";
import { Constant } from "../constant.js";
import { EndpointSerializer } from "./endpoint/EndpointSerializer.js";
import "./endpoint/registerEndpointSerializers.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { Proxy } from "../pojo/proxy/Proxy.js";
import { ProxyPolicy } from "../pojo/proxy/ProxyPolicy.js";
import { ProxyPublishWSDL } from "../pojo/proxy/ProxyPublishWSDL.js";
import { ProxyTarget } from "../pojo/proxy/ProxyTarget.js";
import { Resource } from "../pojo/proxy/Resource.js";
import { STNode } from "../stNode.js";
import { SerializerUtils } from "./SerializerUtils.js";

export class ProxySerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeProxy(proxy: Proxy): string {
    let proxyElt = ProxySerializer.fac.createOMElement("proxy", Constant.SYNAPSE_OMNAMESPACE);

    ProxySerializer.serializerAttributes(proxy, proxyElt);
    ProxySerializer.serializeChildren(proxy, proxyElt);
    return String(proxyElt);

  }

  static serializerAttributes(proxy: Proxy, proxyElt: OMElement): void {
    if (proxy.getName() != null) {
        proxyElt.addAttribute("name", proxy.getName(), null);
    }
    if (proxy.getTransports() != null) {
        proxyElt.addAttribute("transports", proxy.getTransports(), null);
    }
    if (proxy.getStatistics() != null) {
        proxyElt.addAttribute("statistics", proxy.getStatistics().name(), null);
    }
    if (proxy.getTrace() != null) {
        proxyElt.addAttribute("trace", proxy.getTrace().name(), null);
    }
    if (proxy.getPinnedServers() != null) {
        proxyElt.addAttribute("pinnedServers", proxy.getPinnedServers(), null);
    }
    if (proxy.getServiceGroup() != null) {
        proxyElt.addAttribute("serviceGroup", proxy.getServiceGroup(), null);
    }
    proxyElt.addAttribute("startOnLoad", String(proxy.isStartOnLoad()), null);

  }

  static serializeChildren(proxy: Proxy, proxyElt: OMElement): void {
    if (proxy.getDescription() != null) {
        ProxySerializer.serializeDescription(proxy.getDescription(), proxyElt);
    }
    if (proxy.getTarget() != null) {
        ProxySerializer.serializeTarget(proxy.getTarget(), proxyElt);
    }
    if (proxy.getPublishWSDL() != null) {
        ProxySerializer.serializePublishWSDL(proxy.getPublishWSDL(), proxyElt);
    }
    if (proxy.getEnableAddressing() != null) {
        ProxySerializer.serializeEnableAddressing(proxy.getEnableAddressing(), proxyElt);
    }
    if (proxy.getEnableSec() != null) {
        ProxySerializer.serializeEnableSec(proxy.getEnableSec(), proxyElt);
    }
    if (proxy.getEnableRM() != null) {
        ProxySerializer.serializeEnableRM(proxy.getEnableRM(), proxyElt);
    }
    if (proxy.getPolicies() != null) {
        ProxySerializer.serializePolicies(proxy.getPolicies(), proxyElt);
    }
    if (proxy.getParameters() != null) {
        SerializerUtils.serializeParameters(proxy.getParameters(), proxyElt);
    }

  }

  static serializeDescription(description: string, proxyElt: OMElement): void {
    let descriptionElt = ProxySerializer.fac.createOMElement("description", Constant.SYNAPSE_OMNAMESPACE);
    descriptionElt.setText(description);
    proxyElt.addChild(descriptionElt);

  }

  static serializeTarget(target: ProxyTarget, proxyElt: OMElement): void {
    let targetElt = ProxySerializer.fac.createOMElement("target", Constant.SYNAPSE_OMNAMESPACE);
    if (target.getInSequenceAttribute() != null) {
        targetElt.addAttribute("inSequence", target.getInSequenceAttribute(), null);
    } else {
        let inSequence = AnonymousSequenceSerializer.serializeAnonymousSequence(target.getInSequence());
        inSequence.setLocalName("inSequence");
        targetElt.addChild(inSequence);
    }

    if (target.getOutSequenceAttribute() != null) {
        targetElt.addAttribute("outSequence", target.getOutSequenceAttribute(), null);
    } else {
        let outSequence = AnonymousSequenceSerializer.serializeAnonymousSequence(target.getOutSequence());
        outSequence.setLocalName("outSequence");
        targetElt.addChild(outSequence);
    }

    if (target.getFaultSequenceAttribute() != null) {
        targetElt.addAttribute("faultSequence", target.getFaultSequenceAttribute(), null);
    } else {
        let faultSequence = AnonymousSequenceSerializer.serializeAnonymousSequence(target.getFaultSequence());
        faultSequence.setLocalName("faultSequence");
        targetElt.addChild(faultSequence);
    }

    if (target.getEndpointAttribute() != null) {
        targetElt.addAttribute("endpoint", target.getEndpoint().getName(), null);
    } else if (target.getEndpoint() != null) {
        let endpoint = EndpointSerializer.serializeEndpoint(target.getEndpoint());
        targetElt.addChild(endpoint);
    }
    proxyElt.addChild(targetElt);

  }

  static serializePublishWSDL(publishWSDL: ProxyPublishWSDL, proxyElt: OMElement): void {
    let publishWSDLElt = ProxySerializer.fac.createOMElement("publishWSDL", Constant.SYNAPSE_OMNAMESPACE);
    if (publishWSDL.getInlineWsdl() != null) {
        let inlineWSDLElt = SerializerUtils.stringToOM(publishWSDL.getInlineWsdl());
        if (inlineWSDLElt != null) {
            publishWSDLElt.addChild(inlineWSDLElt);
        }


    }
    if (publishWSDL.getResource() != null) {
        ProxySerializer.serializeResource(publishWSDL.getResource(), publishWSDLElt);
    }

    if (publishWSDL.getUri() != null) {
        publishWSDLElt.addAttribute("uri", publishWSDL.getUri(), null);
    }
    if (publishWSDL.getKey() != null) {
        publishWSDLElt.addAttribute("key", publishWSDL.getKey(), null);
    }
    if (publishWSDL.getEndpoint() != null) {
        publishWSDLElt.addAttribute("endpoint", publishWSDL.getEndpoint(), null);
    }
    publishWSDLElt.addAttribute("preservePolicy", String(publishWSDL.isPreservePolicy()), null);
    proxyElt.addChild(publishWSDLElt);

  }

  static serializeResource(resource: Resource[], publishWSDLElt: OMElement): void {
    for (let res of resource) {
        let resourceElt = ProxySerializer.fac.createOMElement("resource", Constant.SYNAPSE_OMNAMESPACE);
        resourceElt.addAttribute("location", res.getLocation(), null);
        resourceElt.addAttribute("key", res.getKey(), null);
        publishWSDLElt.addChild(resourceElt);
    }

  }

  static serializeEnableAddressing(enableAddressing: STNode, proxyElt: OMElement): void {
    let enableAddressingElt = ProxySerializer.fac.createOMElement("enableAddressing", Constant.SYNAPSE_OMNAMESPACE);
    enableAddressingElt.setText(enableAddressing.getTextNode());
    proxyElt.addChild(enableAddressingElt);

  }

  static serializeEnableSec(enableSec: STNode, proxyElt: OMElement): void {
    let enableSecElt = ProxySerializer.fac.createOMElement("enableSec", Constant.SYNAPSE_OMNAMESPACE);
    enableSecElt.setText(enableSec.getTextNode());
    proxyElt.addChild(enableSecElt);

  }

  static serializeEnableRM(enableRM: STNode, proxyElt: OMElement): void {
    let enableRMElt = ProxySerializer.fac.createOMElement("enableRM", Constant.SYNAPSE_OMNAMESPACE);
    enableRMElt.setText(enableRM.getTextNode());
    proxyElt.addChild(enableRMElt);

  }

  static serializePolicies(policies: ProxyPolicy[], proxyElt: OMElement): void {
    for (let policy of policies) {
        let policyElt = ProxySerializer.fac.createOMElement("policy", Constant.SYNAPSE_OMNAMESPACE);
        if (policy.getKey() != null) {
            policyElt.addAttribute("key", policy.getKey(), null);
        }
        if (policy.getType() != null) {
            policyElt.addAttribute("type", policy.getType().name(), null);
        }
        proxyElt.addChild(policyElt);
    }

  }
}
