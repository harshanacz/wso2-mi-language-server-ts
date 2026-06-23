import { describe, it, expect } from "vitest";
import {
  filterDiagnostics,
  resolveLocalReference,
  findDtdLocations,
  findSchemaLocations,
} from "../src/diagnosticsHandler.js";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver/node.js";

// Pure-function unit tests for diagnostics helpers (audit G3.2, G3.5, G3.6).

function diag(message: string, line = 0, character = 0): Diagnostic {
  return {
    message,
    severity: DiagnosticSeverity.Error,
    source: "wso2-mi-language-server",
    range: { start: { line, character }, end: { line, character: character + 1 } },
  };
}

// ── G3.2: filterDiagnostics cascade collapsing ──────────────────────────────────

describe("filterDiagnostics", () => {
  it("collapses attribute + content-model noise for an unknown element", () => {
    const input = [
      diag("no declaration found for element 'foo'"),
      diag("attribute 'x' is not declared for element 'foo'"),
      diag("element 'foo' is not allowed for content model '(a,b)'"),
    ];
    const out = filterDiagnostics(input);
    expect(out.length).toBe(1);
    expect(out[0].message).toContain("no declaration found for element 'foo'");
  });

  it("keeps attribute/content-model diagnostics for a KNOWN element", () => {
    const input = [
      diag("no declaration found for element 'foo'"),
      diag("attribute 'y' is not declared for element 'bar'"),
      diag("element 'bar' is not allowed for content model '(a,b)'"),
    ];
    const out = filterDiagnostics(input);
    // foo's single unknown survives; bar's two diagnostics are NOT collapsed.
    expect(out.map((d) => d.message)).toEqual([
      "no declaration found for element 'foo'",
      "attribute 'y' is not declared for element 'bar'",
      "element 'bar' is not allowed for content model '(a,b)'",
    ]);
  });

  it("deduplicates identical message+position diagnostics", () => {
    const input = [
      diag("no declaration found for element 'foo'", 2, 4),
      diag("duplicate me", 1, 1),
      diag("duplicate me", 1, 1),
    ];
    const out = filterDiagnostics(input);
    expect(out.filter((d) => d.message === "duplicate me").length).toBe(1);
  });

  it("returns input unchanged when there is no unknown-element diagnostic", () => {
    const input = [diag("attribute 'x' is not declared for element 'foo'")];
    expect(filterDiagnostics(input)).toEqual(input);
  });

  it("does NOT collapse when the unknown name is namespaced but the cascade uses the bare name", () => {
    // Characterizes a known limitation: '{ns}foo' != 'foo', so the cascade is kept.
    const input = [
      diag("no declaration found for element '{http://ns}foo'"),
      diag("attribute 'x' is not declared for element 'foo'"),
    ];
    const out = filterDiagnostics(input);
    expect(out.length).toBe(2);
  });
});

// ── G3.5: resolveLocalReference path-escape guard ───────────────────────────────

describe("resolveLocalReference", () => {
  const root = "/schemas";
  const current = "/schemas/main.xsd";

  it("rejects a remote (scheme-prefixed) reference", () => {
    expect(resolveLocalReference(current, root, "http://h/x.xsd", false)).toBeUndefined();
  });

  it("rejects an absolute path that escapes the schema root", () => {
    expect(resolveLocalReference(current, root, "/abs/x.xsd", false)).toBeUndefined();
  });

  it("rejects a ../ path escaping the schema root", () => {
    expect(resolveLocalReference(current, root, "../../etc/x.xsd", false)).toBeUndefined();
  });

  it("rejects an unsupported extension", () => {
    expect(resolveLocalReference(current, root, "x.txt", false)).toBeUndefined();
  });

  it("rejects a .dtd reference unless allowDtd is set", () => {
    expect(resolveLocalReference(current, root, "x.dtd", false)).toBeUndefined();
    expect(resolveLocalReference(current, root, "x.dtd", true)).toBe("/schemas/x.dtd");
  });

  it("resolves an in-root .xsd reference", () => {
    expect(resolveLocalReference(current, root, "sub/c.xsd", false)).toBe("/schemas/sub/c.xsd");
  });

  it("invokes the warn callback on rejection", () => {
    const msgs: string[] = [];
    resolveLocalReference(current, root, "http://h/x.xsd", false, (m) => msgs.push(m));
    expect(msgs.length).toBe(1);
  });
});

// ── G3.6: findDtdLocations / findSchemaLocations ────────────────────────────────

describe("findDtdLocations", () => {
  it("extracts SYSTEM, PUBLIC, and ENTITY .dtd references and filters non-dtd", () => {
    const text = [
      `<!DOCTYPE r SYSTEM "a.dtd">`,
      `<!DOCTYPE q PUBLIC "id" "b.dtd">`,
      `<!ENTITY % e SYSTEM "c.dtd">`,
      `<!DOCTYPE z SYSTEM "d.xml">`,
    ].join("\n");
    expect(findDtdLocations(text).sort()).toEqual(["a.dtd", "b.dtd", "c.dtd"]);
  });
});

describe("findSchemaLocations", () => {
  it("extracts schemaLocation from include/import/redefine (incl. namespaced tags)", () => {
    const xsd = `
      <xs:include schemaLocation="a.xsd"/>
      <xs:import namespace="urn:x" schemaLocation="b.xsd"/>
      <xs:redefine schemaLocation="c.xsd"></xs:redefine>
    `;
    expect(findSchemaLocations(xsd).sort()).toEqual(["a.xsd", "b.xsd", "c.xsd"]);
  });
});
