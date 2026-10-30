import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EnrichFactory } from "../../../src/syntaxTree/factory/mediators/transformation/EnrichFactory.js";
import { EnrichMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/EnrichMediatorSerializer.js";

describe("EnrichMediatorSerializerTest", () => {
  const factory = new EnrichFactory();
  const serializer = new EnrichMediatorSerializer();
  it("testEnrichMediatorWithCustomSource", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"custom\" xpath=\"$ctx:test\"/><target action=\"replace\" type=\"body\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithEnvelopeSource", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"envelope\"/><target action=\"replace\" type=\"body\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithPropertySource", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"property\" property=\"test-property\"/><target action=\"replace\" type=\"body\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithInlineSource", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"inline\"><inline xmlns=\"\"/></source><target action=\"replace\" type=\"body\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithCustomTarget", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"body\"/><target action=\"replace\" xpath=\"$ctx:test\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithEnvelopeTarget", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"body\"/><target action=\"replace\" type=\"envelope\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithPropertyTarget", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"body\"/><target action=\"replace\" type=\"property\" property=\"test-property\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testEnrichMediatorWithKeyTarget", () => {
        const xml = "<enrich xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><source clone=\"true\" " +
                "type=\"body\"/><target action=\"replace\" type=\"key\" xpath=\"$ctx:test\"/></enrich>";
        checkMediator(factory, serializer, xml, true);
  });
});
