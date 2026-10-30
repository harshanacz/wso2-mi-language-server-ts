// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/RewriteRewriteruleAction.java by the java2ts converter (see tools/java2ts).
import { RewriteRuleActionFragment } from "./RewriteRuleActionFragment.js";
import { RewriteRuleActionType } from "./RewriteRuleActionType.js";
import { STNode } from "../../../../stNode.js";

export class RewriteRewriteruleAction extends STNode {
  value?: string;

  xpath?: string;

  regex?: string;

  type?: RewriteRuleActionType;

  fragment?: RewriteRuleActionFragment;

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

  getRegex(): string {
    return this.regex;

  }

  setRegex(regex: string): void {
    this.regex = regex;

  }

  getType(): RewriteRuleActionType {
    return this.type;

  }

  setType(type: RewriteRuleActionType): void {
    this.type = type;

  }

  getFragment(): RewriteRuleActionFragment {
    return this.fragment;

  }

  setFragment(fragment: RewriteRuleActionFragment): void {
    this.fragment = fragment;

  }
}
