// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/AbstractMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { Logger, Level } from "../../javaCompat.js";
import { CommentMediator } from "../../pojo/CommentMediator.js";
import { Constant } from "../../constant.js";
import { InvalidConfigurationException } from "../../om/errors.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { MediatorProperty } from "../../pojo/mediator/core/MediatorProperty.js";
import { OMAbstractFactory } from "../../om/om.js";
import { OMElement } from "../../om/om.js";
import { OMFactory } from "../../om/om.js";
import { OMNamespace } from "../../om/om.js";
import { SerializerUtils } from "../SerializerUtils.js";

export abstract class AbstractMediatorSerializer {
  static log: Logger = Logger.getLogger("AbstractMediatorSerializer");

  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static readonly synNS: OMNamespace = Constant.SYNAPSE_OMNAMESPACE;

  static readonly nullNS: OMNamespace = AbstractMediatorSerializer.fac.createOMNamespace(Constant.EMPTY_STRING, "");

  serializeMediator(parent: OMElement, m: Mediator): OMElement {
    if (m instanceof CommentMediator) {
        // inlined CommentMediatorSerializer.serializeComment to avoid an import cycle with its subclass
        const comment = AbstractMediatorSerializer.fac.createOMComment(parent, (m as CommentMediator).getCommentText());
        if (parent != null) {
            parent.addChild(comment);
        }
        return null;
    }
    let mediatorElt = this.serializeSpecificMediator(m);
    if (parent != null) {
        parent.addChild(mediatorElt);
    }
    return mediatorElt;

  }

  abstract serializeSpecificMediator(m: Mediator): OMElement;

  abstract getMediatorClassName(): string;

  serializeMediatorProperties(mediatorElt: OMElement, properties: MediatorProperty[]): void {
    if (properties != null) {
        for (let property of properties) {
            let propertyElt = this.serializeMediatorProperty(property);
            mediatorElt.addChild(propertyElt);
        }
    }

  }

  serializeMediatorProperty(property: MediatorProperty): OMElement {
    let propertyElt = AbstractMediatorSerializer.fac.createOMElement("property", AbstractMediatorSerializer.synNS);
    if (property.getName() != null) {
        propertyElt.addAttribute("name", property.getName(), AbstractMediatorSerializer.nullNS);
    } else {
        this.handleException("Mediator property must have a name");
    }
    if (property.getValue() != null) {
        propertyElt.addAttribute("value", property.getValue(), AbstractMediatorSerializer.nullNS);
    } else if (property.getExpression() != null) {
        SerializerUtils.serializeExpression(property.getExpression(), propertyElt, "expression", property);
    } else {
        this.handleException("Mediator property must have a literal value or be an expression");
    }
    return propertyElt;

  }

  handleException(s: string): void {
    AbstractMediatorSerializer.log.log(Level.SEVERE, s);
    throw new InvalidConfigurationException(s);

  }
}
