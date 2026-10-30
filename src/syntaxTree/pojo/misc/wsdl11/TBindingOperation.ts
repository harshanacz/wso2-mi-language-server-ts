// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TBindingOperation.java by the java2ts converter (see tools/java2ts).
import { TBindingOperationFault } from "./TBindingOperationFault.js";
import { TBindingOperationMessage } from "./TBindingOperationMessage.js";
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";

export class TBindingOperation extends TExtensibleDocumented {
  input?: TBindingOperationMessage;

  output?: TBindingOperationMessage;

  fault?: TBindingOperationFault[];

  name?: string;

  getInput(): TBindingOperationMessage {
    return this.input;

  }

  setInput(input: TBindingOperationMessage): void {
    this.input = input;

  }

  getOutput(): TBindingOperationMessage {
    return this.output;

  }

  setOutput(output: TBindingOperationMessage): void {
    this.output = output;

  }

  getFault(): TBindingOperationFault[] {
    return this.fault;

  }

  setFault(fault: TBindingOperationFault[]): void {
    this.fault = fault;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
