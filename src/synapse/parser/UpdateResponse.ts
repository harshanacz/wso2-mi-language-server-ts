// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/UpdateResponse.java by the java2ts converter (see tools/java2ts).
import { TextEdit } from "../lsp.js";

export class UpdateResponse {
  static readonly __fields: string[] = ["textEdits"];

  textEdits?: TextEdit[];

  constructor() {
    this.textEdits = [];

  }

  add(textEdit: TextEdit): void {
    this.textEdits.push(textEdit);

  }
}
