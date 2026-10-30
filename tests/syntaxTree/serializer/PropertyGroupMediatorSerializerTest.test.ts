import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { PropertyGroupFactory } from "../../../src/syntaxTree/factory/mediators/core/PropertyGroupFactory.js";
import { PropertyGroupMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/PropertyGroupMediatorSerializer.js";

describe("PropertyGroupMediatorSerializerTest", () => {
  const factory = new PropertyGroupFactory();
  const serializer = new PropertyGroupMediatorSerializer();
  it("testPropertyGroupMediator", () => {
        const xml = "<propertyGroup xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyGroupMediatorWithProperty", () => {
        const xml = "<propertyGroup xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"><property " +
                "name=\"prop1\" value=\"value1\" scope=\"default\" type=\"STRING\"/></propertyGroup>";
        checkMediator(factory, serializer, xml, true);
  });
});
