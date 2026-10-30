// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/DockerDetails.java by the java2ts converter (see tools/java2ts).
import { equals, jsplit } from "../../syntaxTree/javaCompat.js";
import { Constants } from "./Constants.js";
import { Node } from "./Node.js";

export class DockerDetails {
  static readonly __fields: string[] = ["dockerFileBaseImage", "dockerName", "cipherToolEnable", "keyStoreName", "keyStorePassword", "keyStoreAlias", "keyStoreType", "projectRuntimeVersion", "projectArtifactId", "projectVersion", "updateDockerBaseImage", "_updateDockerName"];

  dockerFileBaseImage?: Node;

  dockerName?: Node;

  cipherToolEnable?: Node;

  keyStoreName?: Node;

  keyStorePassword?: Node;

  keyStoreAlias?: Node;

  keyStoreType?: Node;

  projectRuntimeVersion?: string;

  projectArtifactId?: string;

  projectVersion?: string;

  updateDockerBaseImage: boolean = false;

  _updateDockerName: boolean = false;

  constructor() {

  }

  setDockerFileBaseImage(dockerFileBaseImage: Node): void {
    this.dockerFileBaseImage = dockerFileBaseImage;
    this.updateDockerFileBaseImage();

  }

  setDockerName(dockerName: Node): void {
    this.dockerName = dockerName;
    this.updateDockerName();

  }

  setCipherToolEnable(cipherToolEnable: Node): void {
    this.cipherToolEnable = cipherToolEnable;

  }

  setKeyStoreName(keyStoreName: Node): void {
    this.keyStoreName = keyStoreName;

  }

  setKeyStorePassword(keyStorePassword: Node): void {
    this.keyStorePassword = keyStorePassword;

  }

  setKeyStoreAlias(keyStoreAlias: Node): void {
    this.keyStoreAlias = keyStoreAlias;

  }

  setKeyStoreType(keyStoreType: Node): void {
    this.keyStoreType = keyStoreType;

  }

  setProjectRuntimeVersion(projectRuntimeVersion: string): void {
    this.projectRuntimeVersion = projectRuntimeVersion;
    this.updateDockerFileBaseImage();

  }

  setProjectArtifactId(projectArtifactId: string): void {
    this.projectArtifactId = projectArtifactId;
    this.updateDockerName();

  }

  setProjectVersion(projectVersion: string): void {
    this.projectVersion = projectVersion;
    this.updateDockerName();

  }

  updateDockerFileBaseImage(): void {
    if (!this.updateDockerBaseImage && this.projectRuntimeVersion != null && this.dockerFileBaseImage != null) {
        let values = jsplit(this.dockerFileBaseImage.getValue(), Constants.COLON);
        if (values.length == 2 && equals(values[1].trim(), Constants.PROJECT_RUNTIME_VERSION_CONSTANT)) {
            this.dockerFileBaseImage.setDisplayValue(values[0] + Constants.COLON + this.projectRuntimeVersion);
            this.updateDockerBaseImage = true;
        }
    }

  }

  updateDockerName(): void {
    if (!this._updateDockerName && this.projectVersion != null && this.dockerName != null &&
            this.projectArtifactId != null) {
        let values = jsplit(this.dockerName.getValue(), Constants.COLON);
        if (values.length == 2) {
            let version = values[1];
            let artifactId = values[0];
            if (equals(version.trim(), Constants.PROJECT_VERSION_CONSTANT)) {
                version = this.projectVersion;
            }
            if (equals(artifactId.trim(), Constants.PROJECT_ARTIFACT_ID_CONSTANT)) {
                artifactId = this.projectArtifactId;
            }
            this.dockerName.setDisplayValue(artifactId + Constants.COLON + version);
            this._updateDockerName = true;
        }
    }

  }

  getDockerFileBaseImage(): Node {
    return this.dockerFileBaseImage;

  }

  getCipherToolEnable(): Node {
    return this.cipherToolEnable;

  }

  getDockerName(): Node {
    return this.dockerName;

  }

  getKeyStoreName(): Node {
    return this.keyStoreName;

  }

  getKeyStorePassword(): Node {
    return this.keyStorePassword;

  }

  getKeyStoreAlias(): Node {
    return this.keyStoreAlias;

  }

  getKeyStoreType(): Node {
    return this.keyStoreType;

  }
}
