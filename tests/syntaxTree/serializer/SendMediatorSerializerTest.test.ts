import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { InvalidConfigurationException } from "../../../src/syntaxTree/om/errors.js";
import { SendFactory } from "../../../src/syntaxTree/factory/mediators/core/SendFactory.js";
import { SendMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/SendMediatorSerializer.js";

describe("SendMediatorSerializerTest", () => {
  const factory = new SendFactory();
  const serializer = new SendMediatorSerializer();
  it("testSendMediator", () => {
        const xml = "<send xmlns=\"http://ws.apache.org/ns/synapse\" receive=\"{$ctx:test}\" xmlns:test=\"http://www" +
                ".test.com\" buildmessage=\"true\" description=\"test\"><endpoint key=\"testEndpoint\"/></send>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testSendMediatorWithoutEndpoint", () => {
        const xml = "<send xmlns=\"http://ws.apache.org/ns/synapse\" receive=\"{$ctx:test}\" xmlns:test=\"http://www" +
                ".test.com\" buildmessage=\"true\" description=\"test\"/>";
        expect(() => {
            checkMediator(factory, serializer, xml, true);
        }).toThrow(InvalidConfigurationException);
  });
});
