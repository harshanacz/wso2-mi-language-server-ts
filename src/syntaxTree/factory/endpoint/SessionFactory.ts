// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/SessionFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty, getEnumFromValue } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { EndpointSession } from "../../pojo/endpoint/EndpointSession.js";
import { STNode } from "../../stNode.js";
import { SessionType } from "../../pojo/endpoint/SessionType.js";
import { Utils } from "../../utils.js";

export class SessionFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let session = new EndpointSession();
    session.elementNode(element);
    this.populateAttributes(session, element);
    let sessionTimeout = element.getFirstChild();
    if (sessionTimeout != null) {
        let timeout = Utils.getInlineString(sessionTimeout.getFirstChild());
        if (timeout != null && !isEmpty(timeout)) {
            session.setSessionTimeout(Utils.parseInt(timeout));
        }
    }
    return session;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, SessionType);
    if (typeEnum != null) {
        ((node as EndpointSession)).setType(typeEnum);
    }

  }
}
