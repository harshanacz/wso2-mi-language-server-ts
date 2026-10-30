/** java.util.regex Pattern/Matcher over JS RegExp. Java specific syntax in the ported patterns is rare. */
export class Pattern {
  static readonly CASE_INSENSITIVE = 2;
  static readonly MULTILINE = 8;
  static readonly DOTALL = 32;

  private constructor(readonly source: string, readonly flags: number) {}

  static compile(regex: string, flags = 0): Pattern {
    return new Pattern(regex, flags);
  }

  static matches(regex: string, input: string): boolean {
    return Pattern.compile(regex).matcher(input).matches();
  }

  static quote(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  pattern(): string { return this.source; }

  matcher(input: string): Matcher { return new Matcher(this, input); }

  asPredicate(): (s: string) => boolean { return (s) => this.matcher(s).find(); }

  split(input: string): string[] { return input.split(this.jsRegExp("g")); }

  jsRegExp(extra = ""): RegExp {
    let f = extra;
    if (this.flags & Pattern.CASE_INSENSITIVE) f += "i";
    if (this.flags & Pattern.MULTILINE) f += "m";
    if (this.flags & Pattern.DOTALL) f += "s";
    // Java names groups with (?<name>...), same as JS. Possessive quantifiers/atomic groups are not supported.
    return new RegExp(this.source, f);
  }
}

export class Matcher {
  private m: RegExpExecArray | null = null;
  private re: RegExp;
  private lastIndex = 0;

  constructor(private readonly pattern: Pattern, private readonly input: string) {
    this.re = pattern.jsRegExp("g");
  }

  matches(): boolean {
    const re = new RegExp("^(?:" + this.pattern.source + ")$", this.pattern.jsRegExp().flags);
    this.m = re.exec(this.input);
    return this.m !== null;
  }

  lookingAt(): boolean {
    const re = new RegExp("^(?:" + this.pattern.source + ")", this.pattern.jsRegExp().flags);
    this.m = re.exec(this.input);
    return this.m !== null;
  }

  find(): boolean {
    this.re.lastIndex = this.lastIndex;
    this.m = this.re.exec(this.input);
    if (this.m === null) return false;
    this.lastIndex = this.m[0].length === 0 ? this.re.lastIndex + 1 : this.re.lastIndex;
    return true;
  }

  group(g: number | string = 0): string | null {
    if (!this.m) throw new Error("IllegalStateException: No match found");
    if (typeof g === "string") return this.m.groups?.[g] ?? null;
    return this.m[g] ?? null;
  }

  groupCount(): number {
    return new RegExp(this.pattern.source + "|").exec("")!.length - 1;
  }

  start(): number { return this.m!.index; }
  end(): number { return this.m!.index + this.m![0].length; }

  replaceAll(replacement: string): string {
    return this.input.replace(this.pattern.jsRegExp("g"), replacement.replace(/\$(\d)/g, "$$$1"));
  }

  reset(): Matcher { this.lastIndex = 0; this.m = null; return this; }
}
