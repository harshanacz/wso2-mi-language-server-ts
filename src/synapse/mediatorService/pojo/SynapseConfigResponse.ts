// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/SynapseConfigResponse.java by the java2ts converter (see tools/java2ts).
import { TextEdit } from "../../lsp.js";

export class SynapseConfigResponse {
  static readonly __fields: string[] = ["textEdits"];

  textEdits?: TextEdit[];

  constructor();
  constructor(edit: TextEdit);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {
        this.textEdits = [];

        break;
      }
      case 1: {
        const [edit] = args;


                this.textEdits = [];
                this.addTextEdit(edit);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getTextEdits(): TextEdit[] {
    this.sort();
    return this.textEdits;

  }

  addTextEdit(edit: TextEdit): void {
    if (edit != null) {
        this.textEdits.push(edit);
    }

  }

  sort(): void {
    this.textEdits.sort((o1, o2) => {
        if (o1.getRange().getStart().getLine() == o2.getRange().getStart().getLine()) {
            return o2.getRange().getStart().getCharacter() - o1.getRange().getStart().getCharacter();
        }
        return o2.getRange().getStart().getLine() - o1.getRange().getStart().getLine();
    });

  }

  toString(): string {
    return "SynapseConfigResponse{" +
            "textEdits=" + this.textEdits +
            '}';

  }
}
