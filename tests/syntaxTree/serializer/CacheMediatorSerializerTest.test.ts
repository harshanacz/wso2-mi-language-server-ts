import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { CacheFactory } from "../../../src/syntaxTree/factory/mediators/advanced/CacheFactory.js";
import { CacheMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/qos/CacheMediatorSerializer.js";

describe("CacheMediatorSerializerTest", () => {
  const factory = new CacheFactory();
  const serializer = new CacheMediatorSerializer();
  it("testDefaultCacheMediator", () => {
        const xml = "<cache xmlns=\"http://ws.apache.org/ns/synapse\" collector=\"false\" timeout=\"120\" " +
                "maxMessageSize=\"2000\" description=\"test\"><onCacheHit/><protocol " +
                "type=\"HTTP\"><methods>*</methods><headersToExcludeInHash/><headersToIncludeInHash/><responseCodes>" +
                ".*</responseCodes><enableCacheControl>false</enableCacheControl><includeAgeHeader>false" +
                "</includeAgeHeader><hashGenerator>org.wso2.carbon.mediator.cache.digest" +
                ".HttpRequestHashGenerator</hashGenerator></protocol><implementation maxSize=\"1000\"/></cache>";
        checkMediator(factory, serializer, xml, true);
  });

  it("test611CompatibleCacheMediator", () => {
        const xml = "<cache xmlns=\"http://ws.apache.org/ns/synapse\" collector=\"false\" id=\"id\" " +
                "scope=\"per-host\" hashGenerator=\"org.wso2.carbon.mediator.cache.digest.DOMHASHGenerator\" " +
                "timeout=\"120\" maxMessageSize=\"2000\" description=\"test\"><onCacheHit " +
                "sequence=\"testSequence\"/><implementation maxSize=\"1000\" type=\"memory\"/></cache>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testCollectorCacheMediator", () => {
        const xml = "<cache xmlns=\"http://ws.apache.org/ns/synapse\" collector=\"true\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
