import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { FaultFactory } from "../../../src/syntaxTree/factory/mediators/transformation/FaultFactory.js";
import { FaultMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/FaultMediatorSerializer.js";

describe("FaultMediatorSerializerTest", () => {
  const factory = new FaultFactory();
  const serializer = new FaultMediatorSerializer();
  it("testSOAP11FaultMediator", () => {
        const xml = "<makefault xmlns=\"http://ws.apache.org/ns/synapse\" version=\"soap11\" response=\"true\" " +
                "description=\"description\"><code value=\"soap11Env:VersionMismatch\" " +
                "xmlns:soap11Env=\"http://schemas.xmlsoap.org/soap/envelope/\"/><reason " +
                "expression=\"reason\"/><role>actor</role><detail>detail</detail></makefault>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testSOAP12FaultMediator", () => {
        const xml = "<makefault xmlns=\"http://ws.apache.org/ns/synapse\" version=\"soap12\" response=\"true\" " +
                "description=\"description\"><code value=\"soap12Env:\" xmlns:soap12Env=\"http://schemas.xmlsoap" +
                ".org/soap/envelope/\"/><reason expression=\"reason\"/><node>node</node><detail>detail</detail" +
                "></makefault>";
        checkMediator(factory, serializer, xml, true);
  });
});
