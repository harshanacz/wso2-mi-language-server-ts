// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/AddressEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DefaultEndpoint } from "../../pojo/endpoint/DefaultEndpoint.js";
import { DefaultEndpointFactory } from "./DefaultEndpointFactory.js";
import { EndpointAddress } from "../../pojo/endpoint/EndpointAddress.js";
import { STNode } from "../../stNode.js";

export class AddressEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let defaultEndpointFactory = new DefaultEndpointFactory();
    let defaultEndpoint = (defaultEndpointFactory.create(element) as DefaultEndpoint);
    let endpointAddress = new EndpointAddress(defaultEndpoint);
    this.populateAttributes(endpointAddress, element);
    return endpointAddress;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let uri = element.getAttribute(Constant.URI);
    if (uri != null && !isEmpty(uri)) {
        ((node as EndpointAddress)).setUri(uri);
    }

  }
}
