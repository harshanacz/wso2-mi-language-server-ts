// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/EnqueueFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Enqueue } from "../../../pojo/mediator/advanced/Enqueue.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Utils } from "../../../utils.js";

export class EnqueueFactory extends AbstractMediatorFactory {
  static readonly ENQUEUE: string = "enqueue";

  createSpecificMediator(element: DOMElement): Mediator {
    let enqueue = new Enqueue();
    enqueue.elementNode(element);
    this.populateAttributes(enqueue, element);
    return enqueue;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let enqueue = (node as Enqueue);
    let priority = element.getAttribute(Constant.PRIORITY);
    if (priority != null) {
        enqueue.setPriority(Utils.parseInt(priority));
    }
    let sequence = element.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        enqueue.setSequence(sequence);
    }
    let executor = element.getAttribute(Constant.EXECUTOR);
    if (executor != null) {
        enqueue.setExecutor(executor);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        enqueue.setDescription(description);
    }

  }

  getTagName(): string {
    return EnqueueFactory.ENQUEUE;

  }
}
