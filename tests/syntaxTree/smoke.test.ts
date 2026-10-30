import { describe, it, expect } from "vitest";
import { parseDOM } from "../../src/syntaxTree/dom/dom.js";
import { LogFactory } from "../../src/syntaxTree/factory/mediators/core/LogFactory.js";
import { LogMediatorSerializer } from "../../src/syntaxTree/serializer/mediator/core/LogMediatorSerializer.js";

describe("smoke", () => {
  it("round trips a log mediator", () => {
    const xml = '<log xmlns="http://ws.apache.org/ns/synapse" level="full"/>';
    const doc = parseDOM(xml);
    const m = new LogFactory().create(doc.getDocumentElement()!);
    const out = new LogMediatorSerializer().serializeMediator(null, m as any).toString();
    expect(out).toBe(xml);
  });
});
