// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/CallTemplateFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { CallTemplate } from "../../../pojo/mediator/core/CallTemplate.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { WithParam } from "../../../pojo/mediator/core/WithParam.js";

export class CallTemplateFactory extends AbstractMediatorFactory {
  static readonly CALL_TEMPLATE: string = "call-template";

  createSpecificMediator(element: DOMElement): Mediator {
    let callTemplate = new CallTemplate();
    callTemplate.elementNode(element);
    this.populateAttributes(callTemplate, element);
    let children = element.getChildren();
    let withParams = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            if (equalsIgnoreCase(node.getNodeName(), Constant.WITH_PARAM)) {
                let withParam = this.createWithParam(node);
                withParams.push(withParam);
            }
        }
    }
    callTemplate.setWithParam(withParams.slice());
    return callTemplate;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let target = element.getAttribute(Constant.TARGET);
    if (target != null) {
        ((node as CallTemplate)).setTarget(target);
    }
    let onError = element.getAttribute(Constant.ON_ERROR);
    if (onError != null) {
        ((node as CallTemplate)).setOnError(onError);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as CallTemplate)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as CallTemplate)).setTraceFilter(traceFilter);
    }

  }

  createWithParam(node: DOMNode): WithParam {
    let withParam = new WithParam();
    let element = (node as DOMElement);
    withParam.elementNode(element);
    this.populateWithParamAttributes(withParam, element);
    return withParam;

  }

  populateWithParamAttributes(withParam: WithParam, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        withParam.setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        withParam.setValue(value);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        withParam.setDescription(description);
    }

  }

  getTagName(): string {
    return CallTemplateFactory.CALL_TEMPLATE;

  }
}
