// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TDocumented.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";
import { TDocumentation } from "./TDocumentation.js";

export abstract class TDocumented extends STNode {
  static readonly __fields: string[] = ["documentation"];

  documentation?: TDocumentation;

  getDocumentation(): TDocumentation {
    return this.documentation;

  }

  setDocumentation(documentation: TDocumentation): void {
    this.documentation = documentation;

  }
}
