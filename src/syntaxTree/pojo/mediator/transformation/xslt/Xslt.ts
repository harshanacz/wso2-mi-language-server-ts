// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/xslt/Xslt.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { MediatorProperty } from "../../core/MediatorProperty.js";
import { XsltFeature } from "./XsltFeature.js";
import { XsltResource } from "./XsltResource.js";

export class Xslt extends Mediator {
  static readonly __fields: string[] = ["property", "feature", "resource", "key", "source", "description", "traceFilter"];

  property?: MediatorProperty[];

  feature?: XsltFeature[];

  resource?: XsltResource[];

  key?: string;

  source?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("XSLT");

  }

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }

  getFeature(): XsltFeature[] {
    return this.feature;

  }

  setFeature(feature: XsltFeature[]): void {
    this.feature = feature;

  }

  getResource(): XsltResource[] {
    return this.resource;

  }

  setResource(resource: XsltResource[]): void {
    this.resource = resource;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

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
