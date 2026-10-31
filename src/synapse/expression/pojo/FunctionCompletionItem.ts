import { CompletionItem, SignatureInformation } from "../../lsp.js";

export class FunctionCompletionItem extends CompletionItem {
  static readonly __fields: string[] = ["signature"];

  signature?: SignatureInformation;

  getSignature(): SignatureInformation | undefined {
    return this.signature;
  }

  setSignature(signature: SignatureInformation | undefined): void {
    this.signature = signature;
  }
}
