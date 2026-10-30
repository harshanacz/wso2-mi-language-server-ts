import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { HeaderFactory } from "../../../src/syntaxTree/factory/mediators/core/HeaderFactory.js";
import { HeaderMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/HeaderMediatorSerializer.js";

describe("HeaderMediatorSerializerTest", () => {
  const factory = new HeaderFactory();
  const serializer = new HeaderMediatorSerializer();
  it("testHeaderMediatorWithValue", () => {
        const xml = "<header xmlns=\"http://ws.apache.org/ns/synapse\" name=\"To\" action=\"set\" scope=\"default\" " +
                "value=\"test\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testHeaderMediatorWithExpression", () => {
        const xml = "<header xmlns=\"http://ws.apache.org/ns/synapse\" name=\"To\" xmlns:m0=\"http://services" +
                ".samples/xsd\" action=\"set\" scope=\"default\" expression=\"//m0:getQuote/m0:request/m0:symbol\" " +
                "description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testHeaderMediatorWithInlineValue", () => {
        const xml = "<header xmlns=\"http://ws.apache.org/ns/synapse\" name=\"To\" action=\"set\" scope=\"default\" " +
                "description=\"test\"><inline xmlns=\"\"/></header>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testHeaderMediatorWithRemoveAction", () => {
        const xml = "<header xmlns=\"http://ws.apache.org/ns/synapse\" name=\"To\" action=\"remove\" " +
                "scope=\"default\" description=\"afaf\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
