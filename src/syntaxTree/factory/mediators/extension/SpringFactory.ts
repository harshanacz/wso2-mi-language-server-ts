// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/SpringFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Spring } from "../../../pojo/mediator/extension/Spring.js";

export class SpringFactory extends AbstractMediatorFactory {
  static readonly SPRING: string = "spring:spring";

  createSpecificMediator(element: DOMElement): Mediator {
    let spring = new Spring();
    spring.elementNode(element);
    this.populateAttributes(spring, element);
    return spring;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let bean = element.getAttribute(Constant.BEAN);
    if (bean != null) {
        ((node as Spring)).setBean(bean);
    }
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as Spring)).setKey(key);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Spring)).setDescription(description);
    }

  }

  getTagName(): string {
    return SpringFactory.SPRING;

  }
}
