// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/evaluators/Not.java by the java2ts converter (see tools/java2ts).
import { And } from "./And.js";
import { Equal } from "./Equal.js";
import { Or } from "./Or.js";
import { STNode } from "../../../stNode.js";

export class Not extends STNode {
  and?: And;

  or?: Or;

  equal?: Equal;

  not?: Not;

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
}
