// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/eip/ForeachFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty, parseBoolean, StringUtils } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Foreach } from "../../../pojo/mediator/eip/Foreach.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class ForeachFactory extends AbstractMediatorFactory {
  static readonly FOR_EACH: string = "foreach";

  createSpecificMediator(element: DOMElement): Mediator {
    let foreach = new Foreach();
    foreach.elementNode(element);
    this.populateAttributes(foreach, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let sequence = SyntaxTreeUtils.createSequence(node);
            foreach.setSequence(sequence);
        }
    }
    return foreach;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Foreach)).setDescription(description);
    }
    let collection = element.getAttribute("collection");
    if (StringUtils.isNotBlank(collection)) {
        this.populateV2Attributes(node, element);
        return;
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        ((node as Foreach)).setExpression(expression);
    }
    let sequenceAttribute = element.getAttribute(Constant.SEQUENCE);
    if (sequenceAttribute != null) {
        ((node as Foreach)).setSequenceAttribute(sequenceAttribute);
    }
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        ((node as Foreach)).setId(id);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Foreach)).setTraceFilter(traceFilter);
    }

  }

  populateV2Attributes(node: STNode, element: DOMElement): void {
    let collection = element.getAttribute("collection");
    if (StringUtils.isNotBlank(collection)) {
        ((node as Foreach)).setCollection(collection);
    }
    let counterVariableName = element.getAttribute("counter-variable");
    if (StringUtils.isNotBlank(counterVariableName)) {
        ((node as Foreach)).setCounterVariableName(counterVariableName);
    }
    let contentType = element.getAttribute(Constant.RESULT_CONTENT_TYPE);
    if (StringUtils.isNotBlank(contentType)) {
        ((node as Foreach)).setResultType(contentType);
    }
    let enclosingElement = element.getAttribute(Constant.RESULT_ENCLOSING_ELEMENT);
    if (StringUtils.isNotBlank(enclosingElement)) {
        ((node as Foreach)).setEnclosingElement(enclosingElement);
    }
    let updateOriginal = element.getAttribute("update-original");
    if (StringUtils.isNotBlank(updateOriginal)) {
        ((node as Foreach)).setUpdateOriginal(parseBoolean(updateOriginal));
    }
    let targetVariableName = element.getAttribute(Constant.TARGET_VARIABLE);
    if (StringUtils.isNotBlank(targetVariableName)) {
        ((node as Foreach)).setVariableName(targetVariableName);
    }
    let executeParallel = element.getAttribute("parallel-execution");
    if (StringUtils.isNotBlank(executeParallel)) {
        ((node as Foreach)).setExecuteParallel(parseBoolean(executeParallel));
    }
    let continueWithoutAggregation = element.getAttribute("continue-without-aggregation");
    if (StringUtils.isNotBlank(continueWithoutAggregation)) {
        ((node as Foreach)).setContinueWithoutAggregation(parseBoolean(continueWithoutAggregation));
    }

  }

  getTagName(): string {
    return ForeachFactory.FOR_EACH;

  }
}
