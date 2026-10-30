// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/AbstractMediatorFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractFactory } from "../AbstractFactory.js";
import { DOMElement } from "../../dom/dom.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { STNode } from "../../stNode.js";

export abstract class AbstractMediatorFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let mediator = (this.createSpecificMediator(element) as STNode);
    return mediator;

  }

  abstract createSpecificMediator(element: DOMElement): Mediator;

  abstract getTagName(): string;
}
