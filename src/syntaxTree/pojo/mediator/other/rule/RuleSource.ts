// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleSource.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class RuleSource extends STNode {
  value?: string;

  xpath?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }
}
