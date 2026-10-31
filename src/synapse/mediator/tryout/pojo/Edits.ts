// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/Edits.java by the java2ts converter (see tools/java2ts).
import { Edit } from "./Edit.js";

export class Edits {
  static readonly __fields: string[] = ["edits"];

  edits?: Edit[];

  getEdits(): Edit[] {
    return this.edits == null ? this.edits : [...this.edits];

  }

  setEdits(edits: Edit[]): void {
    this.edits = edits;

  }
}
