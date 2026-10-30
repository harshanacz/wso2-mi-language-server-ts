// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/bam/BamServerProfile.java by the java2ts converter (see tools/java2ts).
import { BamServerProfileStreamConfig } from "./BamServerProfileStreamConfig.js";
import { STNode } from "../../../../stNode.js";

export class BamServerProfile extends STNode {
  static readonly __fields: string[] = ["streamConfig", "name"];

  streamConfig?: BamServerProfileStreamConfig;

  name?: string;

  getStreamConfig(): BamServerProfileStreamConfig {
    return this.streamConfig;

  }

  setStreamConfig(streamConfig: BamServerProfileStreamConfig): void {
    this.streamConfig = streamConfig;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
