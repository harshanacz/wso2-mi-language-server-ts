// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Log.java by the java2ts converter (see tools/java2ts).
import { LogCategory } from "./LogCategory.js";
import { LogLevel } from "./LogLevel.js";
import { Mediator } from "../Mediator.js";
import { MediatorProperty } from "./MediatorProperty.js";

export class Log extends Mediator {
  static readonly __fields: string[] = ["property", "level", "separator", "category", "description", "message", "logFullPayload", "logMessageID", "traceFilter"];

  property?: MediatorProperty[];

  level?: LogLevel;

  separator?: string;

  category?: LogCategory;

  description?: string;

  message?: string;

  logFullPayload: boolean = false;

  logMessageID: boolean = false;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Log");

  }

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }

  getLevel(): LogLevel {
    return this.level;

  }

  setLevel(level: LogLevel): void {
    this.level = level;

  }

  getSeparator(): string {
    return this.separator;

  }

  setSeparator(separator: string): void {
    this.separator = separator;

  }

  getCategory(): LogCategory {
    return this.category;

  }

  setCategory(category: LogCategory): void {
    this.category = category;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getMessage(): string {
    return this.message;

  }

  setMessage(message: string): void {
    this.message = message;

  }

  isLogFullPayload(): boolean {
    return this.logFullPayload;

  }

  setLogFullPayload(logFullPayload: boolean): void {
    this.logFullPayload = logFullPayload;

  }

  isLogMessageID(): boolean {
    return this.logMessageID;

  }

  setLogMessageID(logMessageID: boolean): void {
    this.logMessageID = logMessageID;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
