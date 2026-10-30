// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/PropertyGroupFactory.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Property } from "../../../pojo/mediator/core/Property.js";
import { PropertyFactory } from "./PropertyFactory.js";
import { PropertyGroup } from "../../../pojo/mediator/core/PropertyGroup.js";
import { STNode } from "../../../stNode.js";

export class PropertyGroupFactory extends AbstractMediatorFactory {
  static readonly PROPERTY_GROUP: string = "propertygroup";

  createSpecificMediator(element: DOMElement): Mediator {
    let propertyGroup = new PropertyGroup();
    propertyGroup.elementNode(element);
    this.populateAttributes(propertyGroup, element);
    let children = element.getChildren();
    let properties = [];
    for (let child of children) {
        if (child instanceof DOMElement) {
            let childElement = (child as DOMElement);
            let tagName = childElement.getTagName();
            if (equals(tagName, Constant.PROPERTY)) {
                let propertyFactory = new PropertyFactory();
                let property = (propertyFactory.create(childElement) as Property);
                properties.push(property);
            }
        }
    }
    propertyGroup.setProperty(properties.slice());
    return propertyGroup;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let propertyGroup = (node as PropertyGroup);
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        propertyGroup.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        propertyGroup.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return PropertyGroupFactory.PROPERTY_GROUP;

  }
}
