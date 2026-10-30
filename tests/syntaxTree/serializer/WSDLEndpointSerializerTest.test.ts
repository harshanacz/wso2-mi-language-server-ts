import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("WSDLEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testWSDLEndpoint", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"wsdl\">" +
                "<wsdl uri=\"http://folce.com\" service=\"service\" port=\"4315\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "</wsdl>" +
                "</endpoint>";
        check(xml);
  });
});
