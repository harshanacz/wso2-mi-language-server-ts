import { describe, it, expect } from "vitest";
import { mapResults, toRange, findOpenTagRange } from "../../src/schema/xsdValidator.js";

// Unit tests for the Xerces-error → diagnostic-range mapping (audit G2.11–G2.13).
// Xerces reports 1-based line/column at the CLOSING '>' of the offending tag; the
// mapper walks back to '<' and, for mismatched-tag / content-model errors, re-pins
// the diagnostic to the offending OPEN tag.

// ── G2.11: toRange backward-walk to '<' ─────────────────────────────────────────

describe("toRange", () => {
  const lines = ["  <sequnce>"];

  it("walks back from the column to the opening '<'", () => {
    // column is 1-based at the '>' (index 10 → column 11).
    const r = toRange(1, 11, lines);
    expect(r.start).toEqual({ line: 0, character: 2 });
    expect(r.end).toEqual({ line: 0, character: 11 });
  });

  it("falls back to a point range when no '<' precedes the column", () => {
    const r = toRange(1, 3, ["abc"]);
    expect(r.start).toEqual(r.end);
    expect(r.start).toEqual({ line: 0, character: 2 });
  });

  it("clamps line/column 0 to the start of the document", () => {
    const r = toRange(0, 0, ["<a/>"]);
    expect(r.start.line).toBe(0);
    expect(r.start.character).toBe(0);
  });

  it("does not throw when the line is beyond EOF", () => {
    expect(() => toRange(99, 5, ["<a/>"])).not.toThrow();
  });
});

// ── G2.12: findOpenTagRange ─────────────────────────────────────────────────────

describe("findOpenTagRange", () => {
  it("locates an open tag on the same line", () => {
    const r = findOpenTagRange("sequnce", 0, 10, ["  <sequnce>"]);
    expect(r).toEqual({
      start: { line: 0, character: 2 },
      end: { line: 0, character: 10 },
    });
  });

  it("searches backward across earlier lines", () => {
    const lines = ["<root>", "  <child>", "  </child>"];
    const r = findOpenTagRange("child", 2, 0, lines);
    expect(r?.start).toEqual({ line: 1, character: 2 });
  });

  it("returns null when the open tag is not found", () => {
    expect(findOpenTagRange("nope", 0, 5, ["<a/>"])).toBeNull();
  });
});

// ── G2.12: mismatched-tag remap adds an open-tag diagnostic ─────────────────────

describe("mapResults — mismatched tag", () => {
  const xml = `<root>\n  <sequnce>\n</root>`;
  const result = {
    valid: false,
    parseErrors: [
      {
        line: 3,
        column: 8,
        message: 'The element type "sequnce" must be terminated by the matching end-tag',
        severity: "error",
      },
    ],
    schemaErrors: [],
  } as any;

  const diags = mapResults(result, xml);

  it("emits the original parse error plus an open-tag diagnostic", () => {
    expect(diags.length).toBe(2);
  });

  it("the extra diagnostic points at the <sequnce> open tag", () => {
    const open = diags.find((d) => d.message.includes("has no matching end-tag"));
    expect(open).toBeDefined();
    // <sequnce> is on line index 1, at character 2.
    expect(open!.range.start).toEqual({ line: 1, character: 2 });
    expect(open!.source).toBe("syntax");
  });
});

// ── G2.13: content-model remap pins to the child open tag ───────────────────────

describe("mapResults — content-model violation", () => {
  // Xerces reports the error at the PARENT's closing tag; the mapper re-pins it to <propert>.
  const xml = `<parent>\n  <propert/>\n</parent>`;
  const result = {
    valid: false,
    parseErrors: [],
    schemaErrors: [
      {
        line: 3,
        column: 9,
        message: "element 'propert' is not allowed for content model '(a,b)'",
        severity: "error",
      },
    ],
  } as any;

  const diags = mapResults(result, xml);

  it("produces one xsd diagnostic", () => {
    expect(diags.length).toBe(1);
    expect(diags[0].source).toBe("xsd");
  });

  it("re-pins the range to the <propert> open tag, not the parent close", () => {
    expect(diags[0].range.start).toEqual({ line: 1, character: 2 });
  });

  it("extracts the local name from a namespaced content-model message", () => {
    const nsResult = {
      valid: false,
      parseErrors: [],
      schemaErrors: [
        {
          line: 3,
          column: 9,
          message: "element '{http://ns}propert' is not allowed for content model '(a,b)'",
          severity: "error",
        },
      ],
    } as any;
    const d = mapResults(nsResult, xml);
    expect(d[0].range.start).toEqual({ line: 1, character: 2 });
  });
});

describe("mapResults — severity passthrough", () => {
  it("maps a warning schema error to severity 'warning'", () => {
    const result = {
      valid: true,
      parseErrors: [],
      schemaErrors: [{ line: 1, column: 1, message: "heads up", severity: "warning" }],
    } as any;
    expect(mapResults(result, "<a/>")[0].severity).toBe("warning");
  });
});
