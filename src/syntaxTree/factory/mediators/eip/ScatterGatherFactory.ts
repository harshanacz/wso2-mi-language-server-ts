// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/eip/ScatterGatherFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { CloneTarget } from "../../../pojo/mediator/advanced/Clone/CloneTarget.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { ScatterGather } from "../../../pojo/mediator/eip/ScatterGather.js";
import { ScatterGatherAggregation } from "../../../pojo/mediator/eip/aggregate/ScatterGatherAggregation.js";
import { Sequence } from "../../../pojo/misc/common/Sequence.js";
import { SequenceFactory } from "../../misc/SequenceFactory.js";

export class ScatterGatherFactory extends AbstractMediatorFactory {
  static readonly SCATTER_GATHER: string = "scatter-gather";

  createSpecificMediator(element: DOMElement): Mediator {
    let scatterGather = new ScatterGather();
    scatterGather.elementNode(element);
    this.populateAttributes(scatterGather, element);
    let children = element.getChildren();
    let cloneTargetList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), "aggregation")) {
            let scatterGatherAggregation = new ScatterGatherAggregation();
            scatterGatherAggregation.elementNode((node as DOMElement));
            scatterGatherAggregation.setExpression(node.getAttribute("expression"));
            if (node.getAttribute("condition") != null) {
                scatterGatherAggregation.setCondition(node.getAttribute("condition"));
            }
            if (node.getAttribute("timeout") != null) {
                scatterGatherAggregation.setCompleteTimeout(node.getAttribute("timeout"));
            }
            if (node.getAttribute("min-messages") != null) {
                scatterGatherAggregation.setMinMessages(node.getAttribute("min-messages"));
            }
            if (node.getAttribute("max-messages") != null) {
                scatterGatherAggregation.setMaxMessages(node.getAttribute("max-messages"));
            }
            scatterGather.setScatterGatherAggregation(scatterGatherAggregation);
        } else if (equalsIgnoreCase(node.getNodeName(), "sequence")) {
            let sequenceFactory = new SequenceFactory();
            let sequence = (sequenceFactory.create((node as DOMElement)) as Sequence);
            let cloneTarget = new CloneTarget();
            cloneTarget.elementNode((node as DOMElement));
            cloneTarget.setSequence(sequence);
            cloneTargetList.push(cloneTarget);
        }
    }
    scatterGather.addTarget(cloneTargetList.slice());
    return scatterGather;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    try {
        let parallelExecute = element.getAttribute("parallel-execution");
        if (parallelExecute != null) {
            ((node as ScatterGather)).setExecuteParallel(parseBoolean(parallelExecute));
        } else {
            ((node as ScatterGather)).setExecuteParallel(true);
        }
        let resultTarget = element.getAttribute(Constant.TARGET);
        if (resultTarget != null) {
            ((node as ScatterGather)).setResultTarget(resultTarget);
        }
        let variableName = element.getAttribute(Constant.TARGET_VARIABLE);
        if (variableName != null) {
            ((node as ScatterGather)).setVariableName(variableName);
        }
        let contentType = element.getAttribute(Constant.RESULT_CONTENT_TYPE);
        if (contentType != null) {
            ((node as ScatterGather)).setContentType(contentType);
        }
        let rootElement = element.getAttribute(Constant.RESULT_ENCLOSING_ELEMENT);
        if (rootElement != null) {
            ((node as ScatterGather)).setRootElement(rootElement);
        }
        let description = element.getAttribute(Constant.DESCRIPTION);
        if (description != null) {
            ((node as ScatterGather)).setDescription(description);
        }
        let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
        if (traceFilter != null) {
            ((node as ScatterGather)).setTraceFilter(traceFilter);
        }
    } catch (e) {

    }

  }

  getTagName(): string {
    return ScatterGatherFactory.SCATTER_GATHER;

  }
}
