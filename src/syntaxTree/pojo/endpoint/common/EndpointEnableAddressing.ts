// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointEnableAddressing.java by the java2ts converter (see tools/java2ts).
import { EnableAddressingVersion } from "./EnableAddressingVersion.js";
import { STNode } from "../../../stNode.js";

export class EndpointEnableAddressing extends STNode {
  static readonly __fields: string[] = ["version", "separateListener"];

  version?: EnableAddressingVersion;

  separateListener: boolean = false;

  getVersion(): EnableAddressingVersion {
    return this.version;

  }

  setVersion(version: EnableAddressingVersion): void {
    this.version = version;

  }

  isSeparateListener(): boolean {
    return this.separateListener;

  }

  setSeparateListener(separateListener: boolean): void {
    this.separateListener = separateListener;

  }
}
