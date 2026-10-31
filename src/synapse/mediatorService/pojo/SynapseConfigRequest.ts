// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/SynapseConfigRequest.java by the java2ts converter (see tools/java2ts).
import { Range } from "../../lsp.js";

export class SynapseConfigRequest {
  static readonly __fields: string[] = ["documentUri", "range", "mediatorType", "values", "dirtyFields"];

  documentUri?: string;

  range?: Range;

  mediatorType?: string;

  values?: Map<string, any>;

  dirtyFields?: string[];
}
