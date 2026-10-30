import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { MessageProcessorFactory } from "../../../src/syntaxTree/factory/MessageProcessorFactory.js";
import { MessageProcessorSerializer } from "../../../src/syntaxTree/serializer/MessageProcessorSerializer.js";

describe("MessageProcessorSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new MessageProcessorFactory().create(e), (n) => MessageProcessorSerializer.serializeMessageProcessor(n), xml);
  it("testSerializeMessageProcessor", () => {
        const xml = "<messageProcessor xmlns=\"http://ws.apache.org/ns/synapse\" name=\"mp\" class=\"org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor\" messageStore=\"messageStore\" targetEndpoint=\"/hello\">" +
                "<parameter name=\"client.retry.interval\">1000</parameter>" +
                "<parameter name=\"max.delivery.attempts\">4</parameter>" +
                "<parameter name=\"member.count\">1</parameter>" +
                "<parameter name=\"message.processor.fault.sequence\">sample</parameter>" +
                "<parameter name=\"store.connection.retry.interval\">1000</parameter>" +
                "<parameter name=\"max.store.connection.attempts\">-1</parameter>" +
                "<parameter name=\"max.delivery.drop\">Disabled</parameter>" +
                "<parameter name=\"interval\">1000</parameter>" +
                "<parameter name=\"is.active\">true</parameter>" +
                "</messageProcessor>";
        check(xml);
  });
});
