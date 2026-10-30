// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/SequenceDebugInfo.java by the java2ts converter (see tools/java2ts).
import { DebugInfo } from "./DebugInfo.js";
import { JsonElement } from "../../../gson.js";
import { JsonObject } from "../../../gson.js";

export class SequenceDebugInfo extends DebugInfo {
  static readonly __fields: string[] = ["sequenceKey"];

  sequenceKey?: string;

  setSequenceKey(sequenceKey: string): void {
    this.sequenceKey = sequenceKey;

  }

  toJson(): JsonElement {
    let rootNode = new JsonObject();
    let sequence = new JsonObject();
    sequence.addProperty("sequence-type", "named");
    sequence.addProperty("sequence-key", this.sequenceKey);
    sequence.addProperty("mediator-position", this.mediatorPosition);

    rootNode.add("sequence", sequence);

    rootNode.addProperty("mediation-component", "sequence");

    return rootNode;

  }

  toString(): string {
    return "SequenceDebugInfo{" +
            "sequenceKey='" + this.sequenceKey + '\'' +
            ", mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
