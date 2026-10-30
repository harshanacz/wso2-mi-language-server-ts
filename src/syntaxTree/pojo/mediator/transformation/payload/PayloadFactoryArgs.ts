// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/PayloadFactoryArgs.java by the java2ts converter (see tools/java2ts).
import { PayloadFactoryArgsArg } from "./PayloadFactoryArgsArg.js";
import { STNode } from "../../../../stNode.js";

export class PayloadFactoryArgs extends STNode {
  static readonly __fields: string[] = ["arg"];

  arg?: PayloadFactoryArgsArg[];

  getArg(): PayloadFactoryArgsArg[] {
    return this.arg;

  }

  setArg(arg: PayloadFactoryArgsArg[]): void {
    this.arg = arg;

  }
}
