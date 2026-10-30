// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/LoadbalanceEndpointFactory.java by the java2ts converter (see tools/java2ts).
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
import { EndpointHttp } from "../../pojo/endpoint/http/EndpointHttp.js";
import { EndpointLoadbalance } from "../../pojo/endpoint/loadbalance/EndpointLoadbalance.js";
import { EndpointLoadbalanceEndpoint } from "../../pojo/endpoint/loadbalance/EndpointLoadbalanceEndpoint.js";
import { EndpointLoadbalanceMember } from "../../pojo/endpoint/loadbalance/EndpointLoadbalanceMember.js";
import { EndpointOrMember } from "../../pojo/endpoint/loadbalance/EndpointOrMember.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { FailoverEndpointFactory } from "./FailoverEndpointFactory.js";
import { HttpEndpointFactory } from "./HttpEndpointFactory.js";
import { STNode } from "../../stNode.js";
import { SessionFactory } from "./SessionFactory.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";
import { WSDLEndpointFactory } from "./WSDLEndpointFactory.js";

export class LoadbalanceEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let loadbalanceEndpoint = new EndpointLoadbalance();
    loadbalanceEndpoint.elementNode(element);
    this.populateAttributes(loadbalanceEndpoint, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let endpointOrMembers = [];
        for (let child of children) {
            let name = child.getNodeName();
            let endpointOrMember = new EndpointOrMember();
            if (equalsIgnoreCase(name, Constant.ENDPOINT)) {
                let endpoint = this.createEndpoint(child);
                endpointOrMember.setEndpoint((endpoint));
                endpointOrMembers.push(endpointOrMember);
            } else if (equalsIgnoreCase(name, Constant.MEMBER)) {
                let member = this.createMember(child);
                endpointOrMember.setMember((member));
                endpointOrMembers.push(endpointOrMember);
            }
        }
        loadbalanceEndpoint.setEndpointOrMember(endpointOrMembers.slice());
    }
    return loadbalanceEndpoint;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let algorithm = element.getAttribute(Constant.ALGORITHM);
    if (algorithm != null && !isEmpty(algorithm)) {
        ((node as EndpointLoadbalance)).setAlgorithm(algorithm);
    }
    let failover = element.getAttribute(Constant.FAIL_OVER);
    if (failover != null && !isEmpty(failover)) {
        ((node as EndpointLoadbalance)).setFailover(parseBoolean(failover));
    }
    let policy = element.getAttribute(Constant.POLICY);
    if (policy != null && !isEmpty(policy)) {
        ((node as EndpointLoadbalance)).setPolicy(policy);
    }
    let buildMessage = element.getAttribute(Constant.BUILD_MESSAGE);
    if (buildMessage != null && !isEmpty(buildMessage)) {
        ((node as EndpointLoadbalance)).setBuildMessage(parseBoolean(buildMessage));
    }

  }

  createEndpoint(node: DOMNode): EndpointLoadbalanceEndpoint {
    let endpoint = new EndpointLoadbalanceEndpoint();
    endpoint.elementNode((node as DOMElement));
    this.populateEndpointAttributes(endpoint, node);
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
            } else if (equalsIgnoreCase(name, Constant.FAIL_OVER)) {
                let factory = new FailoverEndpointFactory();
                let failover = (factory.create((child as DOMElement)) as EndpointFailover);
                endpoint.setFailover(failover);
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

  populateEndpointAttributes(endpoint: EndpointLoadbalanceEndpoint, node: DOMNode): void {
    let name = node.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        endpoint.setName(name);
    }
    let key = node.getAttribute(Constant.KEY);
    if (key != null && !isEmpty(key)) {
        endpoint.setKey(key);
    }

  }

  createMember(node: DOMNode): EndpointLoadbalanceMember {
    let member = new EndpointLoadbalanceMember();
    member.elementNode((node as DOMElement));
    let hostName = node.getAttribute(Constant.HOST_NAME);
    if (hostName != null && !isEmpty(hostName)) {
        member.setHostName(hostName);
    }
    let httpPort = node.getAttribute(Constant.HTTP_PORT);
    if (httpPort != null && !isEmpty(httpPort)) {
        member.setHttpPort(httpPort);
    }
    let httpsPort = node.getAttribute(Constant.HTTPS_PORT);
    if (httpsPort != null && !isEmpty(httpsPort)) {
        member.setHttpsPort(httpsPort);
    }
    return member;

  }
}
