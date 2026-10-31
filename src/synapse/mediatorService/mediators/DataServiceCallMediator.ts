// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/DataServiceCallMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { DataServiceCall } from "../../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { DataServiceCallSourceType } from "../../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallSourceType.js";
import { Either } from "../../lsp.js";
import { Range } from "../../lsp.js";
import { TargetType } from "../../../syntaxTree/pojo/misc/TargetType.js";

export class DataServiceCallMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, dataServiceCall: DataServiceCall, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("operationType") && (typeof get(data, "operationType") === "string")) {
        data.set("operationType", ((get(data, "operationType") as string)).toLowerCase());
    }


    if (equals("BODY", get(data, "sourceType"))) {
        removeFrom(data, "operations");
    }
    if (equals("BODY", get(data, "targetType"))) {
        removeFrom(data, "targetProperty");
    }


    if ((typeof get(data, "sourceType") === "string")) {
        data.set("sourceType", ((get(data, "sourceType") as string)).toLowerCase());
    }
    if ((typeof get(data, "targetType") === "string")) {
        data.set("targetType", ((get(data, "targetType") as string)).toLowerCase());
    }


    if (data.has("operations") && Array.isArray(get(data, "operations"))) {
        let operations = (get(data, "operations") as any[]);
        if (!isEmpty(operations)) {
            data.set("hasOperations", true);

            let processedOperations = [];
            for (let operationObj of operations) {
                if (Array.isArray(operationObj)) {
                    let operation = (operationObj as any[]);
                    let operationData = new Map();
                    operationData.set("operationName", (typeof get(operation, 0) === "string") ? get(operation, 0) : "");

                    let properties = Array.isArray(get(operation, 1)) ?
                            (get(operation, 1) as any[]) : [];
                    let dssProperties = [];

                    for (let propertyObj of properties) {
                        if (Array.isArray(propertyObj)) {
                            let property = (propertyObj as any[]);
                            let propertyData = new Map();
                            propertyData.set("propertyName", (typeof get(property, 0) === "string") ? get(property, 0) : "");
                            propertyData.set("propertyValue", (typeof get(property, 2) === "string") ? get(property, 2) : "");
                            propertyData.set("propertyExpression", get(property, 3) instanceof Map &&(typeof get(((get(property, 3) as Map<any, any>)), "value") === "string")
                                    ?get(((get(property, 3) as Map<any, any>)), "value")
                                    : null);
                            dssProperties.push(propertyData);
                        }
                    }
                    operationData.set("DSSProperties", dssProperties);
                    processedOperations.push(operationData);
                }
            }
            data.set("operations", processedOperations);
        }
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: DataServiceCall): Map<string, any> {
    let data = new Map();
    data.set("serviceName", node.getServiceName());
    data.set("description", node.getDescription());
    if (node.getSource() != null && node.getSource().getType() != null) {
        data.set("sourceType", node.getSource().getType() == DataServiceCallSourceType.inline ? "INLINE" : "BODY");
    }
    if (node.getTarget() != null && node.getTarget().getType() != null) {
        data.set("targetType", node.getTarget().getType() == TargetType.property ? "PROPERTY" : "BODY");
    }

    data.set("targetProperty", node.getTarget() != null ? node.getTarget().getName() : null);
    data.set("operationType", node.getOperations() != null && node.getOperations().getType() != null ?
            node.getOperations().getType().getValue().toUpperCase() : null);


    if (node.getOperations() != null && node.getOperations().getOperation() != null) {
        let operations = [];

        for (let operation of node.getOperations().getOperation()) {
            let operationData = [];
            operationData.push(operation.getName());

            let parameters = [];
            for (let param of operation.getParam()) {
                let paramData = [];
                paramData.push(param.getName());
                paramData.push(param.getValue() != null ? "LITERAL" : "EXPRESSION");
                paramData.push(param.getValue());
                paramData.push(new Map<string, any>([["isExpression", true], ["value", param.getExpression() != null ? param.getExpression() : ""]]));
                parameters.push(paramData);
            }

            operationData.push(parameters);
            operations.push(operationData);
        }

        data.set("operations", operations);
    } else {
        data.set("operations", []);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
