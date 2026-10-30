// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/Jsontransform.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { MediatorProperty } from "../core/MediatorProperty.js";

export class Jsontransform extends Mediator {
  static readonly __fields: string[] = ["property", "schema", "description", "traceFilter"];

  property?: MediatorProperty[];

  schema?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Json Transform");

  }

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }

  getSchema(): string {
    return this.schema;

  }

  setSchema(schema: string): void {
    this.schema = schema;

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
