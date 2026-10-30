// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/qos/EntitlementMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { EntitlementService } from "../../../pojo/mediator/other/entitlement/EntitlementService.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class EntitlementMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let entitlementService = (m as EntitlementService);
    let entitlementServiceElt = AbstractMediatorSerializer.fac.createOMElement("entitlementService", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(entitlementService, entitlementServiceElt);
    this.serializeChildren(entitlementServiceElt, entitlementService);
    return entitlementServiceElt;

  }

  serializeAttributes(entitlementService: EntitlementService, entitlementServiceElt: OMElement): void {
    if (entitlementService.getRemoteServiceUrl() != null) {
        entitlementServiceElt.addAttribute("remoteServiceUrl", entitlementService.getRemoteServiceUrl(), AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getRemoteServiceUserName() != null) {
        entitlementServiceElt.addAttribute("remoteServiceUserName", entitlementService.getRemoteServiceUserName()
                , AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getRemoteServicePassword() != null) {
        entitlementServiceElt.addAttribute("remoteServicePassword", entitlementService.getRemoteServicePassword()
                , AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getCallbackClass() != null) {
        entitlementServiceElt.addAttribute("callbackClass", entitlementService.getCallbackClass(), AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getClient() != null) {
        entitlementServiceElt.addAttribute("client", entitlementService.getClient().name(), AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getThriftHost() != null) {
        entitlementServiceElt.addAttribute("thriftHost", entitlementService.getThriftHost(), AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getThriftPort() != null) {
        entitlementServiceElt.addAttribute("thriftPort", entitlementService.getThriftPort(), AbstractMediatorSerializer.nullNS);
    }
    if (entitlementService.getDescription() != null) {
        entitlementServiceElt.addAttribute("description", entitlementService.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  serializeChildren(entitlementServiceElt: OMElement, entitlementService: EntitlementService): void {
    if (entitlementService.getOnRejectAttribute() != null) {
        entitlementServiceElt.addAttribute("onReject", entitlementService.getOnRejectAttribute(), AbstractMediatorSerializer.nullNS);
    } else if (entitlementService.getOnReject() != null) {
        let onRejectElt =
                AnonymousSequenceSerializer.serializeAnonymousSequence(entitlementService.getOnReject());
        onRejectElt.setLocalName("onReject");
        entitlementServiceElt.addChild(onRejectElt);
    }

    if (entitlementService.getOnAcceptAttribute() != null) {
        entitlementServiceElt.addAttribute("onAccept", entitlementService.getOnAcceptAttribute(), AbstractMediatorSerializer.nullNS);
    } else if (entitlementService.getOnAccept() != null) {
        let onAcceptElt =
                AnonymousSequenceSerializer.serializeAnonymousSequence(entitlementService.getOnAccept());
        onAcceptElt.setLocalName("onAccept");
        entitlementServiceElt.addChild(onAcceptElt);
    }

    if (entitlementService.getAdviceAttribute() != null) {
        entitlementServiceElt.addAttribute("advice", entitlementService.getAdviceAttribute(), AbstractMediatorSerializer.nullNS);
    } else if (entitlementService.getAdvice() != null) {
        let adviceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(entitlementService.getAdvice());
        adviceElt.setLocalName("advice");
        entitlementServiceElt.addChild(adviceElt);
    }

    if (entitlementService.getObligationsAttribute() != null) {
        entitlementServiceElt.addAttribute("obligations", entitlementService.getObligationsAttribute(), AbstractMediatorSerializer.nullNS);
    } else if (entitlementService.getObligations() != null) {
        let obligationsElt =
                AnonymousSequenceSerializer.serializeAnonymousSequence(entitlementService.getObligations());
        obligationsElt.setLocalName("obligations");
        entitlementServiceElt.addChild(obligationsElt);
    }

  }

  getMediatorClassName(): string {
    return "EntitlementService";

  }
}
