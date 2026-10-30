// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/XsltFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Xslt } from "../../../pojo/mediator/transformation/xslt/Xslt.js";
import { XsltFeature } from "../../../pojo/mediator/transformation/xslt/XsltFeature.js";
import { XsltResource } from "../../../pojo/mediator/transformation/xslt/XsltResource.js";

export class XsltFactory extends AbstractMediatorFactory {
  static readonly XSLT: string = "xslt";

  createSpecificMediator(element: DOMElement): Mediator {
    let xslt = new Xslt();
    xslt.elementNode(element);
    this.populateAttributes(xslt, element);
    let childNodes = element.getChildren();
    let mediatorProperties = [];
    let xsltFeatures = [];
    let xsltResources = [];
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let childNode of childNodes) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.PROPERTY)) {
                let mediatorProperty = SyntaxTreeUtils.createMediatorProperty(childNode);
                mediatorProperties.push(mediatorProperty);
            } else if (equalsIgnoreCase(childNode.getNodeName(), Constant.FEATURE)) {
                let xsltFeature = this.createXsltFeature(childNode);
                xsltFeatures.push(xsltFeature);
            } else if (equalsIgnoreCase(childNode.getNodeName(), Constant.RESOURCE)) {
                let xsltResource = this.createXsltResource(childNode);
                xsltResources.push(xsltResource);
            }
        }
        xslt.setProperty(mediatorProperties.slice());
        xslt.setFeature(xsltFeatures.slice());
        xslt.setResource(xsltResources.slice());
    }
    return xslt;

  }

  createXsltFeature(childNode: DOMNode): XsltFeature {
    let xsltFeature = new XsltFeature();
    xsltFeature.elementNode((childNode as DOMElement));
    let name = childNode.getAttribute(Constant.NAME);
    if (name != null) {
        xsltFeature.setName(name);
    }
    let value = childNode.getAttribute(Constant.VALUE);
    if (value != null) {
        xsltFeature.setValue(parseBoolean(value));
    }
    return xsltFeature;

  }

  createXsltResource(childNode: DOMNode): XsltResource {
    let xsltResource = new XsltResource();
    xsltResource.elementNode((childNode as DOMElement));
    let location = childNode.getAttribute(Constant.LOCATION);
    if (location != null) {
        xsltResource.setLocation(location);
    }
    let key = childNode.getAttribute(Constant.KEY);
    if (key != null) {
        xsltResource.setKey(key);
    }
    return xsltResource;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        ((node as Xslt)).setKey(key);
    }
    let source = element.getAttribute(Constant.SOURCE);
    if (source != null) {
        ((node as Xslt)).setSource(source);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Xslt)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Xslt)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return XsltFactory.XSLT;

  }
}
