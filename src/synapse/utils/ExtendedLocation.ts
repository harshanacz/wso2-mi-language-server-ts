// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/utils/ExtendedLocation.java by the java2ts converter (see tools/java2ts).
import { Range } from "../lsp.js";

export class ExtendedLocation {
  static readonly __fields: string[] = ["uri", "range", "fromDependency"];

  uri?: string;

  range?: Range;

  fromDependency: boolean = false;

  constructor(uri: string, range: Range, fromDependency: boolean) {
    this.uri = uri;
    this.range = range;
    this.fromDependency = fromDependency;

  }
}
