// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/RewriteRewriteruleCondition.java by the java2ts converter (see tools/java2ts).
import { And } from "../../../misc/evaluators/And.js";
import { Equal } from "../../../misc/evaluators/Equal.js";
import { Not } from "../../../misc/evaluators/Not.js";
import { Or } from "../../../misc/evaluators/Or.js";
import { STNode } from "../../../../stNode.js";

export class RewriteRewriteruleCondition extends STNode {
  and?: And;

  or?: Or;

  equal?: Equal;

  not?: Not;

  condition?: string;

  getAnd(): And {
    return this.and;

  }

  setAnd(and: And): void {
    this.and = and;

  }

  getOr(): Or {
    return this.or;

  }

  setOr(or: Or): void {
    this.or = or;

  }

  getEqual(): Equal {
    return this.equal;

  }

  setEqual(equal: Equal): void {
    this.equal = equal;

  }

  getNot(): Not {
    return this.not;

  }

  setNot(not: Not): void {
    this.not = not;

  }

  getCondition(): string {
    return this.condition;

  }

  setCondition(condition: string): void {
    this.condition = condition;

  }
}
