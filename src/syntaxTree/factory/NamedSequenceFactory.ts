// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/NamedSequenceFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty, getEnumFromValue } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { EnableDisable } from "../pojo/api/EnableDisable.js";
import { NamedSequence } from "../pojo/NamedSequence.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";

export class NamedSequenceFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let namedSequence = new NamedSequence();
    namedSequence.elementNode(element);
    this.populateAttributes(namedSequence, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let mediators = SyntaxTreeUtils.createMediators(children);
        namedSequence.setMediatorList(mediators);
    }
    return namedSequence;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as NamedSequence)).setName(name);
    }
    let onError = element.getAttribute(Constant.ON_ERROR);
    if (onError != null) {
        ((node as NamedSequence)).setOnError(onError);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as NamedSequence)).setDescription(description);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    let statisticsEnum = getEnumFromValue(statistics, EnableDisable);
    if (statisticsEnum != null) {
        ((node as NamedSequence)).setStatistics(statisticsEnum);
    }
    let trace = element.getAttribute(Constant.TRACE);
    let traceEnum = getEnumFromValue(trace, EnableDisable);
    if (traceEnum != null) {
        ((node as NamedSequence)).setTrace(traceEnum);
    }

  }
}
