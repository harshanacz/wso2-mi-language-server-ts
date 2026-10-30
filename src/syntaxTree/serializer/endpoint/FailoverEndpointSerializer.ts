// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/FailoverEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { AddressEndpointSerializer } from "./AddressEndpointSerializer.js";
import { DefaultEndpointSerializer } from "./DefaultEndpointSerializer.js";
import { EndpointFailover } from "../../pojo/endpoint/failover/EndpointFailover.js";
import { EndpointFailoverEndpoint } from "../../pojo/endpoint/failover/EndpointFailoverEndpoint.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { HTTPEndpointSerializer } from "./HTTPEndpointSerializer.js";
import { LoadBalanceEndpointSerializer } from "./LoadBalanceEndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";
import { WSDLEndpointSerializer } from "./WSDLEndpointSerializer.js";

export class FailoverEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let failOverEndpoint = endpoint.getFailover();
    if (failOverEndpoint == null) {
        FailoverEndpointSerializer.handleException("Could not find the failover endpoint.");
    }

    let failOverElement = this.serializeFailoverEndpoint(failOverEndpoint);

    return failOverElement;

  }

  serializeFailoverEndpoint(failOverEndpoint: EndpointFailover): OMElement {
    let failOverElement = EndpointSerializer.fac.createOMElement("failover", EndpointSerializer.synNS);
    this.serializeAttributes(failOverElement, failOverEndpoint);
    this.serializeChildren(failOverElement, failOverEndpoint);
    return failOverElement;

  }

  serializeAttributes(failOverElement: OMElement, failOverEndpoint: EndpointFailover): void {
    if (failOverEndpoint.isDynamic()) {
        failOverElement.addAttribute("dynamic", String(failOverEndpoint.isDynamic()), EndpointSerializer.nullNS);
    }
    if (failOverEndpoint.isBuildMessage()) {
        failOverElement.addAttribute("buildMessage", String(failOverEndpoint.isBuildMessage()), EndpointSerializer.nullNS);
    }

  }

  serializeChildren(failOverElement: OMElement, failOverEndpoint: EndpointFailover): void {
    if (failOverEndpoint.getEndpoint() != null) {
        for (let endpoint of failOverEndpoint.getEndpoint()) {
            let endpointElement = this.serializeChildEndpoints(endpoint);
            failOverElement.addChild(endpointElement);
        }
    }

  }

  serializeChildEndpoints(endpoint: EndpointFailoverEndpoint): OMElement {
    let endpointElement = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);
    if (endpoint.getKey() != null) {
        endpointElement.addAttribute("key", endpoint.getKey(), EndpointSerializer.nullNS);
    } else {
        if (endpoint.getName() != null) {
            endpointElement.addAttribute("name", endpoint.getName(), EndpointSerializer.nullNS);
        } else {
            FailoverEndpointSerializer.handleException("Endpoint name is required.");
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
    return endpointElement;

  }
}
