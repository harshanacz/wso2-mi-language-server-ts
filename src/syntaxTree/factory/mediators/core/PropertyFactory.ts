// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/PropertyFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Property } from "../../../pojo/mediator/core/Property.js";
import { PropertyMediatorType } from "../../../pojo/mediator/core/PropertyMediatorType.js";
import { PropertyScope } from "../../../pojo/mediator/core/PropertyScope.js";
import { STNode } from "../../../stNode.js";
import { Utils } from "../../../utils.js";

export class PropertyFactory extends AbstractMediatorFactory {
  static readonly PROPERTY: string = "property";

  createSpecificMediator(element: DOMElement): Mediator {
    let property = new Property();
    property.elementNode(element);
    this.populateAttributes(property, element);
    let inline = element.getFirstChild();
    if (inline != null) {
        let inlineString = Utils.getInlineString(inline);
        property.setAny(inlineString);
    }
    return property;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let property = (node as Property);
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        property.setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        property.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        property.setExpression(expression);
    }
    let scope = element.getAttribute(Constant.SCOPE);
    let propertyScope = getEnumFromValue(scope, PropertyScope);
    if (propertyScope != null) {
        property.setScope(propertyScope);
    }
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, PropertyMediatorType);
    if (typeEnum != null) {
        property.setType(typeEnum);
    }
    let pattern = element.getAttribute(Constant.PATTERN);
    if (pattern != null) {
        property.setPattern(pattern);
    }
    let action = element.getAttribute(Constant.ACTION);
    if (action != null) {
        property.setAction(action);
    }
    let group = element.getAttribute(Constant.GROUP);
    if (group != null) {
        property.setGroup(group);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        property.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        property.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return PropertyFactory.PROPERTY;

  }
}
