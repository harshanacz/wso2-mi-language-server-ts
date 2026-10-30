// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/FailoverEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { AddressEndpointFactory } from "./AddressEndpointFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { DefaultEndpoint } from "../../pojo/endpoint/DefaultEndpoint.js";
import { DefaultEndpointFactory } from "./DefaultEndpointFactory.js";
import { EndpointAddress } from "../../pojo/endpoint/EndpointAddress.js";
import { EndpointFailover } from "../../pojo/endpoint/failover/EndpointFailover.js";
import { EndpointFailoverEndpoint } from "../../pojo/endpoint/failover/EndpointFailoverEndpoint.js";
import { EndpointHttp } from "../../pojo/endpoint/http/EndpointHttp.js";
import { EndpointLoadbalance } from "../../pojo/endpoint/loadbalance/EndpointLoadbalance.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { HttpEndpointFactory } from "./HttpEndpointFactory.js";
import { LoadbalanceEndpointFactory } from "./LoadbalanceEndpointFactory.js";
import { STNode } from "../../stNode.js";
import { SessionFactory } from "./SessionFactory.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";
import { WSDLEndpointFactory } from "./WSDLEndpointFactory.js";

export class FailoverEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let failoverEndpoint = new EndpointFailover();
    failoverEndpoint.elementNode(element);
    this.populateAttributes(failoverEndpoint, element);
    let children = element.getChildren();
    let endpoints = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.ENDPOINT)) {
                let endpoint = this.createEndpoint(node);
                endpoints.push(endpoint);
            }
        }
        failoverEndpoint.setEndpoint(endpoints.slice());
    }
    return failoverEndpoint;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let dynamic = element.getAttribute(Constant.DYNAMIC);
    if (dynamic != null && !isEmpty(dynamic)) {
        ((node as EndpointFailover)).setDynamic(parseBoolean(dynamic));
    }
    let buildMessage = element.getAttribute(Constant.BUILD_MESSAGE);
    if (buildMessage != null && !isEmpty(buildMessage)) {
        ((node as EndpointFailover)).setBuildMessage(parseBoolean(buildMessage));
    }

  }

  createEndpoint(node: DOMNode): EndpointFailoverEndpoint {
    let endpoint = new EndpointFailoverEndpoint();
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

  populateEndpointAttributes(endpoint: EndpointFailoverEndpoint, node: DOMElement): void {
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
