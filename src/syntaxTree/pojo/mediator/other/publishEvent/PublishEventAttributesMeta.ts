// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/publishEvent/PublishEventAttributesMeta.java by the java2ts converter (see tools/java2ts).
import { Attribute } from "../Attribute.js";
import { STNode } from "../../../../stNode.js";

export class PublishEventAttributesMeta extends STNode {
  attributes?: Attribute[];

  getAttributes(): Attribute[] {
    return this.attributes;

  }

  setAttributes(attributes: Attribute[]): void {
    this.attributes = attributes;

  }
}
