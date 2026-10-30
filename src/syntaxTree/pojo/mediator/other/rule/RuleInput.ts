// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleInput.java by the java2ts converter (see tools/java2ts).
import { RuleInputFact } from "./RuleInputFact.js";
import { STNode } from "../../../../stNode.js";

export class RuleInput extends STNode {
  static readonly __fields: string[] = ["fact", "namespace", "wrapperElementName"];

  fact?: RuleInputFact[];

  namespace?: string;

  wrapperElementName?: string;

  getFact(): RuleInputFact[] {
    return this.fact;

  }

  setFact(fact: RuleInputFact[]): void {
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
