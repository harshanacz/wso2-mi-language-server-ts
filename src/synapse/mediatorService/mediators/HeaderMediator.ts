// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/HeaderMediator.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Header } from "../../../syntaxTree/pojo/mediator/core/Header.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class HeaderMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, header: Header, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("remove", get(data, "headerAction"))) {
        removeFrom(data, "valueExpression");
        removeFrom(data, "valueLiteral");
        removeFrom(data, "valueInline");
    }

    if (data.has("namespaces") && Array.isArray(get(data, "namespaces"))) {
        let targetNamespaces = (get(data, "namespaces") as any[]);
        let processedNamespaces = [];
        for (let namespaceObj of targetNamespaces) {
            if (Array.isArray(namespaceObj)) {
                let namespace = (namespaceObj as string[]);
                processedNamespaces.push(new Map<string, any>([["prefix", get(namespace, 0) != null ? get(namespace, 0) : ""], ["uri", get(namespace, 1) != null ? get(namespace, 1) : ""]]));
            }
        }
        data.set("namespaces", processedNamespaces);
    }
    let valueType = (get(data, "valueType") as string);
    if (equals("LITERAL", valueType)) {
        removeFrom(data, "valueExpression");
        removeFrom(data, "valueInline");
    } else if (equals("EXPRESSION", valueType)) {
        removeFrom(data, "valueLiteral");
        removeFrom(data, "valueInline");
        if (get(data, "valueExpression") != null &&((get(data, "valueExpression") as Map<any, any>)).has("namespaces")) {
            ((get(((get(data, "valueExpression") as Map<any, any>)), "namespaces") as any[])).forEach(namespace => {
                if (namespace instanceof Map) {
                    if (!contains(((get(data, "namespaces") as any[])), namespace)) {((get(data, "namespaces") as any[])).push(namespace);
                    }
                }
            });
        }
    } else {
        removeFrom(data, "valueExpression");
        removeFrom(data, "valueLiteral");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Header): Map<string, any> {
    let data = new Map();
    data.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()).map(namespace => [namespace.getPrefix(), namespace.getUri()]));
    data.set("description", node.getDescription());
    if (node.getName() != null) {
        data.set("headerName", node.getName());
    }

    if (node.getAction() != null) {
        data.set("headerAction", node.getAction());
    }

    if (node.getAny() != null) {
        data.set("valueType", "INLINE");
    } else if (node.getValue() != null) {
        data.set("valueType", "LITERAL");
    } else {
        data.set("valueType", "EXPRESSION");
    }

    let valueType = (get(data, "valueType") as string);
    if (equals("EXPRESSION", valueType)) {
        let valueExpression = new Map();
        valueExpression.set("isExpression", true);
        valueExpression.set("value", node.getExpression());
        valueExpression.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()));
        data.set("valueExpression", valueExpression);
    } else if (equals("LITERAL", valueType)) {
        data.set("valueLiteral", node.getValue());
    } else if (equals("INLINE", valueType)) {
        data.set("valueInline", node.getAny());
    }

    data.set("scope", node.getScope().getValue());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
