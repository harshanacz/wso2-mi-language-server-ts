// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/RuleMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Pattern } from "../../host/regex.js";
import { Range } from "../../lsp.js";
import { Rule } from "../../../syntaxTree/pojo/mediator/other/rule/Rule.js";

export class RuleMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, rule: Rule, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("targetNamespaces") && Array.isArray(get(data, "targetNamespaces"))) {
        let targetNamespaces = (get(data, "targetNamespaces") as any[]);
        let processedNamespaces = [];
        for (let namespaceObj of targetNamespaces) {
            if (Array.isArray(namespaceObj)) {
                let namespace = (namespaceObj as string[]);
                processedNamespaces.push(new Map<string, any>([["prefix", get(namespace, 0) != null ? get(namespace, 0) : ""], ["uri", get(namespace, 1) != null ? get(namespace, 1) : ""]]));
            }
        }
        data.set("targetNamespaces", processedNamespaces);
    }

    if (data.has("targetResultXPath") && get(data, "targetResultXPath") instanceof Map) {
        data.set("targetResultXPath", get(((get(data, "targetResultXPath") as Map<any, any>)), "value"));
    }
    if (data.has("targetXPath") && get(data, "targetXPath") instanceof Map) {
        data.set("targetXPath", get(((get(data, "targetXPath") as Map<any, any>)), "value"));
    }

    if (data.has("factsConfiguration") && Array.isArray(get(data, "factsConfiguration"))) {
        let factsConfiguration = (get(data, "factsConfiguration") as any[]);
        let processedFacts = [];
        for (let factObj of factsConfiguration) {
            if (Array.isArray(factObj)) {
                let fact = (factObj as any[]);
                let factType = RuleMediator.getFactType(fact);
                processedFacts.push(new Map<string, any>([["elementName", get(fact, 2) != null ? get(fact, 2) : ""], ["factType", factType], ["propertyExpression", get(fact, 3) instanceof Map
                                ?get(((get(fact, 3) as Map<any, any>)), "value")
                                : ""]]));
            }
        }
        data.set("facts", processedFacts);
    }

    if (data.has("resultsConfiguration") && Array.isArray(get(data, "resultsConfiguration"))) {
        let resultsConfiguration = (get(data, "resultsConfiguration") as any[]);
        let processedResults = [];
        for (let resultObj of resultsConfiguration) {
            if (Array.isArray(resultObj)) {
                let result = (resultObj as any[]);
                let factType = RuleMediator.getFactType(result);
                processedResults.push(new Map<string, any>([["resultName", get(result, 2) != null ? (get(result, 2) as string) : ""], ["resultType", factType]]));
            }
        }
        data.set("results", processedResults);
    }


    let ruleSetSourceType = (get(data, "ruleSetSourceType") as string);
    if (equals("URL", ruleSetSourceType)) {
        removeFrom(data, "inlineRegistryKey");
        removeFrom(data, "ruleSetSourceCode");
    } else if (equals("REGISTRY_REFERENCE", ruleSetSourceType)) {
        removeFrom(data, "ruleSetURL");
        removeFrom(data, "ruleSetSourceCode");
    } else {
        removeFrom(data, "inlineRegistryKey");
        removeFrom(data, "ruleSetURL");
    }


    if ((typeof get(data, "ruleSetType") === "string")) {
        data.set("ruleSetType", ((get(data, "ruleSetType") as string)).toLowerCase());
    }
    if ((typeof get(data, "ruleSetSourceType") === "string")) {
        data.set("ruleSetSourceType", ((get(data, "ruleSetSourceType") as string)).toLowerCase());
    }
    if ((typeof get(data, "targetAction") === "string")) {
        data.set("targetAction", ((get(data, "targetAction") as string)).toLowerCase());
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Rule): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("sourceXPath", new Map<string, any>([["isExpression", true], ["value", node.getSource() != null ? node.getSource().getXpath() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getSource() != null ?
                    node.getSource().getNamespaces() : null)]]));
    data.set("sourceValue", node.getSource() != null ? node.getSource().getValue() : null);
    data.set("targetAction", node.getTarget() != null ? RuleMediator.capitalize(node.getTarget().getAction()) : null);
    data.set("targetNamespaces", MediatorUtils.transformNamespaces(node.getTarget() != null ?
                    node.getTarget().getNamespaces() : null).map(namespace => [namespace.getPrefix(), namespace.getUri()]));
    data.set("targetResultXPath", new Map<string, any>([["isExpression", true], ["value", node.getTarget() != null ? node.getTarget().getResultXpath() : ""]]));
    data.set("targetXPath", new Map<string, any>([["isExpression", true], ["value", node.getTarget() != null ? node.getTarget().getXpath() : ""]]));
    data.set("targetValue", node.getTarget() != null ? node.getTarget().getValue() : null);
    data.set("ruleSetType", RuleMediator.capitalize(node.getRuleSet() != null && node.getRuleSet().getRule() != null ?
            node.getRuleSet().getRule().getResourceType() : null));
    data.set("ruleSetSourceType", node.getRuleSet() != null && node.getRuleSet().getRule() != null ?
            node.getRuleSet().getRule().getSourceType().toUpperCase() : null);

    let ruleSetSourceType = (get(data, "ruleSetSourceType") as string);
    if (equals("INLINE", ruleSetSourceType)) {
        let value = node.getRuleSet().getRule().getValue();
        let match = Pattern.compile("<!\\[CDATA\\[(.*?)]]>").matcher(value);
        data.set("ruleSetSourceCode", match.find() ? match.group(1) : null);
    } else if (equals("REGISTRY_REFERENCE", ruleSetSourceType)) {
        data.set("inlineRegistryKey", node.getRuleSet().getRule().getValue());
    } else {
        data.set("ruleSetURL", node.getRuleSet().getRule().getValue());
    }

    data.set("inputNamespace", node.getInput() != null ? node.getInput().getNamespace() : null);
    data.set("inputWrapperName", node.getInput() != null ? node.getInput().getWrapperElementName() : null);
    data.set("outputNamespace", node.getOutput() != null ? node.getOutput().getNamespace() : null);
    data.set("outputWrapperName", node.getOutput() != null ? node.getOutput().getWrapperElementName() : null);

    let factTypes = ["dom", "message", "context", "omelement", "mediator"];
    let factsConfiguration = [];
    if (node.getInput() != null) {
        for (let fact of node.getInput().getFact()) {
            let type = fact.getType();
            let customType = null;
            if (!contains(factTypes, type)) {
                customType = type;
                type = "CUSTOM";
            }

            factsConfiguration.push(new Map<string, any>([["type", type != null ? type : ""], ["customType", customType != null ? customType : ""], ["elementName", fact.getElementName()], ["expression", new Map<string, any>([["isExpression", true], ["value", fact.getXpath() != null ? fact.getXpath() : ""]])]]));
        }
    }
    data.set("factsConfiguration", factsConfiguration);

    let resultsConfiguration = [];
    if (node.getOutput() != null) {
        for (let result of node.getOutput().getFact()) {
            let type = result.getType();
            let customType = null;
            if (!contains(factTypes, type)) {
                customType = type;
                type = "CUSTOM";
            }
            let elementName = result.getElementName() != null ? result.getElementName() : "";
            resultsConfiguration.push(new Map<string, any>([["type", type != null ? type : ""], ["customType", customType != null ? customType : ""], ["elementName", elementName]]));
        }
    }
    data.set("resultsConfiguration", resultsConfiguration);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }

  static capitalize(str: string): string {
    if (str == null || isEmpty(str)) {
        return str;
    }
    return (str.charAt(0)).toUpperCase() + str.substring(1).toLowerCase();

  }

  static getFactType(fact: any[]): string {
    if (equals("CUSTOM", get(fact, 0))) {
        return get(fact, 1) != null ? (get(fact, 1) as string) : "";
    }
    return get(fact, 0) != null ? (get(fact, 0) as string) : "";

  }
}
