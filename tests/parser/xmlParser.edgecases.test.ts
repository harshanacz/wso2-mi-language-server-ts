import { describe, it, expect } from "vitest";
import { parseXMLDocument } from "../../src/parser/xmlParser.js";
import { XMLNode } from "../../src/parser/xmlNode.js";

// These are CHARACTERIZATION tests: they pin the parser's CURRENT behavior, including
// behaviors that are known-imperfect but intentionally left as-is (per audit decisions
// A, B, C). When the underlying behavior is deliberately changed later, these tests are
// expected to change with it.
//
// Decision A: the AST is element-only — comments, CDATA, and text/mixed content are
//             dropped (no "text"/"comment" nodes are ever produced).
// Decision B: an unclosed element is (incorrectly) reported as isSelfClosing=true.
// Decision C: error recovery is partial — siblings parsed before an error survive,
//             siblings after it in the same content list are dropped.
//
// Namespace-resolution behavior (decision D) and deep-recursion stack limits
// (decision E) are intentionally NOT covered here.

const parse = (xml: string) => parseXMLDocument("file:///t.xml", xml);

function collectTypes(doc: ReturnType<typeof parse>): string[] {
  const types: string[] = [];
  doc.traverse((n: XMLNode) => types.push(n.type));
  return types;
}

function names(doc: ReturnType<typeof parse>): string[] {
  const out: string[] = [];
  doc.traverse((n: XMLNode) => {
    if (n.name) out.push(n.name);
  });
  return out;
}

// ── Decision A: element-only AST (comments / CDATA / mixed content dropped) ──────

describe("A — comments are dropped from the AST", () => {
  const doc = parse(`<root><!-- hi --><a/></root>`);

  it("produces no node of type 'comment'", () => {
    expect(collectTypes(doc)).not.toContain("comment");
  });

  it("still parses sibling elements around the comment", () => {
    expect(names(doc)).toEqual(["root", "a"]);
  });

  it("does not report a syntax error for a well-formed comment", () => {
    expect(doc.syntaxErrors.length).toBe(0);
  });
});

describe("A — CDATA sections are dropped and do not break parsing", () => {
  // The '<' inside CDATA must not be treated as a tag opener.
  const doc = parse(`<root><![CDATA[ a<b ]]></root>`);

  it("does not throw and reports no syntax error", () => {
    expect(doc.syntaxErrors.length).toBe(0);
  });

  it("produces no element child for the CDATA content", () => {
    expect(doc.children[0].children.length).toBe(0);
  });

  it("produces no 'text' node", () => {
    expect(collectTypes(doc)).not.toContain("text");
  });
});

describe("A — mixed content keeps elements but drops text", () => {
  const doc = parse(`<root>text <b>bold</b> more</root>`);

  it("retains the nested element", () => {
    expect(names(doc)).toEqual(["root", "b"]);
  });

  it("produces no 'text' node for the surrounding text", () => {
    expect(collectTypes(doc)).not.toContain("text");
  });
});

// ── Decision B: unclosed elements are mislabeled self-closing ────────────────────

describe("B — isSelfClosing characterization", () => {
  it("a real self-closing tag <a/> is isSelfClosing=true", () => {
    const doc = parse(`<a/>`);
    expect(doc.children[0].isSelfClosing).toBe(true);
  });

  it("a properly closed <a></a> is isSelfClosing=false", () => {
    const doc = parse(`<a></a>`);
    expect(doc.children[0].isSelfClosing).toBe(false);
  });

  it("an UNCLOSED element is (currently) reported as isSelfClosing=true", () => {
    // <root><child></root> — child is unclosed; the parser mislabels root as self-closing.
    const doc = parse(`<root><child></root>`);
    expect(doc.children[0].name).toBe("root");
    expect(doc.children[0].isSelfClosing).toBe(true);
  });

  it("the unclosed document reports exactly one syntax error", () => {
    const doc = parse(`<root><child></root>`);
    expect(doc.syntaxErrors.length).toBe(1);
  });
});

// ── Decision C: partial recovery drops siblings after an error ───────────────────

