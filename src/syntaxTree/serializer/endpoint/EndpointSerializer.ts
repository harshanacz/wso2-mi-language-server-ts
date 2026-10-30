// @ts-nocheck
import { EndpointType } from "../../pojo/endpoint/EndpointType.js";
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/EndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { get, Logger, Level } from "../../javaCompat.js";
import { Constant } from "../../constant.js";
import { EndpointEnableAddressing } from "../../pojo/endpoint/common/EndpointEnableAddressing.js";
import { EndpointEnableRM } from "../../pojo/endpoint/common/EndpointEnableRM.js";
import { EndpointEnableSec } from "../../pojo/endpoint/common/EndpointEnableSec.js";
import { EndpointMarkForSuspension } from "../../pojo/endpoint/common/EndpointMarkForSuspension.js";
import { EndpointParameter } from "../../pojo/endpoint/common/EndpointParameter.js";
import { EndpointProperty } from "../../pojo/endpoint/common/EndpointProperty.js";
import { EndpointRetryConfig } from "../../pojo/endpoint/common/EndpointRetryConfig.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { EndpointSuspendOnFailure } from "../../pojo/endpoint/common/EndpointSuspendOnFailure.js";
import { EndpointTimeout } from "../../pojo/endpoint/common/EndpointTimeout.js";
import { InvalidConfigurationException } from "../../om/errors.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMAbstractFactory } from "../../om/om.js";
import { OMElement } from "../../om/om.js";
import { OMFactory } from "../../om/om.js";
import { OMNamespace } from "../../om/om.js";

export abstract class EndpointSerializer {
  /** Filled by registerEndpointSerializers.ts (kept out of this module to avoid an import cycle). */
  static standalone: Set<Function> = new Set();
  static registry: Map<string, () => EndpointSerializer> = new Map();

  static log: Logger = Logger.getLogger("EndpointSerializer");

  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static readonly synNS: OMNamespace = Constant.SYNAPSE_OMNAMESPACE;

  static readonly nullNS: OMNamespace = EndpointSerializer.fac.createOMNamespace(Constant.EMPTY_STRING, "");

  static serializeEndpoint(endpoint: NamedEndpoint): OMElement {
    let endpointSerializer = EndpointSerializer.getEndpointSerializer(endpoint);
    let endpointElt = null;
    if (endpointSerializer != null) {
        if (EndpointSerializer.standalone.has(endpointSerializer.constructor)) {
            return endpointSerializer.serializeSpecificEndpoint(endpoint);
        }
        endpointElt = EndpointSerializer.fac.createOMElement("endpoint", EndpointSerializer.synNS);
        if (endpoint.getName() != null) {
            endpointElt.addAttribute("name", endpoint.getName(), EndpointSerializer.nullNS);
        } else {
            EndpointSerializer.handleException("Endpoint name is required.");
        }
        let childElement = endpointSerializer.serializeSpecificEndpoint(endpoint);
        endpointElt.addChild(childElement);
        EndpointSerializer.serializeEndpointProperties(endpointElt, endpoint.getProperty());
        EndpointSerializer.serializeEndpointParameters(endpointElt, endpoint.getParameter());
        if (endpoint.getDescription() != null) {
            let descriptionElement = EndpointSerializer.fac.createOMElement("description", EndpointSerializer.synNS);
            descriptionElement.setText(endpoint.getDescription());
            endpointElt.addChild(descriptionElement);
        }
    }
    return endpointElt;

  }

  abstract serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement;

  static getEndpointSerializer(endpoint: NamedEndpoint): EndpointSerializer {
    switch (endpoint.getType()) {
        case EndpointType.NAMED_ENDPOINT:
            return EndpointSerializer.registry.get("ReferenceEndpointSerializer")!();
        case EndpointType.HTTP_ENDPOINT:
            return EndpointSerializer.registry.get("HTTPEndpointSerializer")!();
        case EndpointType.ADDRESS_ENDPOINT:
            return EndpointSerializer.registry.get("AddressEndpointSerializer")!();
        case EndpointType.WSDL_ENDPOINT:
            return EndpointSerializer.registry.get("WSDLEndpointSerializer")!();
        case EndpointType.DEFAULT_ENDPOINT:
            return EndpointSerializer.registry.get("DefaultEndpointSerializer")!();
        case EndpointType.RECIPIENT_LIST_ENDPOINT:
            return EndpointSerializer.registry.get("RecipientListEndpointSerializer")!();
        case EndpointType.LOAD_BALANCE_ENDPOINT:
            return EndpointSerializer.registry.get("LoadBalanceEndpointSerializer")!();
        case EndpointType.FAIL_OVER_ENDPOINT:
            return EndpointSerializer.registry.get("FailoverEndpointSerializer")!();
        case EndpointType.TEMPLATE_ENDPOINT:
            return EndpointSerializer.registry.get("TemplateEndpointSerializer")!();
        default:
            EndpointSerializer.handleException("Invalid endpoint type");
            return null;
    }

  }

