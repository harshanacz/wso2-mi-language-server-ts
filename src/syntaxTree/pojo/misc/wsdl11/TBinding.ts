// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TBinding.java by the java2ts converter (see tools/java2ts).
import { TBindingOperation } from "./TBindingOperation.js";
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TBinding extends TExtensibleDocumented {
  static readonly __fields: string[] = ["operation", "name", "type"];

  operation?: TBindingOperation[];

  name?: string;

  type?: string;

  getOperation(): TBindingOperation[] {
    return this.operation;

  }

  setOperation(operation: TBindingOperation[]): void {
    this.operation = operation;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }
}
