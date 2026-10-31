// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/CloneMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, size, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Clone } from "../../../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { CloneTarget } from "../../../syntaxTree/pojo/mediator/advanced/Clone/CloneTarget.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { TagRanges } from "../../../syntaxTree/stNode.js";

export class CloneMediator {
  static readonly __fields: string[] = [];

  static readonly cloneAttributes: string[] = ["cloneId", "sequentialMediation", "continueParent", "description"];

  static processData430(data: Map<string, any>, clone: Clone, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    removeFrom(data, "soapAction");
    removeFrom(data, "toAddress");

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (data.has("newBranch") && equals(true, get(data, "newBranch"))) {
        return Either.forLeft(data);
    }
    if (clone == null) {
        return Either.forLeft(CloneMediator.getNewMediator(data));
    }
    return Either.forRight(CloneMediator.getEdits(data, clone, dirtyFields));


  }

  static getNewMediator(data: Map<string, any>): Map<string, any> {
    let newData = new Map(data);
    newData.set("newMediator", true);

    let targets = [];
    let targetList: any = get(newData, "targets");
    if (Array.isArray(targetList) && !isEmpty(((targetList as any[])))) {
        for (let targetObj of (targetList as any[])) {
            if (Array.isArray(targetObj)) {
                targets.push(CloneMediator.processTargetData((targetObj as any[])));
            }
        }
    }
    newData.set("targets", targets);

    return newData;

  }

  static processTargetData(target: any[]): Map<string, any> {
    let isRegistrySeqAndEndpoint = false;
    let sequenceRegistryKey = null;
    let endpointRegistryKey = null;

    if (size(target) > 1 && (equals(get(target, 0), "REGISTRY_REFERENCE") || equals(get(target, 0), "NONE"))) {
        isRegistrySeqAndEndpoint = true;
    }
    if (size(target) > 2 && equals(get(target, 0), "REGISTRY_REFERENCE")) {
        sequenceRegistryKey = (get(target, 1) as string);
    }
    if (size(target) > 3 && equals(get(target, 2), "REGISTRY_REFERENCE")) {
        endpointRegistryKey = (get(target, 3) as string);
    }
    return new Map(new Map<string, any>([["isRegistrySeqAndEndpoint", isRegistrySeqAndEndpoint], ["sequenceRegistryKey", sequenceRegistryKey != null ? sequenceRegistryKey : ""], ["endpointRegistryKey", endpointRegistryKey != null ? endpointRegistryKey : ""], ["soapAction", size(target) > 4 && get(target, 4) != null ? get(target, 4) : ""], ["toAddress", size(target) > 5 && get(target, 5) != null ? get(target, 5) : ""]]));

  }

  static getEdits(data: Map<string, any>, clone: Clone, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();

    if (MediatorUtils.anyMatch(dirtyFields, CloneMediator.cloneAttributes)) {
        let cloneData = new Map(data);
        cloneData.set("editClone", true);

        let range = clone.getRange();
        let editRange = new Range(range.startTagRange.start, range.startTagRange.end);

        edits.set(editRange, cloneData);
    }

    if (contains(dirtyFields, "targets")) {
        let targetList: any = get(data, "targets");
        if (Array.isArray(targetList)) {
            for (let targetObj of (targetList as any[])) {
                let target = (targetObj as any[]);
                let targetData = CloneMediator.processTargetData(target);
                let editRange = null;
                let oldIndex = size(target) > 6 && get(target, 6) != null ?((get(target, 6) as number)) : null;

                if (oldIndex == null) {
                    let cloneRange = clone.getRange();
                    editRange = new Range(cloneRange.endTagRange.start, cloneRange.endTagRange.start);
                    targetData.set("newTarget", true);
                } else {
                    let oldTarget = CloneMediator.getOldTarget(clone.getTarget(), oldIndex);
                    if (oldTarget != null) {
                        let addSequence = !equals("ANONYMOUS", oldTarget.getSequenceAttribute()) && get(targetData, "sequenceRegistryKey") == null;
                        let removeSequence = equals("ANONYMOUS", oldTarget.getEndpointAttribute()) && (get(targetData, "isRegistrySeqAndEndpoint") as boolean);

                        let targetRange = CloneMediator.getTargetRange(clone.getTarget(), oldIndex);
                        if (targetRange != null) {
                            if (!addSequence && !removeSequence) {
                                editRange = new Range(targetRange.startTagRange.start, targetRange.startTagRange.end);
                            } else {
                                editRange = new Range(targetRange.startTagRange.start,
                                        targetRange.endTagRange != null ? targetRange.endTagRange.end : targetRange.startTagRange.end);
                            }
                        }
                    }
                }
                if (editRange != null) {
                    edits.set(editRange, targetData);
                }
            }
            let removedTargets = CloneMediator.filterRemovedElements(clone.getTarget(), (targetList as any[][]));
            for (let removedTarget of removedTargets) {
                let selfClosed = removedTarget.isSelfClosed();
                let targetRange = removedTarget.getRange();
                let editRange: any;

                if (selfClosed) {
                    editRange = targetRange.startTagRange;
                } else {
                    editRange = new Range(targetRange.startTagRange.start, targetRange.endTagRange.end);
                }
                edits.set(editRange, new Map<string, any>([["empty", true]]));
            }
        }
    }

    return edits;

  }

