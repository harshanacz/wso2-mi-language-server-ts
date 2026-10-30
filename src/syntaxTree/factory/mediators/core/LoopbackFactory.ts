// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/LoopbackFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Loopback } from "../../../pojo/mediator/core/Loopback.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class LoopbackFactory extends AbstractMediatorFactory {
  static readonly LOOPBACK: string = "loopback";

  createSpecificMediator(element: DOMElement): Mediator {
    let loopback = new Loopback();
    loopback.elementNode(element);
    this.populateAttributes(loopback, element);
    return loopback;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let loopback = (node as Loopback);
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        loopback.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        loopback.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return LoopbackFactory.LOOPBACK;

  }
}
