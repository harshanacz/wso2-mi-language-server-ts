import { CompletionItem } from "../../lsp.js";

export class HelperPanelItem extends CompletionItem {
  static readonly __fields: string[] = ["children"];

  children: CompletionItem[];

  constructor(label: string, insertText: string) {
    super();
    this.setLabel(label);
    this.setInsertText(insertText);
    this.children = [];
  }

  addChild(data: CompletionItem): void {
    this.children.push(data);
  }

  addChildren(data: CompletionItem[]): void {
    this.children.push(...data);
  }

  toString(): string {
    return (
      `HelperPanelItem [label = ${this.getLabel()}, kind = ${this.getKind()}, insertText = ${this.getInsertText()}, ` +
      `insertTextFormat = ${this.getInsertTextFormat()}, detail = ${this.getDetail()}, ` +
      `documentation = ${this.getDocumentation()}, sortText = ${this.getSortText()}, ` +
      `filterText = ${this.getFilterText()}, children = ${this.children}]`
    );
  }
}