  static serializeEndpointProperties(endpointElement: OMElement, properties: EndpointProperty[]): void {
    if (properties != null) {
        for (let property of properties) {
            let propertyElement = EndpointSerializer.fac.createOMElement("property", EndpointSerializer.synNS);
            if (property.getName() != null) {
                propertyElement.addAttribute("name", property.getName(), EndpointSerializer.nullNS);
            } else {
                EndpointSerializer.handleException("Endpoint property name is required.");
            }
            if (property.getValue() != null) {
                propertyElement.addAttribute("value", property.getValue(), EndpointSerializer.nullNS);
            }
            if (property.getScope() != null) {
                propertyElement.addAttribute("scope", property.getScope().getValue(), EndpointSerializer.nullNS);
            }
            endpointElement.addChild(propertyElement);
        }
    }

  }

  static serializeEndpointParameters(endpointElement: OMElement, parameters: EndpointParameter[]): void {
    if (parameters != null) {
        for (let parameter of parameters) {
            let parameterElement = EndpointSerializer.fac.createOMElement("parameter", EndpointSerializer.synNS);
            let paramNSPrefix = parameter.getParamNamespacePrefix();
            if (paramNSPrefix != null) {
                let uri = get(parameter.getNamespaces(), "xmlns:" + paramNSPrefix);
                if (uri != null) {
                    parameterElement.setNamespace(EndpointSerializer.fac.createOMNamespace(uri, paramNSPrefix));
                } else {
                    EndpointSerializer.handleException("Namespace:" + paramNSPrefix + " is not defined in the parameter");
                }
            }
            if (parameter.getName() != null) {
                parameterElement.addAttribute("name", parameter.getName(), EndpointSerializer.nullNS);
            } else {
                EndpointSerializer.handleException("Endpoint parameter name is required.");
            }
            if (parameter.getValue() != null) {
                parameterElement.addAttribute("value", parameter.getValue(), EndpointSerializer.nullNS);
            }
            endpointElement.addChild(parameterElement);
        }
    }

  }

  serializeSuspendOnFailure(suspendOnFailure: EndpointSuspendOnFailure): OMElement {
    let suspendOnFailureElement = EndpointSerializer.fac.createOMElement("suspendOnFailure", EndpointSerializer.synNS);
    if (suspendOnFailure.getErrorCodes() != null) {
        let errorCodesElement = EndpointSerializer.fac.createOMElement("errorCodes", EndpointSerializer.synNS);
        errorCodesElement.setText(suspendOnFailure.getErrorCodes().getTextNode());
        suspendOnFailureElement.addChild(errorCodesElement);
    }
    if (suspendOnFailure.getInitialDuration() != null) {
        let initialDurationElement = EndpointSerializer.fac.createOMElement("initialDuration", EndpointSerializer.synNS);
        initialDurationElement.setText(suspendOnFailure.getInitialDuration().getTextNode());
        suspendOnFailureElement.addChild(initialDurationElement);
    }
    if (suspendOnFailure.getProgressionFactor() != null) {
        let progressionFactorElement = EndpointSerializer.fac.createOMElement("progressionFactor", EndpointSerializer.synNS);
        progressionFactorElement.setText(suspendOnFailure.getProgressionFactor().getTextNode());
        suspendOnFailureElement.addChild(progressionFactorElement);
    }
    if (suspendOnFailure.getMaximumDuration() != null) {
        let maximumDurationElement = EndpointSerializer.fac.createOMElement("maximumDuration", EndpointSerializer.synNS);
        maximumDurationElement.setText(suspendOnFailure.getMaximumDuration().getTextNode());
        suspendOnFailureElement.addChild(maximumDurationElement);
    }
    return suspendOnFailureElement;

  }

  serializeMarkForSuspension(markForSuspension: EndpointMarkForSuspension): OMElement {
    let markForSuspensionElement = EndpointSerializer.fac.createOMElement("markForSuspension", EndpointSerializer.synNS);
    if (markForSuspension.getErrorCodes() != null) {
        let errorCodesElement = EndpointSerializer.fac.createOMElement("errorCodes", EndpointSerializer.synNS);
        errorCodesElement.setText(markForSuspension.getErrorCodes().getTextNode());
        markForSuspensionElement.addChild(errorCodesElement);
    }
    if (markForSuspension.getRetriesBeforeSuspension() != null) {
        let retriesBeforeSuspensionElement = EndpointSerializer.fac.createOMElement("retriesBeforeSuspension", EndpointSerializer.synNS);
        retriesBeforeSuspensionElement.setText(markForSuspension.getRetriesBeforeSuspension().getTextNode());
        markForSuspensionElement.addChild(retriesBeforeSuspensionElement);
    }
    if (markForSuspension.getRetryDelay() != null) {
        let retryDelayElement = EndpointSerializer.fac.createOMElement("retryDelay", EndpointSerializer.synNS);
        retryDelayElement.setText(markForSuspension.getRetryDelay().getTextNode());
        markForSuspensionElement.addChild(retryDelayElement);
    }
    return markForSuspensionElement;

  }

