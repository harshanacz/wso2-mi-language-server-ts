import { TokenType, XMLScanner } from "./xmlScanner.js";

/**
 * Minimal port of the LemMinX DOM (org.eclipse.lemminx.dom) that the Synapse syntax tree
 * generator relies on. Offsets and tree shape follow DOMParser.java exactly, including its
 * fault tolerance (unclosed tags, orphan end tags) and whitespace handling.
 */

export const NULL_VALUE = -1;

import { Position } from "../../synapse/lsp.js";
export type { Position };

export type DOMNodeType = "document" | "element" | "text" | "comment" | "cdata" | "pi";

export abstract class DOMNode {
  start: number;
  end: number;
  closed = false;
  parent: DOMNode | null = null;
  children: DOMNode[] = [];
  attributeNodes: DOMAttr[] = [];

  protected constructor(start: number, end: number, readonly ownerDocument: DOMDocument | null) {
    this.start = start;
    this.end = end;
  }

  abstract get nodeType(): DOMNodeType;
  abstract getNodeName(): string;

  getStart(): number {
    return this.start;
  }

  /** DOMNode.findNodeBefore: the deepest node starting before the offset. */
  findNodeBefore(offset: number): DOMNode {
    const children = this.getChildren();
    let first = children.findIndex((c) => offset <= c.start);
    if (first < 0) first = children.length;
    const idx = first - 1;
    if (idx >= 0) {
      const child = children[idx];
      if (offset > child.start) {
        if (offset < child.end) {
          return child.findNodeBefore(offset);
        }
        const lastChild = child.getLastChild();
        if (lastChild !== null && lastChild.end === child.end) {
          return child.findNodeBefore(offset);
        }
        return child;
      }
    }
    return this;
  }

  /** DOMNode.findNodeAt: the deepest node including the offset. */
  findNodeAt(offset: number): DOMNode {
    const children = this.getChildren();
    let first = children.findIndex((c) => offset <= c.start);
    if (first < 0) first = children.length;
    const idx = first - 1;
    if (idx >= 0) {
      const child = children[idx];
      if (offset >= child.start && offset <= child.end) {
        return child.findNodeAt(offset);
      }
    }
    return this;
  }

  findAttrAt(offset: number): DOMAttr | null {
    const node = this.findNodeAt(offset);
    if (node !== null && node.hasAttributes()) {
      for (const attr of node.getAttributeNodes()) {
        if (attr.isIncluded(offset)) return attr;
      }
    }
    return null;
  }
  getEnd(): number {
    return this.end;
  }
  isClosed(): boolean {
    return this.closed;
  }
  getOwnerDocument(): DOMDocument {
    return this.ownerDocument!;
  }
  getParentNode(): DOMNode | null {
    return this.parent;
  }
  isElement(): this is DOMElement {
    return this.nodeType === "element";
  }
  isText(): this is DOMText {
    return this.nodeType === "text";
  }
  isCDATA(): boolean {
    return this.nodeType === "cdata";
  }
  isComment(): boolean {
    return this.nodeType === "comment";
  }
  isProcessingInstruction(): boolean {
    return this.nodeType === "pi";
  }

  addChild(child: DOMNode): void {
    child.parent = this;
    this.children.push(child);
  }
  getChildren(): DOMNode[] {
    return this.children;
  }
  getChild(index: number): DOMNode {
    return this.children[index];
  }
  hasChildNodes(): boolean {
    return this.children.length > 0;
  }
  getFirstChild(): DOMNode | null {
    return this.children.length > 0 ? this.children[0] : null;
  }
  getLastChild(): DOMNode | null {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }

  getParentElement(): DOMElement | null {
    let p = this.parent;
    while (p && p !== this.ownerDocument) {
      if (p.isElement()) return p;
      p = p.parent;
    }
    return null;
  }

  getPreviousSibling(): DOMNode | null {
    if (!this.parent) return null;
    const i = this.parent.children.indexOf(this);
    return i > 0 ? this.parent.children[i - 1] : null;
  }
  getNextSibling(): DOMNode | null {
    if (!this.parent) return null;
    const i = this.parent.children.indexOf(this) + 1;
    return i < this.parent.children.length ? this.parent.children[i] : null;
  }
  getPreviousNonTextSibling(): DOMNode | null {
    let prev = this.getPreviousSibling();
    while (prev && prev.isText()) prev = prev.getPreviousSibling();
    return prev;
  }

