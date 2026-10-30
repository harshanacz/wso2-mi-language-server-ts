// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/RewriteRewriterule.java by the java2ts converter (see tools/java2ts).
import { RewriteRewriteruleAction } from "./RewriteRewriteruleAction.js";
import { RewriteRewriteruleCondition } from "./RewriteRewriteruleCondition.js";
import { STNode } from "../../../../stNode.js";

export class RewriteRewriterule extends STNode {
  static readonly __fields: string[] = ["condition", "action"];

  condition?: RewriteRewriteruleCondition;

  action?: RewriteRewriteruleAction[];

  getCondition(): RewriteRewriteruleCondition {
    return this.condition;

  }

  setCondition(condition: RewriteRewriteruleCondition): void {
    this.condition = condition;

  }

  getAction(): RewriteRewriteruleAction[] {
    return this.action;

  }

  setAction(action: RewriteRewriteruleAction[]): void {
    this.action = action;

  }
}
