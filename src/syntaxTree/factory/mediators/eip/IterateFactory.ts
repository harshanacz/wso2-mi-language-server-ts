// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/eip/IterateFactory.java by the java2ts converter (see tools/java2ts).
import { parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Iterate } from "../../../pojo/mediator/eip/Iterate.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class IterateFactory extends AbstractMediatorFactory {
  static readonly ITERATE: string = "iterate";

  createSpecificMediator(element: DOMElement): Mediator {
    let iterate = new Iterate();
    iterate.elementNode(element);
    this.populateAttributes(iterate, element);
    let targetNode = Utils.getChildNodeByName(element, Constant.TARGET);
    if (targetNode != null) {
        let target = SyntaxTreeUtils.createTarget(targetNode);
        iterate.setTarget(target);
    }
    return iterate;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let sequential = element.getAttribute(Constant.SEQUENTIAL);
    if (sequential != null) {
        ((node as Iterate)).setSequential(parseBoolean(sequential));
    }
    let continueParent = element.getAttribute(Constant.CONTINUE_PARENT);
    if (continueParent != null) {
        ((node as Iterate)).setContinueParent(parseBoolean(continueParent));
    }
    let preservePayload = element.getAttribute(Constant.PRESERVE_PAYLOAD);
    if (preservePayload != null) {
        ((node as Iterate)).setPreservePayload(parseBoolean(preservePayload));
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        ((node as Iterate)).setExpression(expression);
    }
    let attachPath = element.getAttribute(Constant.ATTACH_PATH);
    if (attachPath != null) {
        ((node as Iterate)).setAttachPath(attachPath);
    }
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        ((node as Iterate)).setId(id);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Iterate)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Iterate)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return IterateFactory.ITERATE;

  }
}
