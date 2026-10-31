// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/SwitchMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Switch } from "../../../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { SwitchCase } from "../../../syntaxTree/pojo/mediator/filter/switchMediator/SwitchCase.js";

export class SwitchMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, switchMediator: Switch, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    if (data.has("newBranch") && equals(true, get(data, "newBranch"))) {
        let newCaseRegex = "";
        if (data.has("numberOfCases") && (typeof get(data, "numberOfCases") === "number")) {
            newCaseRegex = "case" + (((get(data, "numberOfCases") as number)) + 1);
        }
        data.set("caseRegex", newCaseRegex);
        return Either.forLeft(data);
    }

    if (switchMediator == null) {
        data.set("isNewMediator", true);

        let caseBranchesObj: any = get(data, "caseBranches");
        if (Array.isArray(caseBranchesObj)) {
            let caseBranches = (caseBranchesObj as any[]);
            let formattedBranches = [];

            for (let caseBranchObj of caseBranches) {
                if (Array.isArray(caseBranchObj)) {
                    let caseBranch = (caseBranchObj as any[]);
                    if (!isEmpty(caseBranch) && (typeof get(caseBranch, 0) === "string")) {
                        let caseData = new Map();
                        caseData.set("caseRegex", get(caseBranch, 0));
                        formattedBranches.push(caseData);
                    }
                }
            }
            data.set("caseBranches", formattedBranches);
        }

        return Either.forLeft(data);
    }

    return Either.forRight(SwitchMediator.getEdits(data, switchMediator, dirtyFields));

  }

  static getEdits(data: Map<string, any>, switchMediator: Switch, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let editsData = new Map();

    if (contains(dirtyFields, "sourceXPath") || contains(dirtyFields, "description")) {
        let dataCopy = new Map(data);
        dataCopy.set("editSwitch", true);
        dataCopy.set("switchSelfClosed", switchMediator.isSelfClosed());

        let range = switchMediator.getRange().startTagRange;
        editsData.set(range, dataCopy);
    }

    if (contains(dirtyFields, "caseBranches")) {
        let caseBranchesObj: any = get(data, "caseBranches");
        if (Array.isArray(caseBranchesObj)) {
            let caseBranches = (caseBranchesObj as any[]);
            let caseBranchData = switchMediator.get_case();
            for (let caseBranchObj of caseBranches) {
                if (Array.isArray(caseBranchObj)) {
                    let caseBranch = (caseBranchObj as any[]);

                    let dataCopy = new Map(data);
                    if (!isEmpty(caseBranch) && (typeof get(caseBranch, 0) === "string")) {
                        dataCopy.set("caseRegex", get(caseBranch, 0));
                    }
                    let oldIndex = size(caseBranch) > 1 && (typeof get(caseBranch, 1) === "number") ?((get(caseBranch, 1) as number)) : null;

                    if (oldIndex != null) {
                        dataCopy.set("editCase", true);
                        let oldCaseData = SwitchMediator.getOldCaseData(caseBranchData, oldIndex);
                        if (oldCaseData != null) {
                            dataCopy.set("caseSelfClosed", oldCaseData.isSelfClosed());
                            editsData.set(oldCaseData.getRange().startTagRange, dataCopy);

                        }
                    } else {
                        dataCopy.set("newCase", true);
                        if (switchMediator.get_default() != null) {
                            editsData.set(new Range(switchMediator.get_default().getRange().startTagRange.start,
                                    switchMediator.get_default().getRange().startTagRange.start), dataCopy);
                        }
                    }

                }
            }

            let removedCases = SwitchMediator.filterRemovedElements(caseBranchData, (caseBranches as any[][]));

            for (let removedCase of removedCases) {
                let editRange: any;
                if (removedCase.isSelfClosed()) {
                    editRange = removedCase.getRange().startTagRange;
                } else {
                    editRange = new Range(
                            removedCase.getRange().startTagRange.start,
                            removedCase.getRange().endTagRange.end);
                }
                editsData.set(editRange, new Map([]));

            }

        }
    }

    return editsData;

  }

  static getOldCaseData(caseBranchesData: SwitchCase[], index: number): SwitchCase {
    if (caseBranchesData != null) {
        for (let i = 0; i < caseBranchesData.length; i++) {
            if (i == index) {
                return caseBranchesData[i];
            }
        }
    }
    return null;

  }

  static filterRemovedElements(originalCases: SwitchCase[], updatedCases: any[][]): SwitchCase[] {
    if (originalCases == null || updatedCases == null) {
        return [];
    }
    let set2 = [];
    for (let updatedCase of updatedCases) {
        if (size(updatedCase) > 1 && (typeof get(updatedCase, 1) === "number")) {
            set2.push(((get(updatedCase, 1) as number)));
        }
    }

    let removedCases = [];
    for (let i = 0; i < originalCases.length; i++) {
        if (!contains(set2, i)) {
            removedCases.push(originalCases[i]);
        }
    }
    return removedCases;

  }

  static getDataFromST430(node: Switch): Map<string, any> {
    let data = new Map();

    data.set("sourceXPath", new Map<string, any>([["isExpression", true], ["value", node.getSource() != null ? node.getSource() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));

    data.set("description", node.getDescription());

    if (node.get_case() != null) {
        let caseBranches = [];
        let caseBranchesData = [];

        for (let i = 0; i < node.get_case().length; i++) {
            let caseBranch = node.get_case()[i];
            caseBranches.push([caseBranch.getRegex(), i]);
            caseBranchesData.push([
                    caseBranch.getRegex() != null ? caseBranch.getRegex() : "",
                    i,
                    caseBranch.getRange(),
                    caseBranch.isSelfClosed()
            ]);
        }

        data.set("caseBranches", caseBranches);
        data.set("caseBranchesData", caseBranchesData);
    }

    let ranges = new Map();
    ranges.set("switch", node.getRange());
    if (node.get_default() != null) {
        ranges.set("_default", node.get_default().getRange());
    }
    data.set("ranges", ranges);
    data.set("switchSelfClosed", node.isSelfClosed());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
