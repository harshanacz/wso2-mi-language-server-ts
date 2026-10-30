import { DOMAttr, DOMDocument, DOMElement, DOMNode, Position } from "./dom/dom.js";
import { unescapeXml } from "./utils.js";

export interface Range {
  start: Position;
  end: Position;
}
export interface Space {
  space: string;
  range: Range;
}
export interface TagSpaces {
  leadingSpace: Space | null;
  trailingSpace: Space | null;
}
export interface Spaces {
  startingTagSpace: TagSpaces;
  endingTagSpace: TagSpaces | null;
}
export interface TagRanges {
  startTagRange: Range | null;
  endTagRange: Range | null;
}

/** Port of syntaxTree/pojo/STNode.java: base of every syntax tree node. */
export class STNode {
  range?: TagRanges;
  spaces?: Spaces;
  hasTextNode = false;
  textNode?: string;
  selfClosed = false;
  tag?: string;
  namespaces: Map<string, string> = new Map();

  /** Fills range, spaces, tag, text and namespaces from a DOM element (STNode.elementNode). */
  elementNode(node: DOMElement): void {
    this.selfClosed = node.isSelfClosed();
    this.tag = node.getTagName() ?? undefined;
    this.range = this.findRange(node);

    const firstChild = node.getFirstChild();
    if (firstChild !== null && firstChild.isText()) {
      this.hasTextNode = true;
      this.textNode = unescapeXml(firstChild.getTextContent()) ?? undefined;
    }
    this.namespaces = new Map();
    this.populateNamespaces(node);
  }

  addNamespace(prefix: string, uri: string): void {
    this.namespaces.set(prefix, uri);
  }

  getTag(): string | undefined {
    return this.tag;
  }
  setTag(tag: string): void { this.tag = tag; }
  getRange(): TagRanges | undefined { return this.range; }
  isSelfClosed(): boolean { return this.selfClosed; }
  getTextNode(): string | undefined { return this.textNode; }
  setTextNode(textNode: string): void { this.textNode = textNode; }
  getNamespaces(): Map<string, string> { return this.namespaces; }

  // ── ranges ──

  private findRange(node: DOMElement): TagRanges {
    const startTagOpenOffset = node.getStart();
    const startTagCloseOffset = this.selfClosed ? node.getEnd() : node.getStartTagCloseOffset() + 1;
    const endTagOpenOffset = node.getEndTagOpenOffset();
    const endTagCloseOffset = node.getEnd();
    const document = node.getOwnerDocument();

    // Mirrors the Java try/catch: positions are resolved in order and the first bad offset
    // leaves it and every later one null.
    let startTagOpenPosition: Position | null = null;
    let startTagClosePosition: Position | null = null;
    let endTagOpenPosition: Position | null = null;
    let endTagClosePosition: Position | null = null;
    try {
      startTagOpenPosition = document.positionAt(startTagOpenOffset);
      startTagClosePosition = document.positionAt(startTagCloseOffset);
      endTagOpenPosition = document.positionAt(endTagOpenOffset);
      endTagClosePosition = document.positionAt(endTagCloseOffset);
    } catch {
      // BadLocationException
    }

    const range: TagRanges = {
      startTagRange: createRange(startTagOpenPosition, startTagClosePosition),
      endTagRange: createRange(endTagOpenPosition, endTagClosePosition),
    };
    if (!node.isOrphanEndTag()) {
      this.spaces = this.calculateSpaces(node, range);
    }
    return range;
  }

  private calculateSpaces(node: DOMElement, range: TagRanges): Spaces {
    const startTagSpaces: TagSpaces = {
      leadingSpace: this.startTagLeadingSpace(node, range.startTagRange),
      trailingSpace: this.startTagTrailingSpace(node, range.startTagRange),
    };
    return { startingTagSpace: startTagSpaces, endingTagSpace: this.endTagSpaces(node, range) };
  }

  private startTagLeadingSpace(node: DOMElement, range: Range | null): Space | null {
    const document = node.getOwnerDocument();
    let startOffset: number;
    const prev = node.getPreviousNonTextSibling();
    if (prev !== null) {
      startOffset = prev.getEnd();
    } else if (node.getParentElement() !== null) {
      startOffset = node.getParentElement()!.getStartTagCloseOffset() + 1;
    } else {
      startOffset = 0;
    }
    return this.space(document, startOffset, range?.start ?? null);
  }

