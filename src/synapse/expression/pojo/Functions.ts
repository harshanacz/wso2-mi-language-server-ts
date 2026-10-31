// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/Functions.java by the java2ts converter (see tools/java2ts).
import { CompletionItem } from "../../lsp.js";

export class Functions {
  static readonly __fields: string[] = ["sortText", "items"];

  sortText?: string;

  items?: CompletionItem[];

  constructor();
  constructor(sortText: string, functions: CompletionItem[]);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {
        this.items = [];

        break;
      }
      case 2: {
        const [sortText, functions] = args;


                this.sortText = sortText;
                this.items = functions;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getSortText(): string {
    return this.sortText;

  }

  setSortText(sortText: string): void {
    this.sortText = sortText;

  }

  getItems(): CompletionItem[] {
    return this.items;

  }

  setItems(items: CompletionItem[]): void {
    this.items = items;

  }

  deepCopy(): Functions {
    return new Functions(this.sortText, Array.from(this.items));

  }
}
