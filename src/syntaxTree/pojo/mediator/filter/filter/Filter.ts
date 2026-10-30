// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/filter/Filter.java by the java2ts converter (see tools/java2ts).
import { FilterElse } from "./FilterElse.js";
import { FilterThen } from "./FilterThen.js";
import { Mediator } from "../../Mediator.js";

export class Filter extends Mediator {
  then?: FilterThen;

  else_?: FilterElse;

  source?: string;

  regex?: string;

  xpath?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("If Else");

  }

  getThen(): FilterThen {
    return this.then;

  }

  setThen(then: FilterThen): void {
    this.then = then;

  }

  getElse_(): FilterElse {
    return this.else_;

  }

  setElse_(else_: FilterElse): void {
    this.else_ = else_;

  }

  getSource(): string {
    return this.source;

  }

  setSource(source: string): void {
    this.source = source;

  }

  getRegex(): string {
    return this.regex;

  }

  setRegex(regex: string): void {
    this.regex = regex;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

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
