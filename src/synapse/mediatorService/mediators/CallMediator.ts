// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/CallMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Call } from "../../../syntaxTree/pojo/mediator/core/call/Call.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Utils } from "../../../syntaxTree/utils.js";

export class CallMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, call: Call, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    data.set("sourceOrTargetOrEndpoint", true);

    if ((get(data, "sourceType") == null || equals("none", get(data, "sourceType")))
            && (get(data, "targetType") == null || equals("none", get(data, "targetType")))
            && data.has("endpoint")) {

        let endpointObj: any = get(data, "endpoint");
        if (endpointObj instanceof Map) {
            let endpoint = (endpointObj as Map<string, any>);
            if (get(endpoint, "value") == null || equals("", get(endpoint, "value")) || equals("NONE", get(endpoint, "value"))) {
                data.set("sourceOrTargetOrEndpoint", false);
            }
        }
    }

    switch ((get(data, "sourceType") as string)) {
        case "body":
            data.set("bodySource", true);
            break;
        case "property":
            data.set("propertySource", true);
            break;
        case "custom":
            data.set("customSource", true);
            break;
        case "inline":
            data.set("inlineSource", true);
            break;
    }

    switch ((get(data, "targetType") as string)) {
        case "body":
            data.set("bodyTarget", true);
            break;
        case "property":
            data.set("propertyTarget", true);
            break;
    }

    let endpoint = get(data, "endpoint") instanceof Map ? (get(data, "endpoint") as Map<string, any>) : null;

    if (endpoint != null && !equals("INLINE", get(endpoint, "value"))) {
        removeFrom(data, "inlineEndpoint");
        data.set("registryOrXpathEndpoint", true);
        if (equals(true, get(endpoint, "isExpression"))) {
            data.set("endpointXpath", endpoint);
        } else {
            data.set("endpointRegistryKey", get(endpoint, "value"));
        }
    }

    if (data.has("contentType") && (typeof get(data, "contentType") === "string") &&isEmpty(((get(data, "contentType") as string)))) {
        removeFrom(data, "contentType");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Call): Map<string, any> {
    let data = new Map();
    let endpointData = new Map();

    let endpoint = node.getEndpoint();
    if (endpoint != null) {
        if (endpoint.getKey() == null && endpoint.getKeyExpression() == null) {
            endpointData.set("isExpression", false);
            endpointData.set("value", "INLINE");

            let endpointXml = node.getInlineEndpointXml();
            if (endpointXml != null) {
                data.set("inlineEndpoint", Utils.formatXml(endpointXml));
            }
        } else {
            endpointData.set("isExpression", endpoint.getKeyExpression() != null);
            endpointData.set("value", endpoint.getKey() != null ? endpoint.getKey() : endpoint.getKeyExpression());
            endpointData.set("namespaces", MediatorUtils.transformNamespaces(endpoint.getNamespaces()));
        }
    } else {
        endpointData.set("isExpression", false);
        endpointData.set("value", "NONE");
    }
    data.set("endpoint", endpointData);

    data.set("enableBlockingCalls", node.isBlocking());
    data.set("description", node.getDescription());
    data.set("contentType", node.getSource() != null ? node.getSource().getContentType() : null);
    data.set("sourceType", node.getSource() != null ? String(node.getSource().getType()) : null);

    if (equals("custom", get(data, "sourceType"))) {
        let sourceXPath = new Map();
        sourceXPath.set("isExpression", true);
        sourceXPath.set("value", node.getSource().getContent());
        data.set("sourceXPath", sourceXPath);
    } else if (equals("property", get(data, "sourceType"))) {
        data.set("sourceProperty", node.getSource().getContent());
    } else if (equals("inline", get(data, "sourceType"))) {
        data.set("sourcePayload", node.getSource().getContent());
    }

    data.set("targetType", node.getTarget() != null ? node.getTarget().getType() : null);
    data.set("targetProperty", node.getTarget() != null ? node.getTarget().getTextNode() : null);
    data.set("initAxis2ClientOptions", node.getInitAxis2ClientOptions());


    data.set("isCallSelfClosed", node.isSelfClosed());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
