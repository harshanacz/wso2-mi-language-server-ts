import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { FilterFactory } from "../../../src/syntaxTree/factory/mediators/filter/FilterFactory.js";
import { FilterMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/FilterMediatorSerializer.js";

describe("FilterMediatorSerializerSerializerTest", () => {
  const factory = new FilterFactory();
  const serializer = new FilterMediatorSerializer();
  it("testWithoutChildren", () => {
        const xml = "<filter xmlns=\"http://ws.apache.org/ns/synapse\" source=\"get-property('Action')\" regex=\"" +
                ".*getBusNo\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testWithChildren", () => {
        const xml = "<filter xmlns=\"http://ws.apache.org/ns/synapse\" source=\"get-property('Action')\" regex=\"" +
                ".*getBusNo\"><then><log level=\"custom\"><property name=\"service\" value=\"Bus Services is " +
                "called\"/></log></then><else><log level=\"custom\"><property name=\"service\" value=\"Bus Services " +
                "is called\"/></log></else></filter>";
        checkMediator(factory, serializer, xml, true);
  });
});
