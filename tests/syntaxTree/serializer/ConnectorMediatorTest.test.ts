import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { ConnectorFactory } from "../../../src/syntaxTree/factory/mediators/ConnectorFactory.js";
import { ConnectorSerializer } from "../../../src/syntaxTree/serializer/mediator/ConnectorSerializer.js";

describe("ConnectorMediatorTest", () => {
  const factory = new ConnectorFactory();
  const serializer = new ConnectorSerializer();
  it("testSimpleConnectorMediator", () => {
        const xml = "<email.list xmlns=\"http://ws.apache.org/ns/synapse\" " +
                "configKey=\"EMAIL_CONNECTION_1\"><deleteAfterRetrieve>false</deleteAfterRetrieve><receivedSince " +
                "xmlns:test=\"http://www.test.com\">{test}</receivedSince><receivedUntil>test</receivedUntil><offset" +
                ">test</offset><limit>test</limit><folder>test</folder></email.list>";
        checkMediator(factory, serializer, xml, true);
  });
});
