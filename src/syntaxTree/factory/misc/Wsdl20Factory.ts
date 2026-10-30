// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/misc/Wsdl20Factory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { BindingFaultType } from "../../pojo/misc/wsdl20/BindingFaultType.js";
import { BindingOperationFaultType } from "../../pojo/misc/wsdl20/BindingOperationFaultType.js";
import { BindingOperationMessageType } from "../../pojo/misc/wsdl20/BindingOperationMessageType.js";
import { BindingOperationType } from "../../pojo/misc/wsdl20/BindingOperationType.js";
import { BindingType } from "../../pojo/misc/wsdl20/BindingType.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { DescriptionType } from "../../pojo/misc/wsdl20/DescriptionType.js";
import { DocumentationType } from "../../pojo/misc/wsdl20/DocumentationType.js";
import { EndpointType } from "../../pojo/misc/wsdl20/EndpointType.js";
import { ImportType } from "../../pojo/misc/wsdl20/ImportType.js";
import { IncludeType } from "../../pojo/misc/wsdl20/IncludeType.js";
import { InterfaceFaultType } from "../../pojo/misc/wsdl20/InterfaceFaultType.js";
import { InterfaceOperationType } from "../../pojo/misc/wsdl20/InterfaceOperationType.js";
import { InterfaceType } from "../../pojo/misc/wsdl20/InterfaceType.js";
import { MessageRefFaultType } from "../../pojo/misc/wsdl20/MessageRefFaultType.js";
import { MessageRefType } from "../../pojo/misc/wsdl20/MessageRefType.js";
import { STNode } from "../../stNode.js";
import { ServiceType } from "../../pojo/misc/wsdl20/ServiceType.js";
import { TypesType } from "../../pojo/misc/wsdl20/TypesType.js";
import { Utils } from "../../utils.js";

