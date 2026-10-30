// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/AddressEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { DefaultEndpointSerializer } from "./DefaultEndpointSerializer.js";
import { EndpointAddress } from "../../pojo/endpoint/EndpointAddress.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";

export class AddressEndpointSerializer extends DefaultEndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let addressEndpoint = endpoint.getAddress();
    if (addressEndpoint == null) {
        AddressEndpointSerializer.handleException("Could not find the address endpoint.");
    }

    let addressElement = this.serializeAddressEndpoint(addressEndpoint);

    return addressElement;

  }

  serializeAddressEndpoint(addressEndpoint: EndpointAddress): OMElement {
    let addressElement = EndpointSerializer.fac.createOMElement("address", EndpointSerializer.synNS);
    this.serializeEndpointConfigurations(addressElement, addressEndpoint);
    if (addressEndpoint.getUri() != null) {
        addressElement.addAttribute("uri", addressEndpoint.getUri(), EndpointSerializer.nullNS);
    } else {
        AddressEndpointSerializer.handleException("Address URI is required for address endpoint.");
    }
    return addressElement;

  }
}