  private startTagTrailingSpace(node: DOMElement, range: Range | null): Space | null {
    const document = node.getOwnerDocument();
    let endOffset: number;
    if (hasChildElements(node)) {
      endOffset = node.getFirstChild()!.getStart();
    } else if (!node.isSelfClosed()) {
      endOffset = node.getEndTagOpenOffset();
    } else if (node.getNextSibling() !== null) {
      endOffset = node.getNextSibling()!.getStart();
    } else if (node.getParentElement() !== null) {
      endOffset = node.getParentElement()!.getEndTagOpenOffset();
    } else {
      endOffset = node.getOwnerDocument().getEnd();
    }
    return this.spaceFromPosition(document, range?.end ?? null, endOffset);
  }

  private endTagSpaces(node: DOMElement, range: TagRanges): TagSpaces | null {
    if (node.isSelfClosed() || !node.hasEndTag()) return null;
    return {
      leadingSpace: this.endTagLeadingSpace(node, range.endTagRange),
      trailingSpace: this.endTagTrailingSpace(node, range.endTagRange),
    };
  }

  private endTagLeadingSpace(node: DOMElement, range: Range | null): Space | null {
    const document = node.getOwnerDocument();
    let startOffset: number;
    if (hasChildElements(node)) {
      startOffset = node.getLastChild()!.getEnd();
    } else if (!node.isSelfClosed()) {
      startOffset = node.getStartTagCloseOffset() + 1;
    } else if (node.getPreviousNonTextSibling() !== null) {
      startOffset = node.getPreviousNonTextSibling()!.getEnd();
    } else if (node.getParentElement() !== null) {
      startOffset = node.getParentElement()!.getEndTagCloseOffset() + 1;
    } else {
      startOffset = 0;
    }
    return this.space(document, startOffset, range?.start ?? null);
  }

  private endTagTrailingSpace(node: DOMElement, range: Range | null): Space | null {
    const document = node.getOwnerDocument();
    let endOffset: number;
    if (node.getNextSibling() !== null) {
      endOffset = node.getNextSibling()!.getStart();
    } else if (node.getParentElement() !== null) {
      endOffset = node.getParentElement()!.getEndTagOpenOffset();
    } else {
      endOffset = node.getOwnerDocument().getEnd();
    }
    return this.spaceFromPosition(document, range?.end ?? null, endOffset);
  }

  /** Space from a start offset to an end position (leading spaces). */
  private space(document: DOMDocument, startOffset: number, end: Position | null): Space | null {
    try {
      const start = document.positionAt(startOffset);
      if (end === null) return null;
      return { space: textInRange(document, start, end), range: { start, end } };
    } catch {
      return null;
    }
  }

  /** Space from a start position to an end offset (trailing spaces). */
  private spaceFromPosition(document: DOMDocument, start: Position | null, endOffset: number): Space | null {
    try {
      const end = document.positionAt(endOffset);
      if (start === null) return null;
      return { space: textInRange(document, start, end), range: { start, end } };
    } catch {
      return null;
    }
  }

  private populateNamespaces(node: DOMElement): void {
    for (const attribute of node.getAttributeNodes() as DOMAttr[]) {
      if (attribute.getName().startsWith("xmlns")) {
        this.namespaces.set(attribute.getName(), attribute.getValue() as string);
      }
    }
  }
}

function createRange(start: Position | null, end: Position | null): Range | null {
  return start !== null && end !== null ? { start, end } : null;
}

function hasChildElements(node: DOMElement): boolean {
  return node.getChildren().some((c: DOMNode) => c.isElement());
}

function offsetAt(document: DOMDocument, p: Position): number {
  // inverse of DOMDocument.positionAt
  let line = 0;
  let i = 0;
  const t = document.getText();
  while (line < p.line && i < t.length) {
    const c = t.charCodeAt(i);
    if (c === 0x0d) {
      if (t.charCodeAt(i + 1) === 0x0a) i++;
      line++;
    } else if (c === 0x0a) {
      line++;
    }
    i++;
  }
  return Math.min(i + p.character, t.length);
}

function textInRange(document: DOMDocument, start: Position, end: Position): string {
  return document.getText().substring(offsetAt(document, start), offsetAt(document, end));
}
