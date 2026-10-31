import { CompletionItem, CompletionList } from "../../lsp.js";
import type { ICompletionResponse } from "../../lemminxCompat.js";

export class ExpressionCompletionResponse extends CompletionList implements ICompletionResponse {
  private seenAttributes?: string[];
  private someItemFromGrammar = false;

  constructor() {
    super();
    super.setIsIncomplete(false);
  }

  addCompletionItem(completionItem: CompletionItem, fromGrammar?: boolean): void {
    if (fromGrammar) {
      this.someItemFromGrammar = true;
    }
    super.getItems().push(completionItem);
  }

  hasSomeItemFromGrammar(): boolean {
    return this.someItemFromGrammar;
  }

  hasAttribute(attribute: string): boolean {
    return this.seenAttributes ? this.seenAttributes.includes(attribute) : false;
  }

  addCompletionAttribute(completionItem: CompletionItem): void {
    if (!this.seenAttributes) {
      this.seenAttributes = [];
    }
    this.seenAttributes.push(completionItem.getLabel() as string);
    this.addCompletionItem(completionItem);
  }

  toJSON(): unknown {
    return { isIncomplete: this.isIncomplete, items: this.items };
  }
}
