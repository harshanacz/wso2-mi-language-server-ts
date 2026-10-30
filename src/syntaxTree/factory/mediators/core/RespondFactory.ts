// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/RespondFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Respond } from "../../../pojo/mediator/core/Respond.js";
import { STNode } from "../../../stNode.js";

export class RespondFactory extends AbstractMediatorFactory {
  static readonly RESPOND: string = "respond";

  createSpecificMediator(element: DOMElement): Mediator {
    let respond = new Respond();
    respond.elementNode(element);
    this.populateAttributes(respond, element);
    return respond;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let respond = (node as Respond);
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        respond.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        respond.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return RespondFactory.RESPOND;

  }
}
