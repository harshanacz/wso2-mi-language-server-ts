import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { ValidateFactory } from "../../../src/syntaxTree/factory/mediators/core/ValidateFactory.js";
import { ValidateMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/ValidateMediatorSerializer.js";

describe("ValidateMediatorSerializerTest", () => {
  const factory = new ValidateFactory();
  const serializer = new ValidateMediatorSerializer();
  it("testValidate", () => {
        const xml = "<validate xmlns=\"http://ws.apache.org/ns/synapse\" cache-schema=\"true\" " +
                "source=\"$ctx:source\" description=\"test\"><schema key=\"gov:datamapper/sample.xsd\"/><feature " +
                "name=\"feature1\" value=\"true\"/><feature name=\"feature2\" value=\"false\"/><resource key=\"gov:js" +
                ".json\" location=\"location\"/><on-fail><log separator=\",\" " +
                "description=\"test\"/></on-fail></validate>";
        checkMediator(factory, serializer, xml, true);
  });
});