  hasAttributes(): boolean {
    return this.attributeNodes.length > 0;
  }
  getAttributeNodes(): DOMAttr[] {
    return this.attributeNodes;
  }
  getAttributeNode(name: string): DOMAttr | null {
    return this.attributeNodes.find((a) => a.getName() === name) ?? null;
  }
  hasAttribute(name: string): boolean {
    return this.getAttributeNode(name) !== null;
  }
  /** Attribute value with surrounding quotes removed, or null (same as DOMNode.getAttribute). */
  getAttribute(name: string): string | null {
    const value = this.getAttributeNode(name)?.getValue() ?? null;
    if (value === null) return null;
    if (value.length === 0) return value;
    const c = value.charAt(0);
    if ((c === '"' || c === "'") && value.length > 1 && value.charAt(value.length - 1) === c) {
      return value.substring(1, value.length - 1);
    }
    return value;
  }

  getLocalName(): string | null {
    return null;
  }
  getPrefix(): string | null {
    return null;
  }
  getNodeValue(): string | null {
    return null;
  }
  getTextContent(): string | null {
    return this.getNodeValue();
  }
}

export class DOMAttr {
  nameStart: number;
  nameEnd: number;
  valueStart = NULL_VALUE;
  valueEnd = NULL_VALUE;
  constructor(nameStart: number, nameEnd: number, readonly ownerElement: DOMNode, private readonly text: string) {
    this.nameStart = nameStart;
    this.nameEnd = nameEnd;
  }
  getName(): string {
    return this.text.substring(this.nameStart, this.nameEnd);
  }
  /** Raw value including quotes, or null when the attribute has no value. */
  getOriginalValue(): string | null {
    return this.valueStart === NULL_VALUE ? null : this.text.substring(this.valueStart, this.valueEnd);
  }
  /** Value without surrounding (matching) quotes, like DOMAttr.getValue(). */
  getValue(): string | null {
    const v = this.getOriginalValue();
    if (v === null || v.length < 2) return v;
    const q = v.charAt(0);
    return (q === '"' || q === "'") && v.charAt(v.length - 1) === q ? v.substring(1, v.length - 1) : v;
  }
  getStart(): number {
    return this.nameStart;
  }
  getEnd(): number {
    return this.valueEnd !== NULL_VALUE ? this.valueEnd : this.nameEnd;
  }
  getNodeName(): string {
    return this.getName();
  }
  getNodeValue(): string | null {
    return this.getValue();
  }
  /** The attribute name as a range (DOMAttr.getNodeAttrName()). */
  getNodeAttrName(): { getStart(): number; getEnd(): number } {
    return { getStart: () => this.nameStart, getEnd: () => this.nameEnd };
  }
  isIncluded(offset: number): boolean {
    return offset >= this.getStart() && offset <= this.getEnd();
  }
}

export class DOMElement extends DOMNode {
  tag: string | null = null;
  selfClosed = false;
  startTagOpenOffset = NULL_VALUE;
  startTagCloseOffset = NULL_VALUE;
  endTagOpenOffset = NULL_VALUE;
  endTagCloseOffset = NULL_VALUE;

  constructor(start: number, end: number, doc: DOMDocument) {
    super(start, end, doc);
  }
  get nodeType(): DOMNodeType {
    return "element";
  }
  hasTagName(): boolean {
    return this.tag !== null;
  }
  getTagName(): string | null {
    return this.tag;
  }
  getNodeName(): string {
    return this.hasTagName() ? this.tag! : "";
  }
  override getLocalName(): string | null {
    if (this.tag === null) return null;
    const i = this.tag.indexOf(":");
    return i !== -1 ? this.tag.substring(i + 1) : this.tag;
  }
  override getPrefix(): string | null {
    if (this.tag === null) return null;
    const i = this.tag.indexOf(":");
    return i !== -1 ? this.tag.substring(0, i) : null;
  }
  isSameTag(tag: string | null): boolean {
    return this.tag === tag;
  }
  isSelfClosed(): boolean {
    return this.selfClosed;
  }
  getStartTagOpenOffset(): number {
    return this.startTagOpenOffset;
  }
  getStartTagCloseOffset(): number {
    return this.startTagCloseOffset;
  }
  getEndTagOpenOffset(): number {
    return this.endTagOpenOffset;
  }
  getEndTagCloseOffset(): number {
    return this.endTagCloseOffset;
  }
  hasStartTag(): boolean {
    return this.startTagOpenOffset !== NULL_VALUE;
  }
  hasEndTag(): boolean {
    return this.endTagOpenOffset !== NULL_VALUE;
  }
  isOrphanEndTag(): boolean {
    return this.hasEndTag() && !this.hasStartTag();
  }

