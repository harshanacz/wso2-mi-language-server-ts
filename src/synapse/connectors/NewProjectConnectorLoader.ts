// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/NewProjectConnectorLoader.java by the java2ts converter (see tools/java2ts).
import { isEmpty, contains, size, get, Logger, Level, clear, StringUtils, System } from "../../syntaxTree/javaCompat.js";
import { AbstractConnectorLoader } from "./AbstractConnectorLoader.js";
import { ConnectorHolder } from "./ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { FileUtils } from "../host/commonsIo.js";
import { FilenameUtils } from "../host/commonsIo.js";
import { InboundConnectorHolder } from "../inbound/conector/InboundConnectorHolder.js";
import { Path } from "../host/nio.js";
import { SynapseLanguageClientAPI } from "../SynapseLanguageClientAPI.js";
import { TryOutConstants } from "../mediator/TryOutConstants.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class NewProjectConnectorLoader extends AbstractConnectorLoader {
  static readonly __fields: string[] = ["projectId", "baseConnectorsZipFolderPaths"];

  static readonly log: Logger = Logger.getLogger("NewProjectConnectorLoader");

  projectId?: string;

  baseConnectorsZipFolderPaths: string[] = [];

  constructor(languageClient: SynapseLanguageClientAPI, connectorHolder: ConnectorHolder, inboundConnectorHolder: InboundConnectorHolder) {
    super(languageClient, connectorHolder, inboundConnectorHolder);

  }

  getUserHome(): string {
    return System.getProperty(Constant.USER_HOME);

  }

  getConnectorExtractFolder(): JFile {
    let tempFolderPath = String(Path.of(this.getUserHome(), Constant.WSO2_MI,
            Constant.CONNECTORS, this.projectId, Constant.EXTRACTED));
    let tempFolder = new JFile(tempFolderPath);
    return tempFolder;

  }

  copyToProjectIfNeeded(connectorZips: JFile[]): void {
    if (!Utils.isOlderCARPlugin(this.projectUri)) {
        return;
    }
    let downloadedConnectorsFolder = this.getConnnectorDownloadPath().toFile();
    let projectConnectorPath = Path.of(this.projectUri).resolve(TryOutConstants.PROJECT_CONNECTOR_PATH).toFile();
    if (downloadedConnectorsFolder.exists()) {
        let downloadedConnectors = downloadedConnectorsFolder.listFiles();
        for (let downloadedConnector of downloadedConnectors) {
            let isExists = FileUtils.getFile(projectConnectorPath, downloadedConnector.getName()).exists();
            if (!isExists) {
                try {
                    FileUtils.copyFileToDirectory(downloadedConnector, projectConnectorPath);
                } catch (e) {
                    NewProjectConnectorLoader.log.log(Level.WARNING, "Failed to copy connector to project", e);
                }
            }
        }
    }

  }

  canContinue(connectorExtractFolder: JFile): boolean {
    try {
        if (!connectorExtractFolder.exists()) {
            connectorExtractFolder.mkdirs();
        }
        return true;
    } catch (e) {
        NewProjectConnectorLoader.log.log(Level.WARNING, "Failed to create connector extract folder", e);
        return false;
    }

  }

  cleanOldConnectors(connectorExtractFolder: JFile, connectorZips: JFile[]): void {
    let tempFiles = connectorExtractFolder.listFiles();
    let tempConnectorNames =
            tempFiles.filter((x) => x.isDirectory()).map((x) => x.getName());
    for (let connectorName of tempConnectorNames) {
        let isConnectorAvailable =
                connectorZips.some(file => contains(file.getName(), connectorName));
        if (!isConnectorAvailable) {
            let connectorFolder =
                    new JFile(connectorExtractFolder.getAbsolutePath() + JFile.separator + connectorName);
            this.connectorHolder.removeConnector(this.getConnectorName(connectorFolder));
            try {
                if (contains(connectorFolder.getName(), Constant.INBOUND_CONNECTOR_PREFIX) ) {
                    let schema = Utils.readFile(connectorFolder.toPath().resolve(Constant.RESOURCES)
                            .resolve(Constant.UI_SCHEMA_JSON).toFile());
                    let fileName = get(Utils.getJsonObject(schema), Constant.NAME).getAsString() + Constant.JSON_FILE_EXT;
                    let projectFolderName = connectorExtractFolder.getParentFile().getName();
                    let schemaToRemove = Path.of(this.getUserHome(), Constant.WSO2_MI,
                            Constant.INBOUND_CONNECTORS).resolve(projectFolderName).resolve(fileName).toFile();
                    FileUtils.delete(schemaToRemove);
                }
                FileUtils.deleteDirectory(connectorFolder);
                this.notifyRemoveConnector(connectorName, true, "Connector deleted successfully");
            } catch (e) {
                NewProjectConnectorLoader.log.log(Level.WARNING, "Failed to delete connector folder:" + connectorName, e);
            }
        }
    }

  }

  getConnnectorDownloadPath(): Path {
    return Path.of(this.getUserHome(), Constant.WSO2_MI,
            Constant.CONNECTORS, this.projectId, Constant.DOWNLOADED);

  }

  loadConnector(): void {
    clear(this.connectorsZipFolderPath);
          this.connectorsZipFolderPath.push(...this.baseConnectorsZipFolderPaths);
          this.addDependencyProjectConnectorPaths();
    NewProjectConnectorLoader.log.info("Loading connectors from " + size(this.connectorsZipFolderPath) + " paths for project: " + this.projectId);
          super.loadConnector();
          this.markProjectConnectors();

  }

  markProjectConnectors(): void {
    NewProjectConnectorLoader.log.info("Marking project connectors for project: " + this.projectId);
    let projectConnectorZipNames = [];
    for (let zip of this.connectorHolder.getConnectorZips()) {
        if (contains(this.baseConnectorsZipFolderPaths, zip.getParent())) {
            let name = zip.getName();
            projectConnectorZipNames.push(name.substring(0, name.lastIndexOf(Constant.DOT)));
        }
    }
    let markedCount = 0;
    for (let connector of this.connectorHolder.getConnectors()) {
        let extractedPath = connector.getExtractedConnectorPath();
        if (StringUtils.isNotBlank(extractedPath)) {
            let isFromProject = contains(projectConnectorZipNames, FilenameUtils.getName(extractedPath));
            connector.setFromProject(isFromProject);
            if (isFromProject) {
                markedCount++;
            }
        }
    }
    NewProjectConnectorLoader.log.info("Marked " + markedCount + " project connector(s) for project: " + this.projectId);

  }

  setConnectorsZipFolderPath(projectRoot: string): void {
    this.projectId = new JFile(projectRoot).getName() + "_" + Utils.getHash(projectRoot);
    this.baseConnectorsZipFolderPaths.push(String(Path.of(projectRoot, Constant.SRC, Constant.MAIN, Constant.WSO2MI,
            Constant.RESOURCES, Constant.CONNECTORS)));
    this.baseConnectorsZipFolderPaths.push(String(this.getConnnectorDownloadPath()));
    this.connectorsZipFolderPath.push(...this.baseConnectorsZipFolderPaths);

  }

  addDependencyProjectConnectorPaths(): void {
          let extractedDir = this.findProjectDependencyExtractedDir();
          if (extractedDir == null) {
              NewProjectConnectorLoader.log.info("No dependency project extracted directory found for project: " + this.projectId);
              return;
          }
    NewProjectConnectorLoader.log.info("Found dependency project extracted directory: " + extractedDir + " for project: " + this.projectId);
          let dependentProjects = extractedDir.toFile().listFiles((x) => x.isDirectory());
          if (dependentProjects == null) {
    	NewProjectConnectorLoader.log.info("No dependent projects found in extracted directory: " + extractedDir);
              return;
          }
    NewProjectConnectorLoader.log.info("Found " + dependentProjects.length + " dependent projects in: " + extractedDir);
          for (let dependentProject of dependentProjects) {
              let connectorPath = dependentProject.toPath()
                      .resolve(Constant.SRC).resolve(Constant.MAIN).resolve(Constant.WSO2MI)
                      .resolve(Constant.RESOURCES).resolve(Constant.CONNECTORS);
              if (connectorPath.toFile().isDirectory()) {
                  this.connectorsZipFolderPath.push(String(connectorPath));
                  NewProjectConnectorLoader.log.info("Added connector path from dependency project: " + connectorPath);
              }
          }

  }

  findProjectDependencyExtractedDir(): Path {
    if (StringUtils.isEmpty(this.projectId)) {
        return null;
    }
    let expectedDir = Path.of(this.getUserHome(), Constant.WSO2_MI,
            Constant.INTEGRATION_PROJECT_DEPENDENCIES, this.projectId, Constant.EXTRACTED);
    if (expectedDir.toFile().isDirectory()) {
        return expectedDir;
    }
    return null;

  }
}
