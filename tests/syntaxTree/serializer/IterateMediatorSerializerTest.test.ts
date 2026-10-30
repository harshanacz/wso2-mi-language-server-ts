import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { InvalidConfigurationException } from "../../../src/syntaxTree/om/errors.js";
import { IterateFactory } from "../../../src/syntaxTree/factory/mediators/eip/IterateFactory.js";
import { IterateMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/IterateMediatorSerializer.js";

describe("IterateMediatorSerializerTest", () => {
  const factory = new IterateFactory();
  const serializer = new IterateMediatorSerializer();
  it("testSerializeIterateMediator", () => {
        const xml = "<iterate xmlns=\"http://ws.apache.org/ns/synapse\" id=\"iterate_id\" expression=\"$ctx:test\" " +
                "preservePayload=\"true\" continueParent=\"true\" sequential=\"true\" " +
                "description=\"description\"><target><sequence><log level=\"full\"/></sequence></target></iterate>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testSerializeIterateMediatorWithoutTarget", () => {
        const xml = "<iterate xmlns=\"http://ws.apache.org/ns/synapse\" id=\"iterate_id\" expression=\"$ctx:test\" " +
                "preservePayload=\"true\" continueParent=\"true\" sequential=\"true\" description=\"description\"/>";
        expect(() => {
            checkMediator(factory, serializer, xml, true);
        }).toThrow(InvalidConfigurationException);
  });
});
