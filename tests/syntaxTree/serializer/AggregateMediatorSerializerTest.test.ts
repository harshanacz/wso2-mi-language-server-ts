import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { AggregateFactory } from "../../../src/syntaxTree/factory/mediators/eip/AggregateFactory.js";
import { AggregateMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/AggregateMediatorSerializer.js";

describe("AggregateMediatorSerializerTest", () => {
  const factory = new AggregateFactory();
  const serializer = new AggregateMediatorSerializer();
  it("testAggregateMediator", () => {
        const xml = "<aggregate xmlns=\"http://ws.apache.org/ns/synapse\" id=\"id\"><correlateOn " +
                "expression=\"$ctx:test\" xmlns:test=\"http://www.test.com/\"/><completeCondition " +
                "timeout=\"0\"><messageCount min=\"-1\" max=\"-1\"/></completeCondition><onComplete " +
                "aggregateElementType=\"root\" enclosingElementProperty=\"test\" expression=\"$ctx:test\" " +
                "xmlns:test=\"http://www.test.com/\"/></aggregate>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testAggregateMediatorWithChildMediators", () => {
        const xml = "<aggregate xmlns=\"http://ws.apache.org/ns/synapse\" id=\"id\"><correlateOn " +
                "expression=\"$ctx:test\" xmlns:test=\"http://www.test.com/\"/><completeCondition " +
                "timeout=\"0\"><messageCount min=\"-1\" max=\"-1\"/></completeCondition><onComplete " +
                "aggregateElementType=\"root\" enclosingElementProperty=\"test\" expression=\"$ctx:test\" " +
                "xmlns:test=\"http://www.test.com/\"><log level=\"full\" category=\"TRACE\" " +
                "description=\"test\"/></onComplete></aggregate>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testAggregateMediatorWithoutSelfClosingTag", () => {
        const xml = "<aggregate xmlns=\"http://ws.apache.org/ns/synapse\" id=\"id\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
