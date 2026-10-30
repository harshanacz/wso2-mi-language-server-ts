// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/DefaultEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, format, getEnumFromValue } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DefaultEndpoint } from "../../pojo/endpoint/DefaultEndpoint.js";
import { EndpointUtils } from "./EndpointUtils.js";
import { Format } from "../../pojo/endpoint/Format.js";
import { Optimize } from "../../pojo/endpoint/Optimize.js";
import { STNode } from "../../stNode.js";

export class DefaultEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let defaultEndpoint = new DefaultEndpoint();
    defaultEndpoint.elementNode(element);
    this.populateAttributes(defaultEndpoint, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.ENABLE_SEC)) {
                let enableSec = EndpointUtils.createEnableSec(node);
                defaultEndpoint.setEnableSec(enableSec);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_RM)) {
                let enableRM = EndpointUtils.createEnableRM(node);
                defaultEndpoint.setEnableRM(enableRM);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_ADDRESSING)) {
                let enableAddressing = EndpointUtils.createEnableAddressing(node);
                defaultEndpoint.setEnableAddressing(enableAddressing);
            } else if (equalsIgnoreCase(name, Constant.TIMEOUT)) {
                let timeout = EndpointUtils.createTimeout(node);
                defaultEndpoint.setTimeout(timeout);
            } else if (equalsIgnoreCase(name, Constant.SUSPEND_ON_FAILURE)) {
                let suspendOnFailure = EndpointUtils.createSuspendOnFailure(node);
                defaultEndpoint.setSuspendOnFailure(suspendOnFailure);
            } else if (equalsIgnoreCase(name, Constant.MARK_FOR_SUSPENSION)) {
                let markForSuspension = EndpointUtils.createMarkForSuspension(node);
                defaultEndpoint.setMarkForSuspension(markForSuspension);
            }
        }
    }
    return defaultEndpoint;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let format = element.getAttribute(Constant.FORMAT);
    let formatEnum = getEnumFromValue(format, Format);
    if (formatEnum != null) {
        ((node as DefaultEndpoint)).setFormat(formatEnum);
    }
    let optimize = element.getAttribute(Constant.OPTIMIZE);
    let optimizeEnum = getEnumFromValue(optimize, Optimize);
    if (optimizeEnum != null) {
        ((node as DefaultEndpoint)).setOptimize(optimizeEnum);
    }
    let encoding = element.getAttribute(Constant.ENCODING);
    if (encoding != null && !isEmpty(encoding)) {
        ((node as DefaultEndpoint)).setEncoding(encoding);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    if (statistics != null && !isEmpty(statistics)) {
        ((node as DefaultEndpoint)).setStatistics(statistics);
    }
    let trace = element.getAttribute(Constant.TRACE);
    if (trace != null && !isEmpty(trace)) {
        ((node as DefaultEndpoint)).setTrace(trace);
    }

  }
}
