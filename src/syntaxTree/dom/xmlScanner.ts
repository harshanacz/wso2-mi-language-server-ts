/**
 * Port of the XML part of LemMinX's XMLScanner (org.eclipse.lemminx.dom.parser.XMLScanner).
 * DTD/DOCTYPE states are intentionally not ported: Synapse configuration files do not use them.
 */

export enum TokenType {
  StartCommentTag,
  Comment,
  EndCommentTag,
  StartTagOpen,
  StartTag,
  StartTagClose,
  StartTagSelfClose,
  EndTagOpen,
  EndTag,
  EndTagClose,
  AttributeName,
  DelimiterAssign,
  AttributeValue,
  CDATATagOpen,
  CDATAContent,
  CDATATagClose,
  StartPrologOrPI,
  PrologName,
  PIName,
  PIContent,
  PIEnd,
  PrologEnd,
  Content,
  Whitespace,
  Unknown,
  EOS,
}

enum State {
  WithinContent,
  WithinComment,
  WithinCDATA,
  AfterOpeningStartTag,
  AfterOpeningEndTag,
  WithinTag,
  WithinEndTag,
  AfterAttributeName,
  BeforeAttributeValue,
  PrologOrPI,
  WithinPI,
}

const LAN = 0x3c; // <
const RAN = 0x3e; // >
const FSL = 0x2f; // /
const EXL = 0x21; // !
const QMA = 0x3f; // ?
const EQS = 0x3d; // =
const DQO = 0x22; // "
const SIQ = 0x27; // '
const UDS = 0x5f; // _
const DDT = 0x3a; // :
const DOT = 0x2e; // .
const MIN = 0x2d; // -
const NWL = 0x0a;
const CAR = 0x0d;
const WSP = 0x20;

const START_COMMENT = [EXL, MIN, MIN]; // !--
const END_COMMENT = [MIN, MIN, RAN]; // -->
const START_CDATA = [...("![CDATA[")].map((c) => c.charCodeAt(0));
const END_CDATA = [0x5d, 0x5d, RAN]; // ]]>
const END_PROLOG = [QMA, RAN]; // ?>
const END_WS_OR_PROLOG = [NWL, CAR, WSP, QMA, RAN];

