// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TParam.java by the java2ts converter (see tools/java2ts).
import { TExtensibleAttributesDocumented } from "./TExtensibleAttributesDocumented.js";

export class TParam extends TExtensibleAttributesDocumented {
  static readonly __fields: string[] = ["name", "message"];

  name?: string;

  message?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getMessage(): string {
    return this.message;

  }

  setMessage(message: string): void {
    this.message = message;

  }
}
