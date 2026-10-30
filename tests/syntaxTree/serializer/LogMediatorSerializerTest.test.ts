import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { InvalidConfigurationException } from "../../../src/syntaxTree/om/errors.js";
import { LogFactory } from "../../../src/syntaxTree/factory/mediators/core/LogFactory.js";
import { LogMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/LogMediatorSerializer.js";

describe("LogMediatorSerializerTest", () => {
  const factory = new LogFactory();
  const serializer = new LogMediatorSerializer();
  it("testSimpleLogMediator", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testLogMediatorWithInvalidInfo", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\" info=\"invalid\"/>";
        checkMediator(factory, serializer, xml, false);
  });

  it("testLogMediatorWithInvalidLevel", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"invalid\"/>";
        checkMediator(factory, serializer, xml, false);
  });

  it("testLogMediatorWithProperties", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\"><property name=\"prop1\" " +
                "value=\"val1\"/></log>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testLogMediatorWithPropertyWithNamespace", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\"><property name=\"prop1\" " +
                "expression=\"$ctx:test\" xmlns:sample1=\"http://www.test1.com/\" xmlns:sample2=\"http://www.test2" +
                ".com/\"/></log>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testLogMediatorWithNoPropertyName", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\"><property value=\"val1\"/></log>";
        expect(() => {
            checkMediator(factory, serializer, xml, false);
        }).toThrow(InvalidConfigurationException);
  });

  it("testLogMediatorWithNoPropertyValue", () => {
        const xml = "<log xmlns=\"http://ws.apache.org/ns/synapse\" level=\"full\"><property name=\"prop1\"/></log>";
        expect(() => {
            checkMediator(factory, serializer, xml, false);
        }).toThrow(InvalidConfigurationException);
  });
});
