import { describe, it, expect } from "vitest";
import { parseDOM, DOMElement } from "../../src/syntaxTree/dom/dom.js";
import { STNode } from "../../src/syntaxTree/stNode.js";

const node = (el: DOMElement) => {
  const n = new STNode();
  n.elementNode(el);
  return n;
};

describe("STNode.elementNode", () => {
  const xml = '<a xmlns="urn:x">\n  <b/>\n</a>';
  const a = parseDOM(xml).getDocumentElement()!;
  const b = a.getFirstChild() as DOMElement;

  it("computes tag ranges", () => {
    const n = node(a);
    expect(n.tag).toBe("a");
    expect(n.selfClosed).toBe(false);
    expect(n.range!.startTagRange).toEqual({ start: { line: 0, character: 0 }, end: { line: 0, character: 17 } });
    expect(n.range!.endTagRange).toEqual({ start: { line: 2, character: 0 }, end: { line: 2, character: 4 } });
  });

  it("computes leading and trailing spaces", () => {
    const n = node(a);
    expect(n.spaces!.startingTagSpace.leadingSpace!.space).toBe("");
    expect(n.spaces!.startingTagSpace.trailingSpace!.space).toBe("\n  ");
    expect(n.spaces!.endingTagSpace!.leadingSpace!.space).toBe("\n");
    expect(n.spaces!.endingTagSpace!.trailingSpace!.space).toBe("");
  });

  it("self closed child has no end tag range or end tag spaces", () => {
    const n = node(b);
    expect(n.selfClosed).toBe(true);
    expect(n.range!.endTagRange).toBeNull();
    expect(n.spaces!.endingTagSpace).toBeNull();
    expect(n.spaces!.startingTagSpace.leadingSpace!.space).toBe("\n  ");
    expect(n.spaces!.startingTagSpace.trailingSpace!.space).toBe("\n");
  });

  it("collects namespaces", () => {
    expect(node(a).namespaces).toEqual({ xmlns: "urn:x" });
  });

  it("captures and unescapes text content", () => {
    const t = parseDOM("<m>a &lt; b &amp; c</m>").getDocumentElement()!;
    const n = node(t);
    expect(n.hasTextNode).toBe(true);
    expect(n.textNode).toBe("a < b & c");
  });

  it("has no spaces for an orphan end tag", () => {
    const o = parseDOM("</a>").getDocumentElement()!;
    expect(node(o).spaces).toBeUndefined();
  });
});
