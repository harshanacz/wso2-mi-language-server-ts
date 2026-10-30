// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/SyntaxTreeResponse.java by the java2ts converter (see tools/java2ts).

export type JsonElement = any;

export class SyntaxTreeResponse {
  syntaxTree?: JsonElement;

  defFilePath?: string;

  getSyntaxTree(): JsonElement {
    return this.syntaxTree;

  }

  setSyntaxTree(syntaxTree: JsonElement): void {
    this.syntaxTree = syntaxTree;

  }

  setDefFilePath(defFilePath: string): void {
    this.defFilePath = defFilePath;

  }

  getDefFilePath(): string {
    return this.defFilePath;

  }

  constructor(syntaxTree: JsonElement, defFilePath: string) {
    this.syntaxTree = syntaxTree;
    this.defFilePath = defFilePath;

  }
}
