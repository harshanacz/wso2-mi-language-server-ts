// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleTarget.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class RuleTarget extends STNode {
  value?: string;

  action?: string;

  resultXpath?: string;

  xpath?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getAction(): string {
    return this.action;

  }

  setAction(action: string): void {
    this.action = action;

  }

  getResultXpath(): string {
    return this.resultXpath;

  }

  setResultXpath(resultXpath: string): void {
    this.resultXpath = resultXpath;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }
}
