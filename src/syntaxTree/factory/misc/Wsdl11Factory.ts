// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/misc/Wsdl11Factory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { AnyTopLevelOptionalElement } from "../../pojo/misc/wsdl11/AnyTopLevelOptionalElement.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { STNode } from "../../stNode.js";
import { TBinding } from "../../pojo/misc/wsdl11/TBinding.js";
import { TBindingOperation } from "../../pojo/misc/wsdl11/TBindingOperation.js";
import { TBindingOperationFault } from "../../pojo/misc/wsdl11/TBindingOperationFault.js";
import { TBindingOperationMessage } from "../../pojo/misc/wsdl11/TBindingOperationMessage.js";
import { TDefinitions } from "../../pojo/misc/wsdl11/TDefinitions.js";
import { TDocumentation } from "../../pojo/misc/wsdl11/TDocumentation.js";
import { TFault } from "../../pojo/misc/wsdl11/TFault.js";
import { TImport } from "../../pojo/misc/wsdl11/TImport.js";
import { TMessage } from "../../pojo/misc/wsdl11/TMessage.js";
import { TOperation } from "../../pojo/misc/wsdl11/TOperation.js";
import { TParam } from "../../pojo/misc/wsdl11/TParam.js";
import { TPart } from "../../pojo/misc/wsdl11/TPart.js";
import { TPort } from "../../pojo/misc/wsdl11/TPort.js";
import { TPortType } from "../../pojo/misc/wsdl11/TPortType.js";
import { TService } from "../../pojo/misc/wsdl11/TService.js";
import { TTypes } from "../../pojo/misc/wsdl11/TTypes.js";
import { Utils } from "../../utils.js";

