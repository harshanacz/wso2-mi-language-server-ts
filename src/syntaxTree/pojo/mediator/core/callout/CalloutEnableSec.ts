// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/callout/CalloutEnableSec.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class CalloutEnableSec extends STNode {
  static readonly __fields: string[] = ["policy", "outboundPolicy", "inboundPolicy"];

  policy?: string;

  outboundPolicy?: string;

  inboundPolicy?: string;

  getPolicy(): string {
    return this.policy;

  }

  setPolicy(policy: string): void {
    this.policy = policy;

  }

  getOutboundPolicy(): string {
    return this.outboundPolicy;

  }

  setOutboundPolicy(outboundPolicy: string): void {
    this.outboundPolicy = outboundPolicy;

  }

  getInboundPolicy(): string {
    return this.inboundPolicy;

  }

  setInboundPolicy(inboundPolicy: string): void {
    this.inboundPolicy = inboundPolicy;

  }
}
