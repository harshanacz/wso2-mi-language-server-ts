import type { DOMAttr, DOMDocument, DOMElement, DOMNode } from "../../../syntaxTree/dom/dom.js";
import type { Position, Range, InsertTextFormat } from "../../lsp.js";
import type { ICompletionRequest } from "../../lemminxCompat.js";

export class ExpressionCompletionRequest implements ICompletionRequest {
  private readonly xmlDocument: DOMDocument | null;
  private readonly position: Position;
  private offset = 0;

  constructor(xmlDocument: DOMDocument | null, position: Position, offset?: number) {
    this.xmlDocument = xmlDocument;
    this.position = position;
    if (offset !== undefined) {
      this.offset = offset;
    }
  }

  getOffset(): number { return this.offset; }
  getPosition(): Position { return this.position; }
  getNode(): DOMNode { throw new Error("UnsupportedOperationException"); }
  getParentElement(): DOMElement { throw new Error("UnsupportedOperationException"); }
  getXMLDocument(): DOMDocument | null { return this.xmlDocument; }
  getCurrentTag(): string { throw new Error("UnsupportedOperationException"); }
  getCurrentAttribute(): DOMAttr { throw new Error("UnsupportedOperationException"); }
  getCurrentAttributeName(): string { throw new Error("UnsupportedOperationException"); }
  getLineIndentInfo(): unknown { throw new Error("UnsupportedOperationException"); }
  getComponent(_clazz: unknown): unknown { throw new Error("UnsupportedOperationException"); }
  canSupportMarkupKind(_kind: string): boolean { return false; }
  getSharedSettings(): unknown { return null; }
  getReplaceRange(): Range | null { return null; }
  getReplaceRangeForTagName(): Range | null { return null; }
  getXMLGenerator(): unknown { return null; }
  getFilterForStartTagName(_tagName: string): string | null { return null; }
  getInsertAttrValue(_value: string): string | null { return null; }
  isCompletionSnippetsSupported(): boolean { return false; }
  isAutoCloseTags(): boolean { return false; }
  isResolveDocumentationSupported(): boolean { return false; }
  isResolveAdditionalTextEditsSupported(): boolean { return false; }
  getInsertTextFormat(): InsertTextFormat | null { return null; }
}
