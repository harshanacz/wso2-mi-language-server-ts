// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointMarkForSuspension.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointMarkForSuspension extends STNode {
  errorCodes?: STNode;

  retriesBeforeSuspension?: STNode;

  retryDelay?: STNode;

  getErrorCodes(): STNode {
    return this.errorCodes;

  }

  setErrorCodes(errorCodes: STNode): void {
    this.errorCodes = errorCodes;

  }

  getRetriesBeforeSuspension(): STNode {
    return this.retriesBeforeSuspension;

  }

  setRetriesBeforeSuspension(retriesBeforeSuspension: STNode): void {
    this.retriesBeforeSuspension = retriesBeforeSuspension;

  }

  getRetryDelay(): STNode {
    return this.retryDelay;

  }

  setRetryDelay(retryDelay: STNode): void {
    this.retryDelay = retryDelay;

  }
}
