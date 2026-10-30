// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/validate/Validate.java by the java2ts converter (see tools/java2ts).
import { Feature } from "../Feature.js";
import { Mediator } from "../../Mediator.js";
import { ValidateOnFail } from "./ValidateOnFail.js";
import { ValidateProperty } from "./ValidateProperty.js";
import { ValidateResource } from "./ValidateResource.js";
import { ValidateSchema } from "./ValidateSchema.js";

export class Validate extends Mediator {
  static readonly __fields: string[] = ["property", "schema", "onFail", "feature", "resource", "cacheSchema", "source", "description", "traceFilter"];

  property?: ValidateProperty[];

  schema?: ValidateSchema[];

  onFail?: ValidateOnFail;

  feature?: Feature[];

  resource?: ValidateResource[];

  cacheSchema: boolean = false;

  source?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Validate");

  }

  getProperty(): ValidateProperty[] {
    return this.property;

  }

  setProperty(property: ValidateProperty[]): void {
    this.property = property;

  }

  getSchema(): ValidateSchema[] {
    return this.schema;

  }

  setSchema(schema: ValidateSchema[]): void {
    this.schema = schema;

  }

  getOnFail(): ValidateOnFail {
    return this.onFail;

  }

  setOnFail(onFail: ValidateOnFail): void {
    this.onFail = onFail;

  }

  getFeature(): Feature[] {
    return this.feature;

  }

  setFeature(feature: Feature[]): void {
    this.feature = feature;

  }

  getResource(): ValidateResource[] {
    return this.resource;

  }

  setResource(resource: ValidateResource[]): void {
    this.resource = resource;

  }

  isCacheSchema(): boolean {
    return this.cacheSchema;

  }

  setCacheSchema(cacheSchema: boolean): void {
    this.cacheSchema = cacheSchema;

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
