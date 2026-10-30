// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/ProxyFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { DescriptionType } from "../pojo/misc/wsdl20/DescriptionType.js";
import { EnableDisable } from "../pojo/api/EnableDisable.js";
import { EndpointFactory } from "./endpoint/EndpointFactory.js";
import { NamedEndpoint } from "../pojo/endpoint/NamedEndpoint.js";
import { Proxy } from "../pojo/proxy/Proxy.js";
import { ProxyPolicy } from "../pojo/proxy/ProxyPolicy.js";
import { ProxyPolicyType } from "../pojo/proxy/ProxyPolicyType.js";
import { ProxyPublishWSDL } from "../pojo/proxy/ProxyPublishWSDL.js";
import { ProxyTarget } from "../pojo/proxy/ProxyTarget.js";
import { Resource } from "../pojo/proxy/Resource.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";
import { TDefinitions } from "../pojo/misc/wsdl11/TDefinitions.js";
import { Utils } from "../utils.js";
import { Wsdl11Factory } from "./misc/Wsdl11Factory.js";
import { Wsdl20Factory } from "./misc/Wsdl20Factory.js";

export class ProxyFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let proxy = new Proxy();
    proxy.elementNode(element);
    this.populateAttributes(proxy, element);
    let children = element.getChildren();
    let parameters = [];
    let proxyPolicies = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.DESCRIPTION)) {
                let description = Utils.getInlineString(node.getFirstChild());
                proxy.setDescription(description);
            } else if (equalsIgnoreCase(name, Constant.TARGET)) {
                let target = this.createProxyTarget(node);
                proxy.setTarget(target);
            } else if (equalsIgnoreCase(name, Constant.PUBLISH_WSDL)) {
                let publishWSDL = this.createPublishWSDL(node);
                proxy.setPublishWSDL(publishWSDL);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_ADDRESSING)) {
                let enableAddressing = this.createTextNode(node);
                proxy.setEnableAddressing(enableAddressing);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_SEC)) {
                let enableSec = this.createTextNode(node);
                proxy.setEnableSec(enableSec);
            } else if (equalsIgnoreCase(name, Constant.ENABLE_RM)) {
                let enableRM = this.createTextNode(node);
                proxy.setEnableRM(enableRM);
            } else if (equalsIgnoreCase(name, Constant.POLICY)) {
                let policy = this.createPolicy(node);
                proxyPolicies.push(policy);
            } else if (equalsIgnoreCase(name, Constant.PARAMETER)) {
                let parameter = SyntaxTreeUtils.createParameter(node);
                parameters.push(parameter);
            }
        }
        proxy.setParameters(parameters.slice());
        proxy.setPolicies(proxyPolicies.slice());
    }
    return proxy;

  }

  createProxyTarget(node: DOMNode): ProxyTarget {
    let target = new ProxyTarget();
    target.elementNode((node as DOMElement));
    this.populateProxyTargetAttributes(target, node);
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.IN_SEQUENCE)) {
                let inSequence = SyntaxTreeUtils.createSequence(child);
                target.setInSequence(inSequence);
            } else if (equalsIgnoreCase(name, Constant.OUT_SEQUENCE)) {
                let outSequence = SyntaxTreeUtils.createSequence(child);
                target.setOutSequence(outSequence);
            } else if (equalsIgnoreCase(name, Constant.FAULT_SEQUENCE)) {
                let faultSequence = SyntaxTreeUtils.createSequence(child);
                target.setFaultSequence(faultSequence);
            } else if (equalsIgnoreCase(name, Constant.ENDPOINT)) {
                let factory = new EndpointFactory();
                let endpoint = (factory.create((child as DOMElement)) as NamedEndpoint);
                target.setEndpoint(endpoint);
            }
        }
    }
    return target;

  }

  populateProxyTargetAttributes(target: ProxyTarget, node: DOMNode): void {
    let inSequence = node.getAttribute(Constant.IN_SEQUENCE);
    if (inSequence != null) {
        target.setInSequenceAttribute(inSequence);
    }
    let outSequence = node.getAttribute(Constant.OUT_SEQUENCE);
    if (outSequence != null) {
        target.setOutSequenceAttribute(outSequence);
    }
    let faultSequence = node.getAttribute(Constant.FAULT_SEQUENCE);
    if (faultSequence != null) {
        target.setFaultSequenceAttribute(faultSequence);
    }
    let endpoint = node.getAttribute(Constant.ENDPOINT);
    if (endpoint != null) {
        target.setEndpointAttribute(endpoint);
    }

  }

  createPublishWSDL(node: DOMNode): ProxyPublishWSDL {
    let publishWSDL = new ProxyPublishWSDL();
    publishWSDL.elementNode((node as DOMElement));
    this.populatePublishWSDLAttributes(publishWSDL, node);
    let children = node.getChildren();
    let resourceList = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.WSDL_DEFINITIONS)) {
                let factory = new Wsdl11Factory();
                let definitions = (factory.create((child as DOMElement)) as TDefinitions);
                publishWSDL.setDefinitions(definitions);
                let inlineWSDL = Utils.getInlineString(child);
                publishWSDL.setInlineWsdl(inlineWSDL);
            } else if (equalsIgnoreCase(name, Constant.WSDL_DESCRIPTION)) {
                let factory = new Wsdl20Factory();
                let description = (factory.create((child as DOMElement)) as DescriptionType);
                publishWSDL.setDescription(description);
                let inlineWSDL = Utils.getInlineString(child);
                publishWSDL.setInlineWsdl(inlineWSDL);
            } else if (equalsIgnoreCase(name, Constant.RESOURCE)) {
                let resource = this.createResource(child);
                resourceList.push(resource);
            }
        }
        publishWSDL.setResource(resourceList.slice());
    }
    return publishWSDL;

  }

  createResource(child: DOMNode): Resource {
    let resource = new Resource();
    resource.elementNode((child as DOMElement));
    let location = child.getAttribute(Constant.LOCATION);
    if (location != null) {
        resource.setLocation(location);
    }
    let key = child.getAttribute(Constant.KEY);
    if (key != null) {
        resource.setKey(key);
    }
    return resource;

  }

  populatePublishWSDLAttributes(publishWSDL: ProxyPublishWSDL, node: DOMNode): void {
    let uri = node.getAttribute(Constant.URI);
    if (uri != null) {
        publishWSDL.setUri(uri);
    }
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        publishWSDL.setKey(key);
    }
    let endpoint = node.getAttribute(Constant.ENDPOINT);
    if (endpoint != null) {
        publishWSDL.setEndpoint(endpoint);
    }
    let preservePolicy = node.getAttribute(Constant.PRESERVE_POLICY);
    if (preservePolicy != null) {
        publishWSDL.setPreservePolicy(parseBoolean(preservePolicy));
    }


  }

  createTextNode(node: DOMNode): STNode {
    let textNode = new STNode();
    textNode.elementNode((node as DOMElement));
    return textNode;

  }

  createPolicy(node: DOMNode): ProxyPolicy {
    let policy = new ProxyPolicy();
    policy.elementNode((node as DOMElement));
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        policy.setKey(key);
    }
    let type = node.getAttribute(Constant.TYPE);
    let policyType = getEnumFromValue(type, ProxyPolicyType);
    if (policyType != null) {
        policy.setType(policyType);
    }
    return policy;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as Proxy)).setName(name);
    }
    let transports = element.getAttribute(Constant.TRANSPORTS);
    if (transports != null) {
        ((node as Proxy)).setTransports(transports);
    }
    let pinnedServers = element.getAttribute(Constant.PINNED_SERVERS);
    if (pinnedServers != null) {
        ((node as Proxy)).setPinnedServers(pinnedServers);
    }
    let serviceGroup = element.getAttribute(Constant.SERVICE_GROUP);
    if (serviceGroup != null) {
        ((node as Proxy)).setServiceGroup(serviceGroup);
    }
    let startOnLoad = element.getAttribute(Constant.START_ON_LOAD);
    if (startOnLoad != null) {
        ((node as Proxy)).setStartOnLoad(parseBoolean(startOnLoad));
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    let statisticsEnum = getEnumFromValue(statistics, EnableDisable);
    if (statisticsEnum != null) {
        ((node as Proxy)).setStatistics(statisticsEnum);
    }
    let trace = element.getAttribute(Constant.TRACE);
    let traceEnum = getEnumFromValue(trace, EnableDisable);
    if (traceEnum != null) {
        ((node as Proxy)).setTrace(traceEnum);
    }

  }
}
