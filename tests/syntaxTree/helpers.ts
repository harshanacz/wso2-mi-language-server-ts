import { expect } from "vitest";
import "../../src/syntaxTree/serializer/endpoint/registerEndpointSerializers.js";
import { parseDOM } from "../../src/syntaxTree/dom/dom.js";

export function root(xml: string) {
  return parseDOM(xml, "test.xml").getDocumentElement()!;
}

/** MediatorSerializerTest.testSerializeMediator */
export function checkMediator(factory: any, serializer: any, xml: string, valid: boolean) {
  const mediator = factory.create(root(xml));
  const actual = serializer.serializeMediator(null, mediator).toString();
  if (valid) expect(actual).toBe(xml);
  else expect(xml === actual).toBe(false);
}

export function checkRoundTrip(create: (e: any) => any, serialize: (n: any) => string, xml: string) {
  const node = create(root(xml));
  const actual = serialize(node).toString();
  expect(actual).toBe(xml);
}
