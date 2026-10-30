// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectorInfoDto.java by the java2ts converter (see tools/java2ts).
import { get, Logger, Level } from "../../../syntaxTree/javaCompat.js";
import { ConnectionInfo } from "./ConnectionInfo.js";
import { Connector } from "./Connector.js";
import { ConnectorAction } from "./ConnectorAction.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { UiSchemaFlattener } from "../UiSchemaFlattener.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export class ConnectorInfoDto {
  static readonly __fields: string[] = ["name", "displayName", "packageName", "artifactId", "version", "extractedConnectorPath", "connectorZipPath", "uiSchemaPath", "outputSchemaPath", "ballerinaModulePath", "fromProject", "operations", "connections"];

  static readonly log: Logger = Logger.getLogger("ConnectorInfoDto");

  name?: string;

  displayName?: string;

  packageName?: string;

  artifactId?: string;

  version?: string;

  extractedConnectorPath?: string;

  connectorZipPath?: string;

  uiSchemaPath?: string;

  outputSchemaPath?: string;

  ballerinaModulePath?: string;

  fromProject: boolean = false;

  operations?: ConnectorAction[];

  connections?: ConnectionInfo[];

  static from(connector: Connector): ConnectorInfoDto {
    let dto = new ConnectorInfoDto();
    if (connector == null) {
        dto.operations = [];
        dto.connections = [];
        return dto;
    }
    dto.name = connector.getName();
    dto.displayName = connector.getDisplayName();
    dto.packageName = connector.getPackageName();
    dto.artifactId = connector.getArtifactId();
    dto.version = connector.getVersion();
    dto.extractedConnectorPath = connector.getExtractedConnectorPath();
    dto.connectorZipPath = connector.getConnectorZipPath();
    dto.uiSchemaPath = connector.getUiSchemaPath();
    dto.outputSchemaPath = connector.getOutputSchemaPath();
    dto.ballerinaModulePath = connector.getBallerinaModulePath();
    dto.fromProject = connector.isFromProject();
    dto.operations = connector.getActions() != null ? connector.getActions() : [];
    dto.connections = ConnectorInfoDto.buildConnections(connector);
    return dto;

  }

  static buildConnections(connector: Connector): ConnectionInfo[] {
    let out = [];
    let uiSchemaPath = connector.getUiSchemaPath();
    if (uiSchemaPath == null) {
        return out;
    }
    let uiSchemaFolder = new JFile(uiSchemaPath);
    if (!uiSchemaFolder.exists()) {
        return out;
    }
    let files = uiSchemaFolder.listFiles();
    if (files == null) {
        return out;
    }
    for (let file of files) {
        let connection = ConnectorInfoDto.readConnectionInfo(file);
        if (connection != null) {
            out.push(connection);
        }
    }
    return out;

  }

  static readConnectionInfo(file: JFile): ConnectionInfo {
    try {
        let schema = Utils.readFile(file);
        let uiJson = Utils.getJsonObject(schema);
        if (uiJson == null) {
            return null;
        }
        let connectionNameEle = get(uiJson, "connectionName");
        if (connectionNameEle == null) {
            return null;
        }
        let connection = new ConnectionInfo();
        connection.setName(connectionNameEle.getAsString().toUpperCase());
        connection.setUiSchemaPath(String(file.getAbsoluteFile().toPath().normalize()));
        if (uiJson.has(Constant.TITLE)) {
            connection.setDisplayName(get(uiJson, Constant.TITLE).getAsString());
        }
        if (uiJson.has(Constant.HELP)) {
            connection.setDescription(get(uiJson, Constant.HELP).getAsString());
        }
        if (uiJson.has(Constant.ELEMENTS) && get(uiJson, Constant.ELEMENTS).isJsonArray()) {
            connection.setParameters(UiSchemaFlattener.flatten(uiJson.getAsJsonArray(Constant.ELEMENTS)));
        }
        return connection;
    } catch (e) {
        ConnectorInfoDto.log.log(Level.WARNING, "Error while reading connection ui schema file", e);
        return null;
    }

  }

  getName(): string {
    return this.name;

  }

  getDisplayName(): string {
    return this.displayName;

  }

  getPackageName(): string {
    return this.packageName;

  }

  getArtifactId(): string {
    return this.artifactId;

  }

  getVersion(): string {
    return this.version;

  }

  getExtractedConnectorPath(): string {
    return this.extractedConnectorPath;

  }

  getConnectorZipPath(): string {
    return this.connectorZipPath;

  }

  getUiSchemaPath(): string {
    return this.uiSchemaPath;

  }

  getOutputSchemaPath(): string {
    return this.outputSchemaPath;

  }

  getBallerinaModulePath(): string {
    return this.ballerinaModulePath;

  }

  isFromProject(): boolean {
    return this.fromProject;

  }

  getOperations(): ConnectorAction[] {
    return this.operations;

  }

  getConnections(): ConnectionInfo[] {
    return this.connections;

  }
}
