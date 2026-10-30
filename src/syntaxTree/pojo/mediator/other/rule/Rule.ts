// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/Rule.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { RuleChildMediators } from "./RuleChildMediators.js";
import { RuleInput } from "./RuleInput.js";
import { RuleOutput } from "./RuleOutput.js";
import { RuleRuleset } from "./RuleRuleset.js";
import { RuleSource } from "./RuleSource.js";
import { RuleTarget } from "./RuleTarget.js";

export class Rule extends Mediator {
  static readonly __fields: string[] = ["source", "target", "ruleSet", "input", "output", "childMediators", "description", "traceFilter"];

  source?: RuleSource;

  target?: RuleTarget;

  ruleSet?: RuleRuleset;

  input?: RuleInput;

  output?: RuleOutput;

  childMediators?: RuleChildMediators;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Rule");

  }

  getSource(): RuleSource {
    return this.source;

  }

  setSource(source: RuleSource): void {
    this.source = source;

  }

  getTarget(): RuleTarget {
    return this.target;

  }

  setTarget(target: RuleTarget): void {
    this.target = target;

  }

  getRuleSet(): RuleRuleset {
    return this.ruleSet;

  }

  setRuleSet(ruleSet: RuleRuleset): void {
    this.ruleSet = ruleSet;

  }

  getInput(): RuleInput {
    return this.input;

  }

  setInput(input: RuleInput): void {
    this.input = input;

  }

  getOutput(): RuleOutput {
    return this.output;

  }

  setOutput(output: RuleOutput): void {
    this.output = output;

  }

  getChildMediators(): RuleChildMediators {
    return this.childMediators;

  }

  setChildMediators(childMediators: RuleChildMediators): void {
    this.childMediators = childMediators;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
