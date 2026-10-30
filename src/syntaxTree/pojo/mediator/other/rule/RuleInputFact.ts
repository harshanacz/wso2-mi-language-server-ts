// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/rule/RuleInputFact.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class RuleInputFact extends STNode {
  static readonly __fields: string[] = ["elementName", "namespace", "type", "xpath"];

  elementName?: string;

  namespace?: string;

  type?: string;

  xpath?: string;

  getElementName(): string {
    return this.elementName;

  }

  setElementName(elementName: string): void {
    this.elementName = elementName;

  }

  getNamespace(): string {
    return this.namespace;

  }

  setNamespace(namespace: string): void {
    this.namespace = namespace;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }
}
