// Hand port of org.json XMLTokener.
import { JSONException } from "./JSONException.js";
import { JSONTokener } from "./JSONTokener.js";
import { XML, XMLCharacter } from "./XML.js";

const NUL = "\0";

/** java.lang.Character.isWhitespace */
function isWhitespace(c: string): boolean {
  const code = c.charCodeAt(0);
  if (code === 0x20 || (code >= 0x09 && code <= 0x0d) || (code >= 0x1c && code <= 0x1f)) return true;
  if (code === 0xa0 || code === 0x2007 || code === 0x202f) return false;
  return /[\u1680\u2000-\u200a\u2028\u2029\u205f\u3000]/.test(c);
}

export class XMLTokener extends JSONTokener {
  private static entityMap: Map<string, XMLCharacter> | undefined;
  /** Built lazily because XML and XMLTokener import each other. */
  static get entity(): Map<string, XMLCharacter> {
    if (!XMLTokener.entityMap) {
      XMLTokener.entityMap = new Map<string, XMLCharacter>([
        ["amp", XML.AMP], ["apos", XML.APOS], ["gt", XML.GT], ["lt", XML.LT], ["quot", XML.QUOT],
      ]);
    }
    return XMLTokener.entityMap;
  }

  constructor(s: string) {
    super(s);
  }

  nextCDATA(): string {
    let sb = "";
    for (;;) {
      const c = this.next();
      if (this.end()) throw this.syntaxError("Unclosed CDATA");
      sb += c;
      const i = sb.length - 3;
      if (i >= 0 && sb.charAt(i) === "]" && sb.charAt(i + 1) === "]" && sb.charAt(i + 2) === ">") {
        return sb.substring(0, i);
      }
    }
  }

  nextContent(): XMLCharacter | string | null {
    let c: string;
    do {
      c = this.next();
    } while (isWhitespace(c));
    if (c === NUL) return null;
    if (c === "<") return XML.LT;
    let sb = "";
    for (;;) {
      if (c === "<" || c === NUL) {
        this.back();
        return sb.trim();
      }
      if (c === "&") {
        sb += String(this.nextEntity(c));
      } else {
        sb += c;
      }
      c = this.next();
    }
  }

  nextEntity(ampersand: string): XMLCharacter | string {
    let sb = "";
    for (;;) {
      const c = this.next();
      if (/[\p{L}\p{Nd}]/u.test(c) || c === "#") {
        sb += c.toLowerCase();
      } else if (c === ";") {
        break;
      } else {
        throw this.syntaxError("Missing ';' in XML entity: &" + sb);
      }
    }
    const object = XMLTokener.entity.get(sb);
    return object !== undefined ? object : ampersand + sb + ";";
  }

  nextMeta(): XMLCharacter | boolean {
    let c: string;
    do {
      c = this.next();
    } while (isWhitespace(c));
    switch (c) {
      case NUL: throw this.syntaxError("Misshaped meta tag");
      case "<": return XML.LT;
      case ">": return XML.GT;
      case "/": return XML.SLASH;
      case "=": return XML.EQ;
      case "!": return XML.BANG;
      case "?": return XML.QUEST;
      case '"':
      case "'": {
        const q = c;
        for (;;) {
          c = this.next();
          if (c === NUL) throw this.syntaxError("Unterminated string");
          if (c === q) return true;
        }
      }
      default:
        for (;;) {
          c = this.next();
          if (isWhitespace(c)) return true;
          switch (c) {
            case NUL:
            case "<":
            case ">":
            case "/":
            case "=":
            case "!":
            case "?":
            case '"':
            case "'":
              this.back();
              return true;
          }
        }
    }
  }

  nextToken(): XMLCharacter | string {
    let c: string;
    do {
      c = this.next();
    } while (isWhitespace(c));
    switch (c) {
      case NUL: throw this.syntaxError("Misshaped element");
      case "<": throw this.syntaxError("Misplaced '<'");
      case ">": return XML.GT;
      case "/": return XML.SLASH;
      case "=": return XML.EQ;
      case "!": return XML.BANG;
      case "?": return XML.QUEST;
      case '"':
      case "'": {
        const q = c;
        let sb = "";
        for (;;) {
          c = this.next();
          if (c === NUL) throw this.syntaxError("Unterminated string");
          if (c === q) return sb;
          if (c === "&") sb += String(this.nextEntity(c));
          else sb += c;
        }
      }
      default: {
        let sb = "";
        for (;;) {
          sb += c;
          c = this.next();
          if (isWhitespace(c)) return sb;
          switch (c) {
            case NUL:
              return sb;
            case ">":
            case "/":
            case "=":
            case "!":
            case "?":
            case "[":
            case "]":
              this.back();
              return sb;
            case "<":
            case '"':
            case "'":
              throw this.syntaxError("Bad character in a name");
          }
        }
      }
    }
  }

  skipPast(to: string): boolean {
    const length = to.length;
    const circle: string[] = new Array(length);
    let offset = 0;
    for (let i = 0; i < length; i += 1) {
      const c = this.next();
      if (c === NUL) return false;
      circle[i] = c;
    }
    for (;;) {
      let j = offset;
      let b = true;
      for (let i = 0; i < length; i += 1) {
        if (circle[j] !== to.charAt(i)) {
          b = false;
          break;
        }
        j += 1;
        if (j >= length) j -= length;
      }
      if (b) return true;
      const c = this.next();
      if (c === NUL) return false;
      circle[offset] = c;
      offset += 1;
      if (offset >= length) offset -= length;
    }
  }
}
