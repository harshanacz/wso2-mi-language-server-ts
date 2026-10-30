// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/LocalEntryFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { LocalEntry } from "../pojo/LocalEntry.js";
import { STNode } from "../stNode.js";
import { Utils } from "../utils.js";

export class LocalEntryFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let localEntry = new LocalEntry();
    localEntry.elementNode(element);
    this.populateAttributes(localEntry, element);
    let inline = element.getFirstChild();
    if (inline != null) {
        let inlineString = Utils.getInlineString(inline, false);
        localEntry.setContent(inlineString);
        let subType = this.getSubType(inline);
        localEntry.setSubType(subType);
    }
    return localEntry;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let localEntry = (node as LocalEntry);
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        localEntry.setKey(key);
    }
    let src = element.getAttribute(Constant.SRC);
    if (src != null) {
        localEntry.setSrc(src);
    }

  }

  getSubType(inline: DOMNode): string {
    let nodeName = inline.getNodeName();
    if (nodeName != null) {
        return nodeName.toUpperCase();
    }
    return null;

  }
}
