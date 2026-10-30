// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/ProxyPolicy.java by the java2ts converter (see tools/java2ts).
import { ProxyPolicyType } from "./ProxyPolicyType.js";
import { STNode } from "../../stNode.js";

export class ProxyPolicy extends STNode {
  key?: string;

  type?: ProxyPolicyType;

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getType(): ProxyPolicyType {
    return this.type;

  }

  setType(type: ProxyPolicyType): void {
    this.type = type;

  }
}
