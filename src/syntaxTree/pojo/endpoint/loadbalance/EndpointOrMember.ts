// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/loadbalance/EndpointOrMember.java by the java2ts converter (see tools/java2ts).
import { EndpointLoadbalanceEndpoint } from "./EndpointLoadbalanceEndpoint.js";
import { EndpointLoadbalanceMember } from "./EndpointLoadbalanceMember.js";
import { STNode } from "../../../stNode.js";

export class EndpointOrMember extends STNode {
  static readonly __fields: string[] = ["endpoint", "member"];

  endpoint?: EndpointLoadbalanceEndpoint | undefined;

  member?: EndpointLoadbalanceMember | undefined;

  getEndpoint(): EndpointLoadbalanceEndpoint | undefined {
    return this.endpoint;

  }

  setEndpoint(endpoint: EndpointLoadbalanceEndpoint | undefined): void {
    this.endpoint = endpoint;

  }

  getMember(): EndpointLoadbalanceMember | undefined {
    return this.member;

  }

  setMember(member: EndpointLoadbalanceMember | undefined): void {
    this.member = member;

  }

  isEndpoint(): boolean {
    if (this.endpoint != null) {
        return (this.endpoint != null);
    }
    return false;

  }

  isMember(): boolean {
    if (this.member != null) {
        return (this.member != null);
    }
    return false;

  }
}
