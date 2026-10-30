// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/EndpointSession.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { SessionType } from "./SessionType.js";

export class EndpointSession extends STNode {
  sessionTimeout: number = 0;

  type?: SessionType;

  getSessionTimeout(): number {
    return this.sessionTimeout;

  }

  setSessionTimeout(sessionTimeout: number): void {
    this.sessionTimeout = sessionTimeout;

  }

  getType(): SessionType {
    return this.type;

  }

  setType(type: SessionType): void {
    this.type = type;

  }
}
