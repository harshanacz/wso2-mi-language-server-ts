// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/InboundEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { EnableDisable } from "../pojo/api/EnableDisable.js";
import { InboundEndpoint } from "../pojo/inbound/InboundEndpoint.js";
import { InboundEndpointParameters } from "../pojo/inbound/InboundEndpointParameters.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";

export class InboundEndpointFactory extends AbstractFactory {
  CUSTOM: string = "CUSTOM";

  create(element: DOMElement): STNode {
    let inboundEndpoint = new InboundEndpoint();
    inboundEndpoint.elementNode(element);
    this.populateAttributes(inboundEndpoint, element);
    let id = this.getID(element);
    this.setSubType(inboundEndpoint, id);
    let children = element.getChildren();
    let parameters = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            if (equalsIgnoreCase(node.getNodeName(), Constant.PARAMETERS)) {
                let parameter = this.createParameters(node);
                parameters.push(parameter);
            }
        }
        inboundEndpoint.setParameters(parameters.slice());
    }
    return inboundEndpoint;

  }

  getID(element: DOMElement): string {
    if (element.hasAttribute(Constant.CLASS)) {
        return element.getAttribute(Constant.CLASS);
    }
    return element.getAttribute(Constant.PROTOCOL);

  }

  setSubType(inboundEndpoint: InboundEndpoint, id: string): void {
    if (id != null) {
        inboundEndpoint.setType(id.toUpperCase());
    } else {
        inboundEndpoint.setType(this.CUSTOM);
    }

  }

  createParameters(node: DOMNode): InboundEndpointParameters {
    let parameters = new InboundEndpointParameters();
    parameters.elementNode((node as DOMElement));
    let children = node.getChildren();
    let parameterList = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.PARAMETER)) {
                let parameter = SyntaxTreeUtils.createParameter(child);
                parameterList.push(parameter);
            }
        }
        parameters.setParameter(parameterList.slice());
    }
    return parameters;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as InboundEndpoint)).setName(name);
    }
    let protocol = element.getAttribute(Constant.PROTOCOL);
    if (protocol != null) {
        ((node as InboundEndpoint)).setProtocol(protocol);
    }
    let onError = element.getAttribute(Constant.ON_ERROR);
    if (onError != null) {
        ((node as InboundEndpoint)).setOnError(onError);
    }
    let suspend = element.getAttribute(Constant.SUSPEND);
    if (suspend != null) {
        ((node as InboundEndpoint)).setSuspend(parseBoolean(suspend));
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as InboundEndpoint)).setClazz(clazz);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    let statisticsEnum = getEnumFromValue(statistics, EnableDisable);
    if (statisticsEnum != null) {
        ((node as InboundEndpoint)).setStatistics(statisticsEnum);
    }
    let trace = element.getAttribute(Constant.TRACE);
    let traceEnum = getEnumFromValue(trace, EnableDisable);
    if (traceEnum != null) {
        ((node as InboundEndpoint)).setTrace(traceEnum);
    }
    let sequence = element.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        ((node as InboundEndpoint)).setSequence(sequence);
    }

  }
}
