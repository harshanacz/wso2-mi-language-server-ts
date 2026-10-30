// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/callout/Callout.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { SourceOrTargetOrConfiguration } from "./SourceOrTargetOrConfiguration.js";

export class Callout extends Mediator {
  static readonly __fields: string[] = ["sourceOrTargetOrConfiguration", "serviceURL", "action", "initAxis2ClientOptions", "endpointKey", "description", "traceFilter"];

  sourceOrTargetOrConfiguration?: SourceOrTargetOrConfiguration;

  serviceURL?: string;

  action?: string;

  initAxis2ClientOptions: boolean = false;

  endpointKey?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Callout");

  }

  getSourceOrTargetOrConfiguration(): SourceOrTargetOrConfiguration {
    return this.sourceOrTargetOrConfiguration;

  }

  setSourceOrTargetOrConfiguration(sourceOrTargetOrConfiguration: SourceOrTargetOrConfiguration): void {
    this.sourceOrTargetOrConfiguration = sourceOrTargetOrConfiguration;

  }

  getServiceURL(): string {
    return this.serviceURL;

  }

  setServiceURL(serviceURL: string): void {
    this.serviceURL = serviceURL;

  }

  getAction(): string {
    return this.action;

  }

  setAction(action: string): void {
    this.action = action;

  }

  isInitAxis2ClientOptions(): boolean {
    return this.initAxis2ClientOptions;

  }

  setInitAxis2ClientOptions(initAxis2ClientOptions: boolean): void {
    this.initAxis2ClientOptions = initAxis2ClientOptions;

  }

  getEndpointKey(): string {
    return this.endpointKey;

  }

  setEndpointKey(endpointKey: string): void {
    this.endpointKey = endpointKey;

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
