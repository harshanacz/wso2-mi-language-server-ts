// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/targets/Target.java by the java2ts converter (see tools/java2ts).
import { NamedEndpoint } from "../../endpoint/NamedEndpoint.js";
import { STNode } from "../../../stNode.js";
import { Sequence } from "../common/Sequence.js";

export class Target extends STNode {
  sequence?: Sequence;

  endpoint?: NamedEndpoint;

  sequenceAttribute?: string;

  endpointAttribute?: string;

  to?: string;

  soapAction?: string;

  getSequence(): Sequence {
    return this.sequence;

  }

  setSequence(sequence: Sequence): void {
    this.sequence = sequence;

  }

  getEndpoint(): NamedEndpoint {
    return this.endpoint;

  }

  setEndpoint(endpoint: NamedEndpoint): void {
    this.endpoint = endpoint;

  }

  getSequenceAttribute(): string {
    return this.sequenceAttribute;

  }

  setSequenceAttribute(sequenceAttribute: string): void {
    this.sequenceAttribute = sequenceAttribute;

  }

  getEndpointAttribute(): string {
    return this.endpointAttribute;

  }

  setEndpointAttribute(endpointAttribute: string): void {
    this.endpointAttribute = endpointAttribute;

  }

  getTo(): string {
    return this.to;

  }

  setTo(to: string): void {
    this.to = to;

  }

  getSoapAction(): string {
    return this.soapAction;

  }

  setSoapAction(soapAction: string): void {
    this.soapAction = soapAction;

  }
}
