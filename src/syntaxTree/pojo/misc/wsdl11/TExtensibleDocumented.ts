// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TExtensibleDocumented.java by the java2ts converter (see tools/java2ts).
import { TDocumented } from "./TDocumented.js";

export abstract class TExtensibleDocumented extends TDocumented {
  static readonly __fields: string[] = ["any"];

  any?: any[];

  getAny(): any[] {
    return this.any;

  }

  setAny(any: any[]): void {
    this.any = any;

  }
}
