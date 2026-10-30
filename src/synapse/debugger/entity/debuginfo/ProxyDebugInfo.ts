// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/ProxyDebugInfo.java by the java2ts converter (see tools/java2ts).
import { DebugInfo } from "./DebugInfo.js";
import { JsonElement } from "../../../gson.js";
import { JsonObject } from "../../../gson.js";

export class ProxyDebugInfo extends DebugInfo {
  static readonly __fields: string[] = ["proxyKey", "sequenceType"];

  proxyKey?: string;

  sequenceType?: string;

  setProxyKey(proxyKey: string): void {
    this.proxyKey = proxyKey;

  }

  setSequenceType(sequenceType: string): void {
    this.sequenceType = sequenceType;

  }

  getProxyKey(): string {
    return this.proxyKey;

  }

  getSequenceType(): string {
    return this.sequenceType;

  }

  toJson(): JsonElement {
    let rootNode = new JsonObject();
    let sequence = new JsonObject();
    let proxy = new JsonObject();
    proxy.addProperty("proxy-key", this.proxyKey);
    proxy.addProperty("sequence-type", this.sequenceType);
    proxy.addProperty("mediator-position", this.mediatorPosition);
    sequence.add("proxy", proxy);
    rootNode.add("sequence", sequence);

    rootNode.addProperty("mediation-component", "sequence");
    return rootNode;

  }

  toString(): string {
    return "ProxyDebugInfo{" +
            "proxyKey='" + this.proxyKey + '\'' +
            ", sequenceType='" + this.sequenceType + '\'' +
            ", mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
