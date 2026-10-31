// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/EnrichMediator.java by the java2ts converter (see tools/java2ts).
import { SourceEnrichType } from "../../../syntaxTree/pojo/mediator/transformation/enrich/SourceEnrichType.js";
import { equals, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Enrich } from "../../../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class EnrichMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, enrich: Enrich, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let isSourceInlined = equals("inline", get(data, "sourceType"));

    switch ((get(data, "sourceType") as string)) {
        case "property":
            removeFrom(data, "sourceXPath");
            break;
        case "custom":
            removeFrom(data, "sourceProperty");
            break;
        case "inline":
            if (equals("Inline XML/JSON", get(data, "inlineType"))) {
                removeFrom(data, "inlineRegistryKey");
            } else {
                removeFrom(data, "sourceXML");
            }
            break;
        default:
            removeFrom(data, "sourceProperty");
            removeFrom(data, "sourceXPath");
            removeFrom(data, "inlineRegistryKey");
            removeFrom(data, "sourceXML");
            break;
    }


    switch ((get(data, "targetType") as string)) {
        case "property":
            removeFrom(data, "targetXPathJsonPath");
            break;
        case "custom":
            removeFrom(data, "targetProperty");
            removeFrom(data, "targetType");
            break;
        case "key":
            removeFrom(data, "targetProperty");
            break;
        default:
            removeFrom(data, "targetXPathJsonPath");
            removeFrom(data, "targetProperty");
            break;
    }

    data.set("isSourceInlined", isSourceInlined);

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Enrich): Map<string, any> {
    let data = new Map();

    data.set("description", node.getDescription());
    if (node.getSource() != null) {
        let sourceType = node.getSource().getType();
        switch (sourceType) {
            case SourceEnrichType.custom:
                data.set("sourceType", "custom");
                break;
            case SourceEnrichType.envelope:
                data.set("sourceType", "envelope");
                break;
            case SourceEnrichType.body:
                data.set("sourceType", "body");
                break;
            case SourceEnrichType.property:
                data.set("sourceType", "property");
                break;
            case SourceEnrichType.inline:
                data.set("sourceType", "inline");
                break;
        }
    }
    data.set("cloneSource", node.getSource() != null && node.getSource().isClone());

    if (equals("inline", get(data, "sourceType"))) {
        if (node.getSource() != null && node.getSource().getKey() != null) {
            data.set("inlineType", "RegistryKey");
            data.set("inlineRegistryKey", node.getSource().getKey());
        } else {
            data.set("inlineType", "Inline XML/JSON");
            data.set("sourceXML", node.getSource() != null ? node.getSource().getContent() : null);
        }
    } else if (equals("property", get(data, "sourceType"))) {
        data.set("sourceProperty", node.getSource() != null ? node.getSource().getProperty() : null);
    } else if (equals("custom", get(data, "sourceType"))) {
        let sourceXPath = new Map();
        sourceXPath.set("isExpression", true);
        sourceXPath.set("value", node.getSource() != null ? node.getSource().getXpath() : null);
        sourceXPath.set("namespaces", MediatorUtils.transformNamespaces(node.getSource() != null ? node.getSource().getNamespaces() : null));
        data.set("sourceXPath", sourceXPath);
    }

    data.set("targetAction", node.getTarget() != null ? node.getTarget().getAction() : null);
    data.set("targetType", node.getTarget() != null ? node.getTarget().getType() : null);

    if (equals("property", get(data, "targetType"))) {
        data.set("targetProperty", node.getTarget() != null ? node.getTarget().getProperty() : null);
    } else if (equals("key", get(data, "targetType"))) {
        let targetXPathJsonPath = new Map();
        targetXPathJsonPath.set("isExpression", true);
        targetXPathJsonPath.set("value", node.getTarget() != null ? node.getTarget().getXpath() : null);
        targetXPathJsonPath.set("namespaces", MediatorUtils.transformNamespaces(node.getTarget() != null ?
                node.getTarget().getNamespaces() : null));
        data.set("targetXPathJsonPath", targetXPathJsonPath);
    } else if (node.getTarget() != null && node.getTarget().getXpath() != null) {
        data.set("targetType", "custom");
        let targetXPathJsonPath = new Map();
        targetXPathJsonPath.set("isExpression", true);
        targetXPathJsonPath.set("value", node.getTarget().getXpath());
        targetXPathJsonPath.set("namespaces", MediatorUtils.transformNamespaces(node.getTarget().getNamespaces()));
        data.set("targetXPathJsonPath", targetXPathJsonPath);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
