// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/JsontransformMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Jsontransform } from "../../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { Range } from "../../lsp.js";

export class JsontransformMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, jsonTransform: Jsontransform, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let jsonTransformProperties = Array.isArray(get(data, "jsonTransformProperties"))
            ? (get(data, "jsonTransformProperties") as any[])
            : [];
    let transformedProperties = [];

    for (let propertyObj of jsonTransformProperties) {
        if (Array.isArray(propertyObj)) {
            let property = (propertyObj as any[]);
            let propertyMap = new Map();
            propertyMap.set("propertyName", (typeof get(property, 0) === "string") ? (get(property, 0) as string) : "");
            propertyMap.set("propertyValue", (typeof get(property, 1) === "string") ? (get(property, 1) as string) : "");
            transformedProperties.push(propertyMap);
        }
    }
    data.set("jsonTransformProperties", transformedProperties);

    if (!isEmpty(transformedProperties)) {
        data.set("hasProperties", true);
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Jsontransform): Map<string, any> {
    let data = new Map();

    data.set("schema", node.getSchema());
    data.set("description", node.getDescription());

    if (node.getProperty() != null) {
        let jsonTransformProperties = [];
        for (let property of node.getProperty()) {
            jsonTransformProperties.push([property.getName() != null ? property.getName() : "",
                    property.getValue() != null ? property.getValue() : ""
            ]);
        }
        data.set("jsonTransformProperties", jsonTransformProperties);
    } else {
        data.set("jsonTransformProperties", []);
    }

    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
