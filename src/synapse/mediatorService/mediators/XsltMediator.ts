// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/XsltMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, matches, replaceAll, removeFrom, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Xslt } from "../../../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";

export class XsltMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, xslt: Xslt, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("properties") && Array.isArray(get(data, "properties"))) {
        let propertiesList = (get(data, "properties") as any[]);
        let processedProperties = [];

        for (let propertyObj of propertiesList) {
            if (Array.isArray(propertyObj)) {
                let property = (propertyObj as any[]);

                let propertyMap = new Map();
                propertyMap.set("propertyName", get(property, 0));
                if (get(property, 1) instanceof Map) {
                    let propertyValue = (get(property, 1) as Map<string, any>);
                    if (equals(true, get(propertyValue, "isExpression"))) {
                        propertyMap.set("propertyExpression", propertyValue);
                    } else {
                        propertyMap.set("propertyValue", get(propertyValue, "value"));
                    }
                }
                processedProperties.push(propertyMap);
            }
        }

        data.set("properties", processedProperties);
    }

    if (data.has("features") && Array.isArray(get(data, "features"))) {
        let featuresList = (get(data, "features") as any[]);
        let processedFeatures = [];

        for (let featureObj of featuresList) {
            if (Array.isArray(featureObj)) {
                let feature = (featureObj as any[]);
                processedFeatures.push(new Map<string, any>([["featureName", get(feature, 0)], ["featureEnabled", equals(true, get(feature, 1))]]));
            }
        }

        data.set("features", processedFeatures);
    }

    if (data.has("resources") && Array.isArray(get(data, "resources"))) {
        let resourcesList = (get(data, "resources") as any[]);
        let processedResources = [];

        for (let resourceObj of resourcesList) {
            if (Array.isArray(resourceObj)) {
                let resource = (resourceObj as any[]);
                processedResources.push(new Map<string, any>([["location", get(resource, 0)], ["resourceRegistryKey", get(resource, 1)]]));
            }
        }

        data.set("resources", processedResources);
    }

    if (data.has("xsltSchemaKey") && get(data, "xsltSchemaKey") instanceof Map) {
        let xsltSchemaKey = (get(data, "xsltSchemaKey") as Map<string, any>);
        if (equals(true, get(xsltSchemaKey, "isExpression")) && xsltSchemaKey.has("value")) {
            xsltSchemaKey.set("value", "{" + get(xsltSchemaKey, "value") + "}");
        }
    }

    if (data.has("sourceXPath") && get(data, "sourceXPath") instanceof Map) {
        let sourceXPath = (get(data, "sourceXPath") as Map<string, any>);
        let hasExpression = sourceXPath.has("expression") &&
                !isEmpty(((get(sourceXPath, "expression") as string)));
        let hasValue = sourceXPath.has("value") && !isEmpty(((get(sourceXPath, "value") as string)));
        if (!hasExpression && !hasValue) {
            removeFrom(data, "sourceXPath");
        }
    }

    data.set("namespaces", XsltMediator.getNamespaces(data));

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Xslt): Map<string, any> {
    let data = new Map();
    if (StringUtils.isNotBlank(node.getSource())) {
        data.set("sourceXPath", new Map<string, any>([["isExpression", true], ["value", node.getSource()], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    }


    data.set("description", node.getDescription());


    if (node.getKey() != null) {
        let key = node.getKey();
        if (matches(key, "\\{([^}]*)\\}")) {
            let value = replaceAll(key, "\\{([^}]*)\\}", "$1");
            data.set("xsltSchemaKey", new Map<string, any>([["isExpression", true], ["value", value], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
        } else {
            data.set("xsltSchemaKey", new Map<string, any>([["isExpression", false], ["value", key], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
        }
    }


    if (node.getProperty() != null) {
        let properties = [];
        for (let property of node.getProperty()) {
            let isExpression = property.getValue() == null;
            let valueMap = new Map<string, any>([["isExpression", isExpression], ["value", property.getValue() != null ? property.getValue() : property.getExpression()], ["namespaces", MediatorUtils.transformNamespaces(property.getNamespaces())]]);
            properties.push([property.getName(), valueMap]);
        }
        data.set("properties", properties);
    } else {
        data.set("properties", []);
    }


    if (node.getResource() != null) {
        let resources = [];
        for (let resource of node.getResource()) {
            resources.push([resource.getLocation(), resource.getKey()]);
        }
        data.set("resources", resources);
    } else {
        data.set("resources", []);
    }


    if (node.getFeature() != null) {
        let features = [];
        for (let feature of node.getFeature()) {
            features.push([feature.getName(), feature.isValue()]);
        }
        data.set("features", features);
    } else {
        data.set("features", []);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }

  static getNamespaces(data: Map<string, any>): Map<string, any>[] {
    let combinedNamespaces = [];
    if (data.has("xsltSchemaKey") && get(data, "xsltSchemaKey") instanceof Map) {
        let xsltSchemaKey = (get(data, "xsltSchemaKey") as Map<string, any>);
        if (xsltSchemaKey.has("namespaces")) {
            combinedNamespaces.push(...(get(xsltSchemaKey, "namespaces") as Map<string, any>[]));
        }
    }
    if (data.has("sourceXPath") && get(data, "sourceXPath") instanceof Map) {
        let sourceXPath = (get(data, "sourceXPath") as Map<string, any>);
        if (sourceXPath.has("namespaces")) {
            combinedNamespaces.push(...(get(sourceXPath, "namespaces") as Map<string, any>[]));
        }
    }

    let uniqueNamespaces = new Map();
    for (let namespace of combinedNamespaces) {
        if (namespace.has("prefix")) {
            let prefix = (get(namespace, "prefix") as string);
            if (!uniqueNamespaces.has(prefix) || !get(uniqueNamespaces, prefix).has("uri")) {
                uniqueNamespaces.set(prefix, namespace);
            }
        }
    }

    return Array.from(uniqueNamespaces.values());

  }
}
