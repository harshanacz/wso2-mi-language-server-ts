// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/StoreFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Store } from "../../../pojo/mediator/core/Store.js";

export class StoreFactory extends AbstractMediatorFactory {
  static readonly STORE: string = "store";

  createSpecificMediator(element: DOMElement): Mediator {
    let store = new Store();
    store.elementNode(element);
    this.populateAttributes(store, element);
    return store;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let store = (node as Store);
    let messageStore = element.getAttribute(Constant.MESSAGE_STORE);
    if (messageStore != null) {
        store.setMessageStore(messageStore);
    }
    let sequence = element.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        store.setSequence(sequence);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        store.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        store.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return StoreFactory.STORE;

  }
}
