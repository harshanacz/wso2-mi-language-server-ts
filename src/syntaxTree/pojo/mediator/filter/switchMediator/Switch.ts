// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/switchMediator/Switch.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { SwitchCase } from "./SwitchCase.js";
import { SwitchDefault } from "./SwitchDefault.js";

export class Switch extends Mediator {
  _case?: SwitchCase[];

  _default?: SwitchDefault;

  source?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Switch");

  }

  get_case(): SwitchCase[] {
    return this._case;

  }

  set_case(_case: SwitchCase[]): void {
    this._case = _case;

  }

  get_default(): SwitchDefault {
    return this._default;

  }

  set_default(_default: SwitchDefault): void {
    this._default = _default;

  }

  getSource(): string {
    return this.source;

  }

  setSource(source: string): void {
    this.source = source;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
