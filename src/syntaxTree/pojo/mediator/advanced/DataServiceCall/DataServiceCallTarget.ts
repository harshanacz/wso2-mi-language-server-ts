// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallTarget.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { TargetType } from "../../../misc/TargetType.js";

export class DataServiceCallTarget extends STNode {
  static readonly __fields: string[] = ["type", "name"];

  type?: TargetType;

  name?: string;

  getType(): TargetType {
    return this.type;

  }

  setType(type: TargetType): void {
    this.type = type;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
