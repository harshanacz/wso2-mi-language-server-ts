// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/CalloutMediator.java by the java2ts converter (see tools/java2ts).
import { CalloutTarget } from "../../../syntaxTree/pojo/mediator/core/callout/CalloutTarget.js";
import { CalloutSource } from "../../../syntaxTree/pojo/mediator/core/callout/CalloutSource.js";
import { CalloutEnableSec } from "../../../syntaxTree/pojo/mediator/core/callout/CalloutEnableSec.js";
import { CalloutConfiguration } from "../../../syntaxTree/pojo/mediator/core/callout/CalloutConfiguration.js";
import { Callout } from "../../../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { mapPutAll } from "../../../syntaxTree/javaCompat.js";
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class CalloutMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, callout: Callout, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let xpathPayload = equals("XPATH", get(data, "payloadType"));
    let propertyPayload = equals("PROPERTY", get(data, "payloadType"));
    let envelopePayload = equals("ENVELOPE", get(data, "payloadType"));
    let xpathTarget = equals("XPATH", get(data, "resultType"));
    let propertyTarget = equals("PROPERTY", get(data, "resultType"));

    let targetProperty = get(data, "resultContextProperty") != null ? (get(data, "resultContextProperty") as string) : "";
    let securityEnabled = equals("TRUE", get(data, "securityType"));
    let configurationEnabled = get(data, "pathToAxis2Repository") != null || get(data, "pathToAxis2Xml") != null;
    let policies = equals("TRUE", get(data, "policies"));

    if (xpathTarget) {
        data.set("targetMessageXPath", get(data, "resultMessageXPath"));
    }

    mapPutAll(data, new Map<string, any>([["xpathPayload", xpathPayload], ["propertyPayload", propertyPayload], ["envelopePayload", envelopePayload], ["xpathTarget", xpathTarget], ["propertyTarget", propertyTarget], ["securityEnabled", securityEnabled], ["configurationEnabled", configurationEnabled], ["targetProperty", targetProperty], ["policies", policies]]));

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Callout): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (node.getServiceURL() != null) {
        data.set("endpointType", "URL");
        data.set("serviceURL", node.getServiceURL());
    }
    if (node.getEndpointKey() != null) {
        data.set("endpointType", "AddressEndpoint");
        data.set("addressEndpoint", node.getEndpointKey());
    }
    if (node.getAction() != null) {
        data.set("soapAction", node.getAction());
    }

    let sourceOrTargetOrConfiguration = node.getSourceOrTargetOrConfiguration();
    if (sourceOrTargetOrConfiguration != null) {

        if ((sourceOrTargetOrConfiguration.getConfiguration() != null)) {
            let calloutConfiguration = sourceOrTargetOrConfiguration.getConfiguration();
            if (calloutConfiguration.getRepository() != null) {
                data.set("pathToAxis2Repository", calloutConfiguration.getRepository());
            }
            if (calloutConfiguration.getAxis2Xml() != null) {
                data.set("pathToAxis2xml", calloutConfiguration.getAxis2Xml());
            }
        }

        if ((sourceOrTargetOrConfiguration.getSource() != null)) {
            let source = sourceOrTargetOrConfiguration.getSource();
            if (source.getKey() != null) {
                data.set("payloadType", "PROPERTY");
                data.set("payloadProperty", source.getKey());
            } else if (source.getXpath() != null) {
                data.set("payloadType", "XPATH");
                data.set("payloadMessageXPath", new Map<string, any>([["isExpression", true], ["value", source.getXpath()], ["namespaces", MediatorUtils.transformNamespaces(source.getNamespaces())]]));
            } else {
                data.set("payloadType", "ENVELOPE");
            }
        }

        if ((sourceOrTargetOrConfiguration.getTarget() != null)) {
            let target = sourceOrTargetOrConfiguration.getTarget();
            if (target.getKey() != null) {
                data.set("resultType", "PROPERTY");
                data.set("resultContextProperty", target.getKey());
            } else if (target.getXpath() != null) {
                data.set("resultType", "XPATH");
                data.set("resultMessageXPath", new Map<string, any>([["isExpression", true], ["value", target.getXpath()], ["namespaces", MediatorUtils.transformNamespaces(target.getNamespaces())]]));
            }
        }

        data.set("securityType", "FALSE");
        if ((sourceOrTargetOrConfiguration.getEnableSec() != null)) {
            let enableSec = sourceOrTargetOrConfiguration.getEnableSec();
            data.set("securityType", "TRUE");
            if (enableSec.getPolicy() != null) {
                data.set("policies", "FALSE");
                data.set("policyKey", enableSec.getPolicy());
            } else {
                data.set("policies", "TRUE");
                if (enableSec.getInboundPolicy() != null) {
                    data.set("inboundPolicyKey", enableSec.getInboundPolicy());
                }
                if (enableSec.getOutboundPolicy() != null) {
                    data.set("outboundPolicyKey", enableSec.getOutboundPolicy());
                }
            }
        }
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
