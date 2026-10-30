// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/ValidateFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Feature } from "../../../pojo/mediator/core/Feature.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Validate } from "../../../pojo/mediator/core/validate/Validate.js";
import { ValidateOnFail } from "../../../pojo/mediator/core/validate/ValidateOnFail.js";
import { ValidateProperty } from "../../../pojo/mediator/core/validate/ValidateProperty.js";
import { ValidateResource } from "../../../pojo/mediator/core/validate/ValidateResource.js";
import { ValidateSchema } from "../../../pojo/mediator/core/validate/ValidateSchema.js";

export class ValidateFactory extends AbstractMediatorFactory {
  static readonly VALIDATE: string = "validate";

  createSpecificMediator(element: DOMElement): Mediator {
    let validate = new Validate();
    validate.elementNode(element);
    this.populateAttributes(validate, element);
    let children = element.getChildren();
    let validateProperties = [];
    let validateSchemas = [];
    let features = [];
    let validateResources = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let nodeName = node.getNodeName();
            if (equalsIgnoreCase(nodeName, Constant.PROPERTY)) {
                let validateProperty = new ValidateProperty();
                validateProperty.elementNode((node as DOMElement));
                this.populatePropertyAttributes(validateProperty, (node as DOMElement));
                validateProperties.push(validateProperty);
            } else if (equalsIgnoreCase(nodeName, Constant.SCHEMA)) {
                let validateSchema = new ValidateSchema();
                validateSchema.elementNode((node as DOMElement));
                this.populateSchemaAttributes(validateSchema, (node as DOMElement));
                validateSchemas.push(validateSchema);
            } else if (equalsIgnoreCase(nodeName, Constant.ON_FAIL)) {
                let validateOnFail = new ValidateOnFail();
                validateOnFail.elementNode((node as DOMElement));
                let onFailChildren = node.getChildren();
                if (onFailChildren != null && !isEmpty(onFailChildren)) {
                    let mediators = SyntaxTreeUtils.createMediators(onFailChildren);
                    validateOnFail.setMediatorList(mediators);
                }
                validate.setOnFail(validateOnFail);
            } else if (equalsIgnoreCase(nodeName, Constant.FEATURE)) {
                let feature = new Feature();
                feature.elementNode((node as DOMElement));
                this.populateFeatureAttributes(feature, (node as DOMElement));
                features.push(feature);
            } else if (equalsIgnoreCase(nodeName, Constant.RESOURCE)) {
                let validateResource = new ValidateResource();
                validateResource.elementNode((node as DOMElement));
                this.populateResourceAttributes(validateResource, (node as DOMElement));
                validateResources.push(validateResource);
            } else {

            }
        }
    }
    validate.setProperty(validateProperties.slice());
    validate.setSchema(validateSchemas.slice());
    validate.setFeature(features.slice());
    validate.setResource(validateResources.slice());
    return validate;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Validate)).setDescription(description);
    }
    let source = element.getAttribute(Constant.SOURCE);
    if (source != null) {
        ((node as Validate)).setSource(source);
    }
    let cacheSchema = element.getAttribute(Constant.CACHE_SCHEMA);
    if (cacheSchema != null) {
        ((node as Validate)).setCacheSchema(parseBoolean(cacheSchema));
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Validate)).setTraceFilter(traceFilter);
    }

  }

  populatePropertyAttributes(validateProperty: ValidateProperty, node: DOMElement): void {
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        validateProperty.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        validateProperty.setValue(parseBoolean(value));
    }

  }

  populateSchemaAttributes(validateSchema: ValidateSchema, node: DOMElement): void {
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        validateSchema.setKey(key);
    }

  }

  populateFeatureAttributes(feature: Feature, node: DOMElement): void {
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        feature.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        feature.setValue(parseBoolean(value));
    }

  }

  populateResourceAttributes(validateResource: ValidateResource, node: DOMElement): void {
    let location = node.getAttribute(Constant.LOCATION);
    if (location != null) {
        validateResource.setLocation(location);
    }
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        validateResource.setKey(key);
    }

  }

  getTagName(): string {
    return ValidateFactory.VALIDATE;

  }
}
