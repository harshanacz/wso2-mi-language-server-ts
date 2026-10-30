// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/LoadBalanceEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { AddressEndpointSerializer } from "./AddressEndpointSerializer.js";
import { DefaultEndpointSerializer } from "./DefaultEndpointSerializer.js";
import { EndpointLoadbalance } from "../../pojo/endpoint/loadbalance/EndpointLoadbalance.js";
import { EndpointLoadbalanceEndpoint } from "../../pojo/endpoint/loadbalance/EndpointLoadbalanceEndpoint.js";
import { EndpointLoadbalanceMember } from "../../pojo/endpoint/loadbalance/EndpointLoadbalanceMember.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { HTTPEndpointSerializer } from "./HTTPEndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";
import { WSDLEndpointSerializer } from "./WSDLEndpointSerializer.js";

export class LoadBalanceEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let loadBalanceEndpoint = endpoint.getLoadbalance();
    if (loadBalanceEndpoint == null) {
        LoadBalanceEndpointSerializer.handleException("Could not find the load balance endpoint");
    }

    let loadBalanceElement = this.serializeLoadBalanceEndpoint(loadBalanceEndpoint);

    return loadBalanceElement;

  }

  serializeLoadBalanceEndpoint(loadBalanceEndpoint: EndpointLoadbalance): OMElement {
    let loadBalanceElement = EndpointSerializer.fac.createOMElement("loadbalance", EndpointSerializer.synNS);
    this.serializeAttributes(loadBalanceElement, loadBalanceEndpoint);
    this.serializeChildren(loadBalanceElement, loadBalanceEndpoint);
    return loadBalanceElement;

  }

  serializeAttributes(loadBalanceElement: OMElement, loadBalanceEndpoint: EndpointLoadbalance): void {
    if (loadBalanceEndpoint.getAlgorithm() != null) {
        loadBalanceElement.addAttribute("algorithm", loadBalanceEndpoint.getAlgorithm(), EndpointSerializer.nullNS);
    }
    if (!loadBalanceEndpoint.isFailover()) {
        loadBalanceElement.addAttribute("failover", "false", EndpointSerializer.nullNS);
    }
    if (loadBalanceEndpoint.getPolicy() != null) {
        loadBalanceElement.addAttribute("policy", loadBalanceEndpoint.getPolicy(), EndpointSerializer.nullNS);
    }
    if (loadBalanceEndpoint.isBuildMessage()) {
        loadBalanceElement.addAttribute("buildMessage", String(loadBalanceEndpoint.isBuildMessage()),
                EndpointSerializer.nullNS);
    }

  }

  serializeChildren(loadBalanceElement: OMElement, loadBalanceEndpoint: EndpointLoadbalance): void {
    if (loadBalanceEndpoint.getEndpointOrMember() != null) {
        for (let endpointOrMember of loadBalanceEndpoint.getEndpointOrMember()) {
            if (endpointOrMember.isEndpoint()) {
                this.serializeChildEndpoint(loadBalanceElement, endpointOrMember.getEndpoint());
            } else if (endpointOrMember.isMember()) {
                this.serializeChildMember(loadBalanceElement, endpointOrMember.getMember());
            }
        }
    }

  }

  serializeChildEndpoint(loadBalanceElement: OMElement, endpoint: EndpointLoadbalanceEndpoint): void {
    let endpointElement = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);
    if (endpoint.getKey() != null) {
        endpointElement.addAttribute("key", endpoint.getKey(), EndpointSerializer.nullNS);
    } else {
        if (endpoint.getName() != null) {
            endpointElement.addAttribute("name", endpoint.getName(), EndpointSerializer.nullNS);
        } else {
            LoadBalanceEndpointSerializer.handleException("Endpoint name is required.");
        }
        if (endpoint.get_default() != null) {
            let defaultEndpointSerializer = new DefaultEndpointSerializer();
            let defaultElt = defaultEndpointSerializer.serializeDefaultEndpoint(endpoint.get_default());
            endpointElement.addChild(defaultElt);
        } else if (endpoint.getHttp() != null) {
            let httpEndpointSerializer = new HTTPEndpointSerializer();
            let httpElt = httpEndpointSerializer.serializeHttpEndpoint(endpoint.getHttp());
            endpointElement.addChild(httpElt);
        } else if (endpoint.getAddress() != null) {
            let addressEndpointSerializer = new AddressEndpointSerializer();
            let addressElt = addressEndpointSerializer.serializeAddressEndpoint(endpoint.getAddress());
            endpointElement.addChild(addressElt);
        } else if (endpoint.getWsdl() != null) {
            let wsdlEndpointSerializer = new WSDLEndpointSerializer();
            let wsdlElt = wsdlEndpointSerializer.serializeWSDLEndpoint(endpoint.getWsdl());
            endpointElement.addChild(wsdlElt);
        } else if (endpoint.getLoadbalance() != null) {
            let loadbalanceEndpointSerializer = new LoadBalanceEndpointSerializer();
            let loadbalanceElt =
                    loadbalanceEndpointSerializer.serializeLoadBalanceEndpoint(endpoint.getLoadbalance());
            endpointElement.addChild(loadbalanceElt);
        } else if (endpoint.getSession() != null) {
            let sessionElt = this.serializeSession(endpoint.getSession());
            endpointElement.addChild(sessionElt);
        }
    }
    loadBalanceElement.addChild(endpointElement);

  }

  serializeChildMember(loadBalanceElement: OMElement, member: EndpointLoadbalanceMember): void {
    let memberElement = EndpointSerializer.fac.createOMElement("member", EndpointSerializer.synNS);
    if (member.getHostName() != null) {
        memberElement.addAttribute("hostName", member.getHostName(), EndpointSerializer.nullNS);
    }
    if (member.getHttpPort() != null) {
        memberElement.addAttribute("httpPort", member.getHttpPort(), EndpointSerializer.nullNS);
    }
    if (member.getHttpsPort() != null) {
        memberElement.addAttribute("httpsPort", member.getHttpsPort(), EndpointSerializer.nullNS);
    }
    loadBalanceElement.addChild(memberElement);

  }
}