export class Wsdl20Factory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let description = new DescriptionType();
    description.elementNode(element);
    this.populateAttributes(description, element);
    let children = element.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, "import")) {
                let importType = this.createImportType(child);
                elements.push(importType);
            } else if (equalsIgnoreCase(name, "include")) {
                let includeType = this.createIncludeType(child);
                elements.push(includeType);
            } else if (equalsIgnoreCase(name, "types")) {
                let typesType = this.createTypesType(child);
                elements.push(typesType);
            } else if (equalsIgnoreCase(name, "interface")) {
                let interfaceType = this.createInterfaceType(child);
                elements.push(interfaceType);
            } else if (equalsIgnoreCase(name, "binding")) {
                let bindingType = this.createBindingType(child);
                elements.push(bindingType);
            } else if (equalsIgnoreCase(name, "service")) {
                let serviceType = this.createServiceType(child);
                elements.push(serviceType);
            } else if (equalsIgnoreCase(name, "documentation")) {
                let documentationType = this.createDocumentationType(child);
                elements.push(documentationType);
            }
        }
        description.setImportOrIncludeOrTypes(elements);
    }
    return description;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let targetNamespace = element.getAttribute("targetNamespace");
    if (targetNamespace != null) {
        ((node as DescriptionType)).setTargetNamespace(targetNamespace);
    }

  }

  createImportType(child: DOMNode): ImportType {
    let importType = new ImportType();
    importType.elementNode((child as DOMElement));
    let namespace = child.getAttribute("namespace");
    if (namespace != null) {
        importType.setNamespace(namespace);
    }
    let location = child.getAttribute("location");
    if (location != null) {
        importType.setLocation(location);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let xml = this.getAnyElement(node);
            elements.push(xml);
        }
        importType.setAny(elements.slice());
    }
    return importType;

  }

  createIncludeType(child: DOMNode): IncludeType {
    let includeType = new IncludeType();
    includeType.elementNode((child as DOMElement));
    let location = child.getAttribute("location");
    if (location != null) {
        includeType.setLocation(location);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let xml = this.getAnyElement(node);
            elements.push(xml);
        }
        includeType.setAny(elements.slice());
    }
    return includeType;

  }

  createTypesType(child: DOMNode): TypesType {
    let typesType = new TypesType();
    typesType.elementNode((child as DOMElement));
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let xml = this.getAnyElement(node);
            elements.push(xml);
        }
        typesType.setAny(elements.slice());
    }
    return typesType;

  }

  createInterfaceType(child: DOMNode): InterfaceType {
    let interfaceType = new InterfaceType();
    interfaceType.elementNode((child as DOMElement));
    let name = child.getAttribute("name");
    if (name != null) {
        interfaceType.setName(name);
    }
    let _extends = child.getAttribute("extends");
    if (_extends != null) {
        interfaceType.set_extends(_extends);
    }
    let styleDefault = child.getAttribute("styleDefault");
    if (styleDefault != null) {
        interfaceType.setStyleDefault(styleDefault);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name1 = node.getNodeName();
            if (equalsIgnoreCase(name1, "operation")) {
                let interfaceOperationType = this.createInterfaceOperationType(node);
                elements.push(interfaceOperationType);
            } else if (equalsIgnoreCase(name1, "fault")) {
                let interfaceFaultType = this.createInterfaceFaultType(node);
                elements.push(interfaceFaultType);
            }
        }
        interfaceType.setOperationOrFaultOrAny(elements);
    }
    return interfaceType;

  }

  createInterfaceOperationType(node: DOMNode): InterfaceOperationType {
    let interfaceOperationType = new InterfaceOperationType();
    interfaceOperationType.elementNode((node as DOMElement));
    let name = node.getAttribute("name");
    if (name != null) {
        interfaceOperationType.setName(name);
    }
    let pattern = node.getAttribute("pattern");
    if (pattern != null) {
        interfaceOperationType.setPattern(pattern);
    }
    let safe = node.getAttribute("safe");
    if (safe != null) {
        interfaceOperationType.setSafe(parseBoolean(safe));
    }
    let style = node.getAttribute("style");
    if (style != null) {
        interfaceOperationType.setStyle(style);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name1 = child.getNodeName();
            if (equalsIgnoreCase(name1, "input")) {
                let input = this.createMessageRefType(child);
                elements.push(input);
            } else if (equalsIgnoreCase(name1, "output")) {
                let output = this.createMessageRefType(child);
                elements.push(output);
            } else if (equalsIgnoreCase(name1, "infault")) {
                let infault = this.createMessageRefFaultType(child);
                elements.push(infault);
            } else if (equalsIgnoreCase(name1, "outfault")) {
                let outfault = this.createMessageRefFaultType(child);
                elements.push(outfault);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        interfaceOperationType.setInputOrOutputOrInfault(elements);
    }
    return interfaceOperationType;

  }

  createMessageRefType(child: DOMNode): MessageRefType {
    let messageRefType = new MessageRefType();
    messageRefType.elementNode((child as DOMElement));
    let messageLabel = child.getAttribute("messageLabel");
    if (messageLabel != null) {
        messageRefType.setMessageLabel(messageLabel);
    }
    let element = child.getAttribute("element");
    if (element != null) {
        messageRefType.setElement(element);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let xml = this.getAnyElement(node);
            elements.push(xml);
        }
        messageRefType.setAny(elements.slice());
    }
    return messageRefType;

  }

  createMessageRefFaultType(child: DOMNode): MessageRefFaultType {
    let messageRefFaultType = new MessageRefFaultType();
    messageRefFaultType.elementNode((child as DOMElement));
    let ref = child.getAttribute("ref");
    if (ref != null) {
        messageRefFaultType.setRef(ref);
    }
    let messageLabel = child.getAttribute("messageLabel");
    if (messageLabel != null) {
        messageRefFaultType.setMessageLabel(messageLabel);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let xml = this.getAnyElement(node);
            elements.push(xml);
        }
        messageRefFaultType.setAny(elements.slice());
    }
    return messageRefFaultType;

  }

  createInterfaceFaultType(node: DOMNode): InterfaceFaultType {
    let interfaceFaultType = new InterfaceFaultType();
    interfaceFaultType.elementNode((node as DOMElement));
    let name = node.getAttribute("name");
    if (name != null) {
        interfaceFaultType.setName(name);
    }
    let element = node.getAttribute("element");
    if (element != null) {
        interfaceFaultType.setElement(element);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        interfaceFaultType.setAny(elements.slice());
    }
    return interfaceFaultType;

  }

  createBindingType(child: DOMNode): BindingType {
    let bindingType = new BindingType();
    bindingType.elementNode((child as DOMElement));
    let name = child.getAttribute("name");
    if (name != null) {
        bindingType.setName(name);
    }
    let type = child.getAttribute("type");
    if (type != null) {
        bindingType.setType(type);
    }
    let _interface = child.getAttribute("interface");
    if (_interface != null) {
        bindingType.set_interface(_interface);
    }
    let children = child.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name1 = node.getNodeName();
            if (equalsIgnoreCase(name1, "operation")) {
                let bindingOperationType = this.createBindingOperationType(node);
                elements.push(bindingOperationType);
            } else if (equalsIgnoreCase(name1, "fault")) {
                let bindingFaultType = this.createBindingFaultType(node);
                elements.push(bindingFaultType);
            }
        }
        bindingType.setOperationOrFaultOrAny(elements);
    }
    return bindingType;

  }

  createBindingOperationType(node: DOMNode): BindingOperationType {
    let bindingOperationType = new BindingOperationType();
    bindingOperationType.elementNode((node as DOMElement));
    let ref = node.getAttribute("ref");
    if (ref != null) {
        bindingOperationType.setRef(ref);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, "input")) {
                let input = this.createBindingOperationMessageType(child);
                elements.push(input);
            } else if (equalsIgnoreCase(name, "output")) {
                let output = this.createBindingOperationMessageType(child);
                elements.push(output);
            } else if (equalsIgnoreCase(name, "infault")) {
                let infault = this.createBindingOperationFaultType(child);
                elements.push(infault);
            } else if (equalsIgnoreCase(name, "outfault")) {
                let outfault = this.createBindingOperationFaultType(child);
                elements.push(outfault);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        bindingOperationType.setInputOrOutputOrInfault(elements);
    }
    return bindingOperationType;

  }

  createBindingOperationMessageType(node: DOMNode): BindingOperationMessageType {
    let bindingOperationMessageType = new BindingOperationMessageType();
    bindingOperationMessageType.elementNode((node as DOMElement));
    let messageLabel = node.getAttribute("messageLabel");
    if (messageLabel != null) {
        bindingOperationMessageType.setMessageLabel(messageLabel);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        bindingOperationMessageType.setAny(elements.slice());
    }
    return bindingOperationMessageType;

  }

  createBindingOperationFaultType(node: DOMNode): BindingOperationFaultType {
    let bindingOperationFaultType = new BindingOperationFaultType();
    bindingOperationFaultType.elementNode((node as DOMElement));
    let ref = node.getAttribute("ref");
    if (ref != null) {
        bindingOperationFaultType.setRef(ref);
    }
    let messageLabel = node.getAttribute("messageLabel");
    if (messageLabel != null) {
        bindingOperationFaultType.setMessageLabel(messageLabel);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        bindingOperationFaultType.setAny(elements.slice());
    }
    return bindingOperationFaultType;

  }

  createBindingFaultType(node: DOMNode): BindingFaultType {
    let bindingFaultType = new BindingFaultType();
    bindingFaultType.elementNode((node as DOMElement));
    let ref = node.getAttribute("ref");
    if (ref != null) {
        bindingFaultType.setRef(ref);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        bindingFaultType.setAny(elements.slice());
    }
    return bindingFaultType;

  }

  createServiceType(node: DOMNode): ServiceType {
    let serviceType = new ServiceType();
    serviceType.elementNode((node as DOMElement));
    let name = node.getAttribute("name");
    if (name != null) {
        serviceType.setName(name);
    }
    let _interface = node.getAttribute("interface");
    if (_interface != null) {
        serviceType.set_interface(_interface);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name1 = child.getNodeName();
            if (equalsIgnoreCase(name1, "endpoint")) {
                let endpointType = this.createEndpointType(child);
                elements.push(endpointType);
            }
        }
        serviceType.setEndpointOrAny(elements.slice());
    }
    return serviceType;

  }

  createEndpointType(node: DOMNode): EndpointType {
    let endpointType = new EndpointType();
    endpointType.elementNode((node as DOMElement));
    let name = node.getAttribute("name");
    if (name != null) {
        endpointType.setName(name);
    }
    let binding = node.getAttribute("binding");
    if (binding != null) {
        endpointType.setBinding(binding);
    }
    let address = node.getAttribute("address");
    if (address != null) {
        endpointType.setAddress(address);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        endpointType.setAny(elements.slice());
    }
    return endpointType;

  }

  createDocumentationType(node: DOMNode): DocumentationType {
    let documentationType = new DocumentationType();
    documentationType.elementNode((node as DOMElement));

    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        documentationType.setContent(elements.slice());
    }
    return documentationType;

  }

  getAnyElement(node: DOMNode): string {

    let xml = Utils.getInlineString(node, false);
    return xml;

  }
}
