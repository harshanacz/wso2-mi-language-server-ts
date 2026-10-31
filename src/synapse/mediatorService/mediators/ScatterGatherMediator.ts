// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ScatterGatherMediator.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, contains, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { ScatterGather } from "../../../syntaxTree/pojo/mediator/eip/ScatterGather.js";

export class ScatterGatherMediator {
  static readonly __fields: string[] = [];

  static readonly JSON_CONTENT_TYPE: string = "JSON";

  static readonly VARIABLE_NAME: string = "variableName";

  static readonly VARIABLE: string = "Variable";

  static readonly X_PATH_EXPRESSION: string = "xPathExpression";

  static readonly ROOT_ELEMENT: string = "rootElement";

  static readonly COMPLETE_TIMEOUT: string = "completeTimeout";

  static readonly MIN_MESSAGES: string = "minMessages";

  static readonly MAX_MESSAGES: string = "maxMessages";

  static readonly OVERWRITE_BODY: string = "overwriteBody";

  static readonly AGGREGATE_FULL_PAYLOADS: string = "aggregateFullPayloads";

  static readonly FILTER_MESSAGES_FOR_AGGREGATION: string = "filterMessagesForAggregation";

  static readonly JSON_FULL_PAYLOAD: string = "${payload}";

  static readonly XML_FULL_PAYLOAD: string = "${xpath('$body/node()')}";

  static processData(data: Map<string, any>, scatterGather: ScatterGather, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (data.has("newBranch") && equals(true, get(data, "newBranch"))) {
        return Either.forLeft(data);
    }

    if (data.has(ScatterGatherMediator.OVERWRITE_BODY) && parseBoolean(String(get(data, ScatterGatherMediator.OVERWRITE_BODY)))) {
        removeFrom(data, ScatterGatherMediator.VARIABLE_NAME);
        data.set(Constant.RESULT_TARGET, "Body");
    } else {
        data.set(Constant.RESULT_TARGET, ScatterGatherMediator.VARIABLE);
    }
    ScatterGatherMediator.setExpression(data);
    let condition = (get(data, Constant.CONDITION) as Map<string, any>);
    if (condition != null) {
        data.set(Constant.CONDITION, get(condition, Constant.VALUE));
    }
    if (scatterGather == null) {
        data.set("newMediator", true);
        return Either.forLeft(data);
    }
    return Either.forRight(ScatterGatherMediator.getEdits(data, scatterGather, dirtyFields));

  }

  static getEdits(data: Map<string, any>, scatterGather: ScatterGather, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();
    let scatterGatherAttributes = [Constant.PARALLEL_EXECUTION, Constant.CONTENT_TYPE, ScatterGatherMediator.OVERWRITE_BODY,
            ScatterGatherMediator.VARIABLE_NAME, ScatterGatherMediator.ROOT_ELEMENT, Constant.DESCRIPTION];
    let aggregationAttributes = [Constant.EXPRESSION, ScatterGatherMediator.X_PATH_EXPRESSION, Constant.CONDITION, ScatterGatherMediator.COMPLETE_TIMEOUT,
            ScatterGatherMediator.MIN_MESSAGES, ScatterGatherMediator.MAX_MESSAGES];

    if (contains(dirtyFields, ScatterGatherMediator.FILTER_MESSAGES_FOR_AGGREGATION)) {
        dirtyFields.push(Constant.CONDITION);
    }

    if (contains(dirtyFields, ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS)) {
        dirtyFields.push(Constant.EXPRESSION);
    }

    if (contains(dirtyFields, Constant.CONTENT_TYPE)) {
        if (equals(ScatterGatherMediator.JSON_CONTENT_TYPE, get(data, Constant.CONTENT_TYPE))) {
            dirtyFields.push(Constant.EXPRESSION);
        } else {
            dirtyFields.push(ScatterGatherMediator.X_PATH_EXPRESSION);
            dirtyFields.push(ScatterGatherMediator.ROOT_ELEMENT);
        }
    }

    if (MediatorUtils.anyMatch(dirtyFields, scatterGatherAttributes)) {
        let scatterGatherData = new Map(data);
        scatterGatherData.set("editScatterGather", true);

        let range = scatterGather.getRange();
        let editRange = new Range(range.startTagRange.start, range.startTagRange.end);

        edits.set(editRange, scatterGatherData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, aggregationAttributes)) {
        let scatterGatherData = new Map(data);
        scatterGatherData.set("editScatterGatherAggregate", true);

        let range = scatterGather.getScatterGatherAggregation().getRange();
        let editRange = new Range(range.startTagRange.start, range.startTagRange.end);

        edits.set(editRange, scatterGatherData);
    }
    return edits;

  }

