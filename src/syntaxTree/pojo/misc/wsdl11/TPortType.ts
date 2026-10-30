// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TPortType.java by the java2ts converter (see tools/java2ts).
import { TExtensibleAttributesDocumented } from "./TExtensibleAttributesDocumented.js";
import { TOperation } from "./TOperation.js";

export class TPortType extends TExtensibleAttributesDocumented {
  operation?: TOperation[];

  name?: string;

  getOperation(): TOperation[] {
    return this.operation;

  }

  setOperation(operation: TOperation[]): void {
    this.operation = operation;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
