// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/TargetEnrich.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { TargetEnrichAction } from "./TargetEnrichAction.js";
import { TargetEnrichType } from "./TargetEnrichType.js";

export class TargetEnrich extends STNode {
  action?: TargetEnrichAction;

  type?: TargetEnrichType;

  xpath?: string;

  property?: string;

  getAction(): TargetEnrichAction {
    return this.action;

  }

  setAction(action: TargetEnrichAction): void {
    this.action = action;

  }

  getType(): TargetEnrichType {
    return this.type;

  }

  setType(type: TargetEnrichType): void {
    this.type = type;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }

  getProperty(): string {
    return this.property;

  }

  setProperty(property: string): void {
    this.property = property;

  }
}
