// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/evaluators/EvaluatorList.java by the java2ts converter (see tools/java2ts).
import { And } from "./And.js";
import { Equal } from "./Equal.js";
import { Not } from "./Not.js";
import { Or } from "./Or.js";
import { STNode } from "../../../stNode.js";

export class EvaluatorList extends STNode {
  and?: And | undefined;

  or?: Or | undefined;

  equal?: Equal | undefined;

  not?: Not | undefined;

  getAnd(): And | undefined {
    return this.and;

  }

  setAnd(and: And | undefined): void {
    this.and = and;

  }

  getOr(): Or | undefined {
    return this.or;

  }

  setOr(or: Or | undefined): void {
    this.or = or;

  }

  getEqual(): Equal | undefined {
    return this.equal;

  }

  setEqual(equal: Equal | undefined): void {
    this.equal = equal;

  }

  getNot(): Not | undefined {
    return this.not;

  }

  setNot(not: Not | undefined): void {
    this.not = not;

  }
}