  static getDataFromST(scatterGather: ScatterGather): Map<string, any> {
    let data = new Map();
    data.set(Constant.DESCRIPTION, scatterGather.getDescription());
    data.set(Constant.PARALLEL_EXECUTION, scatterGather.isExecuteParallel());

    let contentType = scatterGather.getContentType();
    data.set(Constant.CONTENT_TYPE, contentType);
    if (equals(ScatterGatherMediator.JSON_CONTENT_TYPE, contentType)) {
        if (equals(ScatterGatherMediator.JSON_FULL_PAYLOAD, scatterGather.getScatterGatherAggregation().getExpression())) {
            data.set(ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS, true);
        } else {
            data.set(ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS, false);
        }
        data.set(Constant.EXPRESSION, MediatorUtils.getExpressionData(scatterGather.getScatterGatherAggregation().getExpression()));
    } else {
        if (equals(ScatterGatherMediator.XML_FULL_PAYLOAD, scatterGather.getScatterGatherAggregation().getExpression())) {
            data.set(ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS, true);
        } else {
            data.set(ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS, false);
        }
        data.set(ScatterGatherMediator.X_PATH_EXPRESSION, MediatorUtils.getExpressionData(scatterGather.getScatterGatherAggregation().getExpression()));
        data.set(ScatterGatherMediator.ROOT_ELEMENT, scatterGather.getRootElement());
    }
    let resultTarget = scatterGather.getResultTarget();
    if (equalsIgnoreCase("Body", resultTarget)) {
        data.set(Constant.OVERWRITE_BODY, true);
    } else {
        data.set(Constant.OVERWRITE_BODY, false);
        data.set(ScatterGatherMediator.VARIABLE_NAME, scatterGather.getVariableName());
    }
    if (scatterGather.getScatterGatherAggregation().getCondition() != null) {
        data.set(ScatterGatherMediator.FILTER_MESSAGES_FOR_AGGREGATION, true);
        data.set(Constant.CONDITION, MediatorUtils.getExpressionData(scatterGather.getScatterGatherAggregation().getCondition()));
    } else {
        data.set(ScatterGatherMediator.FILTER_MESSAGES_FOR_AGGREGATION, false);
    }
    data.set(ScatterGatherMediator.COMPLETE_TIMEOUT, scatterGather.getScatterGatherAggregation().getCompleteTimeout());
    data.set(ScatterGatherMediator.MIN_MESSAGES, scatterGather.getScatterGatherAggregation().getMinMessages());
    data.set(ScatterGatherMediator.MAX_MESSAGES, scatterGather.getScatterGatherAggregation().getMaxMessages());
    data.set("traceFilter", equals("enable", scatterGather.getTraceFilter()));
    return data;

  }

  static setExpression(data: Map<string, any>): void {
    if (equals(ScatterGatherMediator.JSON_CONTENT_TYPE, get(data, Constant.CONTENT_TYPE))) {
        data.set(Constant.EXPRESSION, ScatterGatherMediator.getExpression(data, true));
    } else {
        data.set(Constant.EXPRESSION, ScatterGatherMediator.getExpression(data, false));
    }

  }

  static getExpression(data: Map<string, any>, isJSON: boolean): string {
    if (data.has(ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS) && parseBoolean(String(get(data, ScatterGatherMediator.AGGREGATE_FULL_PAYLOADS)))) {
        if (isJSON) {
            return ScatterGatherMediator.JSON_FULL_PAYLOAD;
        } else {
            return ScatterGatherMediator.XML_FULL_PAYLOAD;
        }
    } else {
        if (isJSON) {
            let jsonExpression = (get(data, Constant.EXPRESSION) as Map<string, any>);
            return (get(jsonExpression, Constant.VALUE) as string);
        } else {
            let xPathExpression = (get(data, ScatterGatherMediator.X_PATH_EXPRESSION) as Map<string, any>);
            return (get(xPathExpression, Constant.VALUE) as string);
        }
    }

  }
}
