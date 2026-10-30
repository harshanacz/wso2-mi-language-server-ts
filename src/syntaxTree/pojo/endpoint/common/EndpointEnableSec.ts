// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointEnableSec.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointEnableSec extends STNode {
  static readonly __fields: string[] = ["policy", "inboundPolicy", "outboundPolicy"];

  policy?: string;

  inboundPolicy?: string;

  outboundPolicy?: string;

  getPolicy(): string {
    return this.policy;

  }

  setPolicy(policy: string): void {
    this.policy = policy;

  }

  getInboundPolicy(): string {
    return this.inboundPolicy;

  }

  setInboundPolicy(inboundPolicy: string): void {
    this.inboundPolicy = inboundPolicy;

  }

  getOutboundPolicy(): string {
    return this.outboundPolicy;

  }

  setOutboundPolicy(outboundPolicy: string): void {
    this.outboundPolicy = outboundPolicy;

  }
}
