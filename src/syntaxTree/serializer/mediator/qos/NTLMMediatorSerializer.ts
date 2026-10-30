// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/qos/NTLMMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Ntlm } from "../../../pojo/mediator/other/ntlm/Ntlm.js";
import { OMElement } from "../../../om/om.js";

export class NTLMMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let ntlm = (m as Ntlm);
    let ntlmElt = AbstractMediatorSerializer.fac.createOMElement("NTLM", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(ntlmElt, ntlm);

    return ntlmElt;

  }

  serializeAttributes(ntlmElt: OMElement, ntlm: Ntlm): void {
    if (ntlm.getDomain() != null) {
        ntlmElt.addAttribute("domain", ntlm.getDomain(), AbstractMediatorSerializer.nullNS);
    }
    if (ntlm.getHost() != null) {
        ntlmElt.addAttribute("host", ntlm.getHost(), AbstractMediatorSerializer.nullNS);
    }
    if (ntlm.getUsername() != null) {
        ntlmElt.addAttribute("username", ntlm.getUsername(), AbstractMediatorSerializer.nullNS);
    }
    if (ntlm.getPassword() != null) {
        ntlmElt.addAttribute("password", ntlm.getPassword(), AbstractMediatorSerializer.nullNS);
    }
    if (ntlm.getNtlmVersion() != null) {
        ntlmElt.addAttribute("ntlmVersion", ntlm.getNtlmVersion(), AbstractMediatorSerializer.nullNS);
    }
    if (ntlm.getDescription() != null) {
        ntlmElt.addAttribute("description", ntlm.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  getMediatorClassName(): string {
    return "Ntlm";

  }
}
