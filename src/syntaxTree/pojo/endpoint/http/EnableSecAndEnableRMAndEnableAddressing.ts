// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EnableSecAndEnableRMAndEnableAddressing.java by the java2ts converter (see tools/java2ts).
import { EndpointEnableAddressing } from "../common/EndpointEnableAddressing.js";
import { EndpointEnableRM } from "../common/EndpointEnableRM.js";
import { EndpointEnableSec } from "../common/EndpointEnableSec.js";
import { EndpointHttpAuthentication } from "./EndpointHttpAuthentication.js";
import { EndpointMarkForSuspension } from "../common/EndpointMarkForSuspension.js";
import { EndpointRetryConfig } from "../common/EndpointRetryConfig.js";
import { EndpointSuspendOnFailure } from "../common/EndpointSuspendOnFailure.js";
import { EndpointTimeout } from "../common/EndpointTimeout.js";
import { STNode } from "../../../stNode.js";

export class EnableSecAndEnableRMAndEnableAddressing extends STNode {
  static readonly __fields: string[] = ["enableSec", "enableRM", "enableAddressing", "timeout", "suspendOnFailure", "markForSuspension", "authentication", "retryConfig"];

  enableSec?: EndpointEnableSec | undefined;

  enableRM?: EndpointEnableRM | undefined;

  enableAddressing?: EndpointEnableAddressing | undefined;

  timeout?: EndpointTimeout | undefined;

  suspendOnFailure?: EndpointSuspendOnFailure | undefined;

  markForSuspension?: EndpointMarkForSuspension | undefined;

  authentication?: EndpointHttpAuthentication | undefined;

  retryConfig?: EndpointRetryConfig | undefined;

  getEnableSec(): EndpointEnableSec | undefined {
    return this.enableSec;

  }

  setEnableSec(enableSec: EndpointEnableSec | undefined): void {
    this.enableSec = enableSec;

  }

  getEnableRM(): EndpointEnableRM | undefined {
    return this.enableRM;

  }

  setEnableRM(enableRM: EndpointEnableRM | undefined): void {
    this.enableRM = enableRM;

  }

  getEnableAddressing(): EndpointEnableAddressing | undefined {
    return this.enableAddressing;

  }

  setEnableAddressing(enableAddressing: EndpointEnableAddressing | undefined): void {
    this.enableAddressing = enableAddressing;

  }

  getTimeout(): EndpointTimeout | undefined {
    return this.timeout;

  }

  setTimeout(timeout: EndpointTimeout | undefined): void {
    this.timeout = timeout;

  }

  getSuspendOnFailure(): EndpointSuspendOnFailure | undefined {
    return this.suspendOnFailure;

  }

  setSuspendOnFailure(suspendOnFailure: EndpointSuspendOnFailure | undefined): void {
    this.suspendOnFailure = suspendOnFailure;

  }

  getMarkForSuspension(): EndpointMarkForSuspension | undefined {
    return this.markForSuspension;

  }

  setMarkForSuspension(markForSuspension: EndpointMarkForSuspension | undefined): void {
    this.markForSuspension = markForSuspension;

  }

  getAuthentication(): EndpointHttpAuthentication | undefined {
    return this.authentication;

  }

  setAuthentication(authentication: EndpointHttpAuthentication | undefined): void {
    this.authentication = authentication;

  }

  getRetryConfig(): EndpointRetryConfig | undefined {
    return this.retryConfig;

  }

  setRetryConfig(retryConfig: EndpointRetryConfig | undefined): void {
    this.retryConfig = retryConfig;

  }
}
