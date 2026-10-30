// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TMessage.java by the java2ts converter (see tools/java2ts).
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";
import { TPart } from "./TPart.js";

export class TMessage extends TExtensibleDocumented {
  part?: TPart[];

  name?: string;

  getPart(): TPart[] {
    return this.part;

  }

  setPart(part: TPart[]): void {
    this.part = part;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
