// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/APIFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../javaCompat.js";
import { API } from "../pojo/api/API.js";
import { APIHandlers } from "../pojo/api/APIHandlers.js";
import { APIHandlersHandler } from "../pojo/api/APIHandlersHandler.js";
import { APIHandlersHandlerProperty } from "../pojo/api/APIHandlersHandlerProperty.js";
import { APIResource } from "../pojo/api/APIResource.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { ApiVersionType } from "../pojo/api/ApiVersionType.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { EnableDisable } from "../pojo/api/EnableDisable.js";
import { ResourceFactory } from "./ResourceFactory.js";
import { STNode } from "../stNode.js";

export class APIFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let apiNode = new API();
    apiNode.elementNode(element);
    let children = element.getChildren();
    let resources = [];
    this.populateAttributes(apiNode, element);
    if ((children != null)) {
        for (let node of children) {
            if (equalsIgnoreCase(node.getNodeName(), Constant.RESOURCE)) {
                let resource = this.createAPIResource(node, apiNode.getName());
                resources.push((resource as APIResource));
            } else if (equalsIgnoreCase(node.getNodeName(), Constant.HANDLERS)) {
                let apiHandler = this.createAPIHandlers(node);
                apiNode.setHandlers(apiHandler);
            }
        }
    }
    apiNode.setResource(resources.slice());
    return apiNode;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let api = (node as API);
    let name = element.getAttribute(Constant.NAME);
    if ((name != null)) {
        api.setName(name);
    }
    let context = element.getAttribute(Constant.CONTEXT);
    if ((context != null)) {
        api.setContext(context);
    }
    let hostname = element.getAttribute(Constant.HOSTNAME);
    if ((hostname != null)) {
        api.setHostname(hostname);
    }
    let port = element.getAttribute(Constant.PORT);
    if ((port != null)) {
        api.setPort(port);
    }
    let version = element.getAttribute(Constant.VERSION);
    if ((version != null)) {
        api.setVersion(version);
    }
    let versionType = element.getAttribute(Constant.VERSION_TYPE);
    let versionTypeEnum = getEnumFromValue(versionType, ApiVersionType);
    if ((versionTypeEnum != null)) {
        api.setVersionType(versionTypeEnum);
    }
    let publishSwagger = element.getAttribute(Constant.PUBLISH_SWAGGER);
    if ((publishSwagger != null)) {
        api.setPublishSwagger(publishSwagger);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if ((description != null)) {
        api.setDescription(description);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    let statisticsEnum = getEnumFromValue(statistics, EnableDisable);
    if ((statisticsEnum != null)) {
        api.setStatistics(statisticsEnum);
    }
    let trace = element.getAttribute(Constant.TRACE);
    let traceEnum = getEnumFromValue(trace, EnableDisable);
    if ((traceEnum != null)) {
        api.setTrace(traceEnum);
    }

  }

  createAPIResource(node: DOMNode, apiName: string): STNode {
    let resourceFactory = new ResourceFactory(apiName);
    let resource = resourceFactory.create((node as DOMElement));
    return resource;

  }

  createAPIHandlers(node: DOMNode): APIHandlers {
    let apiHandlers = new APIHandlers();
    apiHandlers.elementNode((node as DOMElement));
    let children = node.getChildren();
    let handlers = [];
    if (children != null && !isEmpty(children)) {
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.HANDLER)) {
                let handler = this.createAPIHandlersHandler(childNode);
                handlers.push(handler);
            }
        }
        apiHandlers.setHandler(handlers.slice());
    }
    return apiHandlers;

  }

  createAPIHandlersHandler(childNode: DOMNode): APIHandlersHandler {
    let apiHandlersHandler = new APIHandlersHandler();
    apiHandlersHandler.elementNode((childNode as DOMElement));
    let className = childNode.getAttribute(Constant.CLASS);
    if (className != null) {
        apiHandlersHandler.setClazz(className);
    }
    let children = childNode.getChildren();
    let properties = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            if (equalsIgnoreCase(node.getNodeName(), Constant.PROPERTY)) {
                let mediatorPropertyFactory = this.createAPIHandlersHandlerProperty(node);
                properties.push(mediatorPropertyFactory);
            }
        }
        apiHandlersHandler.setProperty(properties.slice());
    }
    return apiHandlersHandler;

  }

  createAPIHandlersHandlerProperty(node: DOMNode): APIHandlersHandlerProperty {
    let apiHandlersHandlerProperty = new APIHandlersHandlerProperty();
    apiHandlersHandlerProperty.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        apiHandlersHandlerProperty.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        apiHandlersHandlerProperty.setValue(value);
    }
    return apiHandlersHandlerProperty;

  }
}
