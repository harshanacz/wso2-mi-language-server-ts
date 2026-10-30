// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttp.java by the java2ts converter (see tools/java2ts).
import { EnableSecAndEnableRMAndEnableAddressing } from "./EnableSecAndEnableRMAndEnableAddressing.js";
import { HttpMethod } from "./HttpMethod.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttp extends STNode {
  enableSecAndEnableRMAndEnableAddressing?: EnableSecAndEnableRMAndEnableAddressing;

  uriTemplate?: string;

  method?: HttpMethod;

  statistics?: string;

  trace?: string;

  getEnableSecAndEnableRMAndEnableAddressing(): EnableSecAndEnableRMAndEnableAddressing {
    return this.enableSecAndEnableRMAndEnableAddressing;

  }

  setEnableSecAndEnableRMAndEnableAddressing(enableSecAndEnableRMAndEnableAddressing: EnableSecAndEnableRMAndEnableAddressing): void {
    this.enableSecAndEnableRMAndEnableAddressing = enableSecAndEnableRMAndEnableAddressing;

  }

  getUriTemplate(): string {
    return this.uriTemplate;

  }

  setUriTemplate(uriTemplate: string): void {
    this.uriTemplate = uriTemplate;

  }

  getMethod(): HttpMethod {
    return this.method;

  }

  setMethod(method: HttpMethod): void {
    this.method = method;

  }

  getStatistics(): string {
    return this.statistics;

  }

  setStatistics(statistics: string): void {
    this.statistics = statistics;

  }

  getTrace(): string {
    return this.trace;

  }

  setTrace(trace: string): void {
    this.trace = trace;

  }
}
