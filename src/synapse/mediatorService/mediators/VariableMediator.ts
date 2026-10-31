// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/VariableMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Variable } from "../../../syntaxTree/pojo/mediator/core/Variable.js";

export class VariableMediator {
  static readonly __fields: string[] = [];

  static processData(data: Map<string, any>, variable: Variable, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let variableValue = (get(data, "variableValue") as Map<string, any>);
    if (variableValue != null && equals(true, get(variableValue, "isExpression"))) {
        data.set("expression", get(variableValue, "value"));
        data.set("namespaces", get(variableValue, "namespaces"));
        removeFrom(data, "variableValue");
    } else if (variableValue != null) {
        data.set("value", get(variableValue, "value"));
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST(variable: Variable): Map<string, any> {
    let data = new Map();
    data.set("description", variable.getDescription());
    data.set("variableName", variable.getName());

    if (variable.getType() != null) {
        data.set("variableDataType", variable.getType());
    }

    if (variable.getAction() != null) {
        data.set("variableAction", variable.getAction());
    }

    let variableValue = new Map();
    if (variable.getValue() != null) {
        variableValue.set("isExpression", false);
        variableValue.set("value", variable.getValue());
    } else if (variable.getExpression() != null) {
        variableValue.set("isExpression", true);
        variableValue.set("value", variable.getExpression());
        variableValue.set("namespaces", MediatorUtils.transformNamespaces(variable.getNamespaces()));
    }
    data.set("variableValue", variableValue);
    data.set("traceFilter", equals("enable", variable.getTraceFilter()));
    return data;

  }
}
