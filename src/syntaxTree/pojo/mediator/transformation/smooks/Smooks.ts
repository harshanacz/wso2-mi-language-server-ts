// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/smooks/Smooks.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { SmooksInput } from "./SmooksInput.js";
import { SmooksOutput } from "./SmooksOutput.js";

export class Smooks extends Mediator {
  static readonly __fields: string[] = ["input", "output", "configKey", "description", "traceFilter"];

  input?: SmooksInput;

  output?: SmooksOutput;

  configKey?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Smooks");

  }

  getInput(): SmooksInput {
    return this.input;

  }

  setInput(input: SmooksInput): void {
    this.input = input;

  }

  getOutput(): SmooksOutput {
    return this.output;

  }

  setOutput(output: SmooksOutput): void {
    this.output = output;

  }

  getConfigKey(): string {
    return this.configKey;

  }

  setConfigKey(configKey: string): void {
    this.configKey = configKey;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
