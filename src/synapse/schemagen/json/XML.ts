// Hand port of the customised org.json XML class (attributes become attr_<name>, text becomes _ELEMVAL).
import { JSONException } from "./JSONException.js";
import { JSONObject } from "./JSONObject.js";
import { JDouble, JLong, javaDoubleToString } from "./JSONNumber.js";
import { XMLTokener } from "./XMLTokener.js";

/** java.lang.Character boxed constants: compared by identity, never equal to a String. */
export class XMLCharacter {
  constructor(readonly ch: string) {}
  toString(): string { return this.ch; }
}

export class XML {
  static readonly AMP = new XMLCharacter("&");
  static readonly APOS = new XMLCharacter("'");
  static readonly BANG = new XMLCharacter("!");
  static readonly EQ = new XMLCharacter("=");
  static readonly GT = new XMLCharacter(">");
  static readonly LT = new XMLCharacter("<");
  static readonly QUEST = new XMLCharacter("?");
  static readonly QUOT = new XMLCharacter('"');
  static readonly SLASH = new XMLCharacter("/");

  static escape(string: string): string {
    let sb = "";
    for (const c of string) {
      switch (c) {
        case "&": sb += "&amp;"; break;
        case "<": sb += "&lt;"; break;
        case ">": sb += "&gt;"; break;
        case '"': sb += "&quot;"; break;
        case "'": sb += "&apos;"; break;
        default: sb += c;
      }
    }
    return sb;
  }

  private static parse(x: XMLTokener, context: JSONObject, name: string | null): boolean {
    let token: any = x.nextToken();
    if (token === XML.BANG) {
      const c = x.next();
      if (c === "-") {
        if (x.next() === "-") {
          x.skipPast("-->");
          return false;
        }
        x.back();
      } else if (c === "[") {
        token = x.nextToken();
        if ("CDATA" === token) {
          if (x.next() === "[") {
            const string = x.nextCDATA();
            if (string.length > 0) context.accumulate("_ELEMVAL", string);
            return false;
          }
        }
        throw x.syntaxError("Expected 'CDATA['");
      }
      let i = 1;
      do {
        token = x.nextMeta();
        if (token === null) {
          throw x.syntaxError("Missing '>' after '<!'.");
        } else if (token === XML.LT) {
          i += 1;
        } else if (token === XML.GT) {
          i -= 1;
        }
      } while (i > 0);
      return false;
    } else if (token === XML.QUEST) {
      x.skipPast("?>");
      return false;
    } else if (token === XML.SLASH) {
      token = x.nextToken();
      if (name === null) throw x.syntaxError("Mismatched close tag " + token);
      if (String(token) !== name || typeof token !== "string") throw x.syntaxError("Mismatched " + name + " and " + token);
      if (x.nextToken() !== XML.GT) throw x.syntaxError("Misshaped close tag");
      return true;
    } else if (token instanceof XMLCharacter) {
      throw x.syntaxError("Misshaped tag");
    } else {
      const tagName = token as string;
      token = null;
      const jsonobject = new JSONObject();
      for (;;) {
        if (token === null) token = x.nextToken();
        if (typeof token === "string") {
          const string = token;
          token = x.nextToken();
          if (token === XML.EQ) {
            token = x.nextToken();
            if (typeof token !== "string") throw x.syntaxError("Missing value");
            const attribute = string.includes("xmlns:") ? string : "attr_" + string;
            jsonobject.accumulate(attribute, XML.stringToValue(token));
            token = null;
          } else {
            jsonobject.accumulate(string, "");
          }
        } else if (token === XML.SLASH) {
          if (x.nextToken() !== XML.GT) throw x.syntaxError("Misshaped tag");
          if (jsonobject.length() > 0) context.accumulate(tagName, jsonobject);
          else context.accumulate(tagName, "");
          return false;
        } else if (token === XML.GT) {
          for (;;) {
            token = x.nextContent();
            if (token === null) {
              if (tagName !== null) throw x.syntaxError("Unclosed tag " + tagName);
              return false;
            } else if (typeof token === "string") {
              if (token.length > 0) jsonobject.accumulate("_ELEMVAL", XML.stringToValue(token));
            } else if (token === XML.LT) {
              if (XML.parse(x, jsonobject, tagName)) {
                if (jsonobject.length() === 0) {
                  context.accumulate(tagName, "");
                } else if (jsonobject.length() === 1 && jsonobject.opt("_ELEMVAL") !== null) {
                  context.accumulate(tagName, jsonobject.opt("_ELEMVAL"));
                } else {
                  context.accumulate(tagName, jsonobject);
                }
                return false;
              }
            }
          }
        } else {
          throw x.syntaxError("Misshaped tag");
        }
      }
    }
  }

  static stringToValue(string: string): any {
    const lower = string.toLowerCase();
    if (lower === "true") return true;
    if (lower === "false") return false;
    if (lower === "null") return JSONObject.NULL;
    if (string === "") return JSONObject.valueToString("");
    // Long first; only a NumberFormatException falls through to Double (as in the Java).
    const initial = string.charAt(0);
    if (initial === "-" || (initial >= "0" && initial <= "9")) {
      if (/^[+-]?\d+$/.test(string)) {
        const v = BigInt(string);
        if (v >= -(2n ** 63n) && v <= 2n ** 63n - 1n) {
          if (v.toString() === string) return new JLong(v);
          return string;
        }
      }
      // Long.parseLong failed: try Double
      const d = XML.parseJavaDouble(string);
      if (d !== null && javaDoubleToString(d) === string) return new JDouble(d);
    }
    return string;
  }

  /** Double.parseDouble acceptance (trim, optional sign, digits, exponent, optional d/f suffix, NaN/Infinity). */
  private static parseJavaDouble(s: string): number | null {
    const t = s.trim();
    if (/^[+-]?(NaN|Infinity)$/.test(t)) return t.endsWith("NaN") ? NaN : t.startsWith("-") ? -Infinity : Infinity;
    const m = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)[fFdD]?$/.exec(t);
    return m ? Number(m[1]) : null;
  }

  static toJSONObject(string: string): JSONObject {
    const jo = new JSONObject();
    const x = new XMLTokener(string);
    while (x.more() && x.skipPast("<")) {
      XML.parse(x, jo, null);
    }
    return jo;
  }
}
