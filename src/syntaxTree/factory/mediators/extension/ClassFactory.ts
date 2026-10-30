// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/ClassFactory.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Class } from "../../../pojo/mediator/extension/Class.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class ClassFactory extends AbstractMediatorFactory {
  static readonly CLASS: string = "class";

  createSpecificMediator(element: DOMElement): Mediator {
    let clazz: any = new Class();
    clazz.elementNode(element);
    this.populateAttributes(clazz, element);
    let children = element.getChildren();
    let properties = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equals(name, Constant.PROPERTY)) {
                let property = SyntaxTreeUtils.createMediatorProperty(node);
                properties.push(property);
            }
        }
    }
    clazz.setProperty(properties.slice());
    return clazz;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as any)).setName(name);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as any)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as any)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return ClassFactory.CLASS;

  }
}
