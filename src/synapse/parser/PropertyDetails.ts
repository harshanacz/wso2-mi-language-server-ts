// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/PropertyDetails.java by the java2ts converter (see tools/java2ts).
import { Range } from "../lsp.js";

export class PropertyDetails {
  static readonly __fields: string[] = ["name", "value", "range"];

  name?: string;

  value?: string;

  range?: Range;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getRange(): Range {
    return this.range;

  }

  setRange(range: Range): void {
    this.range = range;

  }
}
