// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleRuleset.java by the java2ts converter (see tools/java2ts).
import { RuleRuleSetProperties } from "./RuleRuleSetProperties.js";
import { RuleRuleSetRule } from "./RuleRuleSetRule.js";
import { STNode } from "../../../../stNode.js";

export class RuleRuleset extends STNode {
  static readonly __fields: string[] = ["properties", "rule"];

  properties?: RuleRuleSetProperties;

  rule?: RuleRuleSetRule;

  getProperties(): RuleRuleSetProperties {
    return this.properties;

  }

  setProperties(properties: RuleRuleSetProperties): void {
    this.properties = properties;

  }

  getRule(): RuleRuleSetRule {
    return this.rule;

  }

  setRule(rule: RuleRuleSetRule): void {
    this.rule = rule;

  }
}
