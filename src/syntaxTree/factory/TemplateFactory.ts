// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/TemplateFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, contains, parseBoolean, enumValueOf } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { EndpointFactory } from "./endpoint/EndpointFactory.js";
import { NamedEndpoint } from "../pojo/endpoint/NamedEndpoint.js";
import { NamedSequence } from "../pojo/NamedSequence.js";
import { NamedSequenceFactory } from "./NamedSequenceFactory.js";
import { STNode } from "../stNode.js";
import { Template } from "../pojo/template/Template.js";
import { TemplateArtifactType } from "../pojo/template/TemplateArtifactType.js";
import { TemplateParameter } from "../pojo/template/TemplateParameter.js";

export class TemplateFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let template = new Template();
    template.elementNode(element);
    this.populateAttributes(template, element);
    let children = element.getChildren();
    let parameters = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(Constant.DESCRIPTION, name)) {
                let description = new STNode();
                description.elementNode((child as DOMElement));
                template.setDescription(description);
            } else if (contains(name, Constant.PARAMETER)) {
                let parameter = this.createTemplateParameter(child);
                parameters.push(parameter);
            } else if (equalsIgnoreCase(name, Constant.ENDPOINT)) {
                let factory = new EndpointFactory();
                let endpoint = (factory.create((child as DOMElement)) as NamedEndpoint);
                template.setEndpoint(endpoint);
                template.setType(enumValueOf(TemplateArtifactType, endpoint.getType().name()));
            } else if (equalsIgnoreCase(name, Constant.SEQUENCE)) {
                let factory = new NamedSequenceFactory();
                let sequence = (factory.create((child as DOMElement)) as NamedSequence);
                template.setSequence(sequence);
                template.setType(TemplateArtifactType.SEQUENCE);
            }
        }
        template.setParameter(parameters.slice());
    }
    return template;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as Template)).setName(name);
    }
    let onError = element.getAttribute(Constant.ON_ERROR);
    if (onError != null) {
        ((node as Template)).setOnError(onError);
    }

  }

  createTemplateParameter(element: DOMNode): TemplateParameter {
    let parameter = new TemplateParameter();
    parameter.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        parameter.setName(name);
    }
    let isMandatory = element.getAttribute(Constant.IS_MANDATORY);
    if (isMandatory != null) {
        parameter.setMandatory(parseBoolean(isMandatory));
    }
    let defaultValue = element.getAttribute(Constant.DEFAULT_VALUE);
    if (defaultValue != null) {
        parameter.setDefaultValue(defaultValue);
    }
    let paramNamespacePrefix = element.getPrefix();
    if (paramNamespacePrefix != null) {
        parameter.setParamNamespacePrefix(paramNamespacePrefix);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        parameter.setDescription(description);
    }



    return parameter;

  }
}
