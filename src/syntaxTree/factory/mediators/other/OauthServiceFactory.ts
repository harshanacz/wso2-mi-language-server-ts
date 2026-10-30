// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/OauthServiceFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OauthService } from "../../../pojo/mediator/other/OauthService.js";
import { STNode } from "../../../stNode.js";

export class OauthServiceFactory extends AbstractMediatorFactory {
  static readonly OAUTH: string = "oauthService";

  createSpecificMediator(element: DOMElement): Mediator {
    let oauthService = new OauthService();
    oauthService.elementNode(element);
    this.populateAttributes(oauthService, element);
    return oauthService;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let remoteServiceUrl = element.getAttribute(Constant.REMOTE_SERVICE_URL);
    if (remoteServiceUrl != null) {
        ((node as OauthService)).setRemoteServiceUrl(remoteServiceUrl);
    }
    let username = element.getAttribute(Constant.USERNAME);
    if (username != null) {
        ((node as OauthService)).setUsername(username);
    }
    let password = element.getAttribute(Constant.PASSWORD);
    if (password != null) {
        ((node as OauthService)).setPassword(password);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as OauthService)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as OauthService)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return OauthServiceFactory.OAUTH;

  }
}
