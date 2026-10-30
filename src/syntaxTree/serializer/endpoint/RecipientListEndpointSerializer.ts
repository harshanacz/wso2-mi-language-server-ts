// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/RecipientListEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { AddressEndpointSerializer } from "./AddressEndpointSerializer.js";
import { DefaultEndpointSerializer } from "./DefaultEndpointSerializer.js";
import { EndpointRecipientlist } from "../../pojo/endpoint/recipientList/EndpointRecipientlist.js";
import { EndpointRecipientlistEndpoint } from "../../pojo/endpoint/recipientList/EndpointRecipientlistEndpoint.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { HTTPEndpointSerializer } from "./HTTPEndpointSerializer.js";
import { LoadBalanceEndpointSerializer } from "./LoadBalanceEndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";
import { WSDLEndpointSerializer } from "./WSDLEndpointSerializer.js";

export class RecipientListEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let recipientListEndpoint = endpoint.getRecipientlist();
    if (recipientListEndpoint == null) {
        RecipientListEndpointSerializer.handleException("Could not find the RecipientList endpoint.");
    }

    let recipientListEndpointElement = this.serializeRecipientListEndpoint(recipientListEndpoint);

    return recipientListEndpointElement;

  }

  serializeRecipientListEndpoint(recipientListEndpoint: EndpointRecipientlist): OMElement {
    let recipientListElement = EndpointSerializer.fac.createOMElement("recipientlist", EndpointSerializer.synNS);
    this.serializeChildren(recipientListElement, recipientListEndpoint);
    return recipientListElement;

  }

  serializeChildren(recipientListElement: OMElement, recipientListEndpoint: EndpointRecipientlist): void {
    if (recipientListEndpoint.getEndpoint() != null) {
        for (let endpoint of recipientListEndpoint.getEndpoint()) {
            let childEp = this.serializeChildEndpoint(endpoint);
            recipientListElement.addChild(childEp);
        }
    }


  }

  serializeChildEndpoint(endpoint: EndpointRecipientlistEndpoint): OMElement {
    let endpointElement = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);
    if (endpoint.getKey() != null) {
        endpointElement.addAttribute("key", endpoint.getKey(), EndpointSerializer.nullNS);
    } else {
        if (endpoint.getName() != null) {
            endpointElement.addAttribute("name", endpoint.getName(), EndpointSerializer.nullNS);
        } else {
            RecipientListEndpointSerializer.handleException("Endpoint name is required.");
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
