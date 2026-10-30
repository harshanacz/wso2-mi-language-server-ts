// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/LogLevel.java by the java2ts converter (see tools/java2ts).

export class LogLevel {
  toUpperCase(): string {
    return this.name().toUpperCase();

  }

  static readonly simple = new LogLevel("simple", 0);
  static readonly headers = new LogLevel("headers", 1);
  static readonly full = new LogLevel("full", 2);
  static readonly custom = new LogLevel("custom", 3);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): LogLevel[] { return [LogLevel.simple, LogLevel.headers, LogLevel.full, LogLevel.custom]; }
  static valueOf(name: string): LogLevel {
    const v = LogLevel.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
