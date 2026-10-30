import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { ForeachFactory } from "../../../src/syntaxTree/factory/mediators/eip/ForeachFactory.js";
import { ForeachMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/ForeachMediatorSerializer.js";

describe("ForeachMediatorSerializerTest", () => {
  const factory = new ForeachFactory();
  const serializer = new ForeachMediatorSerializer();
  it("testForeachMediatorWithSequenceKey", () => {
        const xml = "<foreach xmlns=\"http://ws.apache.org/ns/synapse\" id=\"asdfasf\" expression=\"test\" " +
                "xmlns:test=\"http://www.test.com/\" sequence=\"testSequence\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testForEachMediatorWithAnonymousSequence", () => {
        const xml = "<foreach xmlns=\"http://ws.apache.org/ns/synapse\" id=\"test\" expression=\"test\" " +
                "description=\"test\"><sequence><log level=\"headers\" category=\"TRACE\" " +
                "description=\"test\"/></sequence></foreach>";
        checkMediator(factory, serializer, xml, true);
  });
});
