// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/FunctionInfo.java by the java2ts converter (see tools/java2ts).

export class FunctionInfo {
  static readonly __fields: string[] = ["name", "currentParameterIndex"];

  name?: string;

  currentParameterIndex: number = 0;

  constructor(name: string, currentParameterIndex: number) {
    this.name = name;
    this.currentParameterIndex = currentParameterIndex;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getCurrentParameterIndex(): number {
    return this.currentParameterIndex;

  }

  setCurrentParameterIndex(currentParameterIndex: number): void {
    this.currentParameterIndex = currentParameterIndex;

  }

  incrementParameterIndex(): void {
    this.currentParameterIndex++;

  }

  toString(): string {
    return "FunctionInfo{" +
            "name='" + this.name + '\'' +
            ", currentParameterIndex=" + this.currentParameterIndex +
            '}';

  }
}
