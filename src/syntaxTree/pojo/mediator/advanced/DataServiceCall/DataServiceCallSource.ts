// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCallSource.java by the java2ts converter (see tools/java2ts).
import { DataServiceCallSourceType } from "./DataServiceCallSourceType.js";
import { STNode } from "../../../../stNode.js";

export class DataServiceCallSource extends STNode {
  type?: DataServiceCallSourceType;

  getType(): DataServiceCallSourceType {
    return this.type;

  }

  setType(type: DataServiceCallSourceType): void {
    this.type = type;

  }
}
