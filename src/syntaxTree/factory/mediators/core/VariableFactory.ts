// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/VariableFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue, Objects } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { PropertyMediatorType } from "../../../pojo/mediator/core/PropertyMediatorType.js";
import { STNode } from "../../../stNode.js";
import { Variable } from "../../../pojo/mediator/core/Variable.js";

export class VariableFactory extends AbstractMediatorFactory {
  static readonly VARIABLE: string = "variable";

  createSpecificMediator(element: DOMElement): Mediator {
    let variable = new Variable();
    variable.elementNode(element);
    this.populateAttributes(variable, element);
    return variable;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let variable = (node as Variable);
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        variable.setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        variable.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        variable.setExpression(expression);
    }
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, PropertyMediatorType);
    if (typeEnum != null) {
        variable.setType(typeEnum);
    }
    let action = element.getAttribute(Constant.ACTION);
    variable.setAction(Objects.requireNonNullElse(action, Constant.SET));
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        variable.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        variable.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return VariableFactory.VARIABLE;

  }
}
