// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/ValidateMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Feature } from "../../../pojo/mediator/core/Feature.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { Validate } from "../../../pojo/mediator/core/validate/Validate.js";
import { ValidateOnFail } from "../../../pojo/mediator/core/validate/ValidateOnFail.js";
import { ValidateProperty } from "../../../pojo/mediator/core/validate/ValidateProperty.js";
import { ValidateResource } from "../../../pojo/mediator/core/validate/ValidateResource.js";
import { ValidateSchema } from "../../../pojo/mediator/core/validate/ValidateSchema.js";

export class ValidateMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let validate = (m as Validate);
    let validateElt = AbstractMediatorSerializer.fac.createOMElement("validate", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(validateElt, validate);
    this.serializeProperty(validateElt, validate.getProperty());
    this.serializeSchema(validateElt, validate.getSchema());
    this.serializeFeature(validateElt, validate.getFeature());
    this.serializeResource(validateElt, validate.getResource());
    this.serializeOnFail(validateElt, validate.getOnFail());

    return validateElt;

  }

  serializeAttributes(validateElt: OMElement, validate: Validate): void {
    if (validate.isCacheSchema()) {
        validateElt.addAttribute("cache-schema", String(validate.isCacheSchema()), AbstractMediatorSerializer.nullNS);
    }
    if (validate.getSource() != null) {
        SerializerUtils.serializeExpression(validate.getSource(), validateElt, "source", validate);
    }
    if (validate.getDescription() != null) {
        validateElt.addAttribute("description", validate.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  serializeProperty(validateElt: OMElement, property: ValidateProperty[]): void {
    if (property != null) {
        for (let prop of property) {
            let propElt = AbstractMediatorSerializer.fac.createOMElement("property", AbstractMediatorSerializer.synNS);
            if (prop.getName() != null) {
                propElt.addAttribute("name", prop.getName(), AbstractMediatorSerializer.nullNS);
            }
            if (prop.isValue()) {
                propElt.addAttribute("value", String(prop.isValue()), AbstractMediatorSerializer.nullNS);
            }
            validateElt.addChild(propElt);
        }
    }

  }

  serializeSchema(validateElt: OMElement, schemas: ValidateSchema[]): void {
    if (schemas != null) {
        for (let schema of schemas) {
            let schemaElt = AbstractMediatorSerializer.fac.createOMElement("schema", AbstractMediatorSerializer.synNS);
            if (schema.getKey() != null) {
                schemaElt.addAttribute("key", schema.getKey(), AbstractMediatorSerializer.nullNS);
            }
            validateElt.addChild(schemaElt);
        }
    }

  }

  serializeFeature(validateElt: OMElement, features: Feature[]): void {
    if (features != null) {
        for (let feature of features) {
            let featureElt = AbstractMediatorSerializer.fac.createOMElement("feature", AbstractMediatorSerializer.synNS);
            if (feature.getName() != null) {
                featureElt.addAttribute("name", feature.getName(), AbstractMediatorSerializer.nullNS);
            }
            featureElt.addAttribute("value", String(feature.isValue()), AbstractMediatorSerializer.nullNS);

            validateElt.addChild(featureElt);
        }
    }

  }

  serializeResource(validateElt: OMElement, resources: ValidateResource[]): void {
    if (resources != null) {
        for (let resource of resources) {
            let resourceElt = AbstractMediatorSerializer.fac.createOMElement("resource", AbstractMediatorSerializer.synNS);
            if (resource.getKey() != null) {
                resourceElt.addAttribute("key", resource.getKey(), AbstractMediatorSerializer.nullNS);
            }
            if (resource.getLocation() != null) {
                resourceElt.addAttribute("location", resource.getLocation(), AbstractMediatorSerializer.nullNS);
            }
            validateElt.addChild(resourceElt);
        }
    }

  }

  serializeOnFail(validateElt: OMElement, onFail: ValidateOnFail): void {
    let onFailElt = AbstractMediatorSerializer.fac.createOMElement("on-fail", AbstractMediatorSerializer.synNS);
    if (onFail != null && onFail.getMediatorList() != null) {
        AnonymousSequenceSerializer.serializeAnonymousSequence(onFail.getMediatorList(), onFailElt);
    }
    validateElt.addChild(onFailElt);

  }

  getMediatorClassName(): string {
    return "Validate";

  }
}
