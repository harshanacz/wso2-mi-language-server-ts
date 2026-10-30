import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { InvalidConfigurationException } from "../../../src/syntaxTree/om/errors.js";
import { SequenceMediatorFactory } from "../../../src/syntaxTree/factory/mediators/SequenceMediatorFactory.js";
import { SequenceMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/SequenceMediatorSerializer.js";

describe("SequenceMediatorSerializerTest", () => {
  const factory = new SequenceMediatorFactory();
  const serializer = new SequenceMediatorSerializer();
  it("testSequenceMediatorWithStaticKey", () => {
        const xml = "<sequence xmlns=\"http://ws.apache.org/ns/synapse\" key=\"Sequence\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testSequenceMediatorWithDynamicKey", () => {
        const xml = "<sequence xmlns=\"http://ws.apache.org/ns/synapse\" key=\"{$ctx:test}\" xmlns:test=\"http://www" +
                ".test.com/\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testSequenceMediatorWithoutKey", () => {
        const xml = "<sequence xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"/>";
        expect(() => {
            checkMediator(factory, serializer, xml, true);
        }).toThrow(InvalidConfigurationException);
  });
});
