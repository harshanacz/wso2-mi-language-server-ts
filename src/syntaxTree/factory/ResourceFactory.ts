// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/ResourceFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, jsplit } from "../javaCompat.js";
import { APIResource } from "../pojo/api/APIResource.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { STNode } from "../stNode.js";
import { Sequence } from "../pojo/misc/common/Sequence.js";
import { SequenceFactory } from "./misc/SequenceFactory.js";

export class ResourceFactory extends AbstractFactory {
  apiName?: string;

  constructor(apiName: string) {
    super();
    this.apiName = apiName;

  }

  create(element: DOMElement): STNode {
    let apiResource = new APIResource();
    apiResource.elementNode(element);
    apiResource.setApi(this.apiName);
    this.populateAttributes(apiResource, element);
    let children = element.getChildren();

    if ((children != null)) {
        for (let node of children) {
            if (!(node instanceof DOMElement)) {
                continue;
            }
            let sequence = this.createSequence(node);
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.IN_SEQUENCE)) {
                apiResource.setInSequence((sequence as Sequence));
            } else if (equalsIgnoreCase(name, Constant.OUT_SEQUENCE)) {
                apiResource.setOutSequence((sequence as Sequence));
            } else if (equalsIgnoreCase(name, Constant.FAULT_SEQUENCE)) {
                apiResource.setFaultSequence((sequence as Sequence));
            }
        }
    }
    return apiResource;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let apiResource = (node as APIResource);

    let urlMapping = element.getAttribute(Constant.URL_MAPPING);
    if ((urlMapping != null)) {
        apiResource.setUrlMapping(urlMapping);
    }
    let uriTemplate = element.getAttribute(Constant.URI_TEMPLATE);
    if ((uriTemplate != null)) {
        apiResource.setUriTemplate(uriTemplate);
    }
    let protocol = element.getAttribute(Constant.PROTOCOL);
    if ((protocol != null)) {
        apiResource.setProtocol(this.getProtocols(protocol));
    }
    let methods = element.getAttribute(Constant.METHODS);
    if ((methods != null)) {
        apiResource.setMethods(this.getMethods(methods));
    }
    let inSequence = element.getAttribute(Constant.IN_SEQUENCE);
    if ((inSequence != null)) {
        apiResource.setInSequenceAttribute(inSequence);
    }
    let outSequence = element.getAttribute(Constant.OUT_SEQUENCE);
    if ((outSequence != null)) {
        apiResource.setOutSequenceAttribute(outSequence);
    }
    let faultSequence = element.getAttribute(Constant.FAULT_SEQUENCE);
    if ((faultSequence != null)) {
        apiResource.setFaultSequenceAttribute(faultSequence);
    }

  }

  createSequence(node: DOMNode): STNode {
    let sequenceFactory = new SequenceFactory();
    let sequence = sequenceFactory.create((node as DOMElement));
    return sequence;

  }

  getProtocols(value: string): string[] {
    let protocols = jsplit(value, Constant.SPACE);
    return protocols;

  }

  getMethods(value: string): string[] {
    let methods = jsplit(value, Constant.SPACE);
    return methods;

  }
}
