// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/NtlmFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Ntlm } from "../../../pojo/mediator/other/ntlm/Ntlm.js";
import { STNode } from "../../../stNode.js";

export class NtlmFactory extends AbstractMediatorFactory {
  static readonly NTLM: string = "NTLM";

  createSpecificMediator(element: DOMElement): Mediator {
    let ntlm = new Ntlm();
    ntlm.elementNode(element);
    this.populateAttributes(ntlm, element);
    return ntlm;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let domain = element.getAttribute(Constant.DOMAIN);
    if (domain != null) {
        ((node as Ntlm)).setDomain(domain);
    }
    let host = element.getAttribute(Constant.HOST);
    if (host != null) {
        ((node as Ntlm)).setHost(host);
    }
    let username = element.getAttribute(Constant.USERNAME);
    if (username != null) {
        ((node as Ntlm)).setUsername(username);
    }
    let password = element.getAttribute(Constant.PASSWORD);
    if (password != null) {
        ((node as Ntlm)).setPassword(password);
    }
    let ntlmVersion = element.getAttribute(Constant.NTLM_VERSION);
    if (ntlmVersion != null) {
        ((node as Ntlm)).setNtlmVersion(ntlmVersion);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Ntlm)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Ntlm)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return NtlmFactory.NTLM;

  }
}
