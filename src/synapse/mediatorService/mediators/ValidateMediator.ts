// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ValidateMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Validate } from "../../../syntaxTree/pojo/mediator/core/validate/Validate.js";

export class ValidateMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, validate: Validate, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let schemas = [];
    let schemasData: any = get(data, "schemas");
    if (Array.isArray(schemasData)) {
        for (let schemaObj of (schemasData as any[])) {
            if (Array.isArray(schemaObj)) {
                let schema = (schemaObj as any[]);
                if (!isEmpty(schema) && (typeof get(schema, 0) === "string")) {
                    schemas.push(new Map<string, any>([["key", get(schema, 0)]]));
                }
            }
        }
    }
    data.set("schemas", schemas);

    let features = [];
    let featuresData: any = get(data, "features");
    if (Array.isArray(featuresData)) {
        for (let featureObj of (featuresData as any[])) {
            if (Array.isArray(featureObj)) {
                let feature = (featureObj as any[]);
                if (size(feature) >= 2 && (typeof get(feature, 0) === "string")) {
                    features.push(new Map<string, any>([["featureName", get(feature, 0)], ["featureEnable", get(feature, 1) != null && (get(feature, 1) as boolean) ? "true" : "false"]]));
                }
            }
        }
    }
    data.set("features", features);

    let resources = [];
    let resourcesData: any = get(data, "resources");
    if (Array.isArray(resourcesData)) {
        for (let resourceObj of (resourcesData as any[])) {
            if (Array.isArray(resourceObj)) {
                let resource = (resourceObj as any[]);
                if (size(resource) >= 2 && (typeof get(resource, 0) === "string") && (typeof get(resource, 1) === "string")) {
                    resources.push(new Map<string, any>([["location", get(resource, 0)], ["locationKey", get(resource, 1)]]));
                }
            }
        }
    }
    data.set("resources", resources);

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (validate == null) {
        data.set("isNewMediator", true);
        return Either.forLeft(data);
    }

    return Either.forRight(ValidateMediator.getEdits(data, validate, dirtyFields));

  }

  static getEdits(data: Map<string, any>, validate: Validate, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();

    if (!isEmpty(dirtyFields)) {
        let dataCopy = new Map(data);
        let validateRange = validate.getRange();
        let onFailRange = validate.getOnFail().getRange();

        if (onFailRange != null && onFailRange.endTagRange != null
                && onFailRange.endTagRange.end != null) {
            let editRange = new Range(
                    validateRange.startTagRange.start,
                    onFailRange.startTagRange.start
            );
            edits.set(editRange, dataCopy);

            editRange = new Range(
                    onFailRange.endTagRange.end,
                    validateRange.endTagRange.end
            );
            edits.set(editRange, new Map<string, any>([["endTag", true]]));
        } else {
            data.set("isNewMediator", true);
            let editRange = new Range(
                    validateRange.startTagRange.start,
                    validateRange.endTagRange != null
                            ? validateRange.endTagRange.end
                            : validateRange.startTagRange.end
            );
            edits.set(editRange, data);
        }
    }
    return edits;

  }

  static getDataFromST430(node: Validate): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("source", new Map<string, any>([["isExpression", true], ["value", node.getSource() != null ? node.getSource() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    data.set("enableSchemaCaching", node.isCacheSchema());
    if (node.getFeature() != null && node.getFeature().length != 0) {
        let features = [];
        for (let entry of node.getFeature()) {
            features.push([entry.getName() != null ? entry.getName() : "", entry.isValue()]);
        }
        data.set("features", features);
    }
    if (node.getSchema() != null && node.getSchema().length != 0) {
        let schemas = [];
        for (let entry of node.getSchema()) {
            schemas.push([entry.getKey() != null ? entry.getKey() : ""]);
        }
        data.set("schemas", schemas);
    }
    if (node.getResource() != null && node.getResource().length != 0) {
        let resources = [];
        for (let entry of node.getResource()) {
            resources.push([entry.getLocation() != null ? entry.getLocation() : "",
                    entry.getKey() != null ? entry.getKey() : ""]);
        }
        data.set("resources", resources);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
