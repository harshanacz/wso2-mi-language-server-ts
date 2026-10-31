// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/PropertyMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, removeFrom, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Property } from "../../../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyMediatorType } from "../../../syntaxTree/pojo/mediator/core/PropertyMediatorType.js";
import { Range } from "../../lsp.js";

export class PropertyMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, mediatorname: Property, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let namespaces = [];

    let propertyName = get(data, "propertyName") instanceof Map ?
            (get(data, "propertyName") as Map<string, any>) : null;
    if (propertyName != null && equals(true, get(propertyName, "isExpression"))) {
        namespaces.push(...((propertyName.get("namespaces") ?? []) as Map<string, any>[]));
        data.set("propertyName", "{" + get(propertyName, "value") + "}");
    } else if (propertyName != null) {
        data.set("propertyName", get(propertyName, "value"));
    }

    if (equals("OM", get(data, "propertyDataType"))) {
        removeFrom(data, "value");
        let omValue = get(data, "OMValue") instanceof Map ?
                (get(data, "OMValue") as Map<string, any>) : null;
        if (omValue != null && equals(true, get(omValue, "isExpression"))) {
            namespaces.push(...((omValue.get("namespaces") ?? []) as Map<string, any>[]));
            data.set("expression", get(omValue, "value"));
        } else {
            removeFrom(data, "expression");
            data.set("isInlineOM", true);
            data.set("OMValue", omValue != null ? get(omValue, "value") : null);
        }
    }

    if (equals("STRING", get(data, "propertyDataType"))) {
        if (StringUtils.isEmpty((get(data, "valueStringPattern") as string))) {
            removeFrom(data, "valueStringCapturingGroup");
        }
    } else {
        removeFrom(data, "valueStringPattern");
        removeFrom(data, "valueStringCapturingGroup");
    }

    if (equals("set", get(data, "propertyAction"))) {
        removeFrom(data, "propertyAction");
    } else {
        removeFrom(data, "value");
        removeFrom(data, "propertyDataType");
        removeFrom(data, "valueStringPattern");
        removeFrom(data, "valueStringCapturingGroup");
    }

    let value = get(data, "value") instanceof Map ?
            (get(data, "value") as Map<string, any>) : null;
    if (value != null && equals(true, get(value, "isExpression"))) {
        namespaces.push(...((value.get("namespaces") ?? []) as Map<string, any>[]));
        data.set("expression", get(value, "value"));
        data.set("namespaces", get(value, "namespaces"));
        removeFrom(data, "value");
    } else if (value != null) {
        data.set("value", get(value, "value"));
    }

    data.set("namespaces", MediatorUtils.filterNamespaces(namespaces));
    data.set("propertyScope", ((get(data, "propertyScope") as string)).toLowerCase());

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Property): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());

    let propertyName = new Map();
    if (node.getName() != null && node.getName().startsWith("{") && node.getName().endsWith("}")) {
        propertyName.set("isExpression", true);
        propertyName.set("value", node.getName().substring(1, node.getName().length - 1));
        propertyName.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()));
    } else {
        propertyName.set("isExpression", false);
        propertyName.set("value", node.getName());
    }
    data.set("propertyName", propertyName);

    if (node.getType() != null) {
        data.set("propertyDataType", node.getType());
    }

    if (equals(PropertyMediatorType.OM, node.getType())) {
        let omValue = new Map();
        if (node.getExpression() != null) {
            omValue.set("isExpression", true);
            omValue.set("value", node.getExpression());
            omValue.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()));
        } else {
            omValue.set("isExpression", false);
            omValue.set("value", node.getAny());
        }
        data.set("OMValue", omValue);
    }

    if (node.getAction() != null) {
        data.set("propertyAction", node.getAction());
    }

    if (node.getScope() != null) {
        data.set("propertyScope", node.getScope().getValue().toUpperCase());
    }

    if (node.getPattern() != null) {
        data.set("valueStringPattern", node.getPattern());
    }

    if (node.getGroup() != null) {
        data.set("valueStringCapturingGroup", node.getGroup());
    }

    let value = new Map();
    value.set("isExpression", false);
    value.set("value", "");
    if (node.getValue() != null) {
        value.set("isExpression", false);
        value.set("value", node.getValue());
    } else if (node.getExpression() != null) {
        value.set("isExpression", true);
        value.set("value", node.getExpression());
        value.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()));
    }
    data.set("value", value);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
