// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/CommentMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "./AbstractMediatorSerializer.js";
import { CommentMediator } from "../../pojo/CommentMediator.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { OMAbstractFactory } from "../../om/om.js";
import { OMElement } from "../../om/om.js";

export class CommentMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    return null;

  }

  static serializeComment(parent: OMElement, m: CommentMediator): OMElement {
    let fac = OMAbstractFactory.getOMFactory();
    let comment = fac.createOMComment(parent, m.getCommentText());
    if (parent != null) {
        parent.addChild(comment);
    }
    return null;

  }

  getMediatorClassName(): string {
    return "CommentMediator";

  }
}