  static getOldTarget(targets: CloneTarget[], index: number): CloneTarget {
    if (targets != null) {
        for (let i = 0; i < targets.length; i++) {
            if (i == index) {
                return targets[i];
            }
        }
    }
    return null;

  }

  static getTargetRange(targetRanges: CloneTarget[], index: number): TagRanges {
    for (let i = 0; i < targetRanges.length; i++) {
        if (i == index) {
            return targetRanges[i].getRange();
        }
    }
    return null;

  }

  static filterRemovedElements(originalTargets: CloneTarget[], updatedTargets: any[][]): CloneTarget[] {
    if (originalTargets == null || updatedTargets == null) {
        return [];
    }
    let set2 = [];
    for (let updatedTarget of updatedTargets) {
        if (size(updatedTarget) > 6 && (typeof get(updatedTarget, 6) === "number")) {
            set2.push(((get(updatedTarget, 6) as number)));
        }
    }
    let removedTargets = [];
    for (let i = 0; i < originalTargets.length; i++) {
        if (!contains(set2, i)) {
            removedTargets.push(originalTargets[i]);
        }
    }
    return removedTargets;

  }

  static getDataFromST430(node: Clone): Map<string, any> {
    let data = new Map();
    data.set("newMediator", false);
    data.set("cloneId", node.getId());
    data.set("sequentialMediation", node.isSequential());
    data.set("continueParent", node.isContinueParent());
    data.set("description", node.getDescription());
    data.set("cloneTagRange", node.getRange());
    data.set("targets", []);

    if (node.getTarget() != null && node.getTarget().length > 0) {
        data.set("targets", CloneMediator.getTargetsData(node.getTarget()));
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }

  static getTargetsData(targetsData: CloneTarget[]): any[][] {
    if (targetsData != null) {
        let targets = [];
        for (let target of targetsData) {
            let sequenceType = target.getSequenceAttribute() != null ?
                    "REGISTRY_REFERENCE" : target.getSequence() != null ? "ANONYMOUS" : "NONE";
            let endpointType = target.getEndpointAttribute() != null ?
                    "REGISTRY_REFERENCE" : target.getEndpoint() != null ? "ANONYMOUS" : "NONE";
            let sequenceAttribute = target.getSequenceAttribute() != null ? target.getSequenceAttribute() : "";
            let endpointAttribute = target.getEndpointAttribute() != null ? target.getEndpointAttribute() : "";
            let soapAction = target.getSoapAction() != null ? target.getSoapAction() : "";
            let to = target.getTo() != null ? target.getTo() : "";
            targets.push([sequenceType, sequenceAttribute, endpointType, endpointAttribute, soapAction, to,
                    targetsData.indexOf(target)]);
        }
        return targets;
    }
    return null;

  }
}
