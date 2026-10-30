// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/fault/Makefault.java by the java2ts converter (see tools/java2ts).
import { FaultVersion } from "./FaultVersion.js";
import { MakefaultCode } from "./MakefaultCode.js";
import { MakefaultDetail } from "./MakefaultDetail.js";
import { MakefaultReason } from "./MakefaultReason.js";
import { Mediator } from "../../Mediator.js";
import { STNode } from "../../../../stNode.js";

export class Makefault extends Mediator {
  code?: MakefaultCode;

  reason?: MakefaultReason;

  node?: STNode;

  role?: STNode;

  detail?: MakefaultDetail;

  version?: FaultVersion;

  response?: boolean;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Fault");

  }

  getCode(): MakefaultCode {
    return this.code;

  }

  setCode(code: MakefaultCode): void {
    this.code = code;

  }

  getReason(): MakefaultReason {
    return this.reason;

  }

  setReason(reason: MakefaultReason): void {
    this.reason = reason;

  }

  getNode(): STNode {
    return this.node;

  }

  setNode(node: STNode): void {
    this.node = node;

  }

  getRole(): STNode {
    return this.role;

  }

  setRole(role: STNode): void {
    this.role = role;

  }

  getDetail(): MakefaultDetail {
    return this.detail;

  }

  setDetail(detail: MakefaultDetail): void {
    this.detail = detail;

  }

  getVersion(): FaultVersion {
    return this.version;

  }

  setVersion(version: FaultVersion): void {
    this.version = version;

  }

  isResponse(): boolean {
    return this.response;

  }

  setResponse(response: boolean): void {
    this.response = response;

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
