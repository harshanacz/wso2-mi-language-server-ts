// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/FastXSLTFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { FastXSLT } from "../../../pojo/mediator/transformation/FastXSLT.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class FastXSLTFactory extends AbstractMediatorFactory {
  static readonly FAST_XSLT: string = "fastXSLT";

  createSpecificMediator(element: DOMElement): Mediator {
    let fastXSLT = new FastXSLT();
    fastXSLT.elementNode(element);
    this.populateAttributes(fastXSLT, element);
    return fastXSLT;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as FastXSLT)).setKey(key);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as FastXSLT)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as FastXSLT)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return FastXSLTFactory.FAST_XSLT;

  }
}
