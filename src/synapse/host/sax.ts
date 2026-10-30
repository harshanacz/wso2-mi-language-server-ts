import { DOMDocument, DOMElement, DOMNode, parseDOM } from "../../syntaxTree/dom/dom.js";
import { JFile } from "./JFile.js";

/** org.xml.sax.Locator: 1-based line and column of the position just after the current event. */
export interface Locator {
  getLineNumber(): number;
  getColumnNumber(): number;
}

/** org.xml.sax.Attributes (names and values of a start tag). */
export class Attributes {
  constructor(private readonly names: string[], private readonly values: string[]) {}
  getLength(): number { return this.names.length; }
  getQName(i: number): string { return this.names[i]; }
  getValue(i: number | string): string | null {
    if (typeof i === "number") return this.values[i] ?? null;
    const idx = this.names.indexOf(i);
    return idx < 0 ? null : this.values[idx];
  }
}

export class DefaultHandler {
  setDocumentLocator(_locator: Locator): void {}
  startElement(_uri: string, _localName: string, _qName: string, _attributes: Attributes): void {}
  endElement(_uri: string, _localName: string, _qName: string): void {}
  characters(_ch: string, _start: number, _length: number): void {}
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d: string) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}

/**
 * A SAX parser over the LemMinX style DOM scanner. Locator positions follow Xerces: after an event the locator
 * points at the character following the construct (the `>` of a start or end tag), line and column starting at 1.
 */
export class SAXParser {
  parse(source: JFile | string, handler: DefaultHandler): void {
    const text = typeof source === "string" ? source : source.readText();
    const doc = parseDOM(text, "file:///sax.xml", false);
    let line = 1;
    let column = 1;
    const locator: Locator = { getLineNumber: () => line, getColumnNumber: () => column };
    const moveTo = (offset: number): void => {
      const p = doc.positionAt(offset);
      line = p.getLine() + 1;
      column = p.getCharacter() + 1;
    };
    handler.setDocumentLocator(locator);
    const walk = (el: DOMElement): void => {
      const names = el.getAttributeNodes().map((a) => a.getName());
      const values = el.getAttributeNodes().map((a) => decodeEntities(a.getValue() ?? ""));
      const tag = el.getTagName() ?? "";
      const local = el.getLocalName() ?? tag;
      const startEnd = el.getStartTagCloseOffset() + 1;
      moveTo(startEnd);
      handler.startElement("", local, tag, new Attributes(names, values));
      for (const child of el.getChildren()) {
        if (child.isElement()) {
          walk(child);
        } else if (child.isText() || child.isCDATA()) {
          const raw = child.isCDATA() ? (child as any).getContent?.() ?? cdataContent(child) : decodeEntities(child.getNodeValue() ?? "");
          moveTo(child.getEnd());
          handler.characters(raw, 0, raw.length);
        }
      }
      moveTo(el.isSelfClosed() ? startEnd : el.getEndTagCloseOffset() + 1);
      handler.endElement("", local, tag);
    };
    const rootEl = doc.getDocumentElement();
    if (rootEl) walk(rootEl);
  }
}

function cdataContent(node: DOMNode): string {
  const data = node.getNodeValue() ?? "";
  return data.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

export class SAXParserFactory {
  newSAXParser(): SAXParser { return new SAXParser(); }
}

export type { DOMDocument };
