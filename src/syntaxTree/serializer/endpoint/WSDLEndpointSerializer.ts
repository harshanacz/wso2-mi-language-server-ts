// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/WSDLEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";

export class WSDLEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let wsdlEndpoint = endpoint.getWsdl();
    if (wsdlEndpoint == null) {
        WSDLEndpointSerializer.handleException("Could not find the WSDL endpoint");
    }

    let wsdlEndpointElement = this.serializeWSDLEndpoint(wsdlEndpoint);
    return wsdlEndpointElement;

  }

  serializeWSDLEndpoint(wsdlEndpoint: WSDLEndpoint): OMElement {
    let wsdlEndpointElement = EndpointSerializer.fac.createOMElement("wsdl", EndpointSerializer.synNS);

    this.serializeAttributes(wsdlEndpointElement, wsdlEndpoint);
    this.serializeQOSProperties(wsdlEndpointElement, wsdlEndpoint);
    this.serializeCommonEndpointProperties(wsdlEndpointElement, wsdlEndpoint);

    return wsdlEndpointElement;

  }

  serializeAttributes(wsdlEndpointElement: OMElement, wsdlEndpoint: WSDLEndpoint): void {
    if (wsdlEndpoint.getUri() != null) {
        wsdlEndpointElement.addAttribute("uri", wsdlEndpoint.getUri(), EndpointSerializer.nullNS);
    } else {
        WSDLEndpointSerializer.handleException("WSDL endpoint URI is required.");
    }
    if (wsdlEndpoint.getService() != null) {
        wsdlEndpointElement.addAttribute("service", wsdlEndpoint.getService(), EndpointSerializer.nullNS);
    } else {
        WSDLEndpointSerializer.handleException("WSDL endpoint service is required.");
    }
    if (wsdlEndpoint.getPort() != null) {
        wsdlEndpointElement.addAttribute("port", wsdlEndpoint.getPort(), EndpointSerializer.nullNS);
    } else {
        WSDLEndpointSerializer.handleException("WSDL endpoint port is required.");
    }

    if (wsdlEndpoint.getFormat() != null) {
        wsdlEndpointElement.addAttribute("format", wsdlEndpoint.getFormat().name(), EndpointSerializer.nullNS);
    }
    if (wsdlEndpoint.getOptimize() != null) {
        wsdlEndpointElement.addAttribute("optimize", wsdlEndpoint.getOptimize().name(), EndpointSerializer.nullNS);
    }
    if (wsdlEndpoint.getEncoding() != null) {
        wsdlEndpointElement.addAttribute("encoding", wsdlEndpoint.getEncoding(), EndpointSerializer.nullNS);
    }
    if (wsdlEndpoint.getStatistics() != null) {
        wsdlEndpointElement.addAttribute("statistics", wsdlEndpoint.getStatistics().name(), EndpointSerializer.nullNS);
    }
    if (wsdlEndpoint.getTrace() != null) {
        wsdlEndpointElement.addAttribute("trace", wsdlEndpoint.getTrace().name(), EndpointSerializer.nullNS);
    }

  }

  serializeQOSProperties(wsdlEndpointElement: OMElement, wsdlEndpoint: WSDLEndpoint): void {
    if (wsdlEndpoint.getEnableSec() != null) {
        let enableSec = this.serializeEnableSec(wsdlEndpoint.getEnableSec());
        wsdlEndpointElement.addChild(enableSec);
    }

    if (wsdlEndpoint.getEnableRM() != null) {
        let enableRM = this.serializeEnableRM(wsdlEndpoint.getEnableRM());
        wsdlEndpointElement.addChild(enableRM);
    }

    if (wsdlEndpoint.getEnableAddressing() != null) {
        let enableAddressing = this.serializeEnableAddressing(wsdlEndpoint.getEnableAddressing());
        wsdlEndpointElement.addChild(enableAddressing);
    }

  }

  serializeCommonEndpointProperties(wsdlEndpointElement: OMElement, wsdlEndpoint: WSDLEndpoint): void {
    if (wsdlEndpoint.getTimeout() != null) {
        let timeout = this.serializeTimeout(wsdlEndpoint.getTimeout());
        wsdlEndpointElement.addChild(timeout);
    }

    if (wsdlEndpoint.getSuspendOnFailure() != null) {
        let suspendOnFailure = this.serializeSuspendOnFailure(wsdlEndpoint.getSuspendOnFailure());
        wsdlEndpointElement.addChild(suspendOnFailure);
    }

    if (wsdlEndpoint.getMarkForSuspension() != null) {
        let markForSuspension = this.serializeMarkForSuspension(wsdlEndpoint.getMarkForSuspension());
        wsdlEndpointElement.addChild(markForSuspension);
    }

  }
}
