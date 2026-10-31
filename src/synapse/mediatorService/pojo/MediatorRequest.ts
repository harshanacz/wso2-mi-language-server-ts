// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/MediatorRequest.java by the java2ts converter (see tools/java2ts).
import { Position } from "../../lsp.js";
import { TextDocumentIdentifier } from "../../lsp.js";

export class MediatorRequest {
  static readonly __fields: string[] = ["documentIdentifier", "position"];

  documentIdentifier?: TextDocumentIdentifier;

  position?: Position;

  toString(): string {
    return "MediatorRequest{" +
            "documentIdentifier=" + this.documentIdentifier +
            ", position=" + this.position +
            '}';

  }
}
