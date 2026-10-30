// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/OldProjectConnectorLoader.java by the java2ts converter (see tools/java2ts).
import { System } from "../../syntaxTree/javaCompat.js";
import { AbstractConnectorLoader } from "./AbstractConnectorLoader.js";
import { ConnectorHolder } from "./ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Path } from "../host/nio.js";
import { SynapseLanguageClientAPI } from "../SynapseLanguageClientAPI.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class OldProjectConnectorLoader extends AbstractConnectorLoader {
  static readonly __fields: string[] = [];

  constructor(languageClient: SynapseLanguageClientAPI, connectorHolder: ConnectorHolder) {
    super(languageClient, connectorHolder, null);

  }

  copyToProjectIfNeeded(connectorZips: JFile[]): void {


  }

  getConnectorExtractFolder(): JFile {
    let connectorsFolderPath = Path.of(System.getProperty(Constant.USER_HOME), Constant.WSO2_MI,
            Constant.CONNECTORS, Utils.getHash(this.getProjectUri()), Constant.EXTRACTED).toFile();
    return connectorsFolderPath;

  }

  canContinue(connectorExtractFolder: JFile): boolean {
    if (connectorExtractFolder.exists()) {
        return true;
    }
    return false;

  }

  cleanOldConnectors(connectorExtractFolder: JFile, connectorZips: JFile[]): void {

  }

  setConnectorsZipFolderPath(projectRoot: string): void {
    let projectFile = new JFile(projectRoot);
    let parentFolder = projectFile.getParentFile();
    let workspacePath = parentFolder.getAbsolutePath();
    this.connectorsZipFolderPath.push(String(Path.of(workspacePath, ".metadata", ".Connectors")));

  }
}
