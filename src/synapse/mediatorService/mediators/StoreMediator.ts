// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/StoreMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Store } from "../../../syntaxTree/pojo/mediator/core/Store.js";

export class StoreMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, store: Store, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("messageStore") && get(data, "messageStore") instanceof Map) {
        let messageStore = (get(data, "messageStore") as Map<string, any>);
        if (equals(true, get(messageStore, "isExpression")) && messageStore.has("value")) {
            messageStore.set("value", "{" + get(messageStore, "value") + "}");
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Store): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("onStoreSequence", node.getSequence());
    if (node.getMessageStore() != null && node.getMessageStore().startsWith("{") && node.getMessageStore().endsWith("}")) {
        data.set("messageStore", new Map<string, any>([["isExpression", true], ["value", node.getMessageStore().substring(1, node.getMessageStore().length - 1)], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    } else {
        data.set("messageStore", new Map<string, any>([["isExpression", false], ["value", node.getMessageStore() != null ? node.getMessageStore() : ""]]));
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
