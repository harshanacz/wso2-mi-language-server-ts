// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/PojoCommandFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { CommandPropertyAction } from "../../../pojo/mediator/extension/command/CommandPropertyAction.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { PojoCommand } from "../../../pojo/mediator/extension/command/PojoCommand.js";
import { PojoCommandProperty } from "../../../pojo/mediator/extension/command/PojoCommandProperty.js";
import { STNode } from "../../../stNode.js";
import { Utils } from "../../../utils.js";

export class PojoCommandFactory extends AbstractMediatorFactory {
  static readonly POJO_COMMAND: string = "pojoCommand";

  createSpecificMediator(element: DOMElement): Mediator {
    let command = new PojoCommand();
    command.elementNode(element);
    this.populateAttributes(command, element);
    let children = element.getChildren();
    let properties = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.PROPERTY)) {
                let property = new PojoCommandProperty();
                property.elementNode((child as DOMElement));
                this.populatePojoCommandPropertyAttributes(property, (child as DOMElement));

                let anyChildren = element.getChildren();
                let contents = [];
                if (anyChildren != null && !isEmpty(anyChildren)) {
                    for (let anyChild of anyChildren) {
                        let content = Utils.getInlineString(anyChild);
                        contents.push(content);
                    }
                    property.setAny(contents.slice());
                }
                properties.push(property);
            }
        }
        command.setProperty(properties.slice());
    }

    return command;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as PojoCommand)).setName(name);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as PojoCommand)).setDescription(description);
    }

  }

  populatePojoCommandPropertyAttributes(property: PojoCommandProperty, element: DOMElement): void {
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
    let contextName = element.getAttribute(Constant.CONTEXT_NAME);
    if (contextName != null) {
        property.setContextName(contextName);
    }
    let action = element.getAttribute(Constant.ACTION);
    let actionEnum = getEnumFromValue(action, CommandPropertyAction);
    if (actionEnum != null) {
        property.setAction(actionEnum);
    }

  }

  getTagName(): string {
    return PojoCommandFactory.POJO_COMMAND;

  }
}
