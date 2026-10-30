import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { DropFactory } from "../../../src/syntaxTree/factory/mediators/core/DropFactory.js";
import { DropMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/core/DropMediatorSerializer.js";

describe("DropMediatorSerializerTest", () => {
  const factory = new DropFactory();
  const serializer = new DropMediatorSerializer();
  it("testDropMediator", () => {
        const xml = "<drop xmlns=\"http://ws.apache.org/ns/synapse\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testDropMediatorWithDescription", () => {
        const xml = "<drop xmlns=\"http://ws.apache.org/ns/synapse\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
