// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/entitlement/EntitlementService.java by the java2ts converter (see tools/java2ts).
import { EntitlementServiceClient } from "./EntitlementServiceClient.js";
import { Mediator } from "../../Mediator.js";
import { Sequence } from "../../../misc/common/Sequence.js";

export class EntitlementService extends Mediator {
  static readonly __fields: string[] = ["onReject", "onAccept", "advice", "obligations", "remoteServiceUrl", "remoteServiceUserName", "remoteServicePassword", "callbackClass", "client", "thriftHost", "thriftPort", "onRejectAttribute", "onAcceptAttribute", "adviceAttribute", "obligationsAttribute", "description", "traceFilter"];

  onReject?: Sequence;

  onAccept?: Sequence;

  advice?: Sequence;

  obligations?: Sequence;

  remoteServiceUrl?: string;

  remoteServiceUserName?: string;

  remoteServicePassword?: string;

  callbackClass?: string;

  client?: EntitlementServiceClient;

  thriftHost?: string;

  thriftPort?: string;

  onRejectAttribute?: string;

  onAcceptAttribute?: string;

  adviceAttribute?: string;

  obligationsAttribute?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Entitlement Service");

  }

  getOnReject(): Sequence {
    return this.onReject;

  }

  setOnReject(onReject: Sequence): void {
    this.onReject = onReject;

  }

  getOnAccept(): Sequence {
    return this.onAccept;

  }

  setOnAccept(onAccept: Sequence): void {
    this.onAccept = onAccept;

  }

  getAdvice(): Sequence {
    return this.advice;

  }

  setAdvice(advice: Sequence): void {
    this.advice = advice;

  }

  getObligations(): Sequence {
    return this.obligations;

  }

  setObligations(obligations: Sequence): void {
    this.obligations = obligations;

  }

  getRemoteServiceUrl(): string {
    return this.remoteServiceUrl;

  }

  setRemoteServiceUrl(remoteServiceUrl: string): void {
    this.remoteServiceUrl = remoteServiceUrl;

  }

  getRemoteServiceUserName(): string {
    return this.remoteServiceUserName;

  }

  setRemoteServiceUserName(remoteServiceUserName: string): void {
    this.remoteServiceUserName = remoteServiceUserName;

  }

  getRemoteServicePassword(): string {
    return this.remoteServicePassword;

  }

  setRemoteServicePassword(remoteServicePassword: string): void {
    this.remoteServicePassword = remoteServicePassword;

  }

  getCallbackClass(): string {
    return this.callbackClass;

  }

  setCallbackClass(callbackClass: string): void {
    this.callbackClass = callbackClass;

  }

  getClient(): EntitlementServiceClient {
    return this.client;

  }

  setClient(client: EntitlementServiceClient): void {
    this.client = client;

  }

  getThriftHost(): string {
    return this.thriftHost;

  }

  setThriftHost(thriftHost: string): void {
    this.thriftHost = thriftHost;

  }

  getThriftPort(): string {
    return this.thriftPort;

  }

  setThriftPort(thriftPort: string): void {
    this.thriftPort = thriftPort;

  }

  getOnRejectAttribute(): string {
    return this.onRejectAttribute;

  }

  setOnRejectAttribute(onRejectAttribute: string): void {
    this.onRejectAttribute = onRejectAttribute;

  }

  getOnAcceptAttribute(): string {
    return this.onAcceptAttribute;

  }

  setOnAcceptAttribute(onAcceptAttribute: string): void {
    this.onAcceptAttribute = onAcceptAttribute;

  }

  getAdviceAttribute(): string {
    return this.adviceAttribute;

  }

  setAdviceAttribute(adviceAttribute: string): void {
    this.adviceAttribute = adviceAttribute;

  }

  getObligationsAttribute(): string {
    return this.obligationsAttribute;

  }

  setObligationsAttribute(obligationsAttribute: string): void {
    this.obligationsAttribute = obligationsAttribute;

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
