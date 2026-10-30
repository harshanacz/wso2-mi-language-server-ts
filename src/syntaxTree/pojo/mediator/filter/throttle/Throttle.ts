// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/throttle/Throttle.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { Sequence } from "../../../misc/common/Sequence.js";
import { ThrottlePolicies } from "./ThrottlePolicies.js";

export class Throttle extends Mediator {
  static readonly __fields: string[] = ["policies", "onAccept", "onReject", "id", "onAcceptAttribute", "onRejectAttribute", "description", "traceFilter"];

  policies?: ThrottlePolicies;

  onAccept?: Sequence;

  onReject?: Sequence;

  id?: string;

  onAcceptAttribute?: string;

  onRejectAttribute?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Throttle");

  }

  getPolicies(): ThrottlePolicies {
    return this.policies;

  }

  setPolicies(policies: ThrottlePolicies): void {
    this.policies = policies;

  }

  getOnAccept(): Sequence {
    return this.onAccept;

  }

  setOnAccept(onAccept: Sequence): void {
    this.onAccept = onAccept;

  }

  getOnReject(): Sequence {
    return this.onReject;

  }

  setOnReject(onReject: Sequence): void {
    this.onReject = onReject;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getOnAcceptAttribute(): string {
    return this.onAcceptAttribute;

  }

  setOnAcceptAttribute(onAcceptAttribute: string): void {
    this.onAcceptAttribute = onAcceptAttribute;

  }

  getOnRejectAttribute(): string {
    return this.onRejectAttribute;

  }

  setOnRejectAttribute(onRejectAttribute: string): void {
    this.onRejectAttribute = onRejectAttribute;

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
