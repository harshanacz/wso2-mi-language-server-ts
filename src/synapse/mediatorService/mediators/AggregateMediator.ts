// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/AggregateMediator.java by the java2ts converter (see tools/java2ts).
import { mapReplaceAll } from "../../../syntaxTree/javaCompat.js";
import { equals, get, parseBoolean, replaceAll, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Aggregate } from "../../../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { TagRanges } from "../../../syntaxTree/stNode.js";

export class AggregateMediator {
  static readonly __fields: string[] = [];

  static readonly aggregateTagAttributes: string[] = ["aggregateID", "description"];

  static readonly correlateOnAttributes: string[] = ["correlationExpression"];

  static readonly completeConditionAttributes: string[] = ["completionTimeout", "completionMaxMessages", "completionMinMessages"];

  static readonly onCompleteAttributes: string[] = ["aggregateElementType", "enclosingElementProperty",
                    "aggregationExpression", "sequenceKey", "sequenceType"];

  static processData430(data: Map<string, any>, aggregate: Aggregate, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    mapReplaceAll(data, (key, value) => {
        if ((typeof value === "number")) {
            return String((value));
        }
        return value;
    }); 
    if (data.has("completionMaxMessages")) {
        let completionMaxMessages = (get(data, "completionMaxMessages") as Map<string, any>);
        if (completionMaxMessages != null) {
            data.set("completionMax", equals(true, get(completionMaxMessages, "isExpression")) ?
                    "{" + get(completionMaxMessages, "value") + "}" : get(completionMaxMessages, "value"));
        }
    }
    if (data.has("completionMinMessages")) {
        let completionMinMessages = (get(data, "completionMinMessages") as Map<string, any>);
        if (completionMinMessages != null) {
            data.set("completionMin", equals(true, get(completionMinMessages, "isExpression")) ?
                    "{" + get(completionMinMessages, "value") + "}" : get(completionMinMessages, "value"));
        }
    }

    let messageCountNamespaces = [];
    let completionMaxMessages = get(data, "completionMaxMessages") instanceof Map ?
            (get(data, "completionMaxMessages") as Map<string, any>) : null;
    let completionMinMessages = get(data, "completionMinMessages") instanceof Map ?
            (get(data, "completionMinMessages") as Map<string, any>) : null;

    if (completionMaxMessages != null && Array.isArray(get(completionMaxMessages, "namespaces"))) {
        messageCountNamespaces.push(...(get(completionMaxMessages, "namespaces") as any[]));
    }
    if (completionMinMessages != null && Array.isArray(get(completionMinMessages, "namespaces"))) {
        messageCountNamespaces.push(...(get(completionMinMessages, "namespaces") as any[]));
    }
    data.set("messageCountNamespaces", messageCountNamespaces);

    if (data.has("aggregateElementType")) {
        data.set("aggregateElementType", ((get(data, "aggregateElementType") as string)).toLowerCase());
    }

    if (equals("ANONYMOUS", get(data, "sequenceType"))) {
        removeFrom(data, "sequenceKey");
    }

    if (equals("", get(data, "enclosingElementProperty"))) {
        removeFrom(data, "enclosingElementProperty");
    }

    let correlationExpression = get(data, "correlationExpression") instanceof Map ?
            (get(data, "correlationExpression") as Map<string, any>) : null;
    if (correlationExpression == null ||
            get(correlationExpression, "value") == null ||
            equals("", get(correlationExpression, "value"))) {
        removeFrom(data, "correlationExpression");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (aggregate == null) {
        data.set("isNewMediator", true);
        return Either.forLeft(data);
    }


    return Either.forRight(AggregateMediator.processForEdit(data, aggregate, dirtyFields));

  }

  static processForEdit(data: Map<string, any>, aggregate: Aggregate, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let editsData = new Map();
    let ranges = AggregateMediator.getRanges(aggregate);

    if (MediatorUtils.anyMatch(dirtyFields, AggregateMediator.aggregateTagAttributes)) {
        AggregateMediator.getEdit("aggregate", data, ranges, true, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, AggregateMediator.correlateOnAttributes)) {
        AggregateMediator.getEdit("correlateOn", data, ranges, false, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, AggregateMediator.completeConditionAttributes)) {
        AggregateMediator.getEdit("completeCondition", data, ranges, false, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, AggregateMediator.onCompleteAttributes)) {
        let editStartTagOnly = get(data, "sequenceKey") == null;
        if (editStartTagOnly && aggregate.isSelfClosed()) {
            data.set("endOnComplete", true);
        }
        AggregateMediator.getEdit("onComplete", data, ranges, editStartTagOnly, editsData);
    }

    return editsData;

  }

  static getEdit(key: string, data: Map<string, any>, ranges: Map<string, TagRanges>, editStartTagOnly: boolean, editsData: Map<Range, Map<string, any>>): void {
    let dataCopy = new Map(data);
    let editKey = "edit" + (key.charAt(0)).toUpperCase() + key.substring(1);
    dataCopy.set(editKey, true);

    let range = get(ranges, key);
    let editRange: Range | undefined;

    if (range != null) {
        let start = range.startTagRange.start;
        let end = editStartTagOnly ? range.startTagRange.end :
                (range.endTagRange != null ?
                        range.endTagRange.end : range.startTagRange.end);
        editRange = new Range(start, end);
    } else {
        let aggregateRange = get(ranges, "aggregate");
        let start = aggregateRange.endTagRange.start;
        editRange = new Range(start, start);
    }

    editsData.set(editRange, dataCopy);

  }

  static getRanges(aggregate: Aggregate): Map<string, TagRanges> {
    let ranges = new Map();
    ranges.set("aggregate", aggregate.getRange());
    if ((aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getCorrelateOn() != null)) {
        ranges.set("correlateOn", aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getCorrelateOn().getRange());
    }
    if ((aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getCompleteCondition() != null)) {
        ranges.set("completeCondition", aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getCompleteCondition().getRange());
    }
    if ((aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete() != null)) {
        ranges.set("onComplete", aggregate.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete().getRange());
    }
    return ranges;

  }

  static getDataFromST430(node: Aggregate): Map<string, any> {
    let data = new Map();

    data.set("description", node.getDescription());
    data.set("aggregateID", node.getId());

    let correlateOn = null;
    if ((node.getCorrelateOnOrCompleteConditionOrOnComplete().getCorrelateOn() != null)) {
        correlateOn = node.getCorrelateOnOrCompleteConditionOrOnComplete().getCorrelateOn();
        data.set("correlationExpression", new Map<string, any>([["isExpression", true], ["value", correlateOn.getExpression() != null ? correlateOn.getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(correlateOn.getNamespaces())]]));
    }

    let completeCondition = null;
    if ((node.getCorrelateOnOrCompleteConditionOrOnComplete().getCompleteCondition() != null)) {
        completeCondition = node.getCorrelateOnOrCompleteConditionOrOnComplete().getCompleteCondition();
        data.set("completionTimeout", completeCondition.getTimeout());

        let max = completeCondition.getMessageCount() != null ?
                completeCondition.getMessageCount().getMax() : null;
        let messageCountNamespaces = MediatorUtils.transformNamespaces(
                completeCondition.getMessageCount() != null ?
                        completeCondition.getMessageCount().getNamespaces() : null);

        if (max != null && max.startsWith("{")) {
            let value = AggregateMediator.extractExpressionValue(max);
            data.set("completionMaxMessages", new Map<string, any>([["isExpression", true], ["value", value], ["namespaces", messageCountNamespaces]]));
        } else if (max != null) {
            data.set("completionMaxMessages", new Map<string, any>([["isExpression", false], ["value", max]]));
        }

        let min = completeCondition.getMessageCount() != null ?
                completeCondition.getMessageCount().getMin() : null;
        if (min != null && min.startsWith("{")) {
            let value = AggregateMediator.extractExpressionValue(min);
            data.set("completionMinMessages", new Map<string, any>([["isExpression", true], ["value", value], ["namespaces", messageCountNamespaces]]));
        } else if (min != null) {
            data.set("completionMinMessages", new Map<string, any>([["isExpression", false], ["value", min]]));
        }
    }

    let onComplete = null;
    if ((node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete() != null)) {
        onComplete = node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete();
        data.set("aggregateElementType", String(onComplete.getAggregateElementType()).toUpperCase());
        data.set("enclosingElementProperty", onComplete.getEnclosingElementProperty());

        data.set("aggregationExpression", new Map<string, any>([["isExpression", true], ["value", onComplete.getExpression() != null ? onComplete.getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(onComplete.getNamespaces())]]));

        let sequenceKey = onComplete.getSequenceAttribute();
        data.set("sequenceKey", sequenceKey);
        data.set("sequenceType", sequenceKey != null ? "REGISTRY REFERENCE" : "ANONYMOUS");

        data.set("onCompleteSelfClosed", onComplete.isSelfClosed());
    }

    data.set("ranges", new Map<string, any>([["aggregate", node.getRange()], ["correlateOn", correlateOn != null ? correlateOn.getRange() : ""], ["completeCondition", completeCondition != null ? completeCondition.getRange() : ""], ["onComplete", onComplete != null ? onComplete.getRange() : ""]]));

    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }

  static extractExpressionValue(expression: string): string {
    if (expression.startsWith("{") && expression.endsWith("}")) {
        return expression.substring(1, expression.length - 1);
    }
    return expression;

  }
}
