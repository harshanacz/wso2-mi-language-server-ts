// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/InvalidMediatorFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "./AbstractMediatorFactory.js";
import { DOMElement } from "../../dom/dom.js";
import { InvalidMediator } from "../../pojo/mediator/InvalidMediator.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { STNode } from "../../stNode.js";

export class InvalidMediatorFactory extends AbstractMediatorFactory {
  static readonly INVALID: string = "invalid";

  populateAttributes(node: STNode, element: DOMElement): void {

  }

  createSpecificMediator(element: DOMElement): Mediator {
    let invalidMediator = new InvalidMediator();
    invalidMediator.elementNode(element);
    invalidMediator.setTag(InvalidMediatorFactory.INVALID);
    return invalidMediator;

  }

  getTagName(): string {
    return InvalidMediatorFactory.INVALID;

  }
}