const LETTER = /^\p{L}$/u;
const LETTER_OR_DIGIT = /^[\p{L}\p{Nd}]$/u;
const WHITESPACE = /^\s$/u;
const PROLOG_NAME = /^xml$/i;
const ATTRIBUTE_NAME_REGEX = /^[^\s?"'<>/=\u0000-\u000f\u007f-\u009f]+$/;

function isLetter(ch: number): boolean {
  return ch >= 0 && LETTER.test(String.fromCharCode(ch));
}

function startElementName(ch: number): boolean {
  return ch === UDS || ch === DDT || isLetter(ch);
}

function elementNameChar(ch: number): boolean {
  return (
    ch === UDS || ch === DDT || ch === DOT || ch === MIN || (ch >= 0 && LETTER_OR_DIGIT.test(String.fromCharCode(ch)))
  );
}

function attributeNameChar(ch: number): boolean {
  return (
    !WHITESPACE.test(String.fromCharCode(ch)) &&
    ch !== QMA &&
    ch !== DQO &&
    ch !== SIQ &&
    ch !== LAN &&
    ch !== RAN &&
    ch !== FSL &&
    ch !== EQS &&
    !(ch >= 0x00 && ch <= 0x0f) &&
    ch !== 0x7f &&
    !(ch >= 0x80 && ch <= 0x9f)
  );
}

export class XMLScanner {
  private pos: number;
  private readonly len: number;
  private state: State = State.WithinContent;
  private tokenOffset = 0;
  private tokenType: TokenType = TokenType.Unknown;

  constructor(private readonly source: string, initialOffset = 0) {
    this.pos = initialOffset;
    this.len = source.length;
  }

  getTokenOffset(): number {
    return this.tokenOffset;
  }
  getTokenEnd(): number {
    return this.pos;
  }
  getTokenText(): string {
    return this.source.substring(this.tokenOffset, this.pos);
  }
  getTokenType(): TokenType {
    return this.tokenType;
  }
  isTokenTextBlank(): boolean {
    return this.getTokenText().trim().length === 0;
  }

  // ── stream helpers (MultiLineStream) ──
  private eos(): boolean {
    return this.len <= this.pos;
  }
  private peek(n = 0): number {
    const p = this.pos + n;
    return p >= this.len ? -1 : this.source.charCodeAt(p);
  }
  private advanceIfChar(ch: number): boolean {
    if (this.peek() === ch) {
      this.pos++;
      return true;
    }
    return false;
  }
  private advanceIfChars(chars: number[]): boolean {
    if (this.pos + chars.length > this.len) return false;
    for (let i = 0; i < chars.length; i++) if (this.peek(i) !== chars[i]) return false;
    this.pos += chars.length;
    return true;
  }
  private advanceUntilChar(ch: number): boolean {
    while (this.pos < this.len) {
      if (this.peek() === ch) return true;
      this.pos++;
    }
    return false;
  }
  private advanceUntilAnyOfChars(chars: number[]): boolean {
    while (this.pos < this.len) {
      if (chars.includes(this.peek())) return true;
      this.pos++;
    }
    return false;
  }
  private advanceUntilCharOrNewTag(ch: number): boolean {
    while (this.pos < this.len) {
      const c = this.peek();
      if (c === ch || c === LAN) return true;
      this.pos++;
    }
    return false;
  }
  private advanceUntilChars(chars: number[]): boolean {
    while (this.pos + chars.length <= this.len) {
      let i = 0;
      while (i < chars.length && this.peek(i) === chars[i]) i++;
      if (i === chars.length) return true;
      this.pos++;
    }
    this.pos = this.len;
    return false;
  }
  private advanceUntilCharsOrNewTag(chars: number[]): boolean {
    while (this.pos + chars.length <= this.len) {
      if (this.peek(0) === LAN) return true;
      let i = 0;
      while (i < chars.length && this.peek(i) === chars[i]) i++;
      if (i === chars.length) return true;
      this.pos++;
    }
    this.pos = this.len;
    return false;
  }
  private advanceWhile(pred: (ch: number) => boolean): number {
    const start = this.pos;
    while (this.pos < this.len && pred(this.peek())) this.pos++;
    return this.pos - start;
  }
  private skipWhitespace(): boolean {
    return this.advanceWhile((c) => WHITESPACE.test(String.fromCharCode(c))) > 0;
  }

  private hasNextElementName(): boolean {
    if (!startElementName(this.peek())) return false;
    this.pos++;
    this.advanceWhile(elementNameChar);
    return true;
  }
  private hasNextAttributeName(): boolean {
    return this.advanceWhile(attributeNameChar) > 0;
  }
  private hasNextAttributeValue(): boolean {
    const first = this.peek();
    if (first === SIQ || first === DQO) {
      this.pos++;
      if (this.advanceUntilChar(first)) this.pos++;
      return true;
    }
    return false;
  }

  private finish(offset: number, type: TokenType): TokenType {
    this.tokenType = type;
    this.tokenOffset = offset;
    return type;
  }

  scan(): TokenType {
    const offset = this.pos;
    const token = this.internalScan();
    if (token !== TokenType.EOS && offset === this.pos) {
      // scanner did not advance: avoid infinite loops
      this.pos++;
      return this.finish(offset, TokenType.Unknown);
    }
    return token;
  }

  private internalScan(): TokenType {
    const offset = this.pos;
    if (this.eos()) return this.finish(offset, TokenType.EOS);

    switch (this.state) {
      case State.WithinComment:
        if (this.advanceIfChars(END_COMMENT)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.EndCommentTag);
        }
        this.advanceUntilChars(END_COMMENT);
        return this.finish(offset, TokenType.Comment);

      case State.PrologOrPI: {
        if (this.advanceIfChars(END_PROLOG)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.PIEnd);
        }
        if (this.advanceUntilAnyOfChars(END_WS_OR_PROLOG) || this.eos()) {
          const name = this.source.substring(offset, this.pos);
          if (PROLOG_NAME.test(name)) {
            this.state = State.WithinTag;
            return this.finish(offset, TokenType.PrologName);
          }
          if (ATTRIBUTE_NAME_REGEX.test(name)) {
            this.state = State.WithinPI;
            return this.finish(offset, TokenType.PIName);
          }
        }
        this.advanceUntilCharsOrNewTag(END_PROLOG);
        if (this.peek() === LAN) this.state = State.WithinContent;
        return this.internalScan();
      }

      case State.WithinPI:
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        if (this.advanceIfChars(END_PROLOG)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.PIEnd);
        }
        if (this.advanceUntilCharsOrNewTag(END_PROLOG)) {
          if (this.peek() === LAN) this.state = State.WithinContent;
          if (this.source.substring(offset, this.pos).length === 0) return this.finish(offset, TokenType.PIEnd);
        }
        return this.finish(offset, TokenType.PIContent);

      case State.WithinContent:
        if (this.advanceIfChar(LAN)) {
          if (!this.eos() && this.peek() === EXL) {
            if (this.advanceIfChars(START_COMMENT)) {
              this.state = State.WithinComment;
              return this.finish(offset, TokenType.StartCommentTag);
            }
            if (this.advanceIfChars(START_CDATA)) {
              this.state = State.WithinCDATA;
              return this.finish(offset, TokenType.CDATATagOpen);
            }
          } else if (!this.eos() && this.advanceIfChar(QMA)) {
            this.state = State.PrologOrPI;
            return this.finish(offset, TokenType.StartPrologOrPI);
          }
          if (this.advanceIfChar(FSL)) {
            this.state = State.AfterOpeningEndTag;
            return this.finish(offset, TokenType.EndTagOpen);
          }
          this.state = State.AfterOpeningStartTag;
          return this.finish(offset, TokenType.StartTagOpen);
        }
        this.advanceUntilChar(LAN);
        return this.finish(offset, TokenType.Content);

      case State.WithinCDATA:
        if (this.advanceIfChars(END_CDATA)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.CDATATagClose);
        }
        this.advanceUntilChars(END_CDATA);
        return this.finish(offset, TokenType.CDATAContent);

      case State.AfterOpeningEndTag:
        if (this.hasNextElementName()) {
          this.state = State.WithinEndTag;
          return this.finish(offset, TokenType.EndTag);
        }
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        this.state = State.WithinEndTag;
        if (this.advanceUntilCharOrNewTag(RAN)) {
          if (this.peek() === LAN) this.state = State.WithinContent;
          return this.internalScan();
        }
        return this.finish(offset, TokenType.Unknown);

      case State.WithinEndTag:
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        if (this.advanceIfChar(RAN)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.EndTagClose);
        }
        if (this.advanceUntilChar(LAN)) {
          this.state = State.WithinContent;
          return this.internalScan();
        }
        return this.finish(offset, TokenType.Whitespace);

      case State.AfterOpeningStartTag:
        if (this.hasNextElementName()) {
          this.state = State.WithinTag;
          return this.finish(offset, TokenType.StartTag);
        }
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        this.state = State.WithinTag;
        if (this.advanceUntilCharOrNewTag(RAN)) {
          if (this.peek() === LAN) this.state = State.WithinContent;
          return this.internalScan();
        }
        return this.finish(offset, TokenType.Unknown);

      case State.WithinTag: {
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        if (this.advanceIfChars(END_PROLOG)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.PrologEnd);
        }
        if (this.hasNextAttributeName()) {
          this.state = State.AfterAttributeName;
          return this.finish(offset, TokenType.AttributeName);
        }
        if (this.advanceIfChar(FSL)) {
          this.state = State.WithinTag;
          if (this.advanceIfChar(RAN)) {
            this.state = State.WithinContent;
            return this.finish(offset, TokenType.StartTagSelfClose);
          }
          return this.finish(offset, TokenType.Unknown);
        }
        const c = this.peek();
        if (c === DQO || c === SIQ) {
          this.state = State.BeforeAttributeValue;
          return this.internalScan();
        }
        if (this.advanceIfChar(RAN)) {
          this.state = State.WithinContent;
          return this.finish(offset, TokenType.StartTagClose);
        }
        if (this.advanceUntilChar(LAN)) {
          this.state = State.WithinContent;
          return this.internalScan();
        }
        return this.finish(offset, TokenType.Unknown);
      }

      case State.AfterAttributeName:
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        if (this.advanceIfChar(EQS)) {
          this.state = State.BeforeAttributeValue;
          return this.finish(offset, TokenType.DelimiterAssign);
        }
        this.state = State.WithinTag;
        return this.internalScan();

      case State.BeforeAttributeValue:
        if (this.skipWhitespace()) return this.finish(offset, TokenType.Whitespace);
        if (this.hasNextAttributeValue()) {
          this.state = State.WithinTag;
          return this.finish(offset, TokenType.AttributeValue);
        }
        this.state = State.WithinTag;
        return this.internalScan();
    }
    return this.finish(offset, TokenType.Unknown);
  }
}
