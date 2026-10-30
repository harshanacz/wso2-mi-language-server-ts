// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TBindingOperationFault.java by the java2ts converter (see tools/java2ts).
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TBindingOperationFault extends TExtensibleDocumented {
  static readonly __fields: string[] = ["name"];

  name?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
