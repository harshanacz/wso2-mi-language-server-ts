// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/SequenceMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { SequenceMediator as SequenceMediatorST } from "../../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class SequenceMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, sequence: SequenceMediatorST, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let referringSequenceObj: any = get(data, "referringSequence");
    if (referringSequenceObj instanceof Map) {
        let referringSequence = (referringSequenceObj as Map<string, any>);
        if (equals(true, get(referringSequence, "isExpression"))) {
            referringSequence.set("value", "{" + get(referringSequence, "value") + "}");
        } else {
            referringSequence.set("value", get(referringSequence, "value"));
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: SequenceMediatorST): Map<string, any> {
    let data = new Map();
    let isExpression = node.getKey() != null && node.getKey().startsWith("{") && node.getKey().endsWith("}");
    let value = node.getKey();
    if (isExpression && value != null) {
        value = value.substring(1, value.length - 1);
    }

    let referringSequence = new Map();
    referringSequence.set("isExpression", isExpression);
    referringSequence.set("value", value);
    referringSequence.set("namespaces", MediatorUtils.transformNamespaces(node.getNamespaces()));
    data.set("description", node.getDescription());
    data.set("referringSequence", referringSequence);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
