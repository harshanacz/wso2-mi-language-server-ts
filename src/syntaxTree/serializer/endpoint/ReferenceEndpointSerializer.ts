// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/ReferenceEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";
import { SerializerUtils } from "../SerializerUtils.js";

export class ReferenceEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let endpointElt = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);
    if (endpoint.getKey() != null) {
        endpointElt.addAttribute("key", endpoint.getKey(), EndpointSerializer.nullNS);
    } else if (endpoint.getKeyExpression() != null) {
        SerializerUtils.serializeExpression(endpoint.getKeyExpression(), endpointElt, "key", endpoint);
    } else {
        ReferenceEndpointSerializer.handleException("Invalid endpoint. " +
                "Should have a 'key' or 'key expression' ");
    }
    return endpointElt;

  }
}
