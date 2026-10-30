// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/LogCategory.java by the java2ts converter (see tools/java2ts).

export class LogCategory {


  static readonly INFO = new LogCategory("INFO", 0);
  static readonly FATAL = new LogCategory("FATAL", 1);
  static readonly ERROR = new LogCategory("ERROR", 2);
  static readonly WARN = new LogCategory("WARN", 3);
  static readonly DEBUG = new LogCategory("DEBUG", 4);
  static readonly TRACE = new LogCategory("TRACE", 5);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): LogCategory[] { return [LogCategory.INFO, LogCategory.FATAL, LogCategory.ERROR, LogCategory.WARN, LogCategory.DEBUG, LogCategory.TRACE]; }
  static valueOf(name: string): LogCategory {
    const v = LogCategory.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
