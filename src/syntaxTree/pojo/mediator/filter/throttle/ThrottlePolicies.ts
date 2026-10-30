// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/throttle/ThrottlePolicies.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { ThrottlePolicy } from "./ThrottlePolicy.js";

export class ThrottlePolicies extends STNode {
  static readonly __fields: string[] = ["maximumConcurrentAccess", "policies", "key"];

  maximumConcurrentAccess: number = 0;

  policies?: ThrottlePolicy[];

  key?: string;

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getMaximumConcurrentAccess(): number {
    return this.maximumConcurrentAccess;

  }

  setMaximumConcurrentAccess(maximumConcurrentAccess: number): void {
    this.maximumConcurrentAccess = maximumConcurrentAccess;

  }

  getPolicies(): ThrottlePolicy[] {
    return this.policies;

  }

  setPolicies(policies: ThrottlePolicy[]): void {
    this.policies = policies;

  }
}
