// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TPort.java by the java2ts converter (see tools/java2ts).
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TPort extends TExtensibleDocumented {
  static readonly __fields: string[] = ["name", "binding"];

  name?: string;

  binding?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getBinding(): string {
    return this.binding;

  }

  setBinding(binding: string): void {
    this.binding = binding;

  }
}
