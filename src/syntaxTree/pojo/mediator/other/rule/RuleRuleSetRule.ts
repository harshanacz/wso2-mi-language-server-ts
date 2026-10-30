// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleRuleSetRule.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class RuleRuleSetRule extends STNode {
  static readonly __fields: string[] = ["value", "resourceType", "sourceType"];

  value?: string;

  resourceType?: string;

  sourceType?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getResourceType(): string {
    return this.resourceType;

  }

  setResourceType(resourceType: string): void {
    this.resourceType = resourceType;

  }

  getSourceType(): string {
    return this.sourceType;

  }

  setSourceType(sourceType: string): void {
    this.sourceType = sourceType;

  }
}
