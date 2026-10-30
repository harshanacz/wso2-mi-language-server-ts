// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/BeanFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Bean } from "../../../pojo/mediator/extension/Bean.js";
import { BeanAction } from "../../../pojo/mediator/extension/BeanAction.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class BeanFactory extends AbstractMediatorFactory {
  static readonly BEAN: string = "bean";

  createSpecificMediator(element: DOMElement): Mediator {
    let bean = new Bean();
    bean.elementNode(element);
    this.populateAttributes(bean, element);
    return bean;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let action = element.getAttribute(Constant.ACTION);
    let actionEnum = getEnumFromValue(action, BeanAction);
    if (actionEnum != null) {
        ((node as Bean)).setAction(actionEnum);
    }
    let var_ = element.getAttribute(Constant.VAR);
    if (var_ != null) {
        ((node as Bean)).setVar(var_);
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as Bean)).setClazz(clazz);
    }
    let property = element.getAttribute(Constant.PROPERTY);
    if (property != null) {
        ((node as Bean)).setProperty(property);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        ((node as Bean)).setValue(value);
    }
    let target = element.getAttribute(Constant.TARGET);
    if (target != null) {
        ((node as Bean)).setTarget(target);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Bean)).setDescription(description);
    }

  }

  getTagName(): string {
    return BeanFactory.BEAN;

  }
}
