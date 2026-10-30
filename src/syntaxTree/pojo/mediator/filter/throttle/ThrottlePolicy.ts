// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/throttle/ThrottlePolicy.java by the java2ts converter (see tools/java2ts).
import { AccessType } from "./AccessType.js";
import { ID } from "./ID.js";
import { STNode } from "../../../../stNode.js";

export class ThrottlePolicy extends STNode {
  static readonly __fields: string[] = ["id", "accessType"];

  id?: ID;

  accessType?: AccessType;

  getId(): ID {
    return this.id;

  }

  setId(id: ID): void {
    this.id = id;

  }

  getAccessType(): AccessType {
    return this.accessType;

  }

  setAccessType(accessType: AccessType): void {
    this.accessType = accessType;

  }
}
