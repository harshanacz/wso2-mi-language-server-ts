// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/InterfaceOperationType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class InterfaceOperationType extends ExtensibleDocumentedType {
  static readonly __fields: string[] = ["otherAttributes", "inputOrOutputOrInfault", "name", "pattern", "safe", "style"];

  otherAttributes?: any;

  inputOrOutputOrInfault?: any[];

  name?: string;

  pattern?: string;

  safe: boolean = false;

  style?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getInputOrOutputOrInfault(): any[] {
    return this.inputOrOutputOrInfault;

  }

  setInputOrOutputOrInfault(inputOrOutputOrInfault: any[]): void {
    this.inputOrOutputOrInfault = inputOrOutputOrInfault;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getPattern(): string {
    return this.pattern;

  }

  setPattern(pattern: string): void {
    this.pattern = pattern;

  }

  isSafe(): boolean {
    return this.safe;

  }

  setSafe(safe: boolean): void {
    this.safe = safe;

  }

  getStyle(): string {
    return this.style;

  }

  setStyle(style: string): void {
    this.style = style;

  }
}
