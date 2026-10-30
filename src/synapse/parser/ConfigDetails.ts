// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/ConfigDetails.java by the java2ts converter (see tools/java2ts).
import { Either } from "../lsp.js";
import { Range } from "../lsp.js";

export class ConfigDetails {
  static readonly __fields: string[] = ["key", "type", "value", "range"];

  key?: string;

  type?: string;

  value?: string;

  range?: Either<Range, Range[]>;

  constructor(key: string, type: string, value: string, range: Either<Range, Range[]>) {
    this.key = key;
    this.type = type;
    this.value = value;
    this.range = range;

  }

  getKey(): string {
    return this.key;

  }

  getType(): string {
    return this.type;

  }

  getValue(): string {
    return this.value;

  }

  getRange(): Either<Range, Range[]> {
    return this.range;

  }
}
