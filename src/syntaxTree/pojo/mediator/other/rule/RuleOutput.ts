// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleOutput.java by the java2ts converter (see tools/java2ts).
import { RuleOutputFact } from "./RuleOutputFact.js";
import { STNode } from "../../../../stNode.js";

export class RuleOutput extends STNode {
  static readonly __fields: string[] = ["fact", "namespace", "wrapperElementName"];

  fact?: RuleOutputFact[];

  namespace?: string;

  wrapperElementName?: string;

  getFact(): RuleOutputFact[] {
    return this.fact;

  }

  setFact(fact: RuleOutputFact[]): void {
    this.fact = fact;

  }

  getNamespace(): string {
    return this.namespace;

  }

  setNamespace(namespace: string): void {
    this.namespace = namespace;

  }

  getWrapperElementName(): string {
    return this.wrapperElementName;

  }

  setWrapperElementName(wrapperElementName: string): void {
    this.wrapperElementName = wrapperElementName;

  }
}
