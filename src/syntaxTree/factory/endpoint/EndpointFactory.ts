// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/EndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, contains, getEnumFromValue } from "../../javaCompat.js";
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
import { EndpointParameter } from "../../pojo/endpoint/common/EndpointParameter.js";
import { EndpointProperty } from "../../pojo/endpoint/common/EndpointProperty.js";
import { EndpointPropertyScope } from "../../pojo/endpoint/common/EndpointPropertyScope.js";
import { EndpointRecipientlist } from "../../pojo/endpoint/recipientList/EndpointRecipientlist.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { EndpointType } from "../../pojo/endpoint/EndpointType.js";
import { FailoverEndpointFactory } from "./FailoverEndpointFactory.js";
import { HttpEndpointFactory } from "./HttpEndpointFactory.js";
import { LoadbalanceEndpointFactory } from "./LoadbalanceEndpointFactory.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { RecipientlistEndpointFactory } from "./RecipientlistEndpointFactory.js";
import { STNode } from "../../stNode.js";
import { SessionFactory } from "./SessionFactory.js";
import { SyntaxTreeUtils } from "../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../utils.js";
import { WSDLEndpoint } from "../../pojo/endpoint/wsdl/WSDLEndpoint.js";
import { WSDLEndpointFactory } from "./WSDLEndpointFactory.js";

export class EndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let endpoint = new NamedEndpoint();
    endpoint.elementNode(element);
    endpoint.setType(EndpointType.NAMED_ENDPOINT);
    this.populateAttributes(endpoint, element);
    let children = element.getChildren();
    let properties = [];
    let parameters = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.ADDRESS)) {
                let factory = new AddressEndpointFactory();
                let address = (factory.create((node as DOMElement)) as EndpointAddress);
                endpoint.setAddress(address);
                endpoint.setType(EndpointType.ADDRESS_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.DEFAULT)) {
                let factory = new DefaultEndpointFactory();
                let defaultEndpoint = (factory.create((node as DOMElement)) as DefaultEndpoint);
                endpoint.set_default(defaultEndpoint);
                endpoint.setType(EndpointType.DEFAULT_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.FAIL_OVER)) {
                let factory = new FailoverEndpointFactory();
                let failover = (factory.create((node as DOMElement)) as EndpointFailover);
                endpoint.setFailover(failover);
                endpoint.setType(EndpointType.FAIL_OVER_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.HTTP)) {
                let factory = new HttpEndpointFactory();
                let http = (factory.create((node as DOMElement)) as EndpointHttp);
                endpoint.setHttp(http);
                endpoint.setType(EndpointType.HTTP_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.LOADBALANCE)) {
                let factory = new LoadbalanceEndpointFactory();
                let loadbalance = (factory.create((node as DOMElement)) as EndpointLoadbalance);
                endpoint.setLoadbalance(loadbalance);
                endpoint.setType(EndpointType.LOAD_BALANCE_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.RECIPIENT_LIST)) {
                let factory = new RecipientlistEndpointFactory();
                let recipientlist = (factory.create((node as DOMElement)) as EndpointRecipientlist);
                endpoint.setRecipientlist(recipientlist);
                endpoint.setType(EndpointType.RECIPIENT_LIST_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.WSDL)) {
                let factory = new WSDLEndpointFactory();
                let wsdl = (factory.create((node as DOMElement)) as WSDLEndpoint);
                endpoint.setWsdl(wsdl);
                endpoint.setType(EndpointType.WSDL_ENDPOINT);
            } else if (equalsIgnoreCase(name, Constant.SESSION)) {
                let factory = new SessionFactory();
                let session = (factory.create((node as DOMElement)) as EndpointSession);
                endpoint.setSession(session);
            } else if (equalsIgnoreCase(name, Constant.PROPERTY)) {
                let property = this.createEndpointProperty(node);
                properties.push(property);
            } else if (contains(name, Constant.PARAMETER)) {
                let parameter = this.createEndpointParameter(node);
                parameters.push(parameter);
            } else if (equalsIgnoreCase(name, Constant.DESCRIPTION)) {
                let description = Utils.getInlineString(node.getFirstChild());
                endpoint.setDescription(description);
            }
        }
        endpoint.setProperty(properties.slice());
        endpoint.setParameter(parameters.slice());
    }
    return endpoint;

  }

  createEndpointProperty(node: DOMNode): EndpointProperty {
    let property = SyntaxTreeUtils.createMediatorProperty(node);
    let endpointProperty = new EndpointProperty(property);
    endpointProperty.elementNode((node as DOMElement));
    let scope = node.getAttribute(Constant.SCOPE);
    let scopeEnum = getEnumFromValue(scope, EndpointPropertyScope);
    if (scopeEnum != null) {
        endpointProperty.setScope(scopeEnum);
    }
    return endpointProperty;

  }

  createEndpointParameter(node: DOMNode): EndpointParameter {
    let parameter = new EndpointParameter();
    parameter.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        parameter.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null && !isEmpty(value)) {
        parameter.setValue(value);
    }
    let paramNamespacePrefix = node.getPrefix();
    if (paramNamespacePrefix != null) {
        parameter.setParamNamespacePrefix(paramNamespacePrefix);
    }
    return parameter;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        ((node as NamedEndpoint)).setName(name);
    }
    let key = element.getAttribute(Constant.KEY);
    if (key != null && !isEmpty(key)) {
        ((node as NamedEndpoint)).setKey(key);
    }
    let keyExpression = element.getAttribute(Constant.KEY_EXPRESSION);
    if (keyExpression != null) {
        ((node as NamedEndpoint)).setKeyExpression(keyExpression);
    }
    let template = element.getAttribute(Constant.TEMPLATE);
    if (template != null && !isEmpty(template)) {
        ((node as NamedEndpoint)).setType(EndpointType.TEMPLATE_ENDPOINT);
        ((node as NamedEndpoint)).setTemplate(template);
    }
    let uri = element.getAttribute(Constant.URI);
    if (uri != null && !isEmpty(uri)) {
        ((node as NamedEndpoint)).setUri(uri);
    }

  }
}
