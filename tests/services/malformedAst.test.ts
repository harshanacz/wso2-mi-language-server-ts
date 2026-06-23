import { describe, it, expect } from "vitest";
import { parseXMLDocument } from "../../src/parser/xmlParser.js";
import { doComplete } from "../../src/services/xmlCompletion.js";
import { doHover } from "../../src/services/xmlHover.js";
import { getFoldingRanges } from "../../src/services/xmlFolding.js";
import { findDocumentSymbols } from "../../src/services/xmlSymbols.js";
import { doRename } from "../../src/services/xmlRename.js";
import { doDefinition } from "../../src/services/xmlDefinition.js";
import { findReferences } from "../../src/services/xmlReferences.js";
import { format, formatRange } from "../../src/services/xmlFormatter.js";

// Providers are stateless over the AST and must degrade gracefully on the partial /
// malformed ASTs produced by upstream syntax errors (audit G4). These tests assert
// "no throw + sane shape" at every offset, plus the H characterization pinning the
// current (buggy) same-name tag pairing in definition/rename.

const parse = (xml: string) => parseXMLDocument("file:///t.xml", xml);
const pos = (character: number, line = 0) => ({ line, character });

const MALFORMED = [
  `<root><child><log level="full" </root>`, // mid-tag error → partial tree
  `<root><unclosed></root>`,                // unclosed → mislabeled self-closing
  `<a><a></a></a>`,                          // nested same-name
  ``,                                        // empty
];

describe("G4 — providers never throw on malformed/partial ASTs at any offset", () => {
  for (const xml of MALFORMED) {
    const doc = parse(xml);
    it(`survives every offset for ${JSON.stringify(xml)}`, () => {
      for (let off = 0; off <= xml.length; off++) {
        const p = pos(off);
        expect(() => doComplete(doc, p)).not.toThrow();
        expect(() => doHover(doc, p)).not.toThrow();
        expect(() => doRename(doc, p, "x")).not.toThrow();
        expect(() => doDefinition(doc, p)).not.toThrow();
        expect(() => findReferences(doc, p)).not.toThrow();
      }
      expect(() => getFoldingRanges(doc)).not.toThrow();
      expect(() => findDocumentSymbols(doc)).not.toThrow();
      expect(() => format(doc)).not.toThrow();
      expect(() => formatRange(doc, 0, xml.length)).not.toThrow();
    });
  }
});

describe("G4 — degraded result shapes on a partial tree", () => {
  const doc = parse(`<root><child><log level="full" </root>`);

  it("doComplete always returns a CompletionList shape", () => {
    const r = doComplete(doc, pos(7));
    expect(Array.isArray(r.items)).toBe(true);
    expect(typeof r.isIncomplete).toBe("boolean");
  });

  it("getFoldingRanges returns ranges that all satisfy startLine < endLine", () => {
    for (const r of getFoldingRanges(doc)) {
      expect(r.startLine).toBeLessThan(r.endLine);
    }
  });

  it("findDocumentSymbols returns an array (nameless nodes skipped)", () => {
    expect(Array.isArray(findDocumentSymbols(doc))).toBe(true);
  });

  it("format returns a single full-document TextEdit", () => {
    const edits = format(doc);
    expect(edits.length).toBe(1);
    expect(edits[0].startOffset).toBe(0);
  });
});

describe("G4 — unclosed element (mislabeled self-closing) degradation", () => {
  // <root><unclosed></root>: root is reported isSelfClosing=true (decision B).
  const xml = `<root><unclosed></root>`;
  const doc = parse(xml);

  it("doDefinition on the (self-closing-flagged) root returns null", () => {
    expect(doDefinition(doc, pos(1))).toBeNull();
  });

  it("doRename on the root produces only the open-tag edit (no close edit)", () => {
    const edits = doRename(doc, pos(1), "renamed");
    expect(edits).not.toBeNull();
    expect(edits!.length).toBe(1);
    expect(edits![0].newText).toBe("renamed");
  });
});

describe("H — same-name nested tag pairing characterization (current, buggy)", () => {
  // <a><a></a></a>  index map:
  // 0:< 1:a 2:> 3:< 4:a 5:> 6:< 7:/ 8:a 9:> 10:< 11:/ 12:a 13:>
  const xml = `<a><a></a></a>`;
  const doc = parse(xml);

  it("doDefinition from the OUTER open tag jumps to the INNER close (bug: should be outer)", () => {
    const def = doDefinition(doc, pos(1));
    expect(def).not.toBeNull();
    // BUG: indexOf finds the first '</a' at offset 6 (inner), not the outer at 10.
    expect(def!.range.start.character).toBe(6);
  });

  it("doRename from the OUTER open tag edits the outer open and the outer close (lastIndexOf)", () => {
    const edits = doRename(doc, pos(1), "z");
    expect(edits).not.toBeNull();
    const starts = edits!.map((e) => e.startOffset).sort((a, b) => a - b);
    // open name at offset 1; close name at offset 12 (outer '</a').
    expect(starts).toEqual([1, 12]);
  });
});
