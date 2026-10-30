// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleRuleSetProperties.java by the java2ts converter (see tools/java2ts).
import { MediatorProperty } from "../../core/MediatorProperty.js";
import { STNode } from "../../../../stNode.js";

export class RuleRuleSetProperties extends STNode {
  property?: MediatorProperty[];

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }
}
