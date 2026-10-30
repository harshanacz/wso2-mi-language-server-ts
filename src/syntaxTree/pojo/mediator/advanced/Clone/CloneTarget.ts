// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/Clone/CloneTarget.java by the java2ts converter (see tools/java2ts).
import { NamedEndpoint } from "../../../endpoint/NamedEndpoint.js";
import { STNode } from "../../../../stNode.js";
import { Sequence } from "../../../misc/common/Sequence.js";

export class CloneTarget extends STNode {
  static readonly __fields: string[] = ["sequence", "endpoint", "to", "soapAction", "sequenceAttribute", "endpointAttribute"];

  sequence?: Sequence;

  endpoint?: NamedEndpoint;

  to?: string;

  soapAction?: string;

  sequenceAttribute?: string;

  endpointAttribute?: string;

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
}
