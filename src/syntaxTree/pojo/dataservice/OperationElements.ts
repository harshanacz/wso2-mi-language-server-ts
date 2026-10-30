// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/OperationElements.java by the java2ts converter (see tools/java2ts).
import { CallQuery } from "./CallQuery.js";

export class OperationElements {
  description?: any | undefined;

  call_query?: CallQuery | undefined;

  getDescription(): any | undefined {
    return this.description;

  }

  setDescription(description: any | undefined): void {
    this.description = description;

  }

  getCall_query(): CallQuery | undefined {
    return this.call_query;

  }

  setCall_query(call_query: CallQuery | undefined): void {
    this.call_query = call_query;

  }
}
