// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TOperation.java by the java2ts converter (see tools/java2ts).
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TOperation extends TExtensibleDocumented {
  static readonly __fields: string[] = ["rest", "name", "parameterOrder"];

  rest?: any[];

  name?: string;

  parameterOrder?: any;

  getRest(): any[] {
    return this.rest;

  }

  setRest(rest: any[]): void {
    this.rest = rest;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getParameterOrder(): any {
    return this.parameterOrder;

  }

  setParameterOrder(parameterOrder: any): void {
    this.parameterOrder = parameterOrder;

  }
}
