// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/BreakpointValidity.java by the java2ts converter (see tools/java2ts).

export class BreakpointValidity {
  static readonly __fields: string[] = ["line", "column", "valid", "reason"];

  line: number = 0;

  column?: number;

  valid: boolean = false;

  reason?: string;

  constructor(line: number, column: number, valid: boolean, reason: string) {
    this.line = line;
    this.column = column;
    this.valid = valid;
    this.reason = reason;

  }

  isValid(): boolean {
    return this.valid;

  }
}
