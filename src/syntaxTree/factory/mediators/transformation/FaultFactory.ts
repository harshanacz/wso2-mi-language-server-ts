// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/FaultFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { FaultVersion } from "../../../pojo/mediator/transformation/fault/FaultVersion.js";
import { Makefault } from "../../../pojo/mediator/transformation/fault/Makefault.js";
import { MakefaultCode } from "../../../pojo/mediator/transformation/fault/MakefaultCode.js";
import { MakefaultDetail } from "../../../pojo/mediator/transformation/fault/MakefaultDetail.js";
import { MakefaultReason } from "../../../pojo/mediator/transformation/fault/MakefaultReason.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class FaultFactory extends AbstractMediatorFactory {
  static readonly FAULT: string = "makefault";

  createSpecificMediator(element: DOMElement): Mediator {
    let makefault = new Makefault();
    makefault.elementNode(element);
    this.populateAttributes(makefault, element);
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.CODE)) {
                let code = this.createMakefaultCode(child);
                makefault.setCode(code);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.REASON)) {
                let reason = this.createMakefaultReason(child);
                makefault.setReason(reason);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ROLE)) {

                let role = new STNode();
                role.elementNode((child as DOMElement));
                makefault.setRole(role);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.NODE)) {

                let node = new STNode();
                node.elementNode((child as DOMElement));
                makefault.setNode(node);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.DETAIL)) {
                let detail = new MakefaultDetail();
                detail.elementNode((child as DOMElement));
                let expression = child.getAttribute(Constant.EXPRESSION);
                if (expression != null && !isEmpty(expression)) {
                    detail.setExpression(expression);
                }
                makefault.setDetail(detail);
            }
        }
    }
    return makefault;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Makefault)).setDescription(description);
    }
    let version = element.getAttribute(Constant.VERSION);
    let faultVersion = getEnumFromValue(version, FaultVersion);
    if (faultVersion != null) {
        ((node as Makefault)).setVersion(faultVersion);
    }
    let response = element.getAttribute(Constant.RESPONSE);
    if (response != null) {
        ((node as Makefault)).setResponse(parseBoolean(response));
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Makefault)).setTraceFilter(traceFilter);
    }

  }

  createMakefaultCode(element: DOMNode): MakefaultCode {
    let code = new MakefaultCode();
    code.elementNode((element as DOMElement));
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        code.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        code.setExpression(expression);
    }
    return code;

  }

  createMakefaultReason(element: DOMNode): MakefaultReason {
    let reason = new MakefaultReason();
    reason.elementNode((element as DOMElement));
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        reason.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        reason.setExpression(expression);
    }
    return reason;

  }

  getTagName(): string {
    return FaultFactory.FAULT;

  }
}
