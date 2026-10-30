// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/TransactionFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Transaction } from "../../../pojo/mediator/advanced/Transaction.js";
import { TransactionAction } from "../../../pojo/mediator/advanced/TransactionAction.js";

export class TransactionFactory extends AbstractMediatorFactory {
  static readonly TRANSACTION: string = "transaction";

  createSpecificMediator(element: DOMElement): Mediator {
    let transaction = new Transaction();
    transaction.elementNode(element);
    this.populateAttributes(transaction, element);
    return transaction;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let transaction = (node as Transaction);
    let action = element.getAttribute(Constant.ACTION);
    let actionEnum = getEnumFromValue(action, TransactionAction);
    if (actionEnum != null) {
        transaction.setAction(actionEnum);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        transaction.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        transaction.setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return TransactionFactory.TRANSACTION;

  }
}
