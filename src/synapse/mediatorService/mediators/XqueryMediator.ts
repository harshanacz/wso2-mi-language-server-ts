// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/XqueryMediator.java by the java2ts converter (see tools/java2ts).
import { equals, size, get, parseBoolean, matches, replaceAll, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Xquery } from "../../../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";

export class XqueryMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, xquery: Xquery, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("Static", get(data, "scriptKeyType"))) {
        removeFrom(data, "dynamicScriptKey");
    } else {
        if (get(data, "dynamicScriptKey") instanceof Map) {
            let dynamicScriptKey = (get(data, "dynamicScriptKey") as Map<string, any>);
            data.set("dynamicScriptKey", "{" + get(dynamicScriptKey, "value") + "}");
        }
        removeFrom(data, "staticScriptKey");
    }


    if (data.has("variables") && Array.isArray(get(data, "variables"))) {
        let variablesList = (get(data, "variables") as any[]);
        let processedVariables = [];

        for (let variableObj of variablesList) {
            if (Array.isArray(variableObj)) {
                let variable = (variableObj as any[]);

                let variableMap = new Map();
                variableMap.set("variableName", get(variable, 0));
                variableMap.set("variableType", get(variable, 1));
                variableMap.set("variableLiteral", equals("LITERAL", get(variable, 2)) ? get(variable, 3) : null);
                variableMap.set("variableExpression", equals("EXPRESSION", get(variable, 2))
                        ?get(((get(variable, 4) as Map<any, any>)), "value")
                        : null);
                variableMap.set("namespaces", equals("EXPRESSION", get(variable, 2))
                        ?get(((get(variable, 4) as Map<any, any>)), "namespaces")
                        : null);
                variableMap.set("variableKey", size(variable) > 5 ? get(variable, 5) : null);

                processedVariables.push(variableMap);
            }
        }

        data.set("variables", processedVariables);
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Xquery): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (node.getKey() != null) {
        let key = node.getKey();
        if (matches(key, "\\{([^}]*)\\}")) {
            let value = replaceAll(key, "\\{([^}]*)\\}", "$1");
            data.set("scriptKeyType", "Dynamic");
            data.set("dynamicScriptKey", new Map<string, any>([["isExpression", true], ["value", value]]));
            removeFrom(data, "staticScriptKey");
        } else {
            data.set("scriptKeyType", "Static");
            data.set("staticScriptKey", key);
            removeFrom(data, "dynamicScriptKey");
        }
    }


    data.set("targetXPath", new Map<string, any>([["isExpression", true], ["value", node.getTarget()], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));


    data.set("description", node.getDescription());


    if (node.getVariable() != null) {
        let variables = [];
        for (let var1 of node.getVariable()) {
            let namespaces = MediatorUtils.transformNamespaces(var1.getNamespaces());
            variables.push([
                    var1.getName() != null ? var1.getName() : "",
                    var1.getType() != null ? String(var1.getType()) : "",
                    var1.getValue() != null ? "LITERAL" : "EXPRESSION",
                    var1.getValue() != null ? var1.getValue() : "",
                    new Map<string, any>([["isExpression", true], ["value", var1.getExpression() != null ? var1.getExpression() : ""], ["namespaces", namespaces]]),
                    var1.getKey() != null ? var1.getKey() : ""
            ]);
        }
        data.set("variables", variables);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
