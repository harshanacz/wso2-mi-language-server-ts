// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/DocumentTextEdit.java by the java2ts converter (see tools/java2ts).
import { StringBuilder } from "../../../syntaxTree/javaCompat.js";
import { Range } from "../../lsp.js";
import { TextEdit } from "../../lsp.js";

export class DocumentTextEdit extends TextEdit {
  static readonly __fields: string[] = ["documentUri", "_isCreateNewFile"];

  documentUri?: string;

  _isCreateNewFile: boolean = false;

  constructor(range: Range, newText: string, documentUri: string) {
    super(range, newText);
    this.documentUri = documentUri;

  }

  getDocumentUri(): string {
    return this.documentUri;

  }

  setDocumentUri(documentUri: string): void {
    this.documentUri = documentUri;

  }

  isCreateNewFile(): boolean {
    return this._isCreateNewFile;

  }

  setCreateNewFile(createNewFile: boolean): void {
    this._isCreateNewFile = createNewFile;

  }

  toString(): string {
    let sb = new StringBuilder();
    sb.append("DocumentUri: ").append(this.getDocumentUri()).append("\n");
    sb.append("Range: ").append(this.getRange()).append("\n");
    sb.append("NewText: ").append(this.getNewText()).append("\n");
    sb.append("IsCreateNewFile: ").append(this.isCreateNewFile()).append("\n");
    return String(sb);

  }
}
