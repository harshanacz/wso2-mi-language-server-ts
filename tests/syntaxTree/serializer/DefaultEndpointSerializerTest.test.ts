import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("DefaultEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testDefaultEndpoint", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"test_endpoint\">" +
                "<default format=\"soap12\" optimize=\"mtom\" statistics=\"enable\" trace=\"enable\">" +
                "<enableSec inboundPolicy=\"inbound_policy\" outboundPolicy=\"outbound_policy\"/>" +
                "<enableAddressing separateListener=\"true\" version=\"submission\"/>" +
                "<timeout>" +
                "<duration>424</duration>" +
                "</timeout>" +
                "<suspendOnFailure>" +
                "<errorCodes>401,402</errorCodes>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<errorCodes>244</errorCodes>" +
                "<retriesBeforeSuspension>24</retriesBeforeSuspension>" +
                "<retryDelay>42</retryDelay>" +
                "</markForSuspension>" +
                "</default>" +
                "<property name=\"property_name\" value=\"property_value\" scope=\"transport\"/>" +
                "<description>test</description>" +
                "</endpoint>";
        check(xml);
  });
});
