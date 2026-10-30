import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { StoreFactory } from "../../../src/syntaxTree/factory/mediators/core/StoreFactory.js";
import { StoreMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/StoreMediatorSerializer.js";

describe("StoreMediatorSerializerTest", () => {
  const factory = new StoreFactory();
  const serializer = new StoreMediatorSerializer();
  it("testStoreMediator", () => {
        const xml = "<store xmlns=\"http://ws.apache.org/ns/synapse\" messageStore=\"testStore\" " +
                "sequence=\"testSequence\" description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
