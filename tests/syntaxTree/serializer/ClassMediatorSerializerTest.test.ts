import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { ClassFactory } from "../../../src/syntaxTree/factory/mediators/extension/ClassFactory.js";
import { ClassMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/extension/ClassMediatorSerializer.js";

describe("ClassMediatorSerializerTest", () => {
  const factory = new ClassFactory();
  const serializer = new ClassMediatorSerializer();
  it("testClassMediator", () => {
        const xml = "<class xmlns=\"http://ws.apache.org/ns/synapse\" name=\"testClass\" " +
                "description=\"test\"><property name=\"arg1\" value=\"value1\"/><property name=\"arg2\" " +
                "expression=\"$ctx:exp\" xmlns:m0=\"http://services.samples/xsd\"/></class>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testClassMediatorWithoutProperties", () => {
        const xml = "<class xmlns=\"http://ws.apache.org/ns/synapse\" name=\"testClass\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
