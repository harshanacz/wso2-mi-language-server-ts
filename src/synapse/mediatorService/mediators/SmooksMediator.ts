// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/SmooksMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Smooks } from "../../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";

export class SmooksMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, smooks: Smooks, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let outputMethod = (get(data, "outputMethod") as string);
    if (equals("Property", outputMethod)) {
        removeFrom(data, "outputExpression");
    } else if (equals("Expression", outputMethod)) {
        removeFrom(data, "outputProperty");
    } else {
        removeFrom(data, "outputProperty");
        removeFrom(data, "outputExpression");
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Smooks): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("configurationKey", node.getConfigKey());


    if (node.getInput() != null) {
        data.set("inputExpression", new Map<string, any>([["isExpression", true], ["value", node.getInput().getExpression() != null ? node.getInput().getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getInput().getNamespaces())]]));
        data.set("inputType", node.getInput().getType());
    }


    if (node.getOutput() != null) {
        data.set("outputType", node.getOutput().getType());

        if (node.getOutput().getExpression() != null) {
            data.set("outputMethod", "Expression");
            data.set("outputExpression", node.getOutput().getExpression());
            data.set("outputAction", node.getOutput().getAction());
        } else if (node.getOutput().getProperty() != null) {
            data.set("outputMethod", "Property");
            data.set("outputProperty", node.getOutput().getProperty());
        } else {
            data.set("outputMethod", "Default");
        }
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
