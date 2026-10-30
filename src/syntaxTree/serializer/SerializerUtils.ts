// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/SerializerUtils.java by the java2ts converter (see tools/java2ts).
import { contains, get, jsplit, IllegalStateException } from "../javaCompat.js";
import { Constant } from "../constant.js";
import { InvalidConfigurationException } from "../om/errors.js";
import { MediatorProperty } from "../pojo/mediator/core/MediatorProperty.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMText } from "../om/om.js";
import { Parameter } from "../pojo/misc/common/Parameter.js";
import { STNode } from "../stNode.js";
import { parseOM } from "../om/om.js";

export class SerializerUtils {
  static serializeExpression(expression: string, element: OMElement, attributeName: string, node: STNode): void {
    let nullNS = element.getOMFactory()
            .createOMNamespace(Constant.EMPTY_STRING, "");

    if (expression != null) {
        element.addAttribute(attributeName, expression, nullNS);
        SerializerUtils.serializeNamespaces(node, element);
    } else {
        throw new InvalidConfigurationException("Expression is not set for the node: " + node);
    }

  }

  static serializeNamespaces(node: STNode, element: OMElement): void {
    let namespaces = node.getNamespaces();
    if (namespaces != null) {
        for (let prefix of [...namespaces.keys()]) {
            if (contains(prefix, ":")) {
                let uri = get(namespaces, prefix);
                prefix = jsplit(prefix, ":")[1];
                element.declareNamespace(uri, prefix);
            }
        }
    }

  }

  static stringToOM(text: string): OMElement {
    let omElement = null;
    try {
        omElement = parseOM(text);
    } catch (e) {

    }
    return omElement;

  }

  static stringToCDATA(text: string): OMText {
    let content = SerializerUtils.removeCDATAFromPayload(text);
    let fac = OMAbstractFactory.getOMFactory();
    let cdata = fac.createOMText(content, 12); 
    return cdata;

  }

  static removeCDATAFromPayload(inputPayload: string): string {
    if (inputPayload.startsWith("<![CDATA[")) {
        inputPayload = inputPayload.substring(9);
        let i = inputPayload.lastIndexOf("]]>");
        if (i == -1)
            throw new IllegalStateException("argument starts with <![CDATA[ but cannot find pairing ]]>");
        inputPayload = inputPayload.substring(0, i);
    }

    return inputPayload;

  }

  static serializeParameters(parameter: Parameter[], parameterElt: OMElement): void {
    if (parameter != null) {
        for (let param of parameter) {
            let paramElt = SerializerUtils.serializeParameter(param);
            if (paramElt != null) {
                parameterElt.addChild(paramElt);
            }
        }
    }

  }

  static serializeParameter(param: Parameter): OMElement {
    if (param != null) {
        let paramElt = OMAbstractFactory.getOMFactory().createOMElement("parameter",
                Constant.SYNAPSE_OMNAMESPACE);
        if (param.getName() != null) {
            paramElt.addAttribute("name", param.getName(), null);
        }
        if (param.getKey() != null) {
            paramElt.addAttribute("key", param.getKey(), null);
        }
        if (param.isLocked()) {
            paramElt.addAttribute("locked", String(param.isLocked()), null);
        }
        if (param.getContent() != null) {
            paramElt.setText(param.getContent());
        }
        return paramElt;
    }
    return null;

  }

  static serializeMediatorProperties(mediatorElt: OMElement, properties: MediatorProperty[]): void {
    if (properties != null) {
        for (let property of properties) {
            let propertyElt = SerializerUtils.serializeMediatorProperty(property);
            mediatorElt.addChild(propertyElt);
        }
    }

  }

  static serializeMediatorProperty(property: MediatorProperty): OMElement {
    let fac = OMAbstractFactory.getOMFactory();
    let propertyElt = fac.createOMElement("property", Constant.SYNAPSE_OMNAMESPACE);
    if (property.getName() != null) {
        propertyElt.addAttribute("name", property.getName(), null);
    }
    if (property.getValue() != null) {
        propertyElt.addAttribute("value", property.getValue(), null);
    } else if (property.getExpression() != null) {
        SerializerUtils.serializeExpression(property.getExpression(), propertyElt, "expression", property);
    }
    return propertyElt;

  }
}
