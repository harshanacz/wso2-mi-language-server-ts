import { Files, Path } from "../host/nio.js";
import type { Position, Range } from "../lsp.js";
import type { Edit } from "./tryout/pojo/Edit.js";

/** The text edit helpers of the Java TryOutUtils that the expression services need (the rest of TryOutUtils is desktop only). */
export const TryOutUtils = {
  doEdits(edits: Edit[] | null | undefined, editFilePath: Path): void {
    if (edits != null && edits.length > 0) {
      for (const edit of edits) {
        TryOutUtils.doEdit(edit, editFilePath);
      }
    }
  },

  doEdit(edit: Edit, editFilePath: Path): void {
    const editContent = edit.getText() as string;
    const editRange = edit.getRange() as Range;
    const fileContent = Files.readString(editFilePath);
    Files.writeString(editFilePath, TryOutUtils.editContent(fileContent, editRange, editContent));
  },

  editContent(originalText: string, range: Range, newText: string): string {
    // Normalize line endings to \n for consistent processing (For windows CRLF)
    const normalizedText = originalText.split("\r\n").join("\n");
    const lines = normalizedText.split("\n");
    const startIndex = TryOutUtils.getOffsetFromPosition(lines, range.getStart());
    const endIndex = TryOutUtils.getOffsetFromPosition(lines, range.getEnd());
    const result = normalizedText.substring(0, startIndex) + newText + normalizedText.substring(endIndex);
    if (originalText.includes("\r\n")) {
      return result.split("\n").join("\r\n");
    }
    return result;
  },

  getOffsetFromPosition(lines: string[], position: Position): number {
    let index = 0;
    for (let i = 0; i < position.getLine(); i++) {
      index += lines[i].length + 1;
    }
    index += position.getCharacter();
    return index;
  },
};
