import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { EntitlementFactory } from "../../../src/syntaxTree/factory/mediators/other/EntitlementFactory.js";
import { EntitlementMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/qos/EntitlementMediatorSerializer.js";

describe("EntitlementMediatorSerializerTest", () => {
  const factory = new EntitlementFactory();
  const serializer = new EntitlementMediatorSerializer();
  it("testEntitlementWithAnonymousSequence", () => {
        const xml = "<entitlementService xmlns=\"http://ws.apache.org/ns/synapse\" remoteServiceUrl=\"serverUrl\" " +
                "remoteServiceUserName=\"username\" remoteServicePassword=\"password\" callbackClass=\"org.wso2" +
                ".carbon.identity.entitlement.mediator.callback.UTEntitlementCallbackHandler\" client=\"basicAuth\" " +
                "description=\"test\"><onReject><log description=\"onAccept Test\"/></onReject><onAccept><log " +
                "description=\"onReject Test\"/></onAccept><advice><log description=\"advice " +
                "Test\"/></advice><obligations><log description=\"obligations " +
                "Test\"/></obligations></entitlementService>";
        checkMediator(factory, serializer, xml, true);
  });
});
