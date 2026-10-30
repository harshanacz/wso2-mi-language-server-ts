// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/callout/SourceOrTargetOrConfiguration.java by the java2ts converter (see tools/java2ts).
import { CalloutConfiguration } from "./CalloutConfiguration.js";
import { CalloutEnableSec } from "./CalloutEnableSec.js";
import { CalloutSource } from "./CalloutSource.js";
import { CalloutTarget } from "./CalloutTarget.js";
import { STNode } from "../../../../stNode.js";

export class SourceOrTargetOrConfiguration extends STNode {
  static readonly __fields: string[] = ["source", "target", "configuration", "enableSec"];

  source?: CalloutSource | undefined;

  target?: CalloutTarget | undefined;

  configuration?: CalloutConfiguration | undefined;

  enableSec?: CalloutEnableSec | undefined;

  constructor() {
    super();
    this.source = undefined;
    this.target = undefined;
    this.configuration = undefined;
    this.enableSec = undefined;


  }

  getSource(): CalloutSource | undefined {
    return this.source;

  }

  setSource(source: CalloutSource | undefined): void {
    this.source = source;

  }

  getTarget(): CalloutTarget | undefined {
    return this.target;

  }

  setTarget(target: CalloutTarget | undefined): void {
    this.target = target;

  }

  getConfiguration(): CalloutConfiguration | undefined {
    return this.configuration;

  }

  setConfiguration(configuration: CalloutConfiguration | undefined): void {
    this.configuration = configuration;

  }

  getEnableSec(): CalloutEnableSec | undefined {
    return this.enableSec;

  }

  setEnableSec(enableSec: CalloutEnableSec | undefined): void {
    this.enableSec = enableSec;

  }
}
