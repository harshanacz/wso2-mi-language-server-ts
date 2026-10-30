// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointSuspendOnFailure.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointSuspendOnFailure extends STNode {
  errorCodes?: STNode;

  initialDuration?: STNode;

  progressionFactor?: STNode;

  maximumDuration?: STNode;

  getErrorCodes(): STNode {
    return this.errorCodes;

  }

  setErrorCodes(errorCodes: STNode): void {
    this.errorCodes = errorCodes;

  }

  getInitialDuration(): STNode {
    return this.initialDuration;

  }

  setInitialDuration(initialDuration: STNode): void {
    this.initialDuration = initialDuration;

  }

  getProgressionFactor(): STNode {
    return this.progressionFactor;

  }

  setProgressionFactor(progressionFactor: STNode): void {
    this.progressionFactor = progressionFactor;

  }

  getMaximumDuration(): STNode {
    return this.maximumDuration;

  }

  setMaximumDuration(maximumDuration: STNode): void {
    this.maximumDuration = maximumDuration;

  }
}
