import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { DataMapperFactory } from "../../../src/syntaxTree/factory/mediators/transformation/DataMapperFactory.js";
import { DatamapperMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/DatamapperMediatorSerializer.js";

describe("DatamapperMediatorSerializerTest", () => {
  const factory = new DataMapperFactory();
  const serializer = new DatamapperMediatorSerializer();
  it("testSerializeDatamapperMediator", () => {
        const xml = "<datamapper xmlns=\"http://ws.apache.org/ns/synapse\" inputType=\"JSON\" " +
                "inputSchema=\"gov:/datamapper/test/test_inputSchema.json\" outputType=\"XML\" " +
                "outputSchema=\"gov:/datamapper/test/test_outputSchema.json\" config=\"gov:/datamapper/test/test" +
                ".dmc\" xsltStyleSheet=\"gov:test/xsltStyleSheet.xslt\"/>";
        checkMediator(factory, serializer, xml, true);
  });
});
