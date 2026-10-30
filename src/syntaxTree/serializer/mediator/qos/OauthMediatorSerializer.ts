// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/qos/OauthMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { OauthService } from "../../../pojo/mediator/other/OauthService.js";

export class OauthMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let oauthService = (m as OauthService);
    let oauthServiceElt = AbstractMediatorSerializer.fac.createOMElement("oauthService", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(oauthService, oauthServiceElt);

    return oauthServiceElt;

  }

  serializeAttributes(oauthService: OauthService, oauthServiceElt: OMElement): void {
    if (oauthService.getRemoteServiceUrl() != null) {
        oauthServiceElt.addAttribute("remoteServiceUrl", oauthService.getRemoteServiceUrl(), AbstractMediatorSerializer.nullNS);
    }
    if (oauthService.getUsername() != null) {
        oauthServiceElt.addAttribute("username", oauthService.getUsername(), AbstractMediatorSerializer.nullNS);
    }
    if (oauthService.getPassword() != null) {
        oauthServiceElt.addAttribute("password", oauthService.getPassword(), AbstractMediatorSerializer.nullNS);
    }
    if (oauthService.getDescription() != null) {
        oauthServiceElt.addAttribute("description", oauthService.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  getMediatorClassName(): string {
    return "OauthService";

  }
}
