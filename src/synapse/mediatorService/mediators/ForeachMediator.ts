// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ForeachMediator.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Either } from "../../lsp.js";
import { Foreach } from "../../../syntaxTree/pojo/mediator/eip/Foreach.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class ForeachMediator {
  static readonly __fields: string[] = [];

  static readonly UPDATE_ORIGINAL_CONTENT: string = "updateOriginalContent";

  static readonly RESULT_TYPE: string = "resultType";

  static readonly ROOT_ELEMENT: string = "rootElement";

  static readonly COLLECTION: string = "collection";

  static processData430(data: Map<string, any>, foreach: Foreach, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("Anonymous", get(data, "sequenceType"))) {
        data.set("isAnnonymousSequence", true);
    }

    let forEachExpression = (get(data, "forEachExpression") as Map<string, any>);
    if (forEachExpression != null) {
        data.set("namespaces", get(forEachExpression, "namespaces"));
        data.set("forEachExpression", get(forEachExpression, "value"));
    }

    if (foreach == null) {
        data.set("isNewMediator", true);
        return Either.forLeft(data);
    } else {
        data.set("editForeach", true);

        let range = foreach.getRange();
        let editRange = range.startTagRange;

        if (foreach.getSequenceAttribute() == null && equals("Key", get(data, "sequenceType"))) {
            editRange = new Range(
                    range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end
            );
        } else if (foreach.getSequenceAttribute() != null && equals("Anonymous", get(data, "sequenceType"))) {
            data.set("isAnnonymousSequence", true);
            data.set("addSequence", true);
            editRange = new Range(
                    range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end
            );
        }

        if (equals("", get(data, "forEachID"))) {
            removeFrom(data, "forEachID");
        }

        return Either.forRight(new Map<any, any>([[editRange, data]])
        );
    }


  }

  static getDataFromST430(node: Foreach): Map<string, any> {
    let data = new Map();
    data.set(Constant.DESCRIPTION, node.getDescription());
    data.set("forEachID", node.getId());
    data.set("forEachExpression", new Map<string, any>([["isExpression", true], ["value", node.getExpression() != null ? node.getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
    if (node.getSequenceAttribute() != null) {
        data.set("sequenceType", "Key");
        data.set("sequenceKey", node.getSequenceAttribute());
    } else if (node.getSequence() != null) {
        data.set("sequenceType", "Anonymous");
    }
    data.set("prevSequenceType", get(data, "sequenceType"));
    data.set(Constant.VERSION, "v1");
    data.set(Constant.UI_SCHEMA_NAME, "foreach_430");
    return data;

  }

  static processData440(data: Map<string, any>, foreach: Foreach, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {


    if (equals("v2", get(data, Constant.VERSION))) {
        if (get(data, Constant.CONTINUE_WITHOUT_AGGREGATION) != null &&
                (get(data, Constant.CONTINUE_WITHOUT_AGGREGATION) as boolean)) {
            removeFrom(data, ForeachMediator.UPDATE_ORIGINAL_CONTENT);
            removeFrom(data, ForeachMediator.RESULT_TYPE);
            removeFrom(data, ForeachMediator.ROOT_ELEMENT);
            removeFrom(data, Constant.RESULT_TARGET);
        }
        let collectionExpr = (get(data, ForeachMediator.COLLECTION) as Map<string, any>);
        if (collectionExpr != null) {
            data.set(ForeachMediator.COLLECTION, get(collectionExpr, Constant.VALUE));
        }
        if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
            data.set("traceFilter", true);
        } else {
            data.set("traceFilter", false);
        }
        if (foreach == null) {
            data.set("newMediatorV2", true);
            return Either.forLeft(data);
        }
        return Either.forRight(ForeachMediator.getEdits440(data, foreach, dirtyFields));
    }
    return ForeachMediator.processData430(data, foreach, dirtyFields);

  }

  static getEdits440(data: Map<string, any>, foreach: Foreach, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();
    let foreachAttributes = [ForeachMediator.COLLECTION, Constant.PARALLEL_EXECUTION, ForeachMediator.RESULT_TYPE, Constant.RESULT_TARGET,
            "counterVariableName", ForeachMediator.UPDATE_ORIGINAL_CONTENT, Constant.DESCRIPTION, Constant.CONTINUE_WITHOUT_AGGREGATION];

    if (MediatorUtils.anyMatch(dirtyFields, foreachAttributes)) {
        let scatterGatherData = new Map(data);
        scatterGatherData.set("editForeachV2", true);

        let range = foreach.getRange();
        let editRange = new Range(range.startTagRange.start, range.startTagRange.end);

        edits.set(editRange, scatterGatherData);
    }
    return edits;

  }

  static getDataFromST440(foreach: Foreach): Map<string, any> {


    if (foreach.getCollection() != null) {
        let data = new Map();
        data.set(Constant.DESCRIPTION, foreach.getDescription());
        data.set(Constant.PARALLEL_EXECUTION, foreach.isExecuteParallel());
        if (foreach.isContinueWithoutAggregation()) {
            data.set(Constant.CONTINUE_WITHOUT_AGGREGATION, foreach.isContinueWithoutAggregation());
        }
        if (foreach.isUpdateOriginal()) {
            data.set(ForeachMediator.UPDATE_ORIGINAL_CONTENT, true);
        } else {
            data.set(ForeachMediator.UPDATE_ORIGINAL_CONTENT, false);
            data.set(Constant.RESULT_TARGET, foreach.getVariableName());
            data.set(ForeachMediator.RESULT_TYPE, foreach.getResultType());
        }
        if (equalsIgnoreCase("XML", foreach.getResultType())) {
            data.set(ForeachMediator.ROOT_ELEMENT, foreach.getEnclosingElement());
        }
        data.set(ForeachMediator.COLLECTION, MediatorUtils.getExpressionData(foreach.getCollection()));
        data.set(Constant.VERSION, "v2");
        data.set("traceFilter", equals("enable", foreach.getTraceFilter()));
        return data;
    }
    return ForeachMediator.getDataFromST430(foreach);

  }
}
