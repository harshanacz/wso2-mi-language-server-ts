// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/SmooksFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Smooks } from "../../../pojo/mediator/transformation/smooks/Smooks.js";
import { SmooksInput } from "../../../pojo/mediator/transformation/smooks/SmooksInput.js";
import { SmooksInputType } from "../../../pojo/mediator/transformation/smooks/SmooksInputType.js";
import { SmooksOutput } from "../../../pojo/mediator/transformation/smooks/SmooksOutput.js";
import { SmooksOutputType } from "../../../pojo/mediator/transformation/smooks/SmooksOutputType.js";

export class SmooksFactory extends AbstractMediatorFactory {
  static readonly SMOOKS: string = "smooks";

  createSpecificMediator(element: DOMElement): Mediator {
    let smooks = new Smooks();
    smooks.elementNode(element);
    this.populateAttributes(smooks, element);
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let childNode of childNodes) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.INPUT)) {
                let smooksInput = this.createSmooksInput(childNode);
                smooks.setInput(smooksInput);
            } else if (equalsIgnoreCase(childNode.getNodeName(), Constant.OUTPUT)) {
                let smooksOutput = this.createSmooksOutput(childNode);
                smooks.setOutput(smooksOutput);
            }
        }
    }
    return smooks;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let configKey = element.getAttribute(Constant.CONFIG_HYPHEN_KEY);
    if (configKey != null) {
        ((node as Smooks)).setConfigKey(configKey);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Smooks)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Smooks)).setTraceFilter(traceFilter);
    }

  }

  createSmooksInput(childNode: DOMNode): SmooksInput {
    let smooksInput = new SmooksInput();
    smooksInput.elementNode((childNode as DOMElement));
    let type = childNode.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, SmooksInputType);
    if (typeEnum != null) {
        smooksInput.setType(typeEnum);
    }
    let expression = childNode.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        smooksInput.setExpression(expression);
    }
    return smooksInput;

  }

  createSmooksOutput(element: DOMNode): SmooksOutput {
    let smooksOutput = new SmooksOutput();
    smooksOutput.elementNode((element as DOMElement));
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, SmooksOutputType);
    if (typeEnum != null) {
        smooksOutput.setType(typeEnum);
    }
    let property = element.getAttribute(Constant.PROPERTY);
    if (property != null) {
        smooksOutput.setProperty(property);
    }
    let action = element.getAttribute(Constant.ACTION);
    if (action != null) {
        smooksOutput.setAction(action);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        smooksOutput.setExpression(expression);
    }
    return smooksOutput;

  }

  getTagName(): string {
    return SmooksFactory.SMOOKS;

  }
}
