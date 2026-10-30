import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EndpointFactory } from "../../../src/syntaxTree/factory/endpoint/EndpointFactory.js";
import { EndpointSerializer } from "../../../src/syntaxTree/serializer/endpoint/EndpointSerializer.js";

describe("HTTPEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new EndpointFactory().create(e), (n) => EndpointSerializer.serializeEndpoint(n), xml);
  it("testHTTPEndpoint", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://sample.com\" method=\"get\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });

  it("testHTTPEndpointWithQosProperties", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://google.com\" method=\"get\">" +
                "<enableSec policy=\"policy\"/>" +
                "<enableAddressing version=\"final\"/>" +
                "<timeout>" +
                "<duration>234</duration>" +
                "<responseAction>discard</responseAction>" +
                "</timeout>" +
                "<suspendOnFailure>" +
                "<errorCodes>404</errorCodes>" +
                "<initialDuration>100</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<errorCodes>401</errorCodes>" +
                "<retriesBeforeSuspension>10</retriesBeforeSuspension>" +
                "<retryDelay>100</retryDelay>" +
                "</markForSuspension>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });

  it("testHTTPEndpointWithBasicAuth", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://sample.com\" method=\"get\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "<authentication>" +
                "<basicAuth>" +
                "<username>username</username>" +
                "<password>password</password>" +
                "</basicAuth>" +
                "</authentication>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });

  it("testHTTPEndpointWithOauthAuthorizationCode", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://sample.com\" method=\"get\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "<authentication>" +
                "<oauth>" +
                "<authorizationCode>" +
                "<clientId>clientId</clientId>" +
                "<clientSecret>clientSecret</clientSecret>" +
                "<refreshToken>refreshToken</refreshToken>" +
                "<tokenUrl>{$ctx:tokenUrl}</tokenUrl>" +
                "<requestParameters>" +
                "<parameter name=\"paramName\">value</parameter>" +
                "<parameter name=\"paramName2\">{$ctx:expression}</parameter>" +
                "</requestParameters>" +
                "<authMode>Header</authMode>" +
                "</authorizationCode>" +
                "</oauth>" +
                "</authentication>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });

  it("testHTTPEndpointWithOAuthClientCredentials", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://sample.com\" method=\"get\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "<authentication>" +
                "<oauth>" +
                "<clientCredentials>" +
                "<clientId>clientId</clientId>" +
                "<clientSecret>clientSecret</clientSecret>" +
                "<tokenUrl>{$ctx:tokenUrl}</tokenUrl>" +
                "<requestParameters>" +
                "<parameter name=\"param1\">val1</parameter>" +
                "<parameter name=\"param2\">{$ctx:exp}</parameter>" +
                "</requestParameters>" +
                "<authMode>Header</authMode>" +
                "</clientCredentials>" +
                "</oauth>" +
                "</authentication>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });

  it("testHTTPEndpointWithOauthPasswordCredentials", () => {
        const xml = "<endpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"http\">" +
                "<http uri-template=\"http://sample.com\" method=\"get\">" +
                "<suspendOnFailure>" +
                "<initialDuration>-1</initialDuration>" +
                "<progressionFactor>1.0</progressionFactor>" +
                "</suspendOnFailure>" +
                "<markForSuspension>" +
                "<retriesBeforeSuspension>0</retriesBeforeSuspension>" +
                "</markForSuspension>" +
                "<authentication>" +
                "<oauth>" +
                "<passwordCredentials>" +
                "<username>username</username>" +
                "<password>password</password>" +
                "<clientId>clientId</clientId>" +
                "<clientSecret>clientSecret</clientSecret>" +
                "<tokenUrl>{$ctx:tokenUrl}</tokenUrl>" +
                "<requestParameters>" +
                "<parameter name=\"param1\">val1</parameter>" +
                "<parameter name=\"param2\">{$ctx:exp}</parameter>" +
                "</requestParameters>" +
                "<authMode>Header</authMode>" +
                "</passwordCredentials>" +
                "</oauth>" +
                "</authentication>" +
                "</http>" +
                "</endpoint>";
        check(xml);
  });
});
