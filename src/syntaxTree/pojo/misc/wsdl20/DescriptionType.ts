// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/DescriptionType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class DescriptionType extends ExtensibleDocumentedType {
  static readonly __fields: string[] = ["importOrIncludeOrTypes", "targetNamespace"];

  importOrIncludeOrTypes?: any[];

  targetNamespace?: string;

  getImportOrIncludeOrTypes(): any[] {
    return this.importOrIncludeOrTypes;

  }

  setImportOrIncludeOrTypes(importOrIncludeOrTypes: any[]): void {
    this.importOrIncludeOrTypes = importOrIncludeOrTypes;

  }

  getTargetNamespace(): string {
    return this.targetNamespace;

  }

  setTargetNamespace(targetNamespace: string): void {
    this.targetNamespace = targetNamespace;

  }
}
