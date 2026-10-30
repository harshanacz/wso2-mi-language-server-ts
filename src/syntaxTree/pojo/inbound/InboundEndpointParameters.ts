// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/inbound/InboundEndpointParameters.java by the java2ts converter (see tools/java2ts).
import { Parameter } from "../misc/common/Parameter.js";
import { STNode } from "../../stNode.js";

export class InboundEndpointParameters extends STNode {
  parameter?: Parameter[];

  getParameter(): Parameter[] {
    return this.parameter;

  }

  setParameter(parameter: Parameter[]): void {
    this.parameter = parameter;

  }
}
