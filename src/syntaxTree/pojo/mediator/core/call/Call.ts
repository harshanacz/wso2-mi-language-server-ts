// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/call/Call.java by the java2ts converter (see tools/java2ts).
import { CallSource } from "./CallSource.js";
import { CallTarget } from "./CallTarget.js";
import { Mediator } from "../../Mediator.js";
import { NamedEndpoint } from "../../../endpoint/NamedEndpoint.js";

export class Call extends Mediator {
  source?: CallSource;

  target?: CallTarget;

  endpoint?: NamedEndpoint;

  blocking: boolean = false;

  description?: string;

  initAxis2ClientOptions: boolean = false;

  inlineEndpointXml?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Call Endpoint");

  }

  getSource(): CallSource {
    return this.source;

  }

  setSource(source: CallSource): void {
    this.source = source;

  }

  getTarget(): CallTarget {
    return this.target;

  }

  setTarget(target: CallTarget): void {
    this.target = target;

  }

  getEndpoint(): NamedEndpoint {
    return this.endpoint;

  }

  setEndpoint(endpoint: NamedEndpoint): void {
    this.endpoint = endpoint;

  }

  isBlocking(): boolean {
    return this.blocking;

  }

  setBlocking(blocking: boolean): void {
    this.blocking = blocking;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getInitAxis2ClientOptions(): boolean {
    return this.initAxis2ClientOptions;

  }

  setInitAxis2ClientOptions(initAxis2ClientOptions: boolean): void {
    this.initAxis2ClientOptions = initAxis2ClientOptions;

  }

  getInlineEndpointXml(): string {
    return this.inlineEndpointXml;

  }

  setInlineEndpointXml(inlineEndpointXml: string): void {
    this.inlineEndpointXml = inlineEndpointXml;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
