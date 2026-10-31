// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/LogMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Either } from "../../lsp.js";
import { Log } from "../../../syntaxTree/pojo/mediator/core/Log.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class LogMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, log: Log, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("isLatest") && !parseBoolean((get(data, "isLatest") as string))) {
        data.set("isLatest", false);
    } else {
        data.set("isLatest", true);
    }

    if (data.has("level") && (typeof get(data, "level") === "string")) {
        data.set("level", ((get(data, "level") as string)).toLowerCase());
    }

    let propertiesList = Array.isArray(get(data, "properties")) ?
            (get(data, "properties") as any[]) : [];
    let processedProperties = [];
    if (data.has("properties")) {
        for (let propertyObj of propertiesList) {
            if (Array.isArray(propertyObj)) {
                let property = (propertyObj as any[]);

                if (size(property) > 1 && get(property, 1) instanceof Map) {
                    let valueMap = (get(property, 1) as Map<string, any>);
                    let isExpressionValue = equals(true, get(valueMap, "isExpression"));
                    let processedProperty = new Map();
                    processedProperty.set("propertyName", get(property, 0));
                    if (!isExpressionValue) {
                        processedProperty.set("value", get(valueMap, "value"));
                    } else {
                        processedProperty.set("expression", get(valueMap, "value"));
                    }
                    processedProperty.set("namespaces", get(valueMap, "namespaces"));
                    processedProperties.push(processedProperty);
                }
            }
        }

        data.set("properties", processedProperties);
    }

    if (isEmpty(processedProperties) || isEmpty(propertiesList)) {
        data.set("selfClosed", true);
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Log): Map<string, any> {
    let data = new Map();

    if (node.getCategory() != null) {
        data.set("category", String(node.getCategory()));
    }
    if (node.getLevel() != null) {
        data.set("level", node.getLevel().toUpperCase());
    }
    data.set("description", node.getDescription());
    data.set("separator", node.getSeparator());
    if (node.getProperty() != null) {
        let properties = [];
        for (let property of node.getProperty()) {
            let valueMap = new Map();
            valueMap.set("value", property.getValue() != null ? property.getValue() : property.getExpression());
            valueMap.set("isExpression", property.getExpression() != null);
            valueMap.set("namespaces", MediatorUtils.transformNamespaces(property.getNamespaces()));
            properties.push([property.getName() != null ? property.getName() : "", valueMap,
                    valueMap]);
        }
        data.set("properties", properties);
    }
    return data;

  }

  static getDataFromST440(node: Log): Map<string, any> {
    let data = new Map();

    if (node.getCategory() != null) {
        data.set("category", String(node.getCategory()));
    }
    if (node.getLevel() != null) {
        data.set("level", node.getLevel().toUpperCase());
        data.set(Constant.UI_SCHEMA_NAME, "log_430");
    }
    data.set("message", node.getMessage());
    data.set("description", node.getDescription());
    data.set("separator", node.getSeparator());
    data.set(Constant.LOG_FULL_PAYLOAD, node.isLogFullPayload());
    data.set(Constant.LOG_MESSAGE_ID, node.isLogMessageID());
    if (node.getProperty() != null) {
        let properties = [];
        for (let property of node.getProperty()) {
            let valueMap = new Map();
            valueMap.set("value", property.getValue() != null ? property.getValue() : property.getExpression());
            valueMap.set("isExpression", property.getExpression() != null);
            valueMap.set("namespaces", MediatorUtils.transformNamespaces(property.getNamespaces()));
            properties.push([property.getName() != null ? property.getName() : "",
                    valueMap]);
        }
        data.set("properties", properties);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