  serializeTimeout(timeout: EndpointTimeout): OMElement {
    let timeoutElement = EndpointSerializer.fac.createOMElement("timeout", EndpointSerializer.synNS);
    if (timeout.getDuration() != null) {
        let durationElement = EndpointSerializer.fac.createOMElement("duration", EndpointSerializer.synNS);
        durationElement.setText(timeout.getDuration().getTextNode());
        timeoutElement.addChild(durationElement);
    }
    if (timeout.getResponseAction() != null) {
        let responseActionElement = EndpointSerializer.fac.createOMElement("responseAction", EndpointSerializer.synNS);
        responseActionElement.setText(timeout.getResponseAction().getTextNode());
        timeoutElement.addChild(responseActionElement);
    }
    return timeoutElement;

  }

  serializeRetryConfig(retryConfig: EndpointRetryConfig): OMElement {
    let retryConfigElement = EndpointSerializer.fac.createOMElement("retryConfig", EndpointSerializer.synNS);
    if (retryConfig.getEnabledErrorCodes() != null) {
        let enabledErrorCodesElement = EndpointSerializer.fac.createOMElement("enabledErrorCodes", EndpointSerializer.synNS);
        enabledErrorCodesElement.setText(retryConfig.getEnabledErrorCodes().getTextNode());
        retryConfigElement.addChild(enabledErrorCodesElement);
    }
    if (retryConfig.getDisabledErrorCodes() != null) {
        let disabledErrorCodesElement = EndpointSerializer.fac.createOMElement("disabledErrorCodes", EndpointSerializer.synNS);
        disabledErrorCodesElement.setText(retryConfig.getDisabledErrorCodes().getTextNode());
        retryConfigElement.addChild(disabledErrorCodesElement);
    }
    return retryConfigElement;

  }

  serializeEnableAddressing(enableAddressing: EndpointEnableAddressing): OMElement {
    let enableAddressingElement = EndpointSerializer.fac.createOMElement("enableAddressing", EndpointSerializer.synNS);
    if (enableAddressing.isSeparateListener()) {
        enableAddressingElement.addAttribute("separateListener", "true", EndpointSerializer.nullNS);
    }
    if (enableAddressing.getVersion() != null) {
        enableAddressingElement.addAttribute("version", enableAddressing.getVersion().getValue(), EndpointSerializer.nullNS);
    }
    return enableAddressingElement;

  }

  serializeEnableSec(enableSec: EndpointEnableSec): OMElement {
    let enableSecElement = EndpointSerializer.fac.createOMElement("enableSec", EndpointSerializer.synNS);
    if (enableSec.getPolicy() != null) {
        enableSecElement.addAttribute("policy", enableSec.getPolicy(), EndpointSerializer.nullNS);
    } else if (enableSec.getInboundPolicy() != null && enableSec.getOutboundPolicy() != null) {
        enableSecElement.addAttribute("inboundPolicy", enableSec.getInboundPolicy(), EndpointSerializer.nullNS);
        enableSecElement.addAttribute("outboundPolicy", enableSec.getOutboundPolicy(), EndpointSerializer.nullNS);
    } else {
        EndpointSerializer.handleException("Invalid security configuration");
    }
    return enableSecElement;

  }

  serializeEnableRM(enableRM: EndpointEnableRM): OMElement {
    let enableRMElement = EndpointSerializer.fac.createOMElement("enableRM", EndpointSerializer.synNS);
    if (enableRM.getPolicy() != null) {
        enableRMElement.addAttribute("policy", enableRM.getPolicy(), EndpointSerializer.nullNS);
    }
    return enableRMElement;

  }

  serializeSession(session: EndpointSession): OMElement {
    let sessionElement = EndpointSerializer.fac.createOMElement("session", EndpointSerializer.synNS);
    if (session.getSessionTimeout() >= 0) {
        let sessionTimeoutElement = EndpointSerializer.fac.createOMElement("sessionTimeout", EndpointSerializer.synNS);
        sessionTimeoutElement.setText(String(session.getSessionTimeout()));
        sessionElement.addChild(sessionTimeoutElement);
    }
    if (session.getType() != null) {
        sessionElement.addAttribute("type", session.getType().name(), EndpointSerializer.nullNS);
    }
    return sessionElement;

  }

  static handleException(s: string): void {
    EndpointSerializer.log.log(Level.SEVERE, s);
    throw new InvalidConfigurationException(s);

  }
}
