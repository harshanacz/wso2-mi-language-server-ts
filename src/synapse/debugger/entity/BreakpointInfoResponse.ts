// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/BreakpointInfoResponse.java by the java2ts converter (see tools/java2ts).
import { JsonElement } from "../../gson.js";

export class BreakpointInfoResponse {
  static readonly __fields: string[] = ["breakpointInfo"];

  breakpointInfo?: JsonElement[];

  constructor(debugInfoJsonList: JsonElement[]) {
    this.breakpointInfo = debugInfoJsonList;

  }
}
