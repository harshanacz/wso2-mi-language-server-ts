// Hand port of org.json JSONTokener. A Java `char` is a one character string here, NUL is "\0".
import { Reader, StringReader, BufferedReader } from "../../host/io.js";
import { JSONArray } from "./JSONArray.js";
import { JSONException } from "./JSONException.js";
import { JSONObject } from "./JSONObject.js";

const NUL = "\0";

export class JSONTokener {
  static readonly __fields: string[] = ["character", "eof", "index", "line", "previous", "reader", "usePrevious"];

  private character = 1;
  private eof = false;
  private index = 0;
  private line = 1;
  private previous: string = NUL;
  private reader: Reader;
  private usePrevious = false;

  constructor(source: Reader | string) {
    const reader: Reader = typeof source === "string" ? new StringReader(source) : source;
    this.reader = reader.markSupported() ? reader : new BufferedReader(reader);
  }

  back(): void {
    if (this.usePrevious || this.index <= 0) {
      throw new JSONException("Stepping back two steps is not supported");
    }
    this.index -= 1;
    this.character -= 1;
    this.usePrevious = true;
    this.eof = false;
  }

  static dehexchar(c: string): number {
    if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48;
    if (c >= "A" && c <= "F") return c.charCodeAt(0) - 55;
    if (c >= "a" && c <= "f") return c.charCodeAt(0) - 87;
    return -1;
  }

  end(): boolean {
    return this.eof && !this.usePrevious;
  }

  more(): boolean {
    this.next();
    if (this.end()) return false;
    this.back();
    return true;
  }

  /** next(): one char; next(c): char that must equal c; next(n): n chars. */
  next(): string;
  next(c: string): string;
  next(n: number): string;
  next(arg?: string | number): string {
    if (typeof arg === "number") {
      if (arg === 0) return "";
      let out = "";
      for (let pos = 0; pos < arg; pos++) {
        out += this.next();
        if (this.end()) throw this.syntaxError("Substring bounds error");
      }
      return out;
    }
    if (typeof arg === "string") {
      const n = this.next();
      if (n !== arg) {
        throw this.syntaxError("Expected '" + arg + "' and instead saw '" + n + "'");
      }
      return n;
    }
    let c: string;
    if (this.usePrevious) {
      this.usePrevious = false;
      c = this.previous;
    } else {
      const r = this.reader.read();
      if (r <= 0) {
        this.eof = true;
        c = NUL;
      } else {
        c = String.fromCharCode(r);
      }
    }
    this.index += 1;
    if (this.previous === "\r") {
      this.line += 1;
      this.character = c === "\n" ? 0 : 1;
    } else if (c === "\n") {
      this.line += 1;
      this.character = 0;
    } else {
      this.character += 1;
    }
    this.previous = c;
    return c;
  }

  nextClean(): string {
    for (;;) {
      const c = this.next();
      if (c === NUL || c > " ") return c;
    }
  }

  nextString(quote: string): string {
    let sb = "";
    for (;;) {
      let c = this.next();
      switch (c) {
        case NUL:
        case "\n":
        case "\r":
          throw this.syntaxError("Unterminated string");
        case "\\":
          c = this.next();
          switch (c) {
            case "b": sb += "\b"; break;
            case "t": sb += "\t"; break;
            case "n": sb += "\n"; break;
            case "f": sb += "\f"; break;
            case "r": sb += "\r"; break;
            case "u": {
              const hex = this.next(4);
              const code = /^[+-]?[0-9a-fA-F]+$/.test(hex) ? parseInt(hex, 16) : NaN;
              if (Number.isNaN(code)) throw new JSONException('For input string: "' + hex + '"');
              sb += String.fromCharCode(code);
              break;
            }
            case '"':
            case "'":
            case "\\":
            case "/":
              sb += c;
              break;
            default:
              throw this.syntaxError("Illegal escape.");
          }
          break;
        default:
          if (c === quote) return sb;
          sb += c;
      }
    }
  }

  /** nextTo(delimiter char) or nextTo(delimiters string): the same behaviour for one char strings. */
  nextTo(delimiters: string): string {
    let sb = "";
    for (;;) {
      const c = this.next();
      if (delimiters.indexOf(c) >= 0 || c === NUL || c === "\n" || c === "\r") {
        if (c !== NUL) this.back();
        return sb.trim();
      }
      sb += c;
    }
  }

  nextValue(): any {
    let c = this.nextClean();
    switch (c) {
      case '"':
      case "'":
        return this.nextString(c);
      case "{":
        this.back();
        return new JSONObject(this);
      case "[":
        this.back();
        return new JSONArray(this);
    }
    let sb = "";
    while (c >= " " && ',:]}/\\"[{;=#'.indexOf(c) < 0) {
      sb += c;
      c = this.next();
    }
    this.back();
    const string = sb.trim();
    if (string === "") throw this.syntaxError("Missing value");
    return JSONObject.stringToValue(string);
  }

  skipTo(to: string): string {
    let c: string;
    const startIndex = this.index;
    const startCharacter = this.character;
    const startLine = this.line;
    this.reader.mark(1000000);
    do {
      c = this.next();
      if (c === NUL) {
        this.reader.reset();
        this.index = startIndex;
        this.character = startCharacter;
        this.line = startLine;
        return c;
      }
    } while (c !== to);
    this.back();
    return c;
  }

  syntaxError(message: string): JSONException {
    return new JSONException(message + this.toString());
  }

  toString(): string {
    return " at " + this.index + " [character " + this.character + " line " + this.line + "]";
  }
}
