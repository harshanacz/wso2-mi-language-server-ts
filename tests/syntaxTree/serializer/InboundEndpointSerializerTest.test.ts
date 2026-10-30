import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { InboundEndpointFactory } from "../../../src/syntaxTree/factory/InboundEndpointFactory.js";
import { InboundEndpointSerializer } from "../../../src/syntaxTree/serializer/InboundEndpointSerializer.js";

describe("InboundEndpointSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new InboundEndpointFactory().create(e), (n) => InboundEndpointSerializer.serializeInboundEndpoint(n), xml);
  it("testSerializeInboundEndpoint", () => {
        const xml = "<inboundEndpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"inbound\" protocol=\"http\" suspend=\"false\">" +
                "<parameters>" +
                "<parameter name=\"inbound.http.port\">8000</parameter>" +
                "<parameter name=\"inbound.worker.pool.size.core\">400</parameter>" +
                "<parameter name=\"inbound.worker.pool.size.max\">500</parameter>" +
                "<parameter name=\"inbound.worker.thread.keep.alive.sec\">60</parameter>" +
                "<parameter name=\"inbound.worker.pool.queue.length\">-1</parameter>" +
                "<parameter name=\"inbound.thread.id\">PassThroughInboundWorkerPool</parameter>" +
                "</parameters>" +
                "</inboundEndpoint>";
        check(xml);
  });
});
