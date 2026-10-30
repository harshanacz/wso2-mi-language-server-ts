// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/EventFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Event } from "../../../pojo/mediator/advanced/Event.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class EventFactory extends AbstractMediatorFactory {
  static readonly EVENT: string = "event";

  createSpecificMediator(element: DOMElement): Mediator {
    let event = new Event();
    event.elementNode(element);
    this.populateAttributes(event, element);
    return event;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let event = (node as Event);
    let topic = element.getAttribute(Constant.TOPIC);
    if (topic != null) {
        event.setTopic(topic);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        event.setExpression(expression);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        event.setDescription(description);
    }

  }

  getTagName(): string {
    return EventFactory.EVENT;

  }
}
