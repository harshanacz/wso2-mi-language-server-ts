// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/XsltMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { Xslt } from "../../../pojo/mediator/transformation/xslt/Xslt.js";
import { XsltFeature } from "../../../pojo/mediator/transformation/xslt/XsltFeature.js";
import { XsltResource } from "../../../pojo/mediator/transformation/xslt/XsltResource.js";

export class XsltMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let xsltMediator = (m as Xslt);
    let xsltElt = AbstractMediatorSerializer.fac.createOMElement("xslt", AbstractMediatorSerializer.synNS);

    if (xsltMediator.getKey() != null) {
        xsltElt.addAttribute("key", xsltMediator.getKey(), null);
    } else {
        this.handleException("Invalid Xslt mediator. " +
                "Should have a 'key' ");
    }

    if (xsltMediator.getSource() != null) {
        SerializerUtils.serializeExpression(xsltMediator.getSource(), xsltElt, "source", xsltMediator);
    }

    if (xsltMediator.getDescription() != null) {
        xsltElt.addAttribute("description", xsltMediator.getDescription(), null);
    }

    this.serializeMediatorProperties(xsltElt, xsltMediator.getProperty());
    this.serializeFeatures(xsltElt, xsltMediator.getFeature());
    this.serializeResources(xsltElt, xsltMediator.getResource());

    return xsltElt;

  }

  serializeFeatures(xsltElt: OMElement, features: XsltFeature[]): void {
    if (features != null) {
        for (let feature of features) {
            let featureElt = AbstractMediatorSerializer.fac.createOMElement("feature", AbstractMediatorSerializer.synNS);
            if (feature.getName() != null) {
                featureElt.addAttribute("name", feature.getName(), null);
            }
            featureElt.addAttribute("value", String(feature.isValue()), null);
            xsltElt.addChild(featureElt);
        }
    }

  }

  serializeResources(xsltElt: OMElement, resources: XsltResource[]): void {
    if (resources != null) {
        for (let resource of resources) {
            let resourceElt = AbstractMediatorSerializer.fac.createOMElement("resource", AbstractMediatorSerializer.synNS);
            if (resource.getLocation() != null) {
                resourceElt.addAttribute("location", resource.getLocation(), null);
            }
            if (resource.getKey() != null) {
                resourceElt.addAttribute("key", resource.getKey(), null);
            }
            xsltElt.addChild(resourceElt);
        }
    }

  }

  getMediatorClassName(): string {
    return "Xslt";

  }
}
