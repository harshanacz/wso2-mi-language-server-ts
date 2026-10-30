// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/Script.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { ScriptLanguage } from "./ScriptLanguage.js";

export class Script extends Mediator {
  static readonly __fields: string[] = ["content", "language", "key", "include", "function", "description", "traceFilter"];

  content?: any[];

  language?: ScriptLanguage;

  key?: string;

  include?: string[];

  function?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Script");

  }

  getContent(): any[] {
    return this.content;

  }

  setContent(content: any[]): void {
    this.content = content;

  }

  getLanguage(): ScriptLanguage {
    return this.language;

  }

  setLanguage(language: ScriptLanguage): void {
    this.language = language;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getFunction(): string {
    return this.function;

  }

  setFunction(function_: string): void {
    this.function = function_;

  }

  getInclude(): string[] {
    return this.include;

  }

  setInclude(include: string[]): void {
    this.include = include;

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
