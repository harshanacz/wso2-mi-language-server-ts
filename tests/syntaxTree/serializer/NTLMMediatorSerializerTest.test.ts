import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { NTLMMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/qos/NTLMMediatorSerializer.js";
import { NtlmFactory } from "../../../src/syntaxTree/factory/mediators/other/NtlmFactory.js";

describe("NTLMMediatorSerializerTest", () => {
  const factory = new NtlmFactory();
  const serializer = new NTLMMediatorSerializer();
  it("testNtlm", () => {
        const xml = "<NTLM xmlns=\"http://ws.apache.org/ns/synapse\" domain=\"domain\" host=\"host\" " +
                "username=\"username\" password=\"password\" ntlmVersion=\"{$ctx:version}\" description=\"Test\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
