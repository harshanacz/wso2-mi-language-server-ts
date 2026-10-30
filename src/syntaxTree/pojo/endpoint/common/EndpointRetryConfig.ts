// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointRetryConfig.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointRetryConfig {
  enabledErrorCodes?: STNode;

  disabledErrorCodes?: STNode;

  getEnabledErrorCodes(): STNode {
    return this.enabledErrorCodes;

  }

  setEnabledErrorCodes(enabledErrorCodes: STNode): void {
    this.enabledErrorCodes = enabledErrorCodes;

  }

  getDisabledErrorCodes(): STNode {
    return this.disabledErrorCodes;

  }

  setDisabledErrorCodes(disabledErrorCodes: STNode): void {
    this.disabledErrorCodes = disabledErrorCodes;

  }
}
