// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/bam/Bam.java by the java2ts converter (see tools/java2ts).
import { BamServerProfile } from "./BamServerProfile.js";
import { Mediator } from "../../Mediator.js";

export class Bam extends Mediator {
  static readonly __fields: string[] = ["serverProfile", "description", "traceFilter"];

  serverProfile?: BamServerProfile;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Bam");

  }

  getServerProfile(): BamServerProfile {
    return this.serverProfile;

  }

  setServerProfile(serverProfile: BamServerProfile): void {
    this.serverProfile = serverProfile;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
