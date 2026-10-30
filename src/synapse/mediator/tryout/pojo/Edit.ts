// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/Edit.java by the java2ts converter (see tools/java2ts).
import { Range } from "../../../lsp.js";

export class Edit {
  static readonly __fields: string[] = ["text", "range"];

  text?: string;

  range?: Range;

  constructor(text: string, range: Range) {
    this.text = text;
    this.range = range;

  }

  getText(): string {
    return this.text;

  }

  setText(text: string): void {
    this.text = text;

  }

  getRange(): Range {
    return this.range;

  }

  setRange(range: Range): void {
    this.range = range;

  }
}
