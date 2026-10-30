import { describe, it, expect } from "vitest";
import { parseDOM, DOMElement } from "../../src/syntaxTree/dom/dom.js";

const root = (xml: string) => parseDOM(xml).getDocumentElement()!;
const kids = (e: DOMElement) => e.getChildren().map((c) => c.getNodeName());

describe("DOM parser (LemMinX behaviour)", () => {
  it("builds elements, attributes and offsets", () => {
    const xml = '<api name="A" context=\'/c\'><resource/></api>';
    const api = root(xml);
    expect(api.getNodeName()).toBe("api");
    expect(api.getAttribute("name")).toBe("A");
    expect(api.getAttribute("context")).toBe("/c");
    expect(api.getAttribute("missing")).toBeNull();
    expect(api.getStart()).toBe(0);
    expect(api.getEnd()).toBe(xml.length);
    expect(api.getStartTagCloseOffset()).toBe(xml.indexOf("><resource"));
    expect(api.getEndTagOpenOffset()).toBe(xml.indexOf("</api>"));
    expect(api.getEndTagCloseOffset()).toBe(xml.length - 1);
    const res = api.getFirstChild() as DOMElement;
    expect(res.isSelfClosed()).toBe(true);
    expect(res.getStart()).toBe(xml.indexOf("<resource"));
    expect(res.getEnd()).toBe(xml.indexOf("</api>"));
  });

  it("ignores whitespace between elements", () => {
    const e = root("<a>\n  <b/>\n  <c/>\n</a>");
    expect(kids(e)).toEqual(["b", "c"]);
  });

  it("keeps whitespace-only content of an otherwise empty element", () => {
    const e = root("<a> </a>");
    expect(kids(e)).toEqual(["#text"]);
  });

  it("keeps non-blank text, comments and CDATA", () => {
    const e = root("<a>hello<!-- c --><![CDATA[x < y]]></a>");
    expect(kids(e)).toEqual(["#text", "#comment", "#cdata-section"]);
    const [t, c, d] = e.getChildren();
    expect(t.getTextContent()).toBe("hello");
    expect(c.getTextContent()).toBe(" c ");
    expect(d.getTextContent()).toBe("x < y");
    expect(d.isCDATA()).toBe(true);
  });

  it("splits prefix and local name", () => {
    const e = root('<syn:log xmlns:syn="urn:x"/>');
    expect(e.getNodeName()).toBe("syn:log");
    expect(e.getLocalName()).toBe("log");
    expect(e.getPrefix()).toBe("syn");
  });

  it("tolerates an unclosed element", () => {
    const xml = "<a><b>";
    const a = root(xml);
    expect(a.hasEndTag()).toBe(false);
    expect(a.getEnd()).toBe(xml.length);
    expect(kids(a)).toEqual(["b"]);
  });

  it("creates an orphan end tag element", () => {
    const d = parseDOM("</a>");
    const el = d.getDocumentElement()!;
    expect(el.isOrphanEndTag()).toBe(true);
    expect(el.getNodeName()).toBe("a");
  });

  it("navigates siblings and parents", () => {
    const a = root("<a><b/>text<c/></a>");
    const [b, , c] = a.getChildren();
    expect(b.getNextSibling()!.getNodeName()).toBe("#text");
    expect(c.getPreviousNonTextSibling()).toBe(b);
    expect(c.getParentElement()).toBe(a);
    expect(a.getParentElement()).toBeNull();
  });

  it("attributes without value", () => {
    const e = root("<a flag name='x'/>");
    expect(e.getAttribute("flag")).toBeNull();
    expect(e.hasAttribute("flag")).toBe(true);
    expect(e.getAttribute("name")).toBe("x");
  });

  it("positionAt handles LF, CRLF and CR", () => {
    const d = parseDOM("<a>\r\n<b/>\r<c/>\n</a>");
    expect(d.positionAt(0)).toEqual({ line: 0, character: 0 });
    expect(d.positionAt(5)).toEqual({ line: 1, character: 0 });
    expect(d.positionAt(10)).toEqual({ line: 2, character: 0 });
    expect(d.positionAt(15)).toEqual({ line: 3, character: 0 });
  });

  it("parses prolog and keeps document element", () => {
    const d = parseDOM('<?xml version="1.0"?>\n<a/>');
    expect(d.getDocumentElement()!.getNodeName()).toBe("a");
    expect(d.getChildren()[0].isProcessingInstruction()).toBe(true);
  });
});
