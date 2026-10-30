// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/PublishEventFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Attribute } from "../../../pojo/mediator/other/Attribute.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { PublishEvent } from "../../../pojo/mediator/other/publishEvent/PublishEvent.js";
import { PublishEventAttributes } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributes.js";
import { PublishEventAttributesArbitrary } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributesArbitrary.js";
import { PublishEventAttributesArbitraryAttribute } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributesArbitraryAttribute.js";
import { PublishEventAttributesCorrelation } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributesCorrelation.js";
import { PublishEventAttributesMeta } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributesMeta.js";
import { PublishEventAttributesPayload } from "../../../pojo/mediator/other/publishEvent/PublishEventAttributesPayload.js";
import { STNode } from "../../../stNode.js";
import { Utils } from "../../../utils.js";

export class PublishEventFactory extends AbstractMediatorFactory {
  static readonly PUBLISH_EVENT: string = "publishEvent";

  createSpecificMediator(element: DOMElement): Mediator {
    let publishEvent = new PublishEvent();
    publishEvent.elementNode(element);
    this.populateAttributes(publishEvent, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.EVENT_SINK)) {
                let eventSink = Utils.getInlineString(child.getFirstChild());
                publishEvent.setEventSink(eventSink);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.STREAM_NAME)) {
                let streamName = Utils.getInlineString(child.getFirstChild());
                publishEvent.setStreamName(streamName);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.STREAM_VERSION)) {
                let streamVersion = Utils.getInlineString(child.getFirstChild());
                publishEvent.setStreamVersion(streamVersion);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ATTRIBUTES)) {
                let attributes = this.createPublishEventAttributes(child);
                publishEvent.setAttributes(attributes);
            }
        }
    }

    return publishEvent;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let async = element.getAttribute(Constant.ASYNC);
    if (async != null) {
        ((node as PublishEvent)).setAsync(parseBoolean(async));
    }
    let timeout = element.getAttribute(Constant.TIMEOUT);
    if (timeout != null) {
        ((node as PublishEvent)).setTimeout(timeout);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as PublishEvent)).setDescription(description);
    }

  }

  createPublishEventAttributes(node: DOMNode): PublishEventAttributes {
    let publishEventAttributes = new PublishEventAttributes();
    publishEventAttributes.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.META)) {
                let publishEventAttributesMeta = this.createPublishEventAttributesMeta(child);
                publishEventAttributes.setMeta(publishEventAttributesMeta);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.CORRELATION)) {
                let publishEventAttributesCorrelation =
                        this.createPublishEventAttributesCorrelation(child);
                publishEventAttributes.setCorrelation(publishEventAttributesCorrelation);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.PAYLOAD)) {
                let publishEventAttributesPayload =
                        this.createPublishEventAttributesPayload(child);
                publishEventAttributes.setPayload(publishEventAttributesPayload);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ARBITRARY)) {
                let publishEventAttributesArbitrary =
                        this.createPublishEventAttributesArbitrary(child);
                publishEventAttributes.setArbitrary(publishEventAttributesArbitrary);
            }
        }
    }
    return publishEventAttributes;

  }

  createAttribute(childNode: DOMNode): Attribute {
    let attribute = new Attribute();
    attribute.elementNode((childNode as DOMElement));
    let name = childNode.getAttribute(Constant.NAME);
    if (name != null) {
        attribute.setName(name);
    }
    let dataType = childNode.getAttribute(Constant.TYPE);
    if (dataType != null) {
        attribute.setDataType(dataType);
    }
    let _default = childNode.getAttribute(Constant.DEFAULT_VALUE);
    if (_default != null) {
        attribute.set_default(_default);
    }
    let value = childNode.getAttribute(Constant.VALUE);
    if (value != null) {
        attribute.setValue(value);
    }
    let expression = childNode.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        attribute.setExpression(expression);
    }
    return attribute;

  }

  createPublishEventAttributesMeta(child: DOMNode): PublishEventAttributesMeta {
    let publishEventAttributesMeta = new PublishEventAttributesMeta();
    publishEventAttributesMeta.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let attributes = [];
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.ATTRIBUTE)) {
                let attribute = this.createAttribute(childNode);
                attributes.push(attribute);
            }
        }
        publishEventAttributesMeta.setAttributes(attributes.slice());
    }
    return publishEventAttributesMeta;

  }

  createPublishEventAttributesCorrelation(child: DOMNode): PublishEventAttributesCorrelation {
    let publishEventAttributesCorrelation = new PublishEventAttributesCorrelation();
    publishEventAttributesCorrelation.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let attributes = [];
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.ATTRIBUTE)) {
                let attribute = this.createAttribute(childNode);
                attributes.push(attribute);
            }
        }
        publishEventAttributesCorrelation.setAttributes(attributes.slice());
    }
    return publishEventAttributesCorrelation;

  }

  createPublishEventAttributesPayload(child: DOMNode): PublishEventAttributesPayload {
    let publishEventAttributesPayload = new PublishEventAttributesPayload();
    publishEventAttributesPayload.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let attributes = [];
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.ATTRIBUTE)) {
                let attribute = this.createAttribute(childNode);
                attributes.push(attribute);
            }
        }
        publishEventAttributesPayload.setAttributes(attributes.slice());
    }
    return publishEventAttributesPayload;

  }

  createPublishEventAttributesArbitrary(child: DOMNode): PublishEventAttributesArbitrary {
    let publishEventAttributesArbitrary = new PublishEventAttributesArbitrary();
    publishEventAttributesArbitrary.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let attributes = [];
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.ATTRIBUTE)) {
                let attribute = this.createArbitaryAttribute(childNode);
                attributes.push(attribute);
            }
        }
        publishEventAttributesArbitrary.setAttributes(attributes.slice());
    }
    return publishEventAttributesArbitrary;

  }

  createArbitaryAttribute(childNode: DOMNode): PublishEventAttributesArbitraryAttribute {
    let attribute = new PublishEventAttributesArbitraryAttribute();
    attribute.elementNode((childNode as DOMElement));
    let name = childNode.getAttribute(Constant.NAME);
    if (name != null) {
        attribute.setName(name);
    }
    let dataType = childNode.getAttribute(Constant.DATA_TYPE);
    if (dataType != null) {
        attribute.setDataType(dataType);
    }
    let _default = childNode.getAttribute(Constant.DEFAULT);
    if (_default != null) {
        attribute.set_default(_default);
    }
    let value = childNode.getAttribute(Constant.VALUE);
    if (value != null) {
        attribute.setValue(value);
    }
    return attribute;

  }

  getTagName(): string {
    return PublishEventFactory.PUBLISH_EVENT;

  }
}
