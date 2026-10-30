// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/evaluators/Or.java by the java2ts converter (see tools/java2ts).
import { EvaluatorList } from "./EvaluatorList.js";
import { STNode } from "../../../stNode.js";

export class Or extends STNode {
  evaluatorList?: EvaluatorList[];

  getEvaluatorList(): EvaluatorList[] {
    return this.evaluatorList;

  }

  setEvaluatorList(evaluatorList: EvaluatorList[]): void {
    this.evaluatorList = evaluatorList;

  }
}
