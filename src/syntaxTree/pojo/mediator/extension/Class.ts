// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/Class.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { MediatorProperty } from "../core/MediatorProperty.js";

export class Class extends Mediator {
  property?: MediatorProperty[];

  name?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Class");

  }

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

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
