// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleChildMediators.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { STNode } from "../../../../stNode.js";

export class RuleChildMediators extends STNode {
  static readonly __fields: string[] = ["mediatorList"];

  mediatorList?: Mediator[];

  getMediatorList(): Mediator[] {
    return this.mediatorList;

  }

  setMediatorList(mediatorList: Mediator[]): void {
    this.mediatorList = mediatorList;

  }
}
