// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/Connector.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../../syntaxTree/javaCompat.js";
import { ConnectorAction } from "./ConnectorAction.js";

export class Connector {
  static readonly __fields: string[] = ["name", "displayName", "extractedConnectorPath", "connectorZipPath", "packageName", "artifactId", "version", "actions", "connectionUiSchema", "iconPath", "uiSchemaPath", "outputSchemaPath", "ballerinaModulePath", "fromProject"];

  name?: string;

  displayName?: string;

  extractedConnectorPath?: string;

  connectorZipPath?: string;

  packageName?: string;

  artifactId?: string;

  version?: string;

  actions?: ConnectorAction[];

  connectionUiSchema?: Map<string, string>;

  iconPath?: string;

  uiSchemaPath?: string;

  outputSchemaPath?: string;

  ballerinaModulePath?: string;

  fromProject: boolean = false;

  constructor() {
    this.actions = [];
    this.connectionUiSchema = new Map();

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getDisplayName(): string {
    return this.displayName;

  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;

  }

  getPackageName(): string {
    return this.packageName;

  }

  setPackageName(packageName: string): void {
    this.packageName = packageName;

  }

  getExtractedConnectorPath(): string {
    return this.extractedConnectorPath;

  }

  setExtractedConnectorPath(extractedConnectorPath: string): void {
    this.extractedConnectorPath = extractedConnectorPath;

  }

  getConnectorZipPath(): string {
    return this.connectorZipPath;

  }

  setConnectorZipPath(connectorZipPath: string): void {
    this.connectorZipPath = connectorZipPath;

  }

  addAction(action: ConnectorAction): void {
    this.actions.push(action);

  }

  getActions(): ConnectorAction[] {
    return this.actions;

  }

  getAction(actionName: string): ConnectorAction {
    for (let action of this.actions) {
        if (equals(action.getName(), actionName)) {
            return action;
        }
    }
    return null;

  }

  setActions(actions: ConnectorAction[]): void {
    this.actions = actions;

  }

  addConnectionUiSchema(key: string, value: string): void {
    this.connectionUiSchema.set(key, value);

  }

  getConnectionUiSchema(): Map<string, string> {
    return this.connectionUiSchema;

  }

  setConnectionUiSchema(connectionUiSchema: Map<string, string>): void {
    this.connectionUiSchema = connectionUiSchema;

  }

  getArtifactId(): string {
    return this.artifactId;

  }

  setArtifactId(artifactId: string): void {
    this.artifactId = artifactId;

  }

  getVersion(): string {
    return this.version;

  }

  setVersion(version: string): void {
    this.version = version;

  }

  getIconPath(): string {
    return this.iconPath;

  }

  setIconPath(iconPath: string): void {
    this.iconPath = iconPath;

  }

  getUiSchemaPath(): string {
    return this.uiSchemaPath;

  }

  setUiSchemaPath(uiSchemaPath: string): void {
    this.uiSchemaPath = uiSchemaPath;

  }

  getOutputSchemaPath(): string {
    return this.outputSchemaPath;

  }

  setOutputSchemaPath(outputSchemaPath: string): void {
    this.outputSchemaPath = outputSchemaPath;

  }

  addOperationUiSchema(operationName: string, absolutePath: string): void {
    if (operationName == null) {
        return;
    }
    for (let action of this.actions) {
        if (equals(action.getName(), operationName)) {
            action.setUiSchemaPath(absolutePath);
        }
    }

  }

  addOperationOutputSchema(operationName: string, absolutePath: string): void {
    if (operationName == null) {
        return;
    }
    for (let action of this.actions) {
        if (equals(action.getName(), operationName)) {
            action.setOutputSchemaPath(absolutePath);
        }
    }

  }

  getBallerinaModulePath(): string {
    return this.ballerinaModulePath;

  }

  setBallerinaModulePath(ballerinaModulePath: string): void {
    this.ballerinaModulePath = ballerinaModulePath;

  }

  isFromProject(): boolean {
    return this.fromProject;

  }

  setFromProject(fromProject: boolean): void {
    this.fromProject = fromProject;

  }
}
