import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("RecipientListEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testRecipientListEndpointWithMember", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"recipientlist\">" +
                "<recipientlist>" +
                "<endpoint name=\"endpoint_urn_uuid_6179155B57847314A657084710149040-304004407\">" +
                "<address uri=\"http://localhost\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "</address>" +
                "</endpoint>" +
                "<endpoint key=\"address\"/>" +
                "</recipientlist>" +
                "</endpoint>";
        check(xml);
  });
});
