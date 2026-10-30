// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/DocumentedType.java by the java2ts converter (see tools/java2ts).
import { DocumentationType } from "./DocumentationType.js";
import { STNode } from "../../../stNode.js";

export class DocumentedType extends STNode {
  documentation?: DocumentationType[];

  getDocumentation(): DocumentationType[] {
    return this.documentation;

  }

  setDocumentation(documentation: DocumentationType[]): void {
    this.documentation = documentation;

  }
}