  /** Resolves a prefix ("" = default namespace) by walking xmlns declarations up the tree. */
  getNamespaceURI(prefix: string | null): string | null {
    const attrName = prefix ? "xmlns:" + prefix : "xmlns";
    let n: DOMElement | null = this;
    while (n) {
      if (n.hasAttribute(attrName)) return n.getAttribute(attrName);
      n = n.getParentElement();
    }
    return null;
  }

  private findAttributeNS(namespaceURI: string | null, localName: string): DOMAttr | null {
    for (const a of this.getAttributeNodes()) {
      const name = a.getName();
      const i = name.indexOf(":");
      const local = i >= 0 ? name.substring(i + 1) : name;
      if (local !== localName) continue;
      const prefix = i >= 0 ? name.substring(0, i) : null;
      const uri = prefix ? this.getNamespaceURI(prefix) : null;
      if ((namespaceURI ?? null) === uri) return a;
    }
    return null;
  }
  hasAttributeNS(namespaceURI: string | null, localName: string): boolean {
    return this.findAttributeNS(namespaceURI, localName) !== null;
  }
  getAttributeNS(namespaceURI: string | null, localName: string): string | null {
    const a = this.findAttributeNS(namespaceURI, localName);
    return a ? this.getAttribute(a.getName()) : null;
  }
}

export abstract class DOMCharacterData extends DOMNode {
  startContent = NULL_VALUE;
  endContent = NULL_VALUE;
  getData(): string {
    return this.getOwnerDocument().text.substring(this.start, this.end);
  }
  override getNodeValue(): string | null {
    return this.getData();
  }
}

export class DOMText extends DOMCharacterData {
  whitespace = false;
  constructor(start: number, end: number, doc: DOMDocument) {
    super(start, end, doc);
  }
  get nodeType(): DOMNodeType {
    return "text";
  }
  getNodeName(): string {
    return "#text";
  }
  isWhitespace(): boolean {
    return this.whitespace;
  }
}

export class DOMComment extends DOMCharacterData {
  commentSameLineEndTag = false;
  constructor(start: number, end: number, doc: DOMDocument) {
    super(start, end, doc);
  }
  get nodeType(): DOMNodeType {
    return "comment";
  }
  getNodeName(): string {
    return "#comment";
  }
  override getData(): string {
    if (this.startContent === NULL_VALUE) return "";
    return this.getOwnerDocument().text.substring(this.startContent, this.endContent);
  }
}

export class DOMCDATASection extends DOMCharacterData {
  constructor(start: number, end: number, doc: DOMDocument) {
    super(start, end, doc);
  }
  get nodeType(): DOMNodeType {
    return "cdata";
  }
  getNodeName(): string {
    return "#cdata-section";
  }
  override getData(): string {
    if (this.startContent === NULL_VALUE) return "";
    return this.getOwnerDocument().text.substring(this.startContent, this.endContent);
  }
}

export class DOMProcessingInstruction extends DOMNode {
  target: string | null = null;
  prolog = false;
  processingInstruction = false;
  startContent = NULL_VALUE;
  endContent = NULL_VALUE;
  endTagOpenOffset = NULL_VALUE;
  startTagClose = false;
  constructor(start: number, end: number, doc: DOMDocument) {
    super(start, end, doc);
  }
  get nodeType(): DOMNodeType {
    return "pi";
  }
  getNodeName(): string {
    return this.target ?? "";
  }
  isProlog(): boolean {
    return this.prolog;
  }
}

export class DOMDocument extends DOMNode {
  private lineStarts: number[] | undefined;
  constructor(readonly text: string, readonly uri: string) {
    super(0, text.length, null);
  }
  override getOwnerDocument(): DOMDocument {
    return this;
  }
  get nodeType(): DOMNodeType {
    return "document";
  }
  getNodeName(): string {
    return "#document";
  }
  getDocumentURI(): string {
    return this.uri;
  }
  getText(): string {
    return this.text;
  }
  getDocumentElement(): DOMElement | null {
    for (const n of this.children) if (n.isElement()) return n;
    return null;
  }

  /** Offset to LSP position. Lines are split on \n, \r\n and \r like LemMinX's line tracker. */
  positionAt(offset: number): Position {
    if (offset < 0 || offset > this.text.length) {
      throw new RangeError(`Bad location: offset ${offset} is out of range`);
    }
    const starts = this.getLineStarts();
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return new Position(lo, offset - starts[lo]);
  }

  offsetAt(position: Position): number {
    const starts = this.getLineStarts();
    if (position.line < 0 || position.line >= starts.length) {
      throw new RangeError(`Bad location: line ${position.line} is out of range`);
    }
    const offset = starts[position.line] + position.character;
    if (offset > this.text.length) throw new RangeError("Bad location");
    return offset;
  }

