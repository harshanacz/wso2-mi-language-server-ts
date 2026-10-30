// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointEnableRM.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointEnableRM extends STNode {
  static readonly __fields: string[] = ["policy"];

  policy?: string;

  getPolicy(): string {
    return this.policy;

  }

  setPolicy(policy: string): void {
    this.policy = policy;

  }
}