export class Wsdl11Factory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let definitions = new TDefinitions();
    definitions.elementNode(element);
    this.populateAttributes(definitions, element);
    let children = element.getChildren();
    let any = [];
    if (children != null && !isEmpty(children)) {
        let anyTopLevelOptionalElement = new AnyTopLevelOptionalElement();
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.WSDL_IMPORT)) {
                let tImport = this.createTImport(child);
                anyTopLevelOptionalElement.set_import((tImport));
            } else if (equalsIgnoreCase(name, Constant.WSDL_TYPES)) {
                let tTypes = this.createTTypes(child);
                anyTopLevelOptionalElement.setTypes((tTypes));
            } else if (equalsIgnoreCase(name, Constant.WSDL_MESSAGE)) {
                let tMessage = this.createTMessage(child);
                anyTopLevelOptionalElement.setMessage((tMessage));
            } else if (equalsIgnoreCase(name, Constant.WSDL_PORT_TYPE)) {
                let tPortType = this.createTPortType(child);
                anyTopLevelOptionalElement.setPortType((tPortType));
            } else if (equalsIgnoreCase(name, Constant.WSDL_BINDING)) {
                let tBinding = this.createTBinding(child);
                anyTopLevelOptionalElement.setBinding((tBinding));
            } else if (equalsIgnoreCase(name, Constant.WSDL_SERVICE)) {
                let tService = this.createTService(child);
                anyTopLevelOptionalElement.setService((tService));
            } else if (equalsIgnoreCase(name, Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                definitions.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                any.push(xml);
            }
        }
        definitions.setAnyTopLevelOptionalElement(anyTopLevelOptionalElement);
        definitions.setAny(any.slice());
    }
    return definitions;

  }

  createTImport(node: DOMNode): TImport {
    let tImport = new TImport();
    tImport.elementNode((node as DOMElement));
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        tImport.setNamespace(namespace);
    }
    let location = node.getAttribute(Constant.LOCATION);
    if (location != null) {
        tImport.setLocation(location);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tImport.setDocumentation(tDocumentation);
            }
        }
    }

    return tImport;

  }

  createTTypes(node: DOMNode): TTypes {
    let tTypes = new TTypes();
    tTypes.elementNode((node as DOMElement));
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        tTypes.setAny(elements.slice());
    }
    return tTypes;

  }

  createTMessage(node: DOMNode): TMessage {
    let tMessage = new TMessage();
    tMessage.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tMessage.setName(name);
    }
    let children = node.getChildren();
    let tparts = [];
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name1 = child.getNodeName();
            if (equalsIgnoreCase(name1, Constant.WSDL_PART)) {
                let part = this.createTPart(child);
                tparts.push(part);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tMessage.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tMessage.setPart(tparts.slice());
        tMessage.setAny(elements.slice());
    }
    return tMessage;

  }

  createTPart(node: DOMNode): TPart {
    let tPart = new TPart();
    tPart.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tPart.setName(name);
    }
    let element = node.getAttribute(Constant.ELEMENT);
    if (element != null) {
        tPart.setElement(element);
    }
    let type = node.getAttribute(Constant.TYPE);
    if (type != null) {
        tPart.setType(type);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tPart.setDocumentation(tDocumentation);
            }
        }
    }

    return tPart;

  }

  createTPortType(node: DOMNode): TPortType {
    let tPortType = new TPortType();
    tPortType.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tPortType.setName(name);
    }

    let children = node.getChildren();
    let operations = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_OPERATION)) {
                let tBindingOperation = this.createTOperation(child);
                operations.push(tBindingOperation);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tPortType.setDocumentation(tDocumentation);
            }
        }
        tPortType.setOperation(operations.slice());
    }
    return tPortType;

  }

  createTOperation(node: DOMNode): TOperation {
    let tOperation = new TOperation();
    tOperation.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tOperation.setName(name);
    }
    let parameterOrder = node.getAttribute(Constant.PARAMETER_ORDER);
    if (parameterOrder != null) {
        tOperation.setParameterOrder(parameterOrder);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let nodeName = child.getNodeName();
            if (equalsIgnoreCase(nodeName, Constant.WSDL_INPUT)) {
                let input = this.createTParam(child);
                elements.push(input);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_OUTPUT)) {
                let output = this.createTParam(child);
                elements.push(output);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_FAULT)) {
                let fault = this.createTFault(child);
                elements.push(fault);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tOperation.setDocumentation(tDocumentation);
            }
        }
        tOperation.setRest(elements);
    }
    return tOperation;

  }

  createTParam(node: DOMNode): TParam {
    let tParam = new TParam();
    tParam.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tParam.setName(name);
    }
    let message = node.getAttribute(Constant.MESSAGE);
    if (message != null) {
        tParam.setMessage(message);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tParam.setDocumentation(tDocumentation);
            }
        }
    }
    return tParam;

  }

  createTFault(node: DOMNode): TFault {
    let tFault = new TFault();
    tFault.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tFault.setName(name);
    }
    let message = node.getAttribute(Constant.MESSAGE);
    if (message != null) {
        tFault.setMessage(message);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tFault.setDocumentation(tDocumentation);
            }
        }
    }
    return tFault;

  }

  createTBinding(node: DOMNode): TBinding {
    let tBinding = new TBinding();
    tBinding.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tBinding.setName(name);
    }
    let type = node.getAttribute(Constant.TYPE);
    if (type != null) {
        tBinding.setType(type);
    }
    let children = node.getChildren();
    let elements = [];
    let operations = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_OPERATION)) {
                let tBindingOperation = this.createTBindingOperation(child);
                operations.push(tBindingOperation);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tBinding.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tBinding.setOperation(operations.slice());
        tBinding.setAny(elements.slice());
    }
    return tBinding;

  }

  createTDocumentation(node: DOMNode): TDocumentation {
    let tDocumentation = new TDocumentation();
    tDocumentation.elementNode((node as DOMElement));
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let xml = this.getAnyElement(child);
            elements.push(xml);
        }
        tDocumentation.setContent(elements.slice());
    }
    return tDocumentation;

  }

  createTBindingOperation(node: DOMNode): TBindingOperation {
    let tBindingOperation = new TBindingOperation();
    tBindingOperation.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tBindingOperation.setName(name);
    }
    let children = node.getChildren();
    let faults = [];
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let nodeName = child.getNodeName();
            if (equalsIgnoreCase(nodeName, Constant.WSDL_INPUT)) {
                let tBindingOperationMessage = this.createTBindingOperationMessage(child);
                tBindingOperation.setInput(tBindingOperationMessage);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_OUTPUT)) {
                let tBindingOperationMessage = this.createTBindingOperationMessage(child);
                tBindingOperation.setOutput(tBindingOperationMessage);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_FAULT)) {
                let tBindingOperationFault = this.createTBindingOperationFault(child);
                faults.push(tBindingOperationFault);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tBindingOperation.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tBindingOperation.setFault(faults.slice());
        tBindingOperation.setAny(elements.slice());
    }
    return tBindingOperation;

  }

  createTBindingOperationMessage(node: DOMNode): TBindingOperationMessage {
    let tBindingOperationMessage = new TBindingOperationMessage();
    tBindingOperationMessage.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tBindingOperationMessage.setName(name);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tBindingOperationMessage.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tBindingOperationMessage.setAny(elements.slice());
    }
    return tBindingOperationMessage;

  }

  createTBindingOperationFault(node: DOMNode): TBindingOperationFault {
    let tBindingOperationFault = new TBindingOperationFault();
    tBindingOperationFault.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tBindingOperationFault.setName(name);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tBindingOperationFault.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tBindingOperationFault.setAny(elements.slice());
    }
    return tBindingOperationFault;

  }

  createTService(node: DOMNode): TService {
    let tService = new TService();
    tService.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tService.setName(name);
    }
    let children = node.getChildren();
    let tports = [];
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let nodeName = child.getNodeName();
            if (equalsIgnoreCase(nodeName, Constant.WSDL_PORT)) {
                let tPort = this.createTPort(child);
                tports.push(tPort);
            } else if (equalsIgnoreCase(nodeName, Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tService.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tService.setPort(tports.slice());
        tService.setAny(elements.slice());
    }
    return tService;

  }

  createTPort(node: DOMNode): TPort {
    let tPort = new TPort();
    tPort.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        tPort.setName(name);
    }
    let binding = node.getAttribute(Constant.BINDING);
    if (binding != null) {
        tPort.setBinding(binding);
    }
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.WSDL_DOCUMENTATION)) {
                let tDocumentation = this.createTDocumentation(child);
                tPort.setDocumentation(tDocumentation);
            } else {
                let xml = this.getAnyElement(child);
                elements.push(xml);
            }
        }
        tPort.setAny(elements.slice());
    }
    return tPort;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let targetNamespace = element.getAttribute(Constant.TARGET_NAMESPACE);
    if (targetNamespace != null) {
        ((node as TDefinitions)).setTargetNamespace(targetNamespace);
    }
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as TDefinitions)).setName(name);
    }

  }

  getAnyElement(node: DOMNode): string {

    let xml = Utils.getInlineString(node, false);
    return xml;

  }
}
