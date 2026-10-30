import { BaseErrorListener, type RecognitionException, type Recognizer, type ATNSimulator } from "antlr4ng";
import type { ExpressionError } from "./types.js";

/** Port of SyntaxErrorListener.java. Message format is kept identical to the Java server. */
export class SyntaxErrorListener extends BaseErrorListener {
  private _hasErrors = false;
  private readonly _errors: ExpressionError[] = [];

  hasErrors(): boolean {
    return this._hasErrors;
  }

  getErrors(): readonly ExpressionError[] {
    return this._errors;
  }

  override syntaxError<S extends Recognizer<ATNSimulator>>(
    _recognizer: S,
    offendingSymbol: unknown,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | null,
  ): void {
    this._hasErrors = true;
    let message = `Syntax error at line ${line}, column ${charPositionInLine}: `;
    if (offendingSymbol !== null && offendingSymbol !== undefined) {
      message += `offending symbol '${String(offendingSymbol)}'. `;
    }
    message += `Reason: ${msg}`;
    this._errors.push({
      line,
      charPositionInLine,
      message,
      offendingSymbol,
      exception: e,
      warning: false,
    });
  }
}
