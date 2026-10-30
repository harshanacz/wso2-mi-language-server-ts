import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { PropertyFactory } from "../../../src/syntaxTree/factory/mediators/core/PropertyFactory.js";
import { PropertyMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/PropertyMediatorSerializer.js";

describe("PropertyMediatorSerializerTest", () => {
  const factory = new PropertyFactory();
  const serializer = new PropertyMediatorSerializer();
  it("testPropertyMediator", () => {
        const xml = "<property xmlns=\"http://ws.apache.org/ns/synapse\" name=\"prop1\" value=\"value1\" " +
                "scope=\"default\" type=\"STRING\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyMediatorWithRemoveAction", () => {
        const xml = "<property xmlns=\"http://ws.apache.org/ns/synapse\" name=\"prop1\" scope=\"default\" " +
                "action=\"remove\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyMediatorWithInlineValue", () => {
        const xml = "<property xmlns=\"http://ws.apache.org/ns/synapse\" name=\"prop1\" scope=\"default\" " +
                "description=\"test\"><value xmlns=\"\"/></property>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyMediatorWithExpression", () => {
        const xml = "<property xmlns=\"http://ws.apache.org/ns/synapse\" name=\"prop1\" expression=\"$ctx:test\" " +
                "xmlns:sample=\"http://www.test.com/\" scope=\"default\" type=\"STRING\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPropertyMediatorWithPattern", () => {
        const xml = "<property xmlns=\"http://ws.apache.org/ns/synapse\" name=\"prop1\" expression=\"$ctx:test\" " +
                "xmlns:sample=\"http://www.test.com/\" scope=\"default\" type=\"STRING\" pattern=\".*\" group=\"0\" " +
                "description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
