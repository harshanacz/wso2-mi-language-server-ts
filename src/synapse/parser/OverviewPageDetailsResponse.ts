// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/OverviewPageDetailsResponse.java by the java2ts converter (see tools/java2ts).
import { BuildDetails } from "./BuildDetails.js";
import { ConfigDetails } from "./ConfigDetails.js";
import { DependenciesDetails } from "./DependenciesDetails.js";
import { PrimaryDetails } from "./PrimaryDetails.js";
import { UnitTestDetails } from "./UnitTestDetails.js";

export class OverviewPageDetailsResponse {
  static readonly __fields: string[] = ["primaryDetails", "buildDetails", "dependencies", "unitTest", "configurables"];

  primaryDetails?: PrimaryDetails;

  buildDetails?: BuildDetails;

  dependencies?: DependenciesDetails;

  unitTest?: UnitTestDetails;

  configurables?: ConfigDetails[];

  constructor() {
    this.primaryDetails = new PrimaryDetails();
    this.buildDetails = new BuildDetails();
    this.dependencies = new DependenciesDetails();
    this.unitTest = new UnitTestDetails();
    this.configurables = [];

  }

  getPrimaryDetails(): PrimaryDetails {
    return this.primaryDetails;

  }

  getBuildDetails(): BuildDetails {
    return this.buildDetails;

  }

  getDependenciesDetails(): DependenciesDetails {
    return this.dependencies;

  }

  getUnitTestDetails(): UnitTestDetails {
    return this.unitTest;

  }

  getConfigurables(): ConfigDetails[] {
    return this.configurables;

  }

  setConfig(config: ConfigDetails): void {
    this.configurables.push(config);

  }

  setConfigurables(configurables: ConfigDetails[]): void {
    this.configurables = configurables;

  }
}
