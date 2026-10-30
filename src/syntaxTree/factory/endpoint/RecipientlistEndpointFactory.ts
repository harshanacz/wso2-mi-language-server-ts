// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/RecipientlistEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { AddressEndpointFactory } from "./AddressEndpointFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { DefaultEndpoint } from "../../pojo/endpoint/DefaultEndpoint.js";
import { DefaultEndpointFactory } from "./DefaultEndpointFactory.js";
import { EndpointAddress } from "../../pojo/endpoint/EndpointAddress.js";
import { EndpointHttp } from "../../pojo/endpoint/http/EndpointHttp.js";
import { EndpointLoadbalance } from "../../pojo/endpoint/loadbalance/EndpointLoadbalance.js";
import { EndpointRecipientlist } from "../../pojo/endpoint/recipientList/EndpointRecipientlist.js";
import { EndpointRecipientlistEndpoint } from "../../pojo/endpoint/recipientList/EndpointRecipientlistEndpoint.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { HttpEndpointFactory } from "./HttpEndpointFactory.js";
import { LoadbalanceEndpointFactory } from "./LoadbalanceEndpointFactory.js";
import { STNode } from "../../stNode.js";
import { SessionFactory } from "./SessionFactory.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";
import { WSDLEndpointFactory } from "./WSDLEndpointFactory.js";

export class RecipientlistEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let recipientlistEndpoint = new EndpointRecipientlist();
    recipientlistEndpoint.elementNode(element);
    this.populateAttributes(recipientlistEndpoint, element);
    let children = element.getChildren();
    let endpoints = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.ENDPOINT)) {
                let endpoint = this.createEndpoint(child);
                endpoints.push(endpoint);
            }
        }
        recipientlistEndpoint.setEndpoint(endpoints.slice());
    }
    return recipientlistEndpoint;

  }

  populateAttributes(node: STNode, element: DOMElement): void {

  }

  createEndpoint(node: DOMNode): EndpointRecipientlistEndpoint {
    let endpoint = new EndpointRecipientlistEndpoint();
    endpoint.elementNode((node as DOMElement));
    this.populateEndpointAttributes(endpoint, (node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.ADDRESS)) {
                let factory = new AddressEndpointFactory();
                let address = (factory.create((child as DOMElement)) as EndpointAddress);
                endpoint.setAddress(address);
            } else if (equalsIgnoreCase(name, Constant.DEFAULT)) {
                let factory = new DefaultEndpointFactory();
                let defaultEndpoint = (factory.create((child as DOMElement)) as DefaultEndpoint);
                endpoint.set_default(defaultEndpoint);
            } else if (equalsIgnoreCase(name, Constant.HTTP)) {
                let factory = new HttpEndpointFactory();
                let http = (factory.create((child as DOMElement)) as EndpointHttp);
                endpoint.setHttp(http);
            } else if (equalsIgnoreCase(name, Constant.LOADBALANCE)) {
                let factory = new LoadbalanceEndpointFactory();
                let loadbalance = (factory.create((child as DOMElement)) as EndpointLoadbalance);
                endpoint.setLoadbalance(loadbalance);
            } else if (equalsIgnoreCase(name, Constant.WSDL)) {
                let factory = new WSDLEndpointFactory();
                let wsdl = (factory.create((child as DOMElement)) as WSDLEndpoint);
                endpoint.setWsdl(wsdl);
            } else if (equalsIgnoreCase(name, Constant.SESSION)) {
                let factory = new SessionFactory();
                let session = (factory.create((child as DOMElement)) as EndpointSession);
                endpoint.setSession(session);
            }
        }
    }
    return endpoint;

  }

  populateEndpointAttributes(endpoint: EndpointRecipientlistEndpoint, node: DOMElement): void {
    let key = node.getAttribute(Constant.KEY);
    if (key != null && !isEmpty(key)) {
        endpoint.setKey(key);
    }
    let name = node.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        endpoint.setName(name);
    }

  }
}
