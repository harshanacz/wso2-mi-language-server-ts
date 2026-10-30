// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/eip/AggregateFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Aggregate } from "../../../pojo/mediator/eip/aggregate/Aggregate.js";
import { AggregateCompleteCondition } from "../../../pojo/mediator/eip/aggregate/AggregateCompleteCondition.js";
import { AggregateCompleteConditionMessageCount } from "../../../pojo/mediator/eip/aggregate/AggregateCompleteConditionMessageCount.js";
import { AggregateCorrelateOn } from "../../../pojo/mediator/eip/aggregate/AggregateCorrelateOn.js";
import { AggregateElementType } from "../../../pojo/mediator/eip/aggregate/AggregateElementType.js";
import { AggregateOnComplete } from "../../../pojo/mediator/eip/aggregate/AggregateOnComplete.js";
import { Constant } from "../../../constant.js";
import { CorrelateOnOrCompleteConditionOrOnComplete } from "../../../pojo/mediator/eip/aggregate/CorrelateOnOrCompleteConditionOrOnComplete.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class AggregateFactory extends AbstractMediatorFactory {
  static readonly AGGREGATE: string = "aggregate";

  createSpecificMediator(element: DOMElement): Mediator {
    let aggregate = new Aggregate();
    aggregate.elementNode(element);
    this.populateAttributes(aggregate, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let configs =
                new CorrelateOnOrCompleteConditionOrOnComplete();
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.CORRELATE_ON)) {
                let correlateOn = this.createCorrelateOn(child);
                configs.setCorrelateOn((correlateOn));
            } else if (equalsIgnoreCase(name, Constant.COMPLETE_CONDITION)) {
                let completeCondition = this.createCompleteCondition(child);
                configs.setCompleteCondition((completeCondition));
            } else if (equalsIgnoreCase(name, Constant.ON_COMPLETE)) {
                let onComplete = this.createOnComplete(child);
                configs.setOnComplete((onComplete));
            }
        }
        aggregate.setCorrelateOnOrCompleteConditionOrOnComplete(configs);
    }
    return aggregate;

  }

  createCorrelateOn(child: DOMNode): AggregateCorrelateOn {
    let correlateOn = new AggregateCorrelateOn();
    correlateOn.elementNode((child as DOMElement));
    let expression = child.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        correlateOn.setExpression(expression);
    }
    return correlateOn;

  }

  createCompleteCondition(child: DOMNode): AggregateCompleteCondition {
    let completeCondition = new AggregateCompleteCondition();
    completeCondition.elementNode((child as DOMElement));
    let timeout = child.getAttribute(Constant.TIMEOUT);
    if (timeout != null) {
        completeCondition.setTimeout(Utils.parseInt(timeout));
    }

    let children = child.getChildren();
    if (children != null) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.MESSAGE_COUNT)) {
                let messageCount = this.createMessageCount(node);
                completeCondition.setMessageCount(messageCount);
            }
        }
    }
    return completeCondition;

  }

  createMessageCount(node: DOMNode): AggregateCompleteConditionMessageCount {
    let messageCount = new AggregateCompleteConditionMessageCount();
    messageCount.elementNode((node as DOMElement));
    let min = node.getAttribute(Constant.MIN);
    if (min != null) {
        messageCount.setMin(min);
    }
    let max = node.getAttribute(Constant.MAX);
    if (max != null) {
        messageCount.setMax(max);
    }
    return messageCount;

  }

  createOnComplete(child: DOMNode): AggregateOnComplete {
    let onComplete = new AggregateOnComplete();
    onComplete.elementNode((child as DOMElement));
    let expression = child.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        onComplete.setExpression(expression);
    }
    let sequence = child.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        onComplete.setSequenceAttribute(sequence);
    }
    let enclosingElementProperty = child.getAttribute(Constant.ENCLOSING_ELEMENT_PROPERTY);
    if (enclosingElementProperty != null) {
        onComplete.setEnclosingElementProperty(enclosingElementProperty);
    }
    let aggregateElementType = child.getAttribute(Constant.AGGREGATE_ELEMENT_TYPE);
    let elementTypeEnum = getEnumFromValue(aggregateElementType, AggregateElementType);
    if (elementTypeEnum != null) {
        onComplete.setAggregateElementType(elementTypeEnum);
    }

    let children = child.getChildren();
    let mediators = SyntaxTreeUtils.createMediators(children);
    onComplete.setMediatorList(mediators);
    return onComplete;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        ((node as Aggregate)).setId(id);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Aggregate)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Aggregate)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return AggregateFactory.AGGREGATE;

  }
}
