import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { JsonTransformFactory } from "../../../src/syntaxTree/factory/mediators/transformation/JsonTransformFactory.js";
import { JsonTransformMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/transformation/JsonTransformMediatorSerializer.js";

describe("JsontransformMediatorSerializerTest", () => {
  const factory = new JsonTransformFactory();
  const serializer = new JsonTransformMediatorSerializer();
  it("testJsontransformMediator", () => {
        const xml = "<jsontransform xmlns=\"http://ws.apache.org/ns/synapse\" schema=\"conf:tasks/tem.xml\" " +
                "description=\"test\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testJsontransformMediatorWithProperty", () => {
        const xml = "<jsontransform xmlns=\"http://ws.apache.org/ns/synapse\" schema=\"conf:tasks/tem.xml\" " +
                "description=\"test\"><property name=\"prop1\" value=\"val1\"/><property name=\"prop2\" " +
                "value=\"val2\"/></jsontransform>";
        checkMediator(factory, serializer, xml, true);
  });
});
