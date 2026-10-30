// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/WSDLEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, format, getEnumFromValue } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DescriptionType } from "../../pojo/misc/wsdl20/DescriptionType.js";
import { EnableDisable } from "../../pojo/api/EnableDisable.js";
import { EndpointUtils } from "./EndpointUtils.js";
import { Format } from "../../pojo/endpoint/Format.js";
import { Optimize } from "../../pojo/endpoint/Optimize.js";
import { STNode } from "../../stNode.js";
import { TDefinitions } from "../../pojo/misc/wsdl11/TDefinitions.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";
import { Wsdl11Factory } from "../misc/Wsdl11Factory.js";
import { Wsdl20Factory } from "../misc/Wsdl20Factory.js";

export class WSDLEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let wsdlEndpoint = new WSDLEndpoint();
    wsdlEndpoint.elementNode(element);
    this.populateAttributes(wsdlEndpoint, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.WSDL_DEFINITIONS)) {
                let factory = new Wsdl11Factory();
                let definitions = (factory.create((child as DOMElement)) as TDefinitions);
                wsdlEndpoint.setDefinitions(definitions);
            } else if (equalsIgnoreCase(name, Constant.WSDL_DESCRIPTION)) {
                let factory = new Wsdl20Factory();
                let description = (factory.create((child as DOMElement)) as DescriptionType);
                wsdlEndpoint.setDescription(description);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_SEC)) {
                let enableSec = EndpointUtils.createEnableSec(child);
                wsdlEndpoint.setEnableSec(enableSec);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_RM)) {
                let enableRM = EndpointUtils.createEnableRM(child);
                wsdlEndpoint.setEnableRM(enableRM);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_ADDRESSING)) {
                let enableAddressing = EndpointUtils.createEnableAddressing(child);
                wsdlEndpoint.setEnableAddressing(enableAddressing);
            } else if (equalsIgnoreCase(name, Constant.TIMEOUT)) {
                let timeout = EndpointUtils.createTimeout(child);
                wsdlEndpoint.setTimeout(timeout);
            } else if (equalsIgnoreCase(name, Constant.SUSPEND_ON_FAILURE)) {
                let suspendOnFailure = EndpointUtils.createSuspendOnFailure(child);
                wsdlEndpoint.setSuspendOnFailure(suspendOnFailure);
            } else if (equalsIgnoreCase(name, Constant.MARK_FOR_SUSPENSION)) {
                let markForSuspension = EndpointUtils.createMarkForSuspension(child);
                wsdlEndpoint.setMarkForSuspension(markForSuspension);
            }
        }
    }
    return wsdlEndpoint;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let format = element.getAttribute(Constant.FORMAT);
    let formatEnum = getEnumFromValue(format, Format);
    ((node as WSDLEndpoint)).setFormat(formatEnum);
    if (formatEnum != null) {
        ((node as WSDLEndpoint)).setFormat(formatEnum);
    }
    let optimize = element.getAttribute(Constant.OPTIMIZE);
    let optimizeEnum = getEnumFromValue(optimize, Optimize);
    if (optimizeEnum != null) {
        ((node as WSDLEndpoint)).setOptimize(optimizeEnum);
    }
    let encoding = element.getAttribute(Constant.ENCODING);
    if (encoding != null && !isEmpty(encoding)) {
        ((node as WSDLEndpoint)).setEncoding(encoding);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    let statisticsEnum = getEnumFromValue(statistics, EnableDisable);
    if (statisticsEnum != null) {
        ((node as WSDLEndpoint)).setStatistics(statisticsEnum);
    }
    let trace = element.getAttribute(Constant.TRACE);
    let traceEnum = getEnumFromValue(trace, EnableDisable);
    if (traceEnum != null) {
        ((node as WSDLEndpoint)).setTrace(traceEnum);
    }
    let uri = element.getAttribute(Constant.URI);
    if (uri != null && !isEmpty(uri)) {
        ((node as WSDLEndpoint)).setUri(uri);
    }
    let service = element.getAttribute(Constant.SERVICE);
    if (service != null && !isEmpty(service)) {
        ((node as WSDLEndpoint)).setService(service);
    }
    let port = element.getAttribute(Constant.PORT);
    if (port != null && !isEmpty(port)) {
        ((node as WSDLEndpoint)).setPort(port);
    }

  }
}
