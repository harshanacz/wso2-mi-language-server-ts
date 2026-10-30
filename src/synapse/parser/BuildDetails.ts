// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/BuildDetails.java by the java2ts converter (see tools/java2ts).
import { AdvanceDetails } from "./AdvanceDetails.js";
import { DockerDetails } from "./DockerDetails.js";
import { Node } from "./Node.js";

export class BuildDetails {
  static readonly __fields: string[] = ["advanceDetails", "enableFatCar", "versionedDeployment", "dockerDetails"];

  advanceDetails?: AdvanceDetails;

  enableFatCar?: Node;

  versionedDeployment?: Node;

  dockerDetails?: DockerDetails;

  constructor() {
    this.advanceDetails = new AdvanceDetails();
    this.dockerDetails = new DockerDetails();

  }

  getEnableFatCar(): Node {
    return this.enableFatCar;

  }

  setEnableFatCar(enableFatCar: Node): void {
    this.enableFatCar = enableFatCar;

  }

  getAdvanceDetails(): AdvanceDetails {
    return this.advanceDetails;

  }

  getDockerDetails(): DockerDetails {
    return this.dockerDetails;

  }

  getVersionedDeployment(): Node {
    return this.versionedDeployment;

  }

  setVersionedDeployment(versionedDeployment: Node): void {
    this.versionedDeployment = versionedDeployment;

  }
}
