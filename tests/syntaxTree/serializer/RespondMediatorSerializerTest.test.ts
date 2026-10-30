import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { RespondFactory } from "../../../src/syntaxTree/factory/mediators/core/RespondFactory.js";
import { RespondMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/RespondMediatorSerializer.js";

describe("RespondMediatorSerializerTest", () => {
  const factory = new RespondFactory();
  const serializer = new RespondMediatorSerializer();
  it("testRespondMediator", () => {
        const xml = "<respond xmlns=\"http://ws.apache.org/ns/synapse\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testRespondMediatorWithDescription", () => {
        const xml = "<respond xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
