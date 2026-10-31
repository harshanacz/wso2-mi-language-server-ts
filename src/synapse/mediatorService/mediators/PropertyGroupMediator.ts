// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/PropertyGroupMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { PropertyGroup } from "../../../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { Range } from "../../lsp.js";

export class PropertyGroupMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, propertyGroup: PropertyGroup, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let propertiesList = Array.isArray(get(data, "properties")) ?
            (get(data, "properties") as any[]) : [];
    let properties = [];

    for (let propertyObj of propertiesList) {
        if (Array.isArray(propertyObj)) {
            let property = (propertyObj as any[]);

            let name = get(property, 0) instanceof Map &&
                    equals(true,get(((get(property, 0) as Map<any, any>)), "isExpression"))
                    ? "{" +get(((get(property, 0) as Map<any, any>)), "value") + "}"
                    : (get(((get(property, 0) as Map<any, any>)), "value") as string);

            let namespaces = [];
            if (get(property, 0) instanceof Map &&Array.isArray(get(((get(property, 0) as Map<any, any>)), "namespaces"))) {
                namespaces.push(...(get(((get(property, 0) as Map<any, any>)), "namespaces") as Map<string, any>[]));
            }

            let value: any = null, expression = null, omValue = null, isInlineOMValue = null;
            if (equals("OM", get(property, 2))) {
                if (get(property, 4) instanceof Map &&
                        equals(true,get(((get(property, 4) as Map<any, any>)), "isExpression"))) {
                    expression =get(((get(property, 4) as Map<any, any>)), "value");
                    if (Array.isArray(get(((get(property, 4) as Map<any, any>)), "namespaces"))) {
                        namespaces.push(...(get(((get(property, 4) as Map<any, any>)), "namespaces") as Map<string, any>[]));
                    }
                } else {
                    isInlineOMValue = true;
                    omValue =get(((get(property, 4) as Map<any, any>)), "value");
                }
            } else {
                if (get(property, 3) instanceof Map &&
                        equals(true,get(((get(property, 3) as Map<any, any>)), "isExpression"))) {
                    expression =get(((get(property, 3) as Map<any, any>)), "value");
                    if (Array.isArray(get(((get(property, 3) as Map<any, any>)), "namespaces"))) {
                        namespaces.push(...(get(((get(property, 3) as Map<any, any>)), "namespaces") as Map<string, any>[]));
                    }
                } else {
                    value =get(((get(property, 3) as Map<any, any>)), "value");
                }
            }

            let filteredNamespaces = MediatorUtils.filterNamespaces(namespaces);

            let hasStringPattern = size(property) > 6 &&
                    get(property, 6) != null && !isEmpty(((get(property, 6) as string)));

            let propertyMap = new Map();
            propertyMap.set("newPropertyName", name);
            propertyMap.set("propertyAction", get(property, 1));
            propertyMap.set("propertyDataType", get(property, 2));
            propertyMap.set("value", value);
            propertyMap.set("expression", expression);
            propertyMap.set("namespaces", filteredNamespaces);
            propertyMap.set("OMValue", omValue);
            propertyMap.set("propertyScope", size(property) > 5 && get(property, 5) != null ?
                    ((get(property, 5) as string)).toLowerCase() : null);
            propertyMap.set("valueStringPattern", hasStringPattern ? get(property, 6) : null);
            propertyMap.set("valueStringCapturingGroup", hasStringPattern ? get(property, 7) : null);
            propertyMap.set("description", size(property) > 8 ? get(property, 8) : null);
            propertyMap.set("isInlineOMValue", isInlineOMValue);

            properties.push(propertyMap);
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

  static getDataFromST430(node: PropertyGroup): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    let properties = [];
    for (let property of node.getProperty()) {
        let isNameExpression = property.getName() != null &&
                property.getName().startsWith("{") && property.getName().endsWith("}");
        let name = isNameExpression
                ? property.getName().substring(1, property.getName().length - 1)
                : property.getName();

        let isValueExpression = property.getValue() == null;

        let namespaces = MediatorUtils.transformNamespaces(property.getNamespaces());

        let omValue: any = property.getAny();
        let isOmExpression = false;
        if (equals("OM", property.getType()) && property.getExpression() != null) {
            isOmExpression = true;
            omValue = property.getExpression();
        }

        let expression = property.getExpression() != null ? property.getExpression() : "";
        let value = property.getValue() != null ? property.getValue() : "";
        properties.push([
                new Map<string, any>([["isExpression", isNameExpression], ["value", name], ["namespaces", namespaces]]),
                property.getAction() != null ? property.getAction() : "",
                property.getType() != null ? String(property.getType()) : "",
                new Map<string, any>([["isExpression", isValueExpression], ["value", isValueExpression ? expression : value], ["namespaces", namespaces]]),
                new Map<string, any>([["isExpression", isOmExpression], ["value", omValue != null ? omValue : ""], ["namespaces", namespaces]]),
                property.getScope() != null ? property.getScope().getValue().toUpperCase() : "",
                property.getPattern() != null ? property.getPattern() : "",
                property.getGroup() != null ? property.getGroup() : "",
                property.getDescription() != null ? property.getDescription() : ""
        ]);
    }
    data.set("properties", properties);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
