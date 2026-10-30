// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/DefaultEndpoint.java by the java2ts converter (see tools/java2ts).
import { format } from "../../javaCompat.js";
import { EndpointEnableAddressing } from "./common/EndpointEnableAddressing.js";
import { EndpointEnableRM } from "./common/EndpointEnableRM.js";
import { EndpointEnableSec } from "./common/EndpointEnableSec.js";
import { EndpointMarkForSuspension } from "./common/EndpointMarkForSuspension.js";
import { EndpointSuspendOnFailure } from "./common/EndpointSuspendOnFailure.js";
import { EndpointTimeout } from "./common/EndpointTimeout.js";
import { Format } from "./Format.js";
import { Optimize } from "./Optimize.js";
import { STNode } from "../../stNode.js";

export class DefaultEndpoint extends STNode {
  enableSec?: EndpointEnableSec;

  enableRM?: EndpointEnableRM;

  enableAddressing?: EndpointEnableAddressing;

  timeout?: EndpointTimeout;

  suspendOnFailure?: EndpointSuspendOnFailure;

  markForSuspension?: EndpointMarkForSuspension;

  format?: Format;

  optimize?: Optimize;

  encoding?: string;

  statistics?: string;

  trace?: string;

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
