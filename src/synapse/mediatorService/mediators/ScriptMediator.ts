// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ScriptMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, get, parseBoolean, matches, jreplace, replaceAll } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Script } from "../../../syntaxTree/pojo/mediator/extension/Script.js";

export class ScriptMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, script: Script, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (!equals("INLINE", get(data, "scriptType"))) {
        data.set("isRegistry", true);


        if (data.has("scriptKeys") && Array.isArray(get(data, "scriptKeys"))) {
            let scriptKeys = (get(data, "scriptKeys") as any[]);
            if (!isEmpty(scriptKeys)) {
                data.set("hasScriptKeys", true);
                let processedKeys = [];
                for (let keyObj of scriptKeys) {
                    if (Array.isArray(keyObj)) {
                        let key = (keyObj as string[]);
                        processedKeys.push(new Map<string, any>([["keyName", get(key, 0) != null ? get(key, 0) : ""], ["keyValue", get(key, 1) != null ? get(key, 1) : ""]]));
                    }
                }
                data.set("scriptKeys", processedKeys);
            }
        }


        if (data.has("scriptKey") && get(data, "scriptKey") instanceof Map) {
            let scriptKey = (get(data, "scriptKey") as Map<string, any>);
            if (equals(true, get(scriptKey, "isExpression")) && scriptKey.has("value")) {
                scriptKey.set("value", "{" + get(scriptKey, "value") + "}");
            }
        }
    }


    if (data.has("scriptLanguage") && (typeof get(data, "scriptLanguage") === "string")) {
        let scriptLanguage = (get(data, "scriptLanguage") as string);
        if (contains(scriptLanguage, "(")) {
            data.set(" as Deprecated)scriptLanguage", jreplace(scriptLanguage, "(", " as Deprecated)").trim());
        }
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST440(node: Script): Map<string, any> {
    let data = ScriptMediator.getDataFromST430(node);
    if (data.has("scriptType") && equals("REGISTRY_REFERENCE", get(data, "scriptType"))) {
        data.set("scriptType", "RESOURCE_REFERENCE");
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }

  static getDataFromST430(node: Script): Map<string, any> {
    let data = new Map();
    if (node.getInclude() != null) {
        let scriptKeys = [];
        for (let key of node.getInclude()) {
            scriptKeys.push(["", key]);
        }
        data.set("scriptKeys", scriptKeys);
    }


    if (node.getKey() == null) {
        data.set("scriptType", "INLINE");
    } else {
        data.set("scriptType", "REGISTRY_REFERENCE");
    }


    data.set("scriptLanguage", node.getLanguage());


    if (node.getKey() != null && node.getKey().startsWith("{") && node.getKey().endsWith("}")) {
        data.set("scriptKey", new Map<string, any>([["isExpression", true], ["value", node.getKey() != null ? node.getKey().substring(1, node.getKey().length - 1) : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    } else {
        data.set("scriptKey", new Map<string, any>([["isExpression", false], ["value", node.getKey() != null ? node.getKey() : ""]]));
    }


    data.set("description", node.getDescription());
    data.set("mediateFunction", node.getFunction());


    if (node.getContent() != null) {
        data.set("scriptBody", ScriptMediator.getScriptBody(node.getContent()));
    }
    return data;

  }

  static getScriptBody(content: any[]): string {
    for (let object of content) {
        if ((typeof object === "string")) {
            let c = (object as string);
            if (matches(c, "<!\\[CDATA\\[(.*?)]]>")) {
                return replaceAll(c, "<!\\[CDATA\\[(.*?)]]>", "$1");
            }
            return c;
        }
    }
    return null;

  }
}
