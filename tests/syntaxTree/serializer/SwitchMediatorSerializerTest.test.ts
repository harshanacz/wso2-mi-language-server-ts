import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { SwitchFactory } from "../../../src/syntaxTree/factory/mediators/filter/SwitchFactory.js";
import { SwitchMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/SwitchMediatorSerializer.js";

describe("SwitchMediatorSerializerTest", () => {
  const factory = new SwitchFactory();
  const serializer = new SwitchMediatorSerializer();
  it("testWithoutChildren", () => {
        const xml = "<switch xmlns=\"http://ws.apache.org/ns/synapse\" source=\"//m0:getQuote/m0:request/m0:symbol\"" +
                " xmlns:m0=\"http://services.samples/xsd\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testWithChildren", () => {
        const xml = "<switch xmlns=\"http://ws.apache.org/ns/synapse\" source=\"//m0:getQuote/m0:request/m0:symbol\"" +
                " xmlns:m0=\"http://services.samples/xsd\"><case regex=\"IBM\"><property name=\"symbol\" " +
                "value=\"Great stock - IBM\"/></case><case regex=\"MSFT\"><property name=\"symbol\" " +
                "expression=\"fn:concat('Normal Stock - ', //m1:getQuote/m1:request/m0:symbol)\" " +
                "xmlns:m1=\"http://services.samples1/xsd\"/></case><default><property name=\"symbol\" " +
                "expression=\"fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)\"/></default></switch>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testWithEmptyCase", () => {
        const xml = "<switch xmlns=\"http://ws.apache.org/ns/synapse\" source=\"//m0:getQuote/m0:request/m0:symbol\"" +
                " xmlns:m0=\"http://services.samples/xsd\"><case regex=\"IBM\"/><default/></switch>";
        checkMediator(factory, serializer, xml, true);
  });
});
