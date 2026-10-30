// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouterConditionalRouteCondition.java by the java2ts converter (see tools/java2ts).
import { Equal } from "../../../misc/evaluators/Equal.js";
import { STNode } from "../../../../stNode.js";

export class ConditionalRouterConditionalRouteCondition extends STNode {
  static readonly __fields: string[] = ["equal"];

  equal?: Equal;

  getEqual(): Equal {
    return this.equal;

  }

  setEqual(equal: Equal): void {
    this.equal = equal;

  }
}
