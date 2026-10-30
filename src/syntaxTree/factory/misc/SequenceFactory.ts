// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/misc/SequenceFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractFactory } from "../AbstractFactory.js";
import { DOMElement } from "../../dom/dom.js";
import { STNode } from "../../stNode.js";
import { Sequence } from "../../pojo/misc/common/Sequence.js";
import { SyntaxTreeUtils } from "../../utils/SyntaxTreeUtils.js";

export class SequenceFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let sequence = new Sequence();
    sequence.elementNode(element);
    let children = element.getChildren();
    let mediators = SyntaxTreeUtils.createMediators(children);
    ((sequence as Sequence)).setMediatorList(mediators);
    return sequence;

  }

  populateAttributes(node: STNode, element: DOMElement): void {

  }
}
