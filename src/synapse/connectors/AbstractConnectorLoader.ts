// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/AbstractConnectorLoader.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, Logger, Level, unmodifiable, StringUtils } from "../../syntaxTree/javaCompat.js";
import { ConnectorDetails } from "./entity/ConnectorDetails.js";
import { ConnectorHolder } from "./ConnectorHolder.js";
import { ConnectorReader } from "./ConnectorReader.js";
import { ConnectorStatusNotification } from "../ConnectorStatusNotification.js";
import { Constant } from "../../syntaxTree/constant.js";
import { InboundConnectorHolder } from "../inbound/conector/InboundConnectorHolder.js";
import { InvalidConfigurationException } from "../../syntaxTree/om/errors.js";
import { SynapseLanguageClientAPI } from "../SynapseLanguageClientAPI.js";
import { Utils } from "../../syntaxTree/utils.js";
import { ZipFile } from "../host/zip.js";
import { JFile } from "../host/JFile.js";

export abstract class AbstractConnectorLoader {
  static readonly __fields: string[] = ["languageClient", "connectorHolder", "inboundConnectorHolder", "connectorReader", "connectorsZipFolderPath", "connectorExtractFolder", "projectUri"];

  static readonly log: Logger = Logger.getLogger("AbstractConnectorLoader");

  languageClient?: SynapseLanguageClientAPI;

  connectorHolder?: ConnectorHolder;

  inboundConnectorHolder?: InboundConnectorHolder;

  connectorReader?: ConnectorReader;

  connectorsZipFolderPath: string[] = [];

  connectorExtractFolder?: JFile;

  projectUri?: string;

  constructor(languageClient: SynapseLanguageClientAPI, connectorHolder: ConnectorHolder, inboundConnectorHolder: InboundConnectorHolder) {
    this.languageClient = languageClient;
    this.connectorHolder = connectorHolder;
    this.inboundConnectorHolder = inboundConnectorHolder;
    this.connectorReader = new ConnectorReader();

  }

  init(projectRoot: string): void {
    if (!Utils.isValidProject(projectRoot)) {
        throw new InvalidConfigurationException("Invalid MI project root");
    }
    this.setProjectUri(projectRoot);
    this.setConnectorsZipFolderPath(projectRoot);
    this.connectorExtractFolder = this.getConnectorExtractFolder();

  }

  abstract setConnectorsZipFolderPath(projectRoot: string): void;

  loadConnector(): void {
    if (this.canContinue(this.connectorExtractFolder)) {
        let connectorZips = this.getConnectorZips();
        this.connectorHolder.setConnectorZips(unmodifiable(connectorZips));
        this.cleanOldConnectors(this.connectorExtractFolder, connectorZips);
        this.copyToProjectIfNeeded(connectorZips);
        this.extractZips(connectorZips, this.connectorExtractFolder);
        this.readConnectors(this.connectorExtractFolder);
    }

  }

  isDuplicateConnector(connectorPath: string): ConnectorDetails {
           try {
    let zipFile = new ZipFile(connectorPath);
               let connectorName = this.connectorReader.getConnectorName(zipFile);
               let details = new ConnectorDetails();
               if (StringUtils.isNotBlank(connectorName) && this.connectorHolder.exists(connectorName)) {
                   let existingConnector = this.connectorHolder.getConnector(connectorName);
                   details.connectorName = connectorName;
                   if (existingConnector.isFromProject()) {
                       details.isFromProject = true;
                       if (StringUtils.isNotBlank(existingConnector.getConnectorZipPath())) {
                           details.connectorPath = existingConnector.getConnectorZipPath();
                       } else {
                           details.artifactId = existingConnector.getArtifactId();
                           details.version = existingConnector.getVersion();
                       }
                   } else {
                       details.isFromProject = false;
                   }
               }
               return details;
           } catch (e) {
               AbstractConnectorLoader.log.log(Level.SEVERE, "Error while checking duplicate connector for path: " + connectorPath, e);
               return null;
           }

  }

  abstract copyToProjectIfNeeded(connectorZips: JFile[]): void;

  abstract getConnectorExtractFolder(): JFile;

