// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthenticationOauthRequestParameters.java by the java2ts converter (see tools/java2ts).
import { Parameter } from "../../misc/common/Parameter.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthenticationOauthRequestParameters extends STNode {
  static readonly __fields: string[] = ["parameter"];

  parameter?: Parameter[];

  getParameter(): Parameter[] {
    return this.parameter;

  }

  setParameter(parameter: Parameter[]): void {
    this.parameter = parameter;

  }
}
