// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/publishEvent/PublishEventAttributesArbitrary.java by the java2ts converter (see tools/java2ts).
import { PublishEventAttributesArbitraryAttribute } from "./PublishEventAttributesArbitraryAttribute.js";
import { STNode } from "../../../../stNode.js";

export class PublishEventAttributesArbitrary extends STNode {
  static readonly __fields: string[] = ["attributes"];

  attributes?: PublishEventAttributesArbitraryAttribute[];

  getAttributes(): PublishEventAttributesArbitraryAttribute[] {
    return this.attributes;

  }

  setAttributes(attributes: PublishEventAttributesArbitraryAttribute[]): void {
    this.attributes = attributes;

  }
}
