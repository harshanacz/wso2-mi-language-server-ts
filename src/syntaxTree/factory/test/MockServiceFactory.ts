// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/test/MockServiceFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { Header } from "../../pojo/test/mockservice/Header.js";
import { Headers } from "../../pojo/test/mockservice/Headers.js";
import { MockService } from "../../pojo/test/mockservice/MockService.js";
import { MockServiceResource } from "../../pojo/test/mockservice/MockServiceResource.js";
import { MockServiceResourceRequest } from "../../pojo/test/mockservice/MockServiceResourceRequest.js";
import { MockServiceResourceResponse } from "../../pojo/test/mockservice/MockServiceResourceResponse.js";
import { MockServiceResources } from "../../pojo/test/mockservice/MockServiceResources.js";
import { STNode } from "../../stNode.js";
import { Utils } from "../../utils.js";

export class MockServiceFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let mockService = new MockService();
    mockService.elementNode(element);

    let children = element.getChildren();

    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.MOCK_SERVICE_NAME, childName)) {
                let serviceName = this.createSimpleNode((child as DOMElement));
                mockService.setServiceName(serviceName);
            } else if (equalsIgnoreCase(Constant.PORT, childName)) {
                let port = this.createSimpleNode((child as DOMElement));
                mockService.setPort(port);
            } else if (equalsIgnoreCase(Constant.CONTEXT, childName)) {
                let context = this.createSimpleNode((child as DOMElement));
                mockService.setContext(context);
            } else if (equalsIgnoreCase(Constant.RESOURCES, childName)) {
                let resources = this.createMockServiceResources((child as DOMElement));
                mockService.setResources(resources);
            }
        }
    }
    return mockService;

  }

  createMockServiceResources(node: DOMElement): MockServiceResources {
    let resources = new MockServiceResources();
    resources.elementNode(node);

    let children = node.getChildren();
    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.RESOURCE, childName)) {
                let resource = this.createMockServiceResource((child as DOMElement));
                resources.addResource(resource);
            }
        }
    }
    return resources;

  }

  createMockServiceResource(node: DOMElement): MockServiceResource {
    let resource = new MockServiceResource();
    resource.elementNode(node);

    let children = node.getChildren();
    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.SUB_CONTEXT, childName)) {
                let subContext = this.createSimpleNode((child as DOMElement));
                resource.setSubContext(subContext);
            } else if (equalsIgnoreCase(Constant.METHOD, childName)) {
                let method = this.createSimpleNode((child as DOMElement));
                resource.setMethod(method);
            } else if (equalsIgnoreCase(Constant.REQUEST, childName)) {
                let request = this.createMockServiceResourceRequest((child as DOMElement));
                resource.setRequest(request);
            } else if (equalsIgnoreCase(Constant.RESPONSE, childName)) {
                let response = this.createMockServiceResourceResponse((child as DOMElement));
                resource.setResponse(response);
            }
        }
    }
    return resource;

  }

  createMockServiceResourceRequest(node: DOMElement): MockServiceResourceRequest {
    let request = new MockServiceResourceRequest();
    request.elementNode(node);

    let children = node.getChildren();
    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.PAYLOAD, childName)) {
                let payload = this.createSimpleNode((child as DOMElement));
                request.setPayload(payload);
            } else if (equalsIgnoreCase(Constant.HEADERS, childName)) {
                let headers = this.createHeaders((child as DOMElement));
                request.setHeaders(headers);
            }
        }
    }
    return request;

  }

  createMockServiceResourceResponse(node: DOMElement): MockServiceResourceResponse {
    let response = new MockServiceResourceResponse();
    response.elementNode(node);

    let children = node.getChildren();
    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.STATUS_CODE, childName)) {
                let statusCode = this.createSimpleNode((child as DOMElement));
                response.setStatusCode(statusCode);
            } else if (equalsIgnoreCase(Constant.PAYLOAD, childName)) {
                let payload = this.createSimpleNode((child as DOMElement));
                response.setPayload(payload);
            } else if (equalsIgnoreCase(Constant.HEADERS, childName)) {
                let headers = this.createHeaders((child as DOMElement));
                response.setHeaders(headers);
            }
        }
    }
    return response;

  }

  createHeaders(node: DOMElement): Headers {
    let headers = new Headers();
    headers.elementNode(node);

    let children = node.getChildren();
    if (children != null) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.HEADER, childName)) {
                let header = this.createHeader((child as DOMElement));
                headers.addHeader(header);
            }
        }
    }
    return headers;

  }

  createHeader(node: DOMElement): Header {
    let header = new Header();
    header.elementNode(node);

    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        header.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        header.setValue(value);
    }

    return header;

  }

  createSimpleNode(element: DOMElement): STNode {
    let node = new STNode();
    node.elementNode(element);
    let content = Utils.getInlineString(element.getFirstChild());
    node.setTextNode(content);
    return node;

  }

  populateAttributes(node: STNode, element: DOMElement): void {

  }
}
