// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/InboundDebugInfo.java by the java2ts converter (see tools/java2ts).
import { DebugInfo } from "./DebugInfo.js";
import { JsonElement } from "../../../gson.js";

export class InboundDebugInfo extends DebugInfo {
  static readonly __fields: string[] = [];

  toJson(): JsonElement {
    return null;

  }

  toString(): string {
    return "InboundDebugInfo{" +
            "mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
