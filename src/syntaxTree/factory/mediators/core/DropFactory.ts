// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/DropFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Drop } from "../../../pojo/mediator/core/Drop.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class DropFactory extends AbstractMediatorFactory {
  static readonly DROP: string = "drop";

  createSpecificMediator(element: DOMElement): Mediator {
    let drop = new Drop();
    drop.elementNode(element);
    this.populateAttributes(drop, element);
    return drop;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Drop)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Drop)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return DropFactory.DROP;

  }
}
