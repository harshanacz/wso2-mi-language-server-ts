import { describe, it, expect } from "vitest";
import { DiagnosticsHandler } from "../src/diagnosticsHandler.js";
import { createConnection } from "./helpers/diagnosticsTestUtils.js";

// Tests for the staleness guard, hasErrorAt, and the no-schema clear path
// (audit G3.1, G3.7, G3.8). A mock service drives validateAndSend down the
// fallback (service.validate) branch so no Xerces WASM is required.

type Sent = { uri: string; diagnostics: any[] };

/** A fake live TextDocument whose version can change mid-validation. */
function fakeDoc(uri: string, text: string, version = 1) {
  return {
    uri,
    version,
    getText: () => text,
  };
}

/** Mock service: no xsdPath → skips the ProjectValidator branch and uses service.validate. */
function mockService(opts: {
  resolved: any;
  validate: () => Promise<any[]>;
}) {
  return {
    parseXMLDocument: (uri: string, text: string) => ({ uri, text, getNamespace: () => undefined }),
    resolveSchemaForDocument: () => opts.resolved,
    hasSchema: () => true,
    buildAndCacheCompletionProvider: async () => undefined,
    validate: opts.validate,
  } as any;
}

describe("DiagnosticsHandler — version guard (G3.1)", () => {
  it("discards diagnostics when the document version changed mid-validation", async () => {
    const { connection, sentDiagnostics } = createConnection();
    const doc = fakeDoc("mem://a.xml", "<a/>");
    const service = mockService({
      resolved: { xsdText: "<xsd/>" }, // no xsdPath → fallback branch
      validate: async () => {
        doc.version = 2; // simulate an edit landing during the await
        return [{ range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, message: "stale", severity: "error", source: "xsd" }];
      },
    });
    const handler = new DiagnosticsHandler(connection as any, service);

    await handler.validateAndSend(doc as any);

    // The stale result must NOT have been sent.
    expect(sentDiagnostics.length).toBe(0);
    expect(handler.hasErrorAt("mem://a.xml", 0, 0)).toBe(false);
  });

  it("sends diagnostics when the version is unchanged", async () => {
    const { connection, sentDiagnostics } = createConnection();
    const doc = fakeDoc("mem://b.xml", "<a/>");
    const service = mockService({
      resolved: { xsdText: "<xsd/>" },
      validate: async () => [
        { range: { start: { line: 1, character: 2 }, end: { line: 1, character: 8 } }, message: "boom", severity: "error", source: "xsd" },
      ],
    });
    const handler = new DiagnosticsHandler(connection as any, service);

    await handler.validateAndSend(doc as any);

    expect(sentDiagnostics.length).toBe(1);
    expect((sentDiagnostics[0] as Sent).diagnostics.length).toBe(1);
  });
});

describe("DiagnosticsHandler — hasErrorAt (G3.7)", () => {
  it("reports containment within a diagnostic range, and rejects outside positions", async () => {
    const { connection } = createConnection();
    const doc = fakeDoc("mem://c.xml", "<a/>");
    const service = mockService({
      resolved: { xsdText: "<xsd/>" },
      validate: async () => [
        { range: { start: { line: 1, character: 2 }, end: { line: 1, character: 8 } }, message: "err", severity: "error", source: "xsd" },
      ],
    });
    const handler = new DiagnosticsHandler(connection as any, service);
    await handler.validateAndSend(doc as any);

    expect(handler.hasErrorAt("mem://c.xml", 1, 4)).toBe(true);   // inside
    expect(handler.hasErrorAt("mem://c.xml", 1, 2)).toBe(true);   // at start edge
    expect(handler.hasErrorAt("mem://c.xml", 1, 8)).toBe(true);   // at end edge
    expect(handler.hasErrorAt("mem://c.xml", 1, 20)).toBe(false); // past end
    expect(handler.hasErrorAt("mem://c.xml", 5, 0)).toBe(false);  // other line
    expect(handler.hasErrorAt("mem://other.xml", 1, 4)).toBe(false); // unknown uri
  });
});

describe("DiagnosticsHandler — no schema clears diagnostics (G3.8)", () => {
  it("sends an empty diagnostics array when no schema resolves", async () => {
    const { connection, sentDiagnostics } = createConnection();
    const doc = fakeDoc("mem://d.xml", "<a/>");
    const service = mockService({ resolved: null, validate: async () => [] });
    const handler = new DiagnosticsHandler(connection as any, service);

    await handler.validateAndSend(doc as any);

    expect(sentDiagnostics.length).toBe(1);
    const sent = sentDiagnostics[0] as Sent;
    expect(sent.uri).toBe("mem://d.xml");
    expect(sent.diagnostics).toEqual([]);
  });
});
