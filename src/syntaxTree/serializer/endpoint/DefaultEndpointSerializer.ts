// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/DefaultEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { DefaultEndpoint } from "../../pojo/endpoint/DefaultEndpoint.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";

export class DefaultEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let defaultEndpoint = endpoint.get_default();
    if (defaultEndpoint == null) {
        DefaultEndpointSerializer.handleException("Could not find the default endpoint.");
    }

    let defaultElement = this.serializeDefaultEndpoint(defaultEndpoint);

    return defaultElement;

  }

  serializeDefaultEndpoint(defaultEndpoint: DefaultEndpoint): OMElement {
    let defaultElement = EndpointSerializer.fac.createOMElement("default", EndpointSerializer.synNS);
    this.serializeEndpointConfigurations(defaultElement, defaultEndpoint);
    return defaultElement;

  }

  serializeEndpointConfigurations(defaultElement: OMElement, defaultEndpoint: DefaultEndpoint): void {
    this.serializeQOSProperties(defaultElement, defaultEndpoint);
    this.serializeCommonEndpointProperties(defaultElement, defaultEndpoint);
    this.serializeAttributes(defaultElement, defaultEndpoint);


  }

  serializeQOSProperties(defaultElement: OMElement, defaultEndpoint: DefaultEndpoint): void {
    if (defaultEndpoint.getEnableSec() != null) {
        let enableSecElt = this.serializeEnableSec(defaultEndpoint.getEnableSec());
        defaultElement.addChild(enableSecElt);
    }
    if (defaultEndpoint.getEnableRM() != null) {
        let enableRMElt = this.serializeEnableRM(defaultEndpoint.getEnableRM());
        defaultElement.addChild(enableRMElt);
    }
    if (defaultEndpoint.getEnableAddressing() != null) {
        let enableAddressingElt = this.serializeEnableAddressing(defaultEndpoint.getEnableAddressing());
        defaultElement.addChild(enableAddressingElt);
    }

  }

  serializeCommonEndpointProperties(defaultElement: OMElement, defaultEndpoint: DefaultEndpoint): void {
    if (defaultEndpoint.getTimeout() != null) {
        let timeoutElt = this.serializeTimeout(defaultEndpoint.getTimeout());
        defaultElement.addChild(timeoutElt);
    }
    if (defaultEndpoint.getSuspendOnFailure() != null) {
        let suspendOnFailureElt = this.serializeSuspendOnFailure(defaultEndpoint.getSuspendOnFailure());
        defaultElement.addChild(suspendOnFailureElt);
    }
    if (defaultEndpoint.getMarkForSuspension() != null) {
        let markForSuspensionElt = this.serializeMarkForSuspension(defaultEndpoint.getMarkForSuspension());
        defaultElement.addChild(markForSuspensionElt);
    }

  }

  serializeAttributes(defaultElement: OMElement, defaultEndpoint: DefaultEndpoint): void {
    if (defaultEndpoint.getEncoding() != null) {
        defaultElement.addAttribute("encoding", defaultEndpoint.getEncoding(), EndpointSerializer.nullNS);
    }
    if (defaultEndpoint.getFormat() != null) {
        defaultElement.addAttribute("format", defaultEndpoint.getFormat().name(), EndpointSerializer.nullNS);
    }
    if (defaultEndpoint.getOptimize() != null) {
        defaultElement.addAttribute("optimize", defaultEndpoint.getOptimize().name(), EndpointSerializer.nullNS);
    }
    if (defaultEndpoint.getStatistics() != null) {
        defaultElement.addAttribute("statistics", defaultEndpoint.getStatistics(), EndpointSerializer.nullNS);
    }
    if (defaultEndpoint.getTrace() != null) {
        defaultElement.addAttribute("trace", defaultEndpoint.getTrace(), EndpointSerializer.nullNS);
    }

  }
}
