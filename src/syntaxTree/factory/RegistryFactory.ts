// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/RegistryFactory.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { Registry } from "../pojo/Registry.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";

export class RegistryFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let registry = new Registry();
    registry.elementNode(element);
    this.populateAttributes(registry, element);
    let children = element.getChildren();
    let parameterList = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equals(name, Constant.PARAMETER)) {
                let parameter = SyntaxTreeUtils.createParameter(node);
                parameterList.push(parameter);
            }
        }
        registry.setParameter(parameterList.slice());
    }
    return registry;


  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let provider = element.getAttribute(Constant.PROVIDER);
    if (provider != null && !isEmpty(provider)) {
        ((node as Registry)).setProvider(provider);
    }

  }
}