describe("C — partial error recovery within a content list", () => {
  // <b </b> is malformed; <c> follows it in the same content list.
  const doc = parse(`<root><a></a><b </b><c></c></root>`);

  it("does not throw and records syntax errors", () => {
    expect(doc.syntaxErrors.length).toBeGreaterThan(0);
  });

  it("keeps siblings parsed BEFORE the error", () => {
    const root = doc.children[0];
    expect(root.children.map((c) => c.name)).toContain("a");
  });

  it("DROPS siblings that appear AFTER the error in the same content list", () => {
    const root = doc.children[0];
    expect(root.children.map((c) => c.name)).not.toContain("c");
  });
});

describe("C — error nested deep still yields the valid outer portion", () => {
  const doc = parse(`<root><l1><l2><bad></l2></l1></root>`);

  it("root and the levels before the error are present", () => {
    expect(names(doc).slice(0, 3)).toEqual(["root", "l1", "l2"]);
  });

  it("reports at least one syntax error", () => {
    expect(doc.syntaxErrors.length).toBeGreaterThan(0);
  });
});

// ── G1.10: offset / range fidelity ───────────────────────────────────────────────

describe("G1.10 — element and attribute offsets", () => {
  const xml = `<a x="hi"/>`;
  const doc = parse(xml);
  const a = doc.children[0];

  it("element startOffset is 0 and endOffset spans the whole document", () => {
    expect(a.startOffset).toBe(0);
    expect(a.endOffset).toBe(xml.length);
  });

  it("attribute value excludes the surrounding quotes", () => {
    const attr = a.attributes[0];
    expect(attr.name).toBe("x");
    expect(attr.value).toBe("hi");
  });

  it("attribute valueStart/valueEnd bound the unquoted value text", () => {
    const attr = a.attributes[0];
    // x="hi" — the value characters 'h','i' sit between the quotes.
    expect(xml.slice(attr.valueStart!, attr.valueEnd! + 1)).toBe("hi");
  });
});

// ── G1.11: findNodeAt boundary conditions ────────────────────────────────────────

describe("G1.11 — findNodeAt boundaries", () => {
  const xml = `<root><c/></root>`;
  const doc = parse(xml);

  it("offset past the end resolves to the document root", () => {
    expect(doc.findNodeAt(xml.length + 10).type).toBe("root");
  });

  it("a negative offset does not throw and resolves to a node", () => {
    expect(() => doc.findNodeAt(-1)).not.toThrow();
    expect(doc.findNodeAt(-1)).toBeDefined();
  });

  it("an offset inside <c/> resolves to the c element", () => {
    const cStart = xml.indexOf("<c");
    expect(doc.findNodeAt(cStart + 1).name).toBe("c");
  });
});

// ── G1.12: degenerate inputs ─────────────────────────────────────────────────────

describe("G1.12 — degenerate inputs do not throw", () => {
  // The CST always emits one element slot; for content-free input that slot is a
  // nameless phantom element and a single syntax error is reported.
  for (const input of ["", "   ", "plain text", `<?xml version="1.0"?>`]) {
    it(`parses ${JSON.stringify(input)} into a root with one nameless phantom child + a syntax error`, () => {
      const doc = parse(input);
      expect(doc.type).toBe("root");
      expect(doc.children.length).toBe(1);
      expect(doc.children[0].name).toBeUndefined();
      expect(doc.syntaxErrors.length).toBe(1);
    });
  }

  it("with two top-level roots, only the FIRST is captured (the rest are dropped + error)", () => {
    const doc = parse(`<a/><b/>`);
    expect(doc.children.map((c) => c.name)).toEqual(["a"]);
    expect(doc.syntaxErrors.length).toBe(1);
  });
});

// ── G1.13: syntaxErrors carry 0-based positions ──────────────────────────────────

describe("G1.13 — syntax error position normalization", () => {
  const doc = parse(`<root>\n  <bad\n</root>`);

  it("reports at least one error with non-negative 0-based line/character", () => {
    expect(doc.syntaxErrors.length).toBeGreaterThan(0);
    for (const e of doc.syntaxErrors) {
      expect(e.line).toBeGreaterThanOrEqual(0);
      expect(e.character).toBeGreaterThanOrEqual(0);
    }
  });
});

// ── G1.14: attributes without values / duplicates ───────────────────────────────

describe("G1.14 — attribute edge representation", () => {
  it("a duplicate attribute name keeps both entries", () => {
    const doc = parse(`<a b="1" b="2"/>`);
    const bs = doc.children[0].attributes.filter((at) => at.name === "b");
    expect(bs.length).toBe(2);
    expect(bs.map((at) => at.value)).toEqual(["1", "2"]);
  });
});
