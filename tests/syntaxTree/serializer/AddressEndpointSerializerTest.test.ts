import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("AddressEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testAddressEndpoint", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"address\">" +
                "<address statistics=\"enable\" trace=\"enable\" uri=\"http://www.test.com\">" +
                "<enableSec policy=\"policy\"/>" +
                "<enableAddressing version=\"final\"/>" +
                "<timeout>" +
                "<duration>10000</duration>" +
                "<responseAction>discard</responseAction>" +
                "</timeout>" +
                "<suspendOnFailure>" +
                "<errorCodes>401</errorCodes>" +
                "<initialDuration>100</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<errorCodes>403</errorCodes>" +
                "<retriesBeforeSuspension>10</retriesBeforeSuspension>" +
                "<retryDelay>1000</retryDelay>" +
                "</markForSuspension>" +
                "</address>" +
                "<property name=\"property_name\" value=\"property_value\"/>" +
                "<description>test</description>" +
                "</endpoint>";
        check(xml);
  });
});
