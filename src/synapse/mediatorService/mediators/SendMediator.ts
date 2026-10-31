// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/SendMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, matches, replaceAll, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Send } from "../../../syntaxTree/pojo/mediator/core/Send.js";

export class SendMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, send: Send, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("Static", get(data, "receivingSequenceType"))) {
        data.set("receivingSequence", get(data, "staticReceivingSequence"));
    } else if (equals("Dynamic", get(data, "receivingSequenceType"))) {
        if (get(data, "dynamicReceivingSequence") instanceof Map) {
            let dynamicReceivingSequence = (get(data, "dynamicReceivingSequence") as Map<string, any>);
            data.set("receivingSequence", "{" + get(dynamicReceivingSequence, "value") + "}");
            data.set("namespaces", get(dynamicReceivingSequence, "namespaces"));


            if (get(data, "namespaces") instanceof Map) {
                let namespaces = (get(data, "namespaces") as Map<any, any>);
                if (isEmpty(namespaces)) {
                    removeFrom(data, "namespaces");
                }
            }
        }
    }

    if (get(data, "endpoint") == null || equals("", get(data, "endpoint")) || equals("NONE", get(data, "endpoint"))) {
        removeFrom(data, "endpoint");
    } else if (equals("INLINE", get(data, "endpoint"))) {
        data.set("isInline", true);
    }

    if (equals(true, get(data, "skipSerialization"))) {
        removeFrom(data, "receivingSequence");
        removeFrom(data, "buildMessageBeforeSending");
        removeFrom(data, "endpoint");
        removeFrom(data, "namespaces");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Send): Map<string, any> {
    let data = new Map();
    data.set("skipSerialization", false);
    data.set("buildMessageBeforeSending", node.isBuildmessage());
    data.set("description", node.getDescription());
    data.set("selfClosed", node.isSelfClosed());


    if (node.getReceive() != null) {
        if (node.getReceive().startsWith("{")) {
            data.set("receivingSequenceType", "Dynamic");
        } else {
            data.set("receivingSequenceType", "Static");
        }
    } else {
        data.set("receivingSequenceType", "Default");
    }


    if (equals("Static", get(data, "receivingSequenceType"))) {
        data.set("staticReceivingSequence", node.getReceive());
    } else if (equals("Dynamic", get(data, "receivingSequenceType"))) {
        let value = node.getReceive();
        if (value != null && matches(value, "\\{([^}]*)\\}")) {
            value = replaceAll(value, "\\{([^}]*)\\}", "$1");
        }
        data.set("dynamicReceivingSequence", new Map<string, any>([["isExpression", true], ["value", value != null ? value : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    }


    let endpoint = node.getEndpoint();
    if (endpoint != null) {
        if (endpoint.getKey() == null && endpoint.getKeyExpression() == null) {
            data.set("endpoint", "INLINE");

            let endpointXml = node.getInlineEndpointXml();
            if (endpointXml != null) {
                data.set("inlineEndpoint", endpointXml);
            }
        } else {
            data.set("endpoint", endpoint.getKey() != null ? endpoint.getKey() : endpoint.getKeyExpression());
        }
    } else {
        data.set("endpoint", "NONE");
    }

    data.set("range", node.getRange());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
