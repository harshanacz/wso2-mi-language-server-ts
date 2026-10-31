// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/FilterMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Filter } from "../../../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class FilterMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, filter: Filter, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    data.set("isNewMediator", filter == null);

    let conditionType = (get(data, "conditionType") as string);
    if (equals("Source and Regular Expression", conditionType)) {
        if (get(data, "source") instanceof Map) {
            data.set("namespaces", get(((get(data, "source") as Map<any, any>)), "namespaces"));
            data.set("source", get(((get(data, "source") as Map<any, any>)), "value"));
        }
        removeFrom(data, "xpath");
    } else if (equals("XPath", conditionType)) {
        if (get(data, "xPath") instanceof Map) {
            data.set("namespaces", get(((get(data, "xPath") as Map<any, any>)), "namespaces"));
            data.set("xPath", get(((get(data, "xPath") as Map<any, any>)), "value"));
        }
        removeFrom(data, "regularExpression");
        removeFrom(data, "source");
    }
    if (filter != null) {
        let filterData = new Map();
        filterData.set(filter.getRange().startTagRange, data);
        return Either.forRight(filterData);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Filter): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("regularExpression", node.getRegex());

    let namespaces = MediatorUtils.transformNamespaces(node.getNamespaces());
    let source = node.getSource();
    let xpath = node.getXpath();
    if (source != null) {
        data.set("source", new Map<string, any>([["isExpression", true], ["value", source], ["namespaces", namespaces]]));
    }
    if (xpath != null) {
        data.set("xPath", new Map<string, any>([["isExpression", true], ["value", xpath], ["namespaces", namespaces]]));
    }

    if (node.getXpath() != null && !isEmpty(node.getXpath())) {
        data.set("conditionType", "XPath");
    } else if ((node.getSource() != null && !isEmpty(node.getSource())) || (node.getRegex() != null && !isEmpty(node.getRegex()))) {
        data.set("conditionType", "Source and Regular Expression");
    }

    data.set("selfClosed", node.isSelfClosed());
    data.set("range", node.getRange());

    return data;

  }

  static processData440(data: Map<string, any>, filter: Filter, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let useRegex = (get(data, "useRegex") as boolean);
    if (useRegex) {
        if (get(data, "source") instanceof Map) {
            data.set("source", get(((get(data, "source") as Map<any, any>)), "value"));
        }
        removeFrom(data, "xpath");
    } else {
        if (get(data, "xPath") instanceof Map) {
            data.set("xPath", get(((get(data, "xPath") as Map<any, any>)), "value"));
        }
        removeFrom(data, "regularExpression");
        removeFrom(data, "source");
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    if (filter != null) {
        let filterData = new Map();
        filterData.set(filter.getRange().startTagRange, data);
        return Either.forRight(filterData);
    }
    data.set("isNewMediator", true);
    return Either.forLeft(data);

  }

  static getDataFromST440(node: Filter): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (node.getXpath() != null) {
        data.set("useRegex", false);
        data.set("xPath", new Map<string, any>([["isExpression", true], ["value", node.getXpath() != null ? node.getXpath() : ""]]));
    } else {
        data.set("useRegex", true);
        data.set("source", new Map<string, any>([["isExpression", true], ["value", node.getSource() != null ? node.getSource() : ""]]));
        data.set("regularExpression", node.getRegex());
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }

  static getFilterDescription(node: Filter): string {
    if (node.getRegex() != null && node.getSource() != null) {
        return node.getSource() + " matches " + node.getRegex();
    }
    if (node.getRegex() != null) {
        return node.getRegex();
    } else if (node.getSource() != null) {
        return node.getSource();
    } else if (node.getXpath() != null) {
        return node.getXpath();
    }
    return "";

  }
}
