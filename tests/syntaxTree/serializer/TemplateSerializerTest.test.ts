import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { TemplateFactory } from "../../../src/syntaxTree/factory/TemplateFactory.js";
import { TemplateSerializer } from "../../../src/syntaxTree/serializer/TemplateSerializer.js";

describe("TemplateSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new TemplateFactory().create(e), (n) => TemplateSerializer.serializeTemplate(n), xml);
  it("testSequenceTemplate", () => {
        const xml = "<template xmlns=\"http://ws.apache.org/ns/synapse\" name=\"testTemplate\" " +
                "onError=\"onErrorSeq\"><parameter name=\"param1\" defaultValue=\"\" " +
                "isMandatory=\"false\"/><sequence><cache collector=\"true\"/><script language=\"js\" " +
                "key=\"{$ctx:key}\" function=\"sapleFunc\"><include key=\"key1\"/></script></sequence></template>";
        check(xml);
  });

  it("testEndpointTemplate", () => {
        const xml = "<template xmlns=\"http://ws.apache.org/ns/synapse\" " +
                "name=\"testDefault-edited\"><axis2ns01:parameter xmlns:axis2ns01=\"http://ws.apache.org/ns/synapse\"" +
                " name=\"parameter_11\" isMandatory=\"false\"/><axis2ns02:parameter xmlns:axis2ns02=\"http://ws" +
                ".apache.org/ns/synapse\" name=\"parameter_22\" isMandatory=\"false\"/><axis2ns03:parameter " +
                "xmlns:axis2ns03=\"http://ws.apache.org/ns/synapse\" name=\"parameter_33\" " +
                "isMandatory=\"false\"/><endpoint name=\"endpoint_urn_uuid_456c2fb5-e739-4005-87b2-d109f47a5925" +
                "\"><default><suspendOnFailure><initialDuration>-1</initialDuration><progressionFactor>1" +
                "</progressionFactor></suspendOnFailure><markForSuspension><retriesBeforeSuspension>0" +
                "</retriesBeforeSuspension></markForSuspension></default></endpoint></template>";
        check(xml);
  });
});
