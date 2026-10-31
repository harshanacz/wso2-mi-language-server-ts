// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/FastXSLTMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, matches, replaceAll } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { FastXSLT } from "../../../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class FastXSLTMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, fastXSLT: FastXSLT, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("schemaKay") && get(data, "schemaKay") instanceof Map) {
        let schemaKay = (get(data, "schemaKay") as Map<string, any>);
        if (equals(true, get(schemaKay, "isExpression"))) {
            data.set("key", "{" + get(schemaKay, "value") + "}");
            data.set("namespaces", get(schemaKay, "namespaces"));
        } else {
            data.set("key", get(schemaKay, "value"));
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: FastXSLT): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (node.getKey() != null) {
        let key = node.getKey();
        if (matches(key, "\\{([^}]*)\\}")) {
            let value = replaceAll(key, "\\{([^}]*)\\}", "$1");
            data.set("schemaKay", new Map<string, any>([["isExpression", true], ["value", value], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
        } else {
            data.set("schemaKay", new Map<string, any>([["isExpression", false], ["value", key]]));
        }
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
