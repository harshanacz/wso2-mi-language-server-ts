// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/ejb/EjbArgs.java by the java2ts converter (see tools/java2ts).
import { EjbArgsArg } from "./EjbArgsArg.js";
import { STNode } from "../../../../stNode.js";

export class EjbArgs extends STNode {
  arg?: EjbArgsArg[];

  getArg(): EjbArgsArg[] {
    return this.arg;

  }

  setArg(arg: EjbArgsArg[]): void {
    this.arg = arg;

  }
}
