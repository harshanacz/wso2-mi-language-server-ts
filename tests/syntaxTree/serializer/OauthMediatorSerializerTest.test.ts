import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { OauthMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/qos/OauthMediatorSerializer.js";
import { OauthServiceFactory } from "../../../src/syntaxTree/factory/mediators/other/OauthServiceFactory.js";

describe("OauthMediatorSerializerTest", () => {
  const factory = new OauthServiceFactory();
  const serializer = new OauthMediatorSerializer();
  it("testOauth", () => {
        const xml = "<oauthService xmlns=\"http://ws.apache.org/ns/synapse\" remoteServiceUrl=\"http://www" +
                ".testService.com/\" username=\"username\" password=\"password\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
