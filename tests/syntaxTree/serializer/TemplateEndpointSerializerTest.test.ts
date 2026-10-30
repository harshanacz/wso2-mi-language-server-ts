import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("TemplateEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testTemplateEndpoint", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"tempalte\" template=\"sampleTemplate\" uri=\"http://www.test.com\">" +
                "<axis2ns2:parameter xmlns:axis2ns2=\"http://ws.apache.org/ns/synapse\" name=\"param1\" value=\"val1\"/>" +
                "<description>test</description>" +
                "</endpoint>";
        check(xml);
  });
});
