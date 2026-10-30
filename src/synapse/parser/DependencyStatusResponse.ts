// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/DependencyStatusResponse.java by the java2ts converter (see tools/java2ts).
import { DependencyDetails } from "./DependencyDetails.js";

export class DependencyStatusResponse {
  static readonly __fields: string[] = ["downloadedDependencies", "pendingDependencies"];

  downloadedDependencies?: DependencyDetails[];

  pendingDependencies?: DependencyDetails[];

  constructor(downloadedDependencies: DependencyDetails[], pendingDependencies: DependencyDetails[]) {
    this.downloadedDependencies = downloadedDependencies;
    this.pendingDependencies = pendingDependencies;

  }
}
