// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/SequenceMediatorFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty } from "../../javaCompat.js";
import { AbstractMediatorFactory } from "./AbstractMediatorFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { STNode } from "../../stNode.js";
import { SequenceMediator } from "../../pojo/mediator/SequenceMediator.js";
import { SyntaxTreeUtils } from "../../utils/SyntaxTreeUtils.js";

export class SequenceMediatorFactory extends AbstractMediatorFactory {
  static readonly SEQUENCE: string = "sequence";

  createSpecificMediator(element: DOMElement): Mediator {
    let sequenceMediator = new SequenceMediator();
    sequenceMediator.elementNode(element);
    this.populateAttributes(sequenceMediator, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let mediators = SyntaxTreeUtils.createMediators(children);
        sequenceMediator.setMediatorList(mediators);
    }
    return sequenceMediator;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as SequenceMediator)).setKey(key);
    }
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as SequenceMediator)).setName(name);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as SequenceMediator)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as SequenceMediator)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return SequenceMediatorFactory.SEQUENCE;

  }
}
