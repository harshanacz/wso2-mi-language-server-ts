import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { LocalEntryFactory } from "../../../src/syntaxTree/factory/LocalEntryFactory.js";
import { LocalEntrySerializer } from "../../../src/syntaxTree/serializer/LocalEntrySerializer.js";

describe("LocalEntrySerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new LocalEntryFactory().create(e), (n) => LocalEntrySerializer.serializeLocalEntry(n), xml);
  it("testSerializeLocalEntry", () => {
        const xml = "<localEntry xmlns=\"http://ws.apache.org/ns/synapse\" " +
                "key=\"SALESFORCESOAP_CONNECTION_1\"><salesforce.init xmlns=\"\">\n" +
                "<connectionType>init</connectionType>\n" +
                "<password>Demo2024#S6hDusAEUMbD3yhMgvFzMwY2</password>\n" +
                "<loginUrl>https://sample-dev-ed.my.salesforce.com/services/Soap/u/39.0</loginUrl>\n" +
                "<name>SALESFORCESOAP_CONNECTION_1</name>\n" +
                "<username>sample.user@salesforce.com</username>\n" +
                "</salesforce.init></localEntry>";
        check(xml);
  });
});
