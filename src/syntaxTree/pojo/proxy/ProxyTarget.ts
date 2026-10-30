// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/ProxyTarget.java by the java2ts converter (see tools/java2ts).
import { NamedEndpoint } from "../endpoint/NamedEndpoint.js";
import { STNode } from "../../stNode.js";
import { Sequence } from "../misc/common/Sequence.js";

export class ProxyTarget extends STNode {
  inSequence?: Sequence;

  outSequence?: Sequence;

  faultSequence?: Sequence;

  endpoint?: NamedEndpoint;

  inSequenceAttribute?: string;

  outSequenceAttribute?: string;

  faultSequenceAttribute?: string;

  endpointAttribute?: string;

  getInSequence(): Sequence {
    return this.inSequence;

  }

  setInSequence(inSequence: Sequence): void {
    this.inSequence = inSequence;

  }

  getOutSequence(): Sequence {
    return this.outSequence;

  }

  setOutSequence(outSequence: Sequence): void {
    this.outSequence = outSequence;

  }

  getFaultSequence(): Sequence {
    return this.faultSequence;

  }

  setFaultSequence(faultSequence: Sequence): void {
    this.faultSequence = faultSequence;

  }

  getEndpoint(): NamedEndpoint {
    return this.endpoint;

  }

  setEndpoint(endpoint: NamedEndpoint): void {
    this.endpoint = endpoint;

  }

  getInSequenceAttribute(): string {
    return this.inSequenceAttribute;

  }

  setInSequenceAttribute(inSequenceAttribute: string): void {
    this.inSequenceAttribute = inSequenceAttribute;

  }

  getOutSequenceAttribute(): string {
    return this.outSequenceAttribute;

  }

  setOutSequenceAttribute(outSequenceAttribute: string): void {
    this.outSequenceAttribute = outSequenceAttribute;

  }

  getFaultSequenceAttribute(): string {
    return this.faultSequenceAttribute;

  }

  setFaultSequenceAttribute(faultSequenceAttribute: string): void {
    this.faultSequenceAttribute = faultSequenceAttribute;

  }

  getEndpointAttribute(): string {
    return this.endpointAttribute;

  }

  setEndpointAttribute(endpointAttribute: string): void {
    this.endpointAttribute = endpointAttribute;

  }
}
