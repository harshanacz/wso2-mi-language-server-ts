// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/CallTemplateMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, replaceAll } from "../../../syntaxTree/javaCompat.js";
import { CallTemplate } from "../../../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class CallTemplateMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, callTemplate: CallTemplate, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let parameterNameTable = Array.isArray(get(data, "parameterNameTable")) ?
            (get(data, "parameterNameTable") as any[]) : [];
    let parameterName = [];
    for (let propertyObj of parameterNameTable) {
        if (Array.isArray(propertyObj)) {
            let property = (propertyObj as any[]);
            let value = get(property, 1) instanceof Map ?
                    (get(property, 1) as Map<string, any>) : null;
            if (value != null) {
                let isExpressionValue = (get(value, "isExpression") as boolean);
                let namespaces = isExpressionValue && Array.isArray(get(value, "namespaces")) ?
                        (get(value, "namespaces") as any[]) : null;
                let propertyValue = new Map();
                propertyValue.set("parameterName", get(property, 0));
                propertyValue.set("parameterValue", isExpressionValue ? "{" +
                        get(value, "value") + "}" : get(value, "value"));
                if (namespaces != null) {
                    propertyValue.set("namespaces", namespaces);
                }
                parameterName.push(propertyValue);
            }
        }
    }

    data.set("parameterName", parameterName);
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: CallTemplate): Map<string, any> {
    let data = new Map();
    data.set("targetTemplate", node.getTarget());
    data.set("description", node.getDescription());
    data.set("onError", node.getOnError());
    if (node.getWithParam() != null) {
        let parameterNameTable = [];

        for (let property of node.getWithParam()) {
            let propertyValue = property.getValue() != null ? property.getValue() : "";
            let isExpression = propertyValue.startsWith("{");
            let value = isExpression
                    ? replaceAll(propertyValue, "\\{([^}]*)\\}", "$1")
                    : propertyValue;

            parameterNameTable.push([
                    property.getName() != null ? property.getName() : "",
                    new Map<string, any>([["value", value], ["isExpression", isExpression], ["namespaces", MediatorUtils.transformNamespaces(property.getNamespaces())]])
            ]);
        }

        data.set("parameterNameTable", parameterNameTable);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
