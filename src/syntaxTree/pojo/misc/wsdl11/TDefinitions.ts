// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TDefinitions.java by the java2ts converter (see tools/java2ts).
import { AnyTopLevelOptionalElement } from "./AnyTopLevelOptionalElement.js";
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TDefinitions extends TExtensibleDocumented {
  static readonly __fields: string[] = ["anyTopLevelOptionalElement", "targetNamespace", "name"];

  anyTopLevelOptionalElement?: AnyTopLevelOptionalElement;

  targetNamespace?: string;

  name?: string;

  getAnyTopLevelOptionalElement(): AnyTopLevelOptionalElement {
    return this.anyTopLevelOptionalElement;

  }

  setAnyTopLevelOptionalElement(anyTopLevelOptionalElement: AnyTopLevelOptionalElement): void {
    this.anyTopLevelOptionalElement = anyTopLevelOptionalElement;

  }

  getTargetNamespace(): string {
    return this.targetNamespace;

  }

  setTargetNamespace(targetNamespace: string): void {
    this.targetNamespace = targetNamespace;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
