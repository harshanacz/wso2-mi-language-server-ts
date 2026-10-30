// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/callout/CalloutTarget.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class CalloutTarget extends STNode {
  xpath?: string;

  key?: string;

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }
}
