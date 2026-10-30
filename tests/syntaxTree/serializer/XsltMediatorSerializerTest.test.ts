import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { XsltFactory } from "../../../src/syntaxTree/factory/mediators/transformation/XsltFactory.js";
import { XsltMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/XsltMediatorSerializer.js";

describe("XsltMediatorSerializerTest", () => {
  const factory = new XsltFactory();
  const serializer = new XsltMediatorSerializer();
  it("testXsltMediator", () => {
        const xml = "<xslt xmlns=\"http://ws.apache.org/ns/synapse\" key=\"asdfasf\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testXsltMediatorWithProperty", () => {
        const xml = "<xslt xmlns=\"http://ws.apache.org/ns/synapse\" key=\"gov:wff.xslt\" source=\"test\" " +
                "description=\"test\"><property name=\"prop1\" value=\"val1\"/><property name=\"prop2\" " +
                "expression=\"exp\"/></xslt>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testXsltMediatorWithFeature", () => {
        const xml = "<xslt xmlns=\"http://ws.apache.org/ns/synapse\" key=\"gov:wff.xslt\" source=\"test\" " +
                "description=\"test\"><feature name=\"feature\" value=\"true\"/></xslt>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testXsltMediatorWithResource", () => {
        const xml = "<xslt xmlns=\"http://ws.apache.org/ns/synapse\" key=\"gov:wff.xslt\" source=\"test\" " +
                "description=\"test\"><resource location=\"location\" key=\"key\"/></xslt>";
        checkMediator(factory, serializer, xml, true);
  });
});
