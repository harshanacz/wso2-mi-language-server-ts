// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/IterateMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Iterate } from "../../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class IterateMediator {
  static readonly __fields: string[] = [];

  static readonly iterateTagAttributes: string[] = [
            "attachPath", "continueParent", "iterateExpression", "iterateID", "preservePayload",
            "sequentialMediation", "description"
    ];

  static readonly targetTagAttributes: string[] = ["sequenceKey"];

  static processData430(data: Map<string, any>, iterate: Iterate, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("Anonymous", get(data, "sequenceType"))) {
        removeFrom(data, "sequenceKey");
        data.set("isAnnonymousSequence", true);
    }

    let iterateExpression = get(data, "iterateExpression") instanceof Map ?
            (get(data, "iterateExpression") as Map<string, any>) : null;
    if (iterateExpression != null) {
        data.set("namespaces", get(iterateExpression, "namespaces"));
        data.set("iterateExpression", get(iterateExpression, "value"));
    }

    let attachPath = get(data, "attachPath") instanceof Map ?
            (get(data, "attachPath") as Map<string, any>) : null;
    if (attachPath != null) {
        data.set("attachPath", get(attachPath, "value"));
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (iterate == null) {
        data.set("isNewMediator", true);
        return Either.forLeft(data);
    }

    return Either.forRight(IterateMediator.getEdits(data, iterate, dirtyFields));


  }

  static getEdits(data: Map<string, any>, iterate: Iterate, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let editsData = new Map();

    if (MediatorUtils.anyMatch(dirtyFields, IterateMediator.iterateTagAttributes)) {
        let dataCopy = new Map(data);
        dataCopy.set("selfClosed", iterate.isSelfClosed());
        dataCopy.set("editIterate", true);

        let iterateRange = iterate.getRange();
        let editRange = new Range(
                iterateRange.startTagRange.start,
                iterateRange.startTagRange.end
        );

        editsData.set(editRange, dataCopy);
    }

    if (MediatorUtils.anyMatch(dirtyFields, IterateMediator.targetTagAttributes)) {
        let dataCopy = new Map(data);
        dataCopy.set("editTarget", true);

        let targetRange = iterate.getTarget().getRange();
        let editRange = new Range(
                targetRange.startTagRange.start,
                targetRange.endTagRange != null && targetRange.endTagRange.end != null
                        ? targetRange.endTagRange.end : targetRange.startTagRange.end
        );

        editsData.set(editRange, dataCopy);
    }
    return editsData;

  }

  static getDataFromST430(node: Iterate): Map<string, any> {
    let data = new Map();

    data.set("attachPath", new Map<string, any>([["isExpression", true], ["value", node.getAttachPath() != null ? node.getAttachPath() : ""]]));

    data.set("continueParent", node.isContinueParent());
    data.set("iterateExpression", new Map<string, any>([["isExpression", true], ["value", node.getExpression() != null ? node.getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    data.set("iterateID", node.getId());
    data.set("preservePayload", node.isPreservePayload());
    data.set("sequentialMediation", node.isSequential());

    let sequence = node.getTarget() != null ? node.getTarget().getSequenceAttribute() : null;
    if (sequence != null) {
        data.set("sequenceType", "Key");
        data.set("sequenceKey", sequence);
    } else {
        data.set("sequenceType", "Anonymous");
    }

    data.set("description", node.getDescription());
    data.set("isSelfClosed", node.isSelfClosed());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
