// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/Send.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { NamedEndpoint } from "../../endpoint/NamedEndpoint.js";

export class Send extends Mediator {
  static readonly __fields: string[] = ["endpoint", "receive", "buildmessage", "description", "inlineEndpointXml", "traceFilter"];

  endpoint?: NamedEndpoint;

  receive?: string;

  buildmessage: boolean = false;

  description?: string;

  inlineEndpointXml?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Send");

  }

  getEndpoint(): NamedEndpoint {
    return this.endpoint;

  }

  setEndpoint(endpoint: NamedEndpoint): void {
    this.endpoint = endpoint;

  }

  getReceive(): string {
    return this.receive;

  }

  setReceive(receive: string): void {
    this.receive = receive;

  }

  isBuildmessage(): boolean {
    return this.buildmessage;

  }

  setBuildmessage(buildmessage: boolean): void {
    this.buildmessage = buildmessage;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

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
