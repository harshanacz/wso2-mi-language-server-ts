// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/loadbalance/EndpointLoadbalance.java by the java2ts converter (see tools/java2ts).
import { EndpointOrMember } from "./EndpointOrMember.js";
import { STNode } from "../../../stNode.js";

export class EndpointLoadbalance extends STNode {
  static readonly __fields: string[] = ["endpointOrMember", "algorithm", "failover", "policy", "buildMessage"];

  endpointOrMember?: EndpointOrMember[];

  algorithm?: string;

  failover: boolean = true;

  policy?: string;

  buildMessage: boolean = false;

  getEndpointOrMember(): EndpointOrMember[] {
    return this.endpointOrMember;

  }

  setEndpointOrMember(endpointOrMember: EndpointOrMember[]): void {
    this.endpointOrMember = endpointOrMember;

  }

  getAlgorithm(): string {
    return this.algorithm;

  }

  setAlgorithm(algorithm: string): void {
    this.algorithm = algorithm;

  }

  isFailover(): boolean {
    return this.failover;

  }

  setFailover(failover: boolean): void {
    this.failover = failover;

  }

  getPolicy(): string {
    return this.policy;

  }

  setPolicy(policy: string): void {
    this.policy = policy;

  }

  isBuildMessage(): boolean {
    return this.buildMessage;

  }

  setBuildMessage(buildMessage: boolean): void {
    this.buildMessage = buildMessage;

  }
}
