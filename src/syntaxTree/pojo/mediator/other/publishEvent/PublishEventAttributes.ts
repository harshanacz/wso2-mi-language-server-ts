// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/publishEvent/PublishEventAttributes.java by the java2ts converter (see tools/java2ts).
import { PublishEventAttributesArbitrary } from "./PublishEventAttributesArbitrary.js";
import { PublishEventAttributesCorrelation } from "./PublishEventAttributesCorrelation.js";
import { PublishEventAttributesMeta } from "./PublishEventAttributesMeta.js";
import { PublishEventAttributesPayload } from "./PublishEventAttributesPayload.js";
import { STNode } from "../../../../stNode.js";

export class PublishEventAttributes extends STNode {
  static readonly __fields: string[] = ["meta", "correlation", "payload", "arbitrary"];

  meta?: PublishEventAttributesMeta;

  correlation?: PublishEventAttributesCorrelation;

  payload?: PublishEventAttributesPayload;

  arbitrary?: PublishEventAttributesArbitrary;

  getMeta(): PublishEventAttributesMeta {
    return this.meta;

  }

  setMeta(meta: PublishEventAttributesMeta): void {
    this.meta = meta;

  }

  getCorrelation(): PublishEventAttributesCorrelation {
    return this.correlation;

  }

  setCorrelation(correlation: PublishEventAttributesCorrelation): void {
    this.correlation = correlation;

  }

  getPayload(): PublishEventAttributesPayload {
    return this.payload;

  }

  setPayload(payload: PublishEventAttributesPayload): void {
    this.payload = payload;

  }

  getArbitrary(): PublishEventAttributesArbitrary {
    return this.arbitrary;

  }

  setArbitrary(arbitrary: PublishEventAttributesArbitrary): void {
    this.arbitrary = arbitrary;

  }
}
