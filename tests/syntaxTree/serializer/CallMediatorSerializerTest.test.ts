import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { CallFactory } from "../../../src/syntaxTree/factory/mediators/core/CallFactory.js";
import { CallMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/CallMediatorSerializer.js";
import { InvalidConfigurationException } from "../../../src/syntaxTree/om/errors.js";

describe("CallMediatorSerializerTest", () => {
  const factory = new CallFactory();
  const serializer = new CallMediatorSerializer();
  it("testNoSource", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><target type=\"body\"/></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testNoTarget", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><source type=\"body\"/></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testNoEndpoint", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" description=\"test\"><source " +
                "type=\"body\"/><target type=\"body\"/></call>";
        expect(() => {
            checkMediator(factory, serializer, xml, true);
        }).toThrow(InvalidConfigurationException);
  });

  it("testBodySource", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><source type=\"body\"/><target " +
                "type=\"body\"/></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testCustomSource", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><source type=\"custom\" " +
                "contentType=\"json\">test-source</source><target type=\"property\">test-target</target></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertySource", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><endpoint " +
                "key=\"httpTest\"/><source type=\"property\" contentType=\"test-type\">test-property</source><target " +
                "type=\"body\"/></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testInlineSource", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><source type=\"inline\" " +
                "contentType=\"test-type\"><inline xmlns=\"\"/></source><target type=\"body\"/></call>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyTarget", () => {
        const xml = "<call xmlns=\"http://ws.apache.org/ns/synapse\" blocking=\"true\" " +
                "description=\"test\"><endpoint key=\"httpTest\"/><source type=\"body\"/><target " +
                "type=\"property\">test-property</target></call>";
        checkMediator(factory, serializer, xml, true);
  });
});
