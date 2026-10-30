// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/CloneFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Clone } from "../../../pojo/mediator/advanced/Clone/Clone.js";
import { CloneTarget } from "../../../pojo/mediator/advanced/Clone/CloneTarget.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Endpoint } from "../../../pojo/endpoint/Endpoint.js";
import { EndpointFactory } from "../../endpoint/EndpointFactory.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { NamedEndpoint } from "../../../pojo/endpoint/NamedEndpoint.js";
import { STNode } from "../../../stNode.js";
import { Sequence } from "../../../pojo/misc/common/Sequence.js";
import { SequenceFactory } from "../../misc/SequenceFactory.js";

export class CloneFactory extends AbstractMediatorFactory {
  static readonly CLONE_MEDIATOR: string = "clone";

  createSpecificMediator(element: DOMElement): Mediator {
    let clone = new Clone();
    this.populateAttributes(clone, element);
    let children = element.getChildren();
    let cloneTargetList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.TARGET)) {
            let cloneTarget = this.createCloneTarget((node as DOMElement));
            cloneTargetList.push(cloneTarget);
        } else {

        }

    }
    clone.setTarget(cloneTargetList.slice());
    return clone;

  }

  getTagName(): string {
    return CloneFactory.CLONE_MEDIATOR;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let clone = (node as Clone);
    let sequential = element.getAttribute(Constant.SEQUENTIAL);
    if (sequential != null) {
        clone.setSequential(parseBoolean(sequential));
    }
    let continueParent = element.getAttribute(Constant.CONTINUE_PARENT);
    if (continueParent != null) {
        clone.setContinueParent(parseBoolean(continueParent));
    }
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        clone.setId(id);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        clone.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        clone.setTraceFilter(traceFilter);
    }

  }

  createCloneTarget(element: DOMElement): CloneTarget {
    let cloneTarget = new CloneTarget();
    cloneTarget.elementNode(element);
    this.populateCloneTargetAttributes(cloneTarget, element);
    let children = element.getChildren();
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.SEQUENCE)) {
            let sequenceFactory = new SequenceFactory();
            let sequence = (sequenceFactory.create((node as DOMElement)) as Sequence);
            cloneTarget.setSequence(sequence);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.ENDPOINT)) {
            let endpointFactory = new EndpointFactory();
            let endpoint = (endpointFactory.create((node as DOMElement)) as Endpoint);
            cloneTarget.setEndpoint((endpoint as NamedEndpoint));
        }
    }
    return cloneTarget;

  }

  populateCloneTargetAttributes(cloneTarget: CloneTarget, element: DOMElement): void {
    let to = element.getAttribute(Constant.TO);
    if (to != null) {
        cloneTarget.setTo(to);
    }
    let soapAction = element.getAttribute(Constant.SOAP_ACTION);
    if (soapAction != null) {
        cloneTarget.setSoapAction(soapAction);
    }
    let sequenceAttribute = element.getAttribute(Constant.SEQUENCE);
    if (sequenceAttribute != null) {
        cloneTarget.setSequenceAttribute(sequenceAttribute);
    }
    let endpointAttribute = element.getAttribute(Constant.ENDPOINT);
    if (endpointAttribute != null) {
        cloneTarget.setEndpointAttribute(endpointAttribute);
    }

  }
}
