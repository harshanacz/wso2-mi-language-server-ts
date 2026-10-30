// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/HeaderFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Header } from "../../../pojo/mediator/core/Header.js";
import { HeaderScope } from "../../../pojo/mediator/core/HeaderScope.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Utils } from "../../../utils.js";

export class HeaderFactory extends AbstractMediatorFactory {
  static readonly HEADER: string = "header";

  createSpecificMediator(element: DOMElement): Mediator {
    let header = new Header();
    header.elementNode(element);
    this.populateAttributes(header, element);
    let inline = element.getFirstChild();
    if (inline != null) {
        let inlineString = Utils.getInlineString(inline);
        header.setAny(inlineString);
    }
    return header;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as Header)).setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        ((node as Header)).setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        ((node as Header)).setExpression(expression);
    }
    let action = element.getAttribute(Constant.ACTION);
    if (action != null) {
        ((node as Header)).setAction(action);
    }
    let scope = element.getAttribute(Constant.SCOPE);
    let headerScope = HeaderScope.DEFAULT;
    if (scope != null) {
        headerScope = getEnumFromValue(scope, HeaderScope);
    }
    ((node as Header)).setScope(headerScope);
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Header)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Header)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return HeaderFactory.HEADER;

  }
}
