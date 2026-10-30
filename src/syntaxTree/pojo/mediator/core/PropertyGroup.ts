// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/PropertyGroup.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { Property } from "./Property.js";

export class PropertyGroup extends Mediator {
  property?: Property[];

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Property Group");

  }

  getProperty(): Property[] {
    return this.property;

  }

  setProperty(property: Property[]): void {
    this.property = property;

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
