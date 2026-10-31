// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ClassMediator.java by the java2ts converter (see tools/java2ts).
import { equals, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class ClassMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, aClass: any, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let properties = [];
    let propertiesData = Array.isArray(get(data, "properties")) ?
            (get(data, "properties") as any[]) : [];
    for (let propertyObj of propertiesData) {
        if (Array.isArray(propertyObj)) {
            let property = (propertyObj as any[]);
            if (size(property) >= 2) {
                let propertyData = get(property, 1) instanceof Map ?
                        (get(property, 1) as Map<string, any>) : null;
                if (propertyData != null) {
                    let propertyName = (typeof get(property, 0) === "string") ? (get(property, 0) as string) : "";
                    let namespaces = Array.isArray(get(propertyData, "namespaces")) ?
                            (get(propertyData, "namespaces") as string[]) : null;
                    let propertyValue = new Map(new Map<string, any>([["propertyName", propertyName], ["value", get(propertyData, "value") != null ? get(propertyData, "value") : ""], ["isExpression", get(propertyData, "isExpression") != null ?
                                    get(propertyData, "isExpression") : false]]));
                    if (namespaces != null) {
                        propertyValue.set("namespaces", namespaces);
                    }
                    propertyValue.set("propertyName", propertyName);
                    properties.push(propertyValue);
                }
            }
        }
    }

    data.set("properties", properties);
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: any): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("className", node.getName());
    if (node.getProperty() != null) {
        let properties = [];

        for (let property of node.getProperty()) {
            let isExpression = property.getValue() == null;
            let propertyDetails = new Map();
            propertyDetails.set("isExpression", isExpression);
            propertyDetails.set("value", isExpression ? property.getExpression() : property.getValue());

            if (isExpression && property.getNamespaces() != null) {
                propertyDetails.set("namespaces", MediatorUtils.transformNamespaces(property.getNamespaces()));
            }

            properties.push([property.getName() != null ? property.getName() : "",
                    propertyDetails]);
        }

        data.set("properties", properties);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
