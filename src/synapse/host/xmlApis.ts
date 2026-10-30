/**
 * Small stand-ins for the JDK XML APIs the ported services use: a W3C DOM subset with a pretty printing serializer
 * (javax.xml.transform with INDENT=yes) and a StAX style pull reader with Woodstox compatible locations.
 */
import { DOMDocument, DOMElement, DOMNode, parseDOM } from "../../syntaxTree/dom/dom.js";

export class XMLStreamException extends Error {}

// ---------------------------------------------------------------------------------------------------------------
// W3C DOM subset
// ---------------------------------------------------------------------------------------------------------------

export abstract class W3Node {
  parent: W3Element | null = null;
  getParentNode(): W3Element | null { return this.parent; }
  abstract getTextContent(): string;
}

export class W3Text extends W3Node {
  constructor(readonly data: string) { super(); }
  getTextContent(): string { return this.data; }
}

export class W3Element extends W3Node {
  readonly children: W3Node[] = [];
  constructor(readonly tagName: string) { super(); }
  getTagName(): string { return this.tagName; }
  appendChild(child: W3Node): W3Node {
    child.parent = this;
    this.children.push(child);
    return child;
  }
  /** Element.setTextContent: replaces all children with one text node (none when the text is empty). */
  setTextContent(text: string | null | undefined): void {
    this.children.length = 0;
    if (text !== null && text !== undefined && text !== "") {
      this.appendChild(new W3Text(text));
    }
  }
  getTextContent(): string { return this.children.map((c) => c.getTextContent()).join(""); }
  /** Descendant elements with the tag name, in document order. */
  getElementsByTagName(name: string): W3Element[] {
    const out: W3Element[] = [];
    const visit = (e: W3Element): void => {
      for (const c of e.children) {
        if (c instanceof W3Element) {
          if (name === "*" || c.tagName === name) out.push(c);
          visit(c);
        }
      }
    };
    visit(this);
    return out;
  }
}

export class W3Document {
  documentElement: W3Element | null = null;
  createElement(tag: string): W3Element { return new W3Element(tag); }
  getDocumentElement(): W3Element | null { return this.documentElement; }
  getElementsByTagName(name: string): W3Element[] {
    if (!this.documentElement) return [];
    const out = this.documentElement.getElementsByTagName(name);
    return name === "*" || this.documentElement.tagName === name ? [this.documentElement, ...out] : out;
  }
}

export class DocumentBuilder {
  newDocument(): W3Document { return new W3Document(); }
  /** Parses XML text (or an object with readText()) into a W3C DOM. */
  parse(source: string | { readText(): string }): W3Document {
    const text = typeof source === "string" ? source : source.readText();
    const dom = parseDOM(text, "file:///w3c.xml", false);
    const doc = new W3Document();
    const convert = (el: DOMElement): W3Element => {
      const out = new W3Element(el.getTagName() ?? "");
      for (const c of el.getChildren()) {
        if (c.isElement()) {
          out.appendChild(convert(c));
        } else if (c.isText()) {
          out.appendChild(new W3Text(unescape(c.getNodeValue() ?? "")));
        } else if (c.isCDATA()) {
          out.appendChild(new W3Text((c.getNodeValue() ?? "").replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")));
        }
      }
      return out;
    };
    const root = dom.getDocumentElement();
    if (root) doc.documentElement = convert(root);
    return doc;
  }
}

export class DocumentBuilderFactory {
  static newInstance(): DocumentBuilderFactory { return new DocumentBuilderFactory(); }
  newDocumentBuilder(): DocumentBuilder { return new DocumentBuilder(); }
}

function unescape(t: string): string {
  return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}
function escapeText(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Serializes an element the way javax.xml.transform does with INDENT=yes and OMIT_XML_DECLARATION=yes:
 * elements holding only text stay on one line, nested elements go on their own indented lines.
 */
export function serializeElement(element: W3Element, indentAmount = 4): string {
  const write = (e: W3Element, depth: number): string => {
    const pad = " ".repeat(indentAmount * depth);
    if (e.children.length === 0) return pad + "<" + e.tagName + "/>";
    const onlyText = e.children.every((c) => c instanceof W3Text);
    if (onlyText) return pad + "<" + e.tagName + ">" + escapeText(e.getTextContent()) + "</" + e.tagName + ">";
    const inner = e.children
      .map((c) => (c instanceof W3Element ? write(c, depth + 1) : " ".repeat(indentAmount * (depth + 1)) + escapeText(c.getTextContent())))
      .join("\n");
    return pad + "<" + e.tagName + ">\n" + inner + "\n" + pad + "</" + e.tagName + ">";
  };
  return write(element, 0);
}

// ---------------------------------------------------------------------------------------------------------------
// StAX style pull reader
// ---------------------------------------------------------------------------------------------------------------

export const XMLStreamConstants = {
  START_ELEMENT: 1,
  END_ELEMENT: 2,
  PROCESSING_INSTRUCTION: 3,
  CHARACTERS: 4,
  COMMENT: 5,
  SPACE: 6,
  START_DOCUMENT: 7,
  END_DOCUMENT: 8,
};

export class Location {
  constructor(private readonly line: number, private readonly column: number) {}
  getLineNumber(): number { return this.line; }
  getColumnNumber(): number { return this.column; }
}

interface Event {
  type: number;
  name?: string;
  text?: string;
  offset: number;
}

/** XMLStreamReader over the DOM scanner; `getLocation()` is the start of the current event (as Woodstox reports). */
export class XMLStreamReader {
  private readonly events: Event[] = [];
  private i = -1;
  private readonly doc: DOMDocument;

  constructor(xml: string) {
    this.doc = parseDOM(xml, "file:///stax.xml", false);
    const visit = (el: DOMElement): void => {
      this.events.push({ type: XMLStreamConstants.START_ELEMENT, name: el.getTagName() ?? "", offset: el.getStartTagOpenOffset() });
      for (const c of el.getChildren()) {
        if (c.isElement()) {
          visit(c);
        } else if (c.isText() || c.isCDATA()) {
          const raw = c.isCDATA() ? (c.getNodeValue() ?? "").replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "") : unescape(c.getNodeValue() ?? "");
          this.events.push({ type: XMLStreamConstants.CHARACTERS, text: raw, offset: c.getStart() });
        } else if (c.isComment()) {
          this.events.push({ type: XMLStreamConstants.COMMENT, offset: c.getStart() });
        }
      }
      this.events.push({
        type: XMLStreamConstants.END_ELEMENT,
        name: el.getTagName() ?? "",
        offset: el.isSelfClosed() ? el.getStartTagCloseOffset() : el.getEndTagOpenOffset(),
      });
    };
    const root = this.doc.getDocumentElement();
    if (root) visit(root);
  }

  hasNext(): boolean { return this.i < this.events.length - 1; }
  next(): number {
    if (!this.hasNext()) throw new XMLStreamException("No more events");
    this.i++;
    return this.events[this.i].type;
  }
  getEventType(): number { return this.events[this.i]?.type ?? XMLStreamConstants.START_DOCUMENT; }
  getLocalName(): string {
    const n = this.events[this.i].name ?? "";
    const idx = n.indexOf(":");
    return idx >= 0 ? n.substring(idx + 1) : n;
  }
  getText(): string { return this.events[this.i].text ?? ""; }
  getLocation(): Location {
    const p = this.doc.positionAt(this.events[this.i]?.offset ?? 0);
    return new Location(p.getLine() + 1, p.getCharacter() + 1);
  }
  close(): void {}
}

export type { DOMNode };
