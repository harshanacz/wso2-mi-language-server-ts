// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/MediatorUtils.java by the java2ts converter (see tools/java2ts).
import { isEmpty, contains, get, jsplit, format, entrySet } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { ExpressionHelperProvider } from "../expression/ExpressionHelperProvider.js";
import { ExpressionParam } from "../expression/pojo/ExpressionParam.js";
import { Namespace } from "./pojo/Namespace.js";
import { Position } from "../lsp.js";
import { TextDocumentIdentifier } from "../lsp.js";

export class MediatorUtils {
  static readonly __fields: string[] = [];

  static generateResponseVariableDefaultValue(documentIdentifier: TextDocumentIdentifier, position: Position, connectorName: string, operationName: string): string {
    let expressionHelperProvider = new ExpressionHelperProvider("");
    let expressionParam = new ExpressionParam(documentIdentifier.getUri(), position);
    let lastMediatorHelperData = expressionHelperProvider.getLastMediatorHelperData(expressionParam);
    let variables = lastMediatorHelperData.getVariables();
    let usedMaxDigit = 0;
    for (let variable of variables) {
        let variableName = variable.getLabel();
        if (variableName.startsWith(format("%s_%s_", connectorName, operationName))) {
            let digitPart = jsplit(variableName, "_")[2];
            try {
                usedMaxDigit = Math.max(usedMaxDigit, parseInt(digitPart));
            } catch (ignored) {
                continue;
            }
        }
    }
    return format("%s_%s_%s", connectorName, operationName, usedMaxDigit + 1);

  }

  static transformNamespaces(namespaces: Map<string, string>): Namespace[] {
    let transformedNamespaces = [];
    if (namespaces != null && !isEmpty(namespaces)) {
        for (let entry of entrySet(namespaces)) {
            let key = entry.getKey();
            let uri = entry.getValue();
            let parts = jsplit(key, ":");
            let prefix = parts.length > 1 ? parts[1] : "";
            transformedNamespaces.push(new Namespace(prefix, uri));
        }
    }
    return transformedNamespaces;

  }

  static anyMatch(first: string[], second: string[]): boolean {
    return first.some((a) => contains(second, a));

  }

  static filterNamespaces(namespaces: Map<string, any>[]): Map<string, any>[] {
    let filteredNamespaces = [];
    let prefixes = [];
    let uris = [];

    for (let namespace of namespaces) {
        let key = (get(namespace, "prefix") as string);
        let uri = (get(namespace, "uri") as string);
        if (!contains(prefixes, key) && !contains(uris, uri)) {
            prefixes.push(key);
            uris.push(uri);
            filteredNamespaces.push(namespace);
        }
    }
    return filteredNamespaces;

  }

  static getExpressionData(expression: string): Map<any, any> {
    return new Map<string, any>([[Constant.IS_EXPRESSION, true], [Constant.VALUE, expression]]);

  }
}