  abstract canContinue(connectorExtractFolder: JFile): boolean;

  getConnectorZips(): JFile[] {
    let connectorZips = [];
    for (let folderPath of this.connectorsZipFolderPath) {
        let folder = new JFile(folderPath);
        if (folder.exists() && folder.isDirectory()) {
            let files = folder.listFiles();
            if (files != null) {
                for (let f of files) {
                    if (Utils.isZipFile(f)) {
                        connectorZips.push(f);
                    }
                }
            }
        }
    }
    return connectorZips;

  }

  abstract cleanOldConnectors(connectorExtractFolder: JFile, connectorZips: JFile[]): void;

  getConnectorName(connectorFolder: JFile): string {
    return this.connectorReader.getConnectorName(connectorFolder);


  }

  extractZips(connectorZips: JFile[], extractFolder: JFile): void {
    let tempFiles = extractFolder.listFiles();
    let tempConnectorNames =
            tempFiles.filter((x) => x.isDirectory()).map((x) => x.getName());
    for (let zip of connectorZips) {
        let zipName = zip.getName();
        zipName = zipName.substring(0, zipName.lastIndexOf(Constant.DOT));
        if (!contains(tempConnectorNames, zipName)) {
            let extractTo = extractFolder.getAbsolutePath() + JFile.separator + zipName;
            let extractToFolder = new JFile(extractTo);
            try {
                Utils.extractZip(zip, extractToFolder);
                if (contains(zipName, Constant.INBOUND_CONNECTOR_PREFIX)) {
                    let schema = Utils.readFile(extractToFolder.toPath().resolve(Constant.RESOURCES)
                            .resolve(Constant.UI_SCHEMA_JSON).toFile());
                    this.inboundConnectorHolder.saveInboundConnector(get(Utils.getJsonObject(schema), Constant.NAME).getAsString(), schema);
                }
            } catch (e) {
                AbstractConnectorLoader.log.log(Level.WARNING, "Failed to extract connector zip:" + zipName, e);
            }
        }
    }

  }

  readConnectors(connectorFolder: JFile): void {
    let files = connectorFolder.listFiles((x) => x.isDirectory());
    for (let f of files) {
        let connectorName = this.getConnectorName(f);
        let connectorPath = f.getAbsolutePath();
        if (!(this.connectorHolder.exists(connectorName) || contains(connectorPath, Constant.INBOUND_CONNECTOR_PREFIX))) {
            let connector = this.connectorReader.readConnector(connectorPath, this.projectUri);
            if (connector != null) {
                connector.setConnectorZipPath(
                        this.getConnectorZip(this.connectorHolder.getConnectorZips(), connector.getExtractedConnectorPath()));
                this.connectorHolder.addConnector(connector);
                this.notifyAddConnector(connector.getName(), true, "Connector added successfully");
                continue;
            }
            this.notifyAddConnector(connectorName, false, "Failed to add connector. " +
                    "Corrupted connector file.");
        }
    }

  }

  getConnectorZip(connectorZips: JFile[], extractedConnectorPath: string): string {
    let extractedConnectorName =
            extractedConnectorPath.substring(extractedConnectorPath.lastIndexOf(JFile.separator) + 1);
    for (let zip of connectorZips) {
        if (!contains(zip.getAbsolutePath(), this.projectUri)) {
            continue;
        }
        let zipName = zip.getName();
        zipName = zipName.substring(0, zipName.lastIndexOf("."));
        if (equals(extractedConnectorName, zipName)) {
            return zip.getAbsolutePath();
        }
    }
    return null;

  }

  notifyAddConnector(connector: string, isSuccessful: boolean, message: string): void {
    let status = new ConnectorStatusNotification(connector, isSuccessful, message);
    this.languageClient.addConnectorStatus(status);

  }

  notifyRemoveConnector(connector: string, isSuccessful: boolean, message: string): void {
    let status = new ConnectorStatusNotification(connector, isSuccessful, message);
    this.languageClient.removeConnectorStatus(status);

  }

  getProjectUri(): string {
    return this.projectUri;

  }

  setProjectUri(projectUri: string): void {
    this.projectUri = projectUri;

  }
}
