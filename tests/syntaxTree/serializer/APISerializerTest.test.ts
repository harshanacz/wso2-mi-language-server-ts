import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { APIFactory } from "../../../src/syntaxTree/factory/APIFactory.js";
import { APISerializer } from "../../../src/syntaxTree/serializer/api/APISerializer.js";

describe("APISerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new APIFactory().create(e), (n) => APISerializer.serializeAPI(n), xml);
  it("testSerializeAPI", () => {
        const xml = "<api xmlns=\"http://ws.apache.org/ns/synapse\" name=\"CalculatorAPI\" context=\"/calculate\" " +
                "statistics=\"enable\" trace=\"enable\">" +
                "<resource methods=\"POST\">" +
                "<inSequence/>" +
                "<outSequence/>" +
                "<faultSequence/>" +
                "</resource>" +
                "</api>";
        check(xml);
  });
});
