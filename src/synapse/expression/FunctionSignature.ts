// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/FunctionSignature.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";
import { size, unmodifiable } from "../../syntaxTree/javaCompat.js";

export class FunctionSignature {
  static readonly __fields: string[] = ["name", "paramTypes", "description"];

  name?: string;

  paramTypes?: string[];

  description?: string;

  constructor(name: string, paramTypes: string[], description: string) {
    this.name = name;
    this.paramTypes = unmodifiable(Array.from(paramTypes));
    this.description = description;

  }

  getName(): string {
    return this.name;

  }

  getArity(): number {
    return size(this.paramTypes);

  }

  getParamTypes(): string[] {
    return this.paramTypes;

  }

  getDescription(): string {
    return this.description;

  }
}
