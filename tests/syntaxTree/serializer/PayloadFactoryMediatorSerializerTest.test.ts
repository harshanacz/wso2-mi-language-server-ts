import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { PayloadFactoryFactory } from "../../../src/syntaxTree/factory/mediators/transformation/PayloadFactoryFactory.js";
import { PayloadFactoryMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/PayloadFactoryMediatorSerializer.js";

describe("PayloadFactoryMediatorSerializerTest", () => {
  const factory = new PayloadFactoryFactory();
  const serializer = new PayloadFactoryMediatorSerializer();
  it("testPayloadFactoryMediatorWithStaticKey", () => {
        const xml = "<payloadFactory xmlns=\"http://ws.apache.org/ns/synapse\" media-type=\"xml\" " +
                "description=\"test\"><args/></payloadFactory>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPayloadFactoryMediatorWithDefaultPayload", () => {
        const xml = "<payloadFactory xmlns=\"http://ws.apache.org/ns/synapse\" media-type=\"xml\" " +
                "description=\"test\"><format><inline xmlns=\"\"/></format><args><arg value=\"default\" " +
                "literal=\"true\"/><arg expression=\"$ctx:test\" xmlns:test=\"http://www.test.com\" " +
                "evaluator=\"xml\"/></args></payloadFactory>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPayloadFactoryMediatorWithFreemarkerPayload", () => {
        const xml = "<payloadFactory xmlns=\"http://ws.apache.org/ns/synapse\" media-type=\"xml\" " +
                "template-type=\"freemarker\" description=\"test\"><format><![CDATA[<inline/>]]></format><args><arg " +
                "value=\"default\" literal=\"true\"/><arg expression=\"$ctx:test\" xmlns:test=\"http://www.test.com\"" +
                " evaluator=\"xml\"/></args></payloadFactory>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testPayloadFactoryMediatorWithRegistryPayload", () => {
        const xml = "<payloadFactory xmlns=\"http://ws.apache.org/ns/synapse\" media-type=\"xml\" " +
                "description=\"test\"><format key=\"conf:/repository/registry.xml\"/><args/></payloadFactory>";
        checkMediator(factory, serializer, xml, true);
  });
});