  private getLineStarts(): number[] {
    if (!this.lineStarts) {
      const starts = [0];
      const t = this.text;
      for (let i = 0; i < t.length; i++) {
        const c = t.charCodeAt(i);
        if (c === 0x0d) {
          if (t.charCodeAt(i + 1) === 0x0a) i++;
          starts.push(i + 1);
        } else if (c === 0x0a) {
          starts.push(i + 1);
        }
      }
      this.lineStarts = starts;
    }
    return this.lineStarts;
  }
}

/** Port of DOMParser.parse(document, resolver, ignoreWhitespaceContent) for XML (no DTD support). */
export function parseDOM(text: string, uri = "file:///test.xml", ignoreWhitespaceContent = true): DOMDocument {
  const scanner = new XMLScanner(text, 0);
  const doc = new DOMDocument(text, uri);
  let curr: DOMNode = doc;
  let lastClosed: DOMNode = curr;
  let attr: DOMAttr | null = null;
  let endTagOpenOffset = -1;
  let tempWhitespaceContent: DOMText | null = null;
  let previousTokenWasEndTagOpen = false;

  const createElement = (s: number, e: number) => new DOMElement(s, e, doc);

  let token = scanner.scan();
  while (token !== TokenType.EOS) {
    if (tempWhitespaceContent !== null && token !== TokenType.EndTagOpen) {
      tempWhitespaceContent = null;
    }

    if (previousTokenWasEndTagOpen) {
      previousTokenWasEndTagOpen = false;
      let linkToEmptyStartTag = false;
      if (token === TokenType.EndTagClose) {
        const closeTag: string | null = null;
        while (!(curr.isElement() && curr.isSameTag(closeTag)) && curr.parent !== null) {
          curr.end = endTagOpenOffset;
          curr = curr.parent;
        }
        if (curr !== doc) {
          linkToEmptyStartTag = true;
          curr.closed = true;
          if (curr.isElement()) curr.endTagOpenOffset = endTagOpenOffset;
          else if (curr instanceof DOMProcessingInstruction) curr.endTagOpenOffset = endTagOpenOffset;
          curr.end = scanner.getTokenEnd();
        }
      }
      if (token !== TokenType.EndTag && !linkToEmptyStartTag) {
        const element = createElement(endTagOpenOffset, endTagOpenOffset + 2);
        element.endTagOpenOffset = endTagOpenOffset;
        curr.addChild(element);
      }
    }

    switch (token) {
      case TokenType.StartTagOpen: {
        if (!curr.isClosed() && curr.parent !== null) curr.end = scanner.getTokenOffset();
        if (curr.isClosed()) curr = curr.parent!;
        const child = createElement(scanner.getTokenOffset(), scanner.getTokenEnd());
        child.startTagOpenOffset = scanner.getTokenOffset();
        curr.addChild(child);
        curr = child;
        break;
      }
      case TokenType.StartTag: {
        const element = curr as DOMElement;
        element.tag = scanner.getTokenText();
        curr.end = scanner.getTokenEnd();
        break;
      }
      case TokenType.StartTagClose:
        if (curr.isElement()) {
          curr.end = scanner.getTokenEnd();
          curr.startTagCloseOffset = scanner.getTokenOffset();
        } else if (curr instanceof DOMProcessingInstruction) {
          curr.end = scanner.getTokenEnd();
          curr.startTagClose = true;
        }
        curr.end = scanner.getTokenEnd();
        break;
      case TokenType.EndTagOpen:
        if (tempWhitespaceContent !== null) {
          curr.addChild(tempWhitespaceContent);
          tempWhitespaceContent = null;
        }
        endTagOpenOffset = scanner.getTokenOffset();
        curr.end = scanner.getTokenOffset();
        previousTokenWasEndTagOpen = true;
        break;
      case TokenType.EndTag: {
        const closeTag = scanner.getTokenText();
        const current = curr;
        while (!(curr.isElement() && curr.isSameTag(closeTag)) && curr.parent !== null) {
          curr.end = endTagOpenOffset;
          curr = curr.parent;
        }
        if (curr !== doc) {
          curr.closed = true;
          if (curr.isElement()) curr.endTagOpenOffset = endTagOpenOffset;
          else if (curr instanceof DOMProcessingInstruction) curr.endTagOpenOffset = endTagOpenOffset;
          curr.end = scanner.getTokenEnd();
        } else {
          const element = createElement(scanner.getTokenOffset() - 2, scanner.getTokenEnd());
          element.endTagOpenOffset = endTagOpenOffset;
          element.tag = closeTag;
          current.addChild(element);
          curr = element;
        }
        break;
      }
      case TokenType.StartTagSelfClose:
        if (curr.parent !== null) {
          curr.closed = true;
          (curr as DOMElement).selfClosed = true;
          curr.end = scanner.getTokenEnd();
          lastClosed = curr;
          curr = curr.parent;
        }
        break;
      case TokenType.EndTagClose:
        if (curr.parent !== null) {
          curr.end = scanner.getTokenEnd();
          lastClosed = curr;
          if (lastClosed.isElement()) lastClosed.endTagCloseOffset = scanner.getTokenOffset();
          curr = curr.parent;
        }
        break;
      case TokenType.AttributeName:
        attr = new DOMAttr(scanner.getTokenOffset(), scanner.getTokenEnd(), curr, text);
        curr.attributeNodes.push(attr);
        curr.end = scanner.getTokenEnd();
        break;
      case TokenType.DelimiterAssign:
        break;
      case TokenType.AttributeValue:
        if (curr.hasAttributes() && attr !== null) {
          attr.valueStart = scanner.getTokenOffset();
          attr.valueEnd = scanner.getTokenEnd();
        }
        attr = null;
        curr.end = scanner.getTokenEnd();
        break;
      case TokenType.CDATATagOpen: {
        const cdata = new DOMCDATASection(scanner.getTokenOffset(), text.length, doc);
        curr.addChild(cdata);
        curr = cdata;
        break;
      }
      case TokenType.CDATAContent: {
        const cdata = curr as DOMCDATASection;
        cdata.startContent = scanner.getTokenOffset();
        cdata.endContent = scanner.getTokenEnd();
        curr.end = scanner.getTokenEnd();
        break;
      }
      case TokenType.CDATATagClose:
        curr.end = scanner.getTokenEnd();
        curr.closed = true;
        curr = curr.parent!;
        break;
      case TokenType.StartPrologOrPI: {
        const pi = new DOMProcessingInstruction(scanner.getTokenOffset(), text.length, doc);
        curr.addChild(pi);
        curr = pi;
        break;
      }
      case TokenType.PIName: {
        const pi = curr as DOMProcessingInstruction;
        pi.target = scanner.getTokenText();
        pi.processingInstruction = true;
        break;
      }
      case TokenType.PrologName: {
        const pi = curr as DOMProcessingInstruction;
        pi.target = scanner.getTokenText();
        pi.prolog = true;
        break;
      }
      case TokenType.PIContent: {
        const pi = curr as DOMProcessingInstruction;
        pi.startContent = scanner.getTokenOffset();
        pi.endContent = scanner.getTokenEnd();
        break;
      }
      case TokenType.PIEnd:
      case TokenType.PrologEnd:
        curr.end = scanner.getTokenEnd();
        curr.closed = true;
        curr = curr.parent!;
        break;
      case TokenType.StartCommentTag: {
        if (curr.isClosed()) curr = curr.parent!;
        const comment = new DOMComment(scanner.getTokenOffset(), text.length, doc);
        curr.addChild(comment);
        curr = comment;
        try {
          const endLine = doc.positionAt(lastClosed.end).line;
          const startLine = doc.positionAt(curr.start).line;
          if (endLine === startLine && lastClosed.end <= curr.start) comment.commentSameLineEndTag = true;
        } catch {
          // ignore bad offsets
        }
        break;
      }
      case TokenType.Comment: {
        const comment = curr as DOMComment;
        comment.startContent = scanner.getTokenOffset();
        comment.endContent = scanner.getTokenEnd();
        break;
      }
      case TokenType.EndCommentTag:
        curr.end = scanner.getTokenEnd();
        curr.closed = true;
        curr = curr.parent!;
        break;
      case TokenType.Content: {
        const textNode = new DOMText(scanner.getTokenOffset(), scanner.getTokenEnd(), doc);
        textNode.closed = true;
        if (scanner.isTokenTextBlank()) {
          if (ignoreWhitespaceContent) {
            if (curr.hasChildNodes()) break;
            tempWhitespaceContent = textNode;
            break;
          }
          textNode.whitespace = true;
        }
        curr.addChild(textNode);
        break;
      }
      default:
        break;
    }
    token = scanner.scan();
  }

  if (previousTokenWasEndTagOpen) {
    // document ended right after "</"
    const element = createElement(endTagOpenOffset, endTagOpenOffset + 2);
    element.endTagOpenOffset = endTagOpenOffset;
    curr.addChild(element);
  }
  // Unclosed nodes end at the end of the document (DOMParser tail)
  while (curr.parent !== null) {
    curr.end = text.length;
    curr = curr.parent;
  }
  return doc;
}
