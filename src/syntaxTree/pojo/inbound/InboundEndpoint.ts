// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/inbound/InboundEndpoint.java by the java2ts converter (see tools/java2ts).
import { EnableDisable } from "../api/EnableDisable.js";
import { InboundEndpointParameters } from "./InboundEndpointParameters.js";
import { STNode } from "../../stNode.js";

export class InboundEndpoint extends STNode {
  static readonly __fields: string[] = ["parameters", "typeId", "name", "sequence", "protocol", "onError", "suspend", "clazz", "statistics", "trace", "type"];

  parameters?: InboundEndpointParameters[];

  typeId?: string;

  name?: string;

  sequence?: string;

  protocol?: string;

  onError?: string;

  suspend: boolean = false;

  clazz?: string;

  statistics?: EnableDisable;

  trace?: EnableDisable;

  type?: string;

  getParameters(): InboundEndpointParameters[] {
    return this.parameters;

  }

  setParameters(parameters: InboundEndpointParameters[]): void {
    this.parameters = parameters;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getSequence(): string {
    return this.sequence;

  }

  setSequence(sequence: string): void {
    this.sequence = sequence;

  }

  getProtocol(): string {
    return this.protocol;

  }

  setProtocol(protocol: string): void {
    this.protocol = protocol;

  }

  getOnError(): string {
    return this.onError;

  }

  setOnError(onError: string): void {
    this.onError = onError;

  }

  isSuspend(): boolean {
    return this.suspend;

  }

  setSuspend(suspend: boolean): void {
    this.suspend = suspend;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getStatistics(): EnableDisable {
    return this.statistics;

  }

  setStatistics(statistics: EnableDisable): void {
    this.statistics = statistics;

  }

  getTrace(): EnableDisable {
    return this.trace;

  }

  setTrace(trace: EnableDisable): void {
    this.trace = trace;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getTypeId(): string {
    return this.typeId;

  }

  setTypeId(typeId: string): void {
    this.typeId = typeId;

  }
}
