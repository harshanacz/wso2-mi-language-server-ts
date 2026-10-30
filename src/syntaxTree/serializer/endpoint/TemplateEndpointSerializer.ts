// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/TemplateEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";

export class TemplateEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let templateEndpointElement = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);

    this.serializeAttributes(templateEndpointElement, endpoint);
    this.serializeChildren(templateEndpointElement, endpoint);
    return templateEndpointElement;

  }

  serializeAttributes(endpointElt: OMElement, endpoint: NamedEndpoint): void {
    if (endpoint.getName() != null) {
        endpointElt.addAttribute("name", endpoint.getName(), EndpointSerializer.nullNS);
    } else {
        TemplateEndpointSerializer.handleException("Endpoint name is required.");
    }
    if (endpoint.getTemplate() != null) {
        endpointElt.addAttribute("template", endpoint.getTemplate(), EndpointSerializer.nullNS);
    } else {
        TemplateEndpointSerializer.handleException("Template endpoint template is required.");
    }
    if (endpoint.getUri() != null) {
        endpointElt.addAttribute("uri", endpoint.getUri(), EndpointSerializer.nullNS);
    }


  }

  serializeChildren(endpointElt: OMElement, endpoint: NamedEndpoint): void {
    TemplateEndpointSerializer.serializeEndpointProperties(endpointElt, endpoint.getProperty());
    TemplateEndpointSerializer.serializeEndpointParameters(endpointElt, endpoint.getParameter());
    if (endpoint.getDescription() != null) {
        let descriptionElement = EndpointSerializer.fac.createOMElement("description", EndpointSerializer.synNS);
        descriptionElement.setText(endpoint.getDescription());
        endpointElt.addChild(descriptionElement);
    }

  }
}
