import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { CloneFactory } from "../../../src/syntaxTree/factory/mediators/advanced/CloneFactory.js";
import { CloneMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/flowControl/CloneMediatorSerializer.js";

describe("CloneMediatorSerializerTest", () => {
  const factory = new CloneFactory();
  const serializer = new CloneMediatorSerializer();
  it("testCloneMediator", () => {
        const xml = "<clone xmlns=\"http://ws.apache.org/ns/synapse\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testCloneMediatorWithChildren", () => {
        const xml = "<clone xmlns=\"http://ws.apache.org/ns/synapse\"><target><sequence><log " +
                "level=\"custom\"><property name=\"service\" value=\"Bus Services is " +
                "called\"/></log></sequence></target></clone>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testCloneMediatorWithMultipleTargets", () => {
        const xml = "<clone xmlns=\"http://ws.apache.org/ns/synapse\" id=\"test\" continueParent=\"true\" " +
                "sequential=\"true\" description=\"test\"><target to=\"to\" soapAction=\"action\" " +
                "sequence=\"testSequence\"/><target to=\"to\" soapAction=\"action\"><sequence><log " +
                "description=\"test\"/></sequence></target></clone>";
        checkMediator(factory, serializer, xml, true);
  });
});
