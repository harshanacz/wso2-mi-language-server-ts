// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/inbound/conector/InboundConnectorResponse.java by the java2ts converter (see tools/java2ts).
import { JsonObject } from "../../gson.js";

export class InboundConnectorResponse {
  static readonly __fields: string[] = ["connectorName", "uiSchema"];

  connectorName?: string;

  uiSchema?: JsonObject;

  getUiSchema(): JsonObject {
    return this.uiSchema;

  }

  setUiSchema(uiSchema: JsonObject): void {
    this.uiSchema = uiSchema;

  }
}
