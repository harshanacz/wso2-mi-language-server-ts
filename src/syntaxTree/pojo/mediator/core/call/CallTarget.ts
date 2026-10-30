// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/call/CallTarget.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { TargetType } from "../../../misc/TargetType.js";

export class CallTarget extends STNode {
  type?: TargetType;

  getType(): TargetType {
    return this.type;

  }

  setType(type: TargetType): void {
    this.type = type;

  }
}
