// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/FaultMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Makefault } from "../../../pojo/mediator/transformation/fault/Makefault.js";
import { MakefaultCode } from "../../../pojo/mediator/transformation/fault/MakefaultCode.js";
import { MakefaultDetail } from "../../../pojo/mediator/transformation/fault/MakefaultDetail.js";
import { MakefaultReason } from "../../../pojo/mediator/transformation/fault/MakefaultReason.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { STNode } from "../../../stNode.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class FaultMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let makefault = (m as Makefault);
    let makefaultElt = AbstractMediatorSerializer.fac.createOMElement("makefault", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(makefaultElt, makefault);
    this.serializeCode(makefaultElt, makefault.getCode());
    this.serializeReason(makefaultElt, makefault.getReason());
    this.serializeNode(makefaultElt, makefault.getNode());
    this.serializeRole(makefaultElt, makefault.getRole());
    this.serializeDetail(makefaultElt, makefault.getDetail());

    return makefaultElt;

  }

  serializeAttributes(makefaultElt: OMElement, makefault: Makefault): void {
    if (makefault.getVersion() != null) {
        makefaultElt.addAttribute("version", makefault.getVersion().name(), AbstractMediatorSerializer.nullNS);
    }
    if (makefault.isResponse()) {
        makefaultElt.addAttribute("response", "true", AbstractMediatorSerializer.nullNS);
    }
    if (makefault.getDescription() != null) {
        makefaultElt.addAttribute("description", makefault.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  serializeCode(makefaultElt: OMElement, code: MakefaultCode): void {
    if (code != null) {
        let codeElt = AbstractMediatorSerializer.fac.createOMElement("code", AbstractMediatorSerializer.synNS);
        if (code.getExpression() != null) {
            SerializerUtils.serializeExpression(code.getExpression(), codeElt, "expression", code);
        } else if (code.getValue() != null) {
            SerializerUtils.serializeExpression(code.getValue(), codeElt, "value", code);
        }
        makefaultElt.addChild(codeElt);
    }

  }

  serializeReason(makefaultElt: OMElement, reason: MakefaultReason): void {
    if (reason != null) {
        let reasonElt = AbstractMediatorSerializer.fac.createOMElement("reason", AbstractMediatorSerializer.synNS);
        if (reason.getExpression() != null) {
            SerializerUtils.serializeExpression(reason.getExpression(), reasonElt, "expression", reason);
        } else {
            reasonElt.setText(reason.getTextNode());
        }
        makefaultElt.addChild(reasonElt);
    }

  }

  serializeNode(makefaultElt: OMElement, node: STNode): void {
    if (node != null) {
        let nodeElt = AbstractMediatorSerializer.fac.createOMElement("node", AbstractMediatorSerializer.synNS);
        nodeElt.setText(node.getTextNode());
        makefaultElt.addChild(nodeElt);
    }

  }

  serializeRole(makefaultElt: OMElement, role: STNode): void {
    if (role != null) {
        let roleElt = AbstractMediatorSerializer.fac.createOMElement("role", AbstractMediatorSerializer.synNS);
        roleElt.setText(role.getTextNode());
        makefaultElt.addChild(roleElt);
    }

  }

  serializeDetail(makefaultElt: OMElement, detail: MakefaultDetail): void {
    if (detail != null) {
        let detailElt = AbstractMediatorSerializer.fac.createOMElement("detail", AbstractMediatorSerializer.synNS);
        if (detail.getExpression() != null) {
            SerializerUtils.serializeExpression(detail.getExpression(), detailElt, "expression", detail);
        } else {
            detailElt.setText(detail.getTextNode());
        }
        makefaultElt.addChild(detailElt);
    }

  }

  getMediatorClassName(): string {
    return "Makefault";

  }
}
