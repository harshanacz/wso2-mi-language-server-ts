// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/XqueryFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Xquery } from "../../../pojo/mediator/transformation/xquery/Xquery.js";
import { XqueryVariable } from "../../../pojo/mediator/transformation/xquery/XqueryVariable.js";
import { XqueryVariableType } from "../../../pojo/mediator/transformation/xquery/XqueryVariableType.js";

export class XqueryFactory extends AbstractMediatorFactory {
  static readonly XQUERY: string = "xquery";

  createSpecificMediator(element: DOMElement): Mediator {
    let xquery = new Xquery();
    xquery.elementNode(element);
    this.populateAttributes(xquery, element);
    let childNodes = element.getChildren();
    let xqueryVariables = [];
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let childNode of childNodes) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.VARIABLE)) {
                let xqueryVariable = this.createXqueryVariable(childNode);
                xqueryVariables.push(xqueryVariable);
            }
        }
        xquery.setVariable(xqueryVariables.slice());
    }
    return xquery;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as Xquery)).setKey(key);
    }
    let target = element.getAttribute(Constant.TARGET);
    if (target != null) {
        ((node as Xquery)).setTarget(target);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Xquery)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Xquery)).setTraceFilter(traceFilter);
    }

  }

  createXqueryVariable(element: DOMNode): XqueryVariable {
    let xqueryVariable = new XqueryVariable();
    xqueryVariable.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        xqueryVariable.setName(name);
    }
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, XqueryVariableType);
    if (typeEnum != null) {
        xqueryVariable.setType(typeEnum);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        xqueryVariable.setExpression(expression);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        xqueryVariable.setValue(value);
    }
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        xqueryVariable.setKey(key);
    }
    return xqueryVariable;

  }

  getTagName(): string {
    return XqueryFactory.XQUERY;

  }
}
