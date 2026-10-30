// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/wsdl/WSDLEndpoint.java by the java2ts converter (see tools/java2ts).
import { format } from "../../../javaCompat.js";
import { DescriptionType } from "../../misc/wsdl20/DescriptionType.js";
import { EnableDisable } from "../../api/EnableDisable.js";
import { EndpointEnableAddressing } from "../common/EndpointEnableAddressing.js";
import { EndpointEnableRM } from "../common/EndpointEnableRM.js";
import { EndpointEnableSec } from "../common/EndpointEnableSec.js";
import { EndpointMarkForSuspension } from "../common/EndpointMarkForSuspension.js";
import { EndpointSuspendOnFailure } from "../common/EndpointSuspendOnFailure.js";
import { EndpointTimeout } from "../common/EndpointTimeout.js";
import { Format } from "../Format.js";
import { Optimize } from "../Optimize.js";
import { STNode } from "../../../stNode.js";
import { TDefinitions } from "../../misc/wsdl11/TDefinitions.js";

export class WSDLEndpoint extends STNode {
  static readonly __fields: string[] = ["definitions", "description", "enableSec", "enableRM", "enableAddressing", "timeout", "suspendOnFailure", "markForSuspension", "uri", "service", "port", "format", "optimize", "encoding", "statistics", "trace"];

  definitions?: TDefinitions;

  description?: DescriptionType;

  enableSec?: EndpointEnableSec;

  enableRM?: EndpointEnableRM;

  enableAddressing?: EndpointEnableAddressing;

  timeout?: EndpointTimeout;

  suspendOnFailure?: EndpointSuspendOnFailure;

  markForSuspension?: EndpointMarkForSuspension;

  uri?: string;

  service?: string;

  port?: string;

  format?: Format;

  optimize?: Optimize;

  encoding?: string;

  statistics?: EnableDisable;

  trace?: EnableDisable;

  getDefinitions(): TDefinitions {
    return this.definitions;

  }

  setDefinitions(definitions: TDefinitions): void {
    this.definitions = definitions;

  }

  getDescription(): DescriptionType {
    return this.description;

  }

  setDescription(description: DescriptionType): void {
    this.description = description;

  }

  getEnableSec(): EndpointEnableSec {
    return this.enableSec;

  }

  setEnableSec(enableSec: EndpointEnableSec): void {
    this.enableSec = enableSec;

  }

  getEnableRM(): EndpointEnableRM {
    return this.enableRM;

  }

  setEnableRM(enableRM: EndpointEnableRM): void {
    this.enableRM = enableRM;

  }

  getEnableAddressing(): EndpointEnableAddressing {
    return this.enableAddressing;

  }

  setEnableAddressing(enableAddressing: EndpointEnableAddressing): void {
    this.enableAddressing = enableAddressing;

  }

  getTimeout(): EndpointTimeout {
    return this.timeout;

  }

  setTimeout(timeout: EndpointTimeout): void {
    this.timeout = timeout;

  }

  getSuspendOnFailure(): EndpointSuspendOnFailure {
    return this.suspendOnFailure;

  }

  setSuspendOnFailure(suspendOnFailure: EndpointSuspendOnFailure): void {
    this.suspendOnFailure = suspendOnFailure;

  }

  getMarkForSuspension(): EndpointMarkForSuspension {
    return this.markForSuspension;

  }

  setMarkForSuspension(markForSuspension: EndpointMarkForSuspension): void {
    this.markForSuspension = markForSuspension;

  }

  getUri(): string {
    return this.uri;

  }

  setUri(uri: string): void {
    this.uri = uri;

  }

  getService(): string {
    return this.service;

  }

  setService(service: string): void {
    this.service = service;

  }

  getPort(): string {
    return this.port;

  }

  setPort(port: string): void {
    this.port = port;

  }

  getFormat(): Format {
    return this.format;

  }

  setFormat(format: Format): void {
    this.format = format;

  }

  getOptimize(): Optimize {
    return this.optimize;

  }

  setOptimize(optimize: Optimize): void {
    this.optimize = optimize;

  }

  getEncoding(): string {
    return this.encoding;

  }

  setEncoding(encoding: string): void {
    this.encoding = encoding;

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
}
