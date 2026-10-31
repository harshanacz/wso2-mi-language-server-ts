import type { DOMAttr, DOMDocument, DOMElement, DOMNode } from "../syntaxTree/dom/dom.js";
import type { CompletionItem, InsertTextFormat, Range, Position } from "./lsp.js";

/** org.eclipse.lemminx.services.extensions.completion.ICompletionRequest (the subset the synapse services use). */
export interface ICompletionRequest {
  getOffset(): number;
  getPosition(): Position;
  getNode(): DOMNode;
  getParentElement(): DOMElement;
  getXMLDocument(): DOMDocument | null;
  getCurrentTag(): string;
  getCurrentAttribute(): DOMAttr;
  getCurrentAttributeName(): string;
  getLineIndentInfo(): unknown;
  getComponent(clazz: unknown): unknown;
  canSupportMarkupKind(kind: string): boolean;
  getSharedSettings(): unknown;
  getReplaceRange(): Range | null;
  getReplaceRangeForTagName(): Range | null;
  getXMLGenerator(): unknown;
  getFilterForStartTagName(tagName: string): string | null;
  getInsertAttrValue(value: string): string | null;
  isCompletionSnippetsSupported(): boolean;
  isAutoCloseTags(): boolean;
  isResolveDocumentationSupported(): boolean;
  isResolveAdditionalTextEditsSupported(): boolean;
  getInsertTextFormat(): InsertTextFormat | null;
}

/** org.eclipse.lemminx.services.extensions.completion.ICompletionResponse. */
export interface ICompletionResponse {
  addCompletionItem(item: CompletionItem, fromGrammar?: boolean): void;
  hasSomeItemFromGrammar(): boolean;
  hasAttribute(attribute: string): boolean;
  addCompletionAttribute(item: CompletionItem): void;
}
