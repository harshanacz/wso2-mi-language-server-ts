// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/ScriptFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Script } from "../../../pojo/mediator/extension/Script.js";
import { ScriptLanguage } from "../../../pojo/mediator/extension/ScriptLanguage.js";
import { Utils } from "../../../utils.js";

export class ScriptFactory extends AbstractMediatorFactory {
  static readonly SCRIPT: string = "script";

  createSpecificMediator(element: DOMElement): Mediator {
    let script = new Script();
    script.elementNode(element);
    this.populateAttributes(script, element);

    let children = element.getChildren();
    let elements = [];
    let scriptKeys = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            if (equalsIgnoreCase(Constant.INCLUDE, node.getNodeName())) {
                let keyValue = node.getAttribute("key");
                scriptKeys.push(keyValue);
            } else {
                let xml = Utils.getInlineString(node);
                elements.push(xml);
            }
        }
        script.setContent(elements.slice());
        script.setInclude(scriptKeys.slice());
    }
    return script;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let language = element.getAttribute(Constant.LANGUAGE);
    let languageEnum = getEnumFromValue(language, ScriptLanguage);
    if (languageEnum != null) {
        ((node as Script)).setLanguage(languageEnum);
    }
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as Script)).setKey(key);
    }
    let function_ = element.getAttribute(Constant.FUNCTION);
    if (function_ != null) {
        ((node as Script)).setFunction(function_);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Script)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Script)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return ScriptFactory.SCRIPT;

  }
}
