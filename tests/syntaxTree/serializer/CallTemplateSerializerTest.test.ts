import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { CallTemplateFactory } from "../../../src/syntaxTree/factory/mediators/core/CallTemplateFactory.js";
import { CallTemplateMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/CallTemplateMediatorSerializer.js";

describe("CallTemplateSerializerTest", () => {
  const factory = new CallTemplateFactory();
  const serializer = new CallTemplateMediatorSerializer();
  it("testCallTemplateMediator", () => {
        const xml = "<call-template xmlns=\"http://ws.apache.org/ns/synapse\" target=\"targetSeq\" " +
                "onError=\"errorSeq\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testCallTemplateMediatorWithParams", () => {
        const xml = "<call-template xmlns=\"http://ws.apache.org/ns/synapse\" target=\"targetSeq\" " +
                "onError=\"errorSeq\" description=\"test\"><with-param name=\"param1\" value=\"val1\"/><with-param " +
                "name=\"param2\" value=\"{$ctx:exp}\" xmlns:test=\"http://www.test.com/\"/></call-template>";
        checkMediator(factory, serializer, xml, true);
  });
});
