// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ThrottleMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { AllowAccessType } from "../../../syntaxTree/pojo/mediator/filter/throttle/AllowAccessType.js";
import { ControlAccessType } from "../../../syntaxTree/pojo/mediator/filter/throttle/ControlAccessType.js";
import { DenyAccessType } from "../../../syntaxTree/pojo/mediator/filter/throttle/DenyAccessType.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { TagRanges } from "../../../syntaxTree/stNode.js";
import { Throttle } from "../../../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";

export class ThrottleMediator {
  static readonly __fields: string[] = [];

  static readonly throttleTagAttributes: string[] = [
            "groupId", "description", "onAcceptBranchsequenceKey", "onRejectBranchsequenceKey",
            "onAcceptBranchsequenceType", "onRejectBranchsequenceType"];

  static readonly policyTagAttributes: string[] = [
            "policyType", "policyKey", "maximumConcurrentAccess", "policyEntries"];

  static readonly onAcceptTagAttributes: string[] = [
            "onAcceptBranchsequenceType", "onAcceptBranchsequenceKey"];

  static readonly onRejectTagAttributes: string[] = [
            "onRejectBranchsequenceType", "onRejectBranchsequenceKey"];

  static processData430(data: Map<string, any>, throttle: Throttle, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    data.set("newMediator", throttle == null);
    let policyType = (get(data, "policyType") as string);

    if (equals("INLINE", policyType)) {
        removeFrom(data, "policyKey");


        let policyEntries = (get(data, "policyEntries") as string[][]);
        if (policyEntries != null) {
            let formattedEntries = policyEntries.map(entry => {
                let policyEntry = new Map();
                policyEntry.set("throttleType", get(entry, 0));
                policyEntry.set("throttleRange", get(entry, 1));
                policyEntry.set("accessType", get(entry, 2));
                policyEntry.set("isAllow", equals("Allow", get(entry, 2)));
                policyEntry.set("isDeny", equals("Deny", get(entry, 2)));
                let isControl = equals("Control", get(entry, 2));
                policyEntry.set("isControl", isControl);
                if (isControl) {
                    policyEntry.set("maxRequestCount", get(entry, 3));
                    policyEntry.set("unitTime", get(entry, 4));
                    policyEntry.set("prohibitPeriod", get(entry, 5));
                }
                return policyEntry;
            });
            data.set("policyEntries", formattedEntries);
            data.set("hasPolicyEntries", !isEmpty(formattedEntries));
        }
    } else {
        removeFrom(data, "policyEntries");
        data.set("policyKey", (data.get("policyKey") ?? ""));
    }


    if (equals("ANONYMOUS", get(data, "onAcceptBranchsequenceType"))) {
        removeFrom(data, "onAcceptBranchsequenceKey");
    }


    if (equals("ANONYMOUS", get(data, "onRejectBranchsequenceType"))) {
        removeFrom(data, "onRejectBranchsequenceKey");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (throttle != null) {
        return Either.forRight(ThrottleMediator.processForEdit(data, throttle, dirtyFields));
    }
    return Either.forLeft(data);

  }

  static processForEdit(data: Map<string, any>, throttle: Throttle, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let editsData = new Map();
    let ranges = ThrottleMediator.getRanges(throttle);
    if (MediatorUtils.anyMatch(dirtyFields, ThrottleMediator.throttleTagAttributes)) {
        ThrottleMediator.getEdit("throttle", data, ranges, true, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, ThrottleMediator.policyTagAttributes)) {
        ThrottleMediator.getEdit("policy", data, ranges, false, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, ThrottleMediator.onAcceptTagAttributes)) {
        ThrottleMediator.getEdit("onAccept", data, ranges, false, editsData);
    }
    if (MediatorUtils.anyMatch(dirtyFields, ThrottleMediator.onRejectTagAttributes)) {
        ThrottleMediator.getEdit("onReject", data, ranges, false, editsData);
    }
    return editsData;

  }

  static getRanges(throttle: Throttle): Map<string, TagRanges> {
    let ranges = new Map();
    ranges.set("throttle", throttle.getRange());
    if (throttle.getPolicies() != null) {
        ranges.set("policy", throttle.getPolicies().getRange());
    }
    if (throttle.getOnAccept() != null) {
        ranges.set("onAccept", throttle.getOnAccept().getRange());
    }
    if (throttle.getOnReject() != null) {
        ranges.set("onReject", throttle.getOnReject().getRange());
    }
    return ranges;

  }

  static getEdit(key: string, data: Map<string, any>, ranges: Map<string, TagRanges>, editStartTagOnly: boolean, editsData: Map<Range, Map<string, any>>): void {

    let dataCopy = new Map(data);


    let editKey = "edit" + (key.charAt(0)).toUpperCase() + key.substring(1);
    dataCopy.set(editKey, true);


    let range = get(ranges, key);
    let editRange: Range | undefined;

    if (range != null) {

        let start = range.startTagRange.start;
        let end = editStartTagOnly
                ? range.startTagRange.end :
                (range.endTagRange != null && range.endTagRange.end != null ?
                        range.endTagRange.end : range.startTagRange.end);

        editRange = new Range(start, end);

    } else {

        let throttleRange = get(ranges, "throttle");
        let start = throttleRange.endTagRange.start;
        editRange = new Range(start, start);
    }


    editsData.set(editRange, dataCopy);

  }

  static getDataFromST430(node: Throttle): Map<string, any> {
    let data = new Map();

    data.set("groupId", node.getId());
    data.set("description", node.getDescription());


    let onAcceptAttribute = node.getOnAcceptAttribute();
    if (onAcceptAttribute != null) {
        data.set("onAcceptBranchsequenceKey", onAcceptAttribute);
        data.set("onAcceptBranchsequenceType", "REGISTRY_REFERENCE");
    } else {
        data.set("onAcceptBranchsequenceType", "ANONYMOUS");
    }


    let onRejectAttribute = node.getOnRejectAttribute();
    if (onRejectAttribute != null) {
        data.set("onRejectBranchsequenceKey", onRejectAttribute);
        data.set("onRejectBranchsequenceType", "REGISTRY_REFERENCE");
    } else {
        data.set("onRejectBranchsequenceType", "ANONYMOUS");
    }

    let policies = node.getPolicies();
    if (policies != null) {
        let policyKey = policies.getKey();
        if (policyKey != null) {
            data.set("policyKey", policyKey);
            data.set("policyType", "REGISTRY_REFERENCE");
        } else {
            data.set("policyType", "INLINE");
            data.set("maximumConcurrentAccess", policies.getMaximumConcurrentAccess());
            let policyList = policies.getPolicies();
            if (policyList != null && !isEmpty(policyList)) {
                let policyEntries = [];
                for (let policy of policyList) {
                    let entry = [];
                    entry.push(policy.getId().getType());
                    entry.push(policy.getId().getValue());
                    let accessType = policy.getAccessType();
                    if (accessType instanceof AllowAccessType) {
                        entry.push("Allow");
                    } else if (accessType instanceof DenyAccessType) {
                        entry.push("Deny");
                    } else if (accessType instanceof ControlAccessType) {
                        entry.push("Control");
                        let controlAccessType = (accessType as ControlAccessType);
                        entry.push(String(controlAccessType.getMaximumCount()));
                        entry.push(String(controlAccessType.getUnitTime()));
                        entry.push(String(controlAccessType.getProhibitTimePeriod()));
                    }
                    policyEntries.push(entry);
                }
                data.set("policyEntries", policyEntries);
            }
        }
    } else {
        data.set("policyType", "INLINE");
        data.set("policyEntries", []);
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
