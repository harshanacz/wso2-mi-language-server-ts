// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/DependenciesDetails.java by the java2ts converter (see tools/java2ts).
import { DependencyDetails } from "./DependencyDetails.js";

export class DependenciesDetails {
  static readonly __fields: string[] = ["connectorDependencies", "integrationProjectDependencies", "otherDependencies"];

  connectorDependencies?: DependencyDetails[];

  integrationProjectDependencies?: DependencyDetails[];

  otherDependencies?: DependencyDetails[];

  constructor() {
    this.connectorDependencies = [];
    this.integrationProjectDependencies = [];
    this.otherDependencies = [];

  }

  getConnectorDependencies(): DependencyDetails[] {
    return this.connectorDependencies;

  }

  addConnectorDependencies(dependencyDetails: DependencyDetails): void {
    this.connectorDependencies.push(dependencyDetails);

  }

  getIntegrationProjectDependencies(): DependencyDetails[] {
    return this.integrationProjectDependencies;

  }

  addIntegrationProjectDependencies(dependencyDetails: DependencyDetails): void {
    this.integrationProjectDependencies.push(dependencyDetails);

  }

  addOtherDependencies(dependencyDetails: DependencyDetails): void {
    this.otherDependencies.push(dependencyDetails);

  }

  getOtherDependencies(): DependencyDetails[] {
    return this.otherDependencies;

  }
}
