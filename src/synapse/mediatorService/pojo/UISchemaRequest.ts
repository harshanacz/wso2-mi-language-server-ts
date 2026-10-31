// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/UISchemaRequest.java by the java2ts converter (see tools/java2ts).
import { Position } from "../../lsp.js";
import { TextDocumentIdentifier } from "../../lsp.js";

export class UISchemaRequest {
  static readonly __fields: string[] = ["mediatorType", "documentIdentifier", "position"];

  mediatorType?: string;

  documentIdentifier?: TextDocumentIdentifier;

  position?: Position;
}
