// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/pom/PluginHandler.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, isBlank, matches, replaceAll, StringBuilder, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Constants } from "../Constants.js";
import { DependencyDetails } from "../DependencyDetails.js";
import { Either } from "../../lsp.js";
import { Node } from "../Node.js";
import { OverviewPageDetailsResponse } from "../OverviewPageDetailsResponse.js";
import { Position } from "../../lsp.js";
import { Range } from "../../lsp.js";
import { DefaultHandler, Locator, Attributes } from "../../host/sax.js";

export class PluginHandler extends DefaultHandler {
  static readonly __fields: string[] = ["locator", "isDependency", "isPlugin", "isRepository", "isPluginRepository", "valueStartLine", "valueStartColumn", "dependencyStartLine", "pluginArtifactId", "pluginVersion", "contentBuffer", "isProperties", "dependencyStartColumn", "dependencyType", "range", "groupId", "artifactId", "version", "hasPropertiesUnitTestDetails", "projectRuntimeVersion", "pomDetailsResponse"];

  locator?: Locator;

  isDependency: boolean = false;

  isPlugin: boolean = false;

  isRepository: boolean = false;

  isPluginRepository: boolean = false;

  valueStartLine: number = 0;

  valueStartColumn: number = 0;

  dependencyStartLine: number = 0;

  pluginArtifactId: string = "";

  pluginVersion: string = "";


  contentBuffer: StringBuilder = new StringBuilder();

  isProperties?: any;

  dependencyStartColumn?: any;

  dependencyType: any = "";

  range?: Range;

  groupId?: string;

  artifactId?: string;

  version?: string;

  hasPropertiesUnitTestDetails: boolean = false;

  projectRuntimeVersion?: string;

  pomDetailsResponse?: OverviewPageDetailsResponse;

  constructor(pomDetailsResponse: OverviewPageDetailsResponse) {
    super();
    this.hasPropertiesUnitTestDetails = false;
    this.pomDetailsResponse = pomDetailsResponse;

  }

  setDocumentLocator(locator: Locator): void {
    this.locator = locator;

  }

  startElement(uri: string, localName: string, qName: string, attributes: Attributes): void {
    this.contentBuffer.setLength(0);
    this.valueStartLine = this.locator.getLineNumber();
    this.valueStartColumn = this.locator.getColumnNumber();
    if (equals(Constants.DEPENDENCY, qName)) {
        if (!this.isPlugin) {
            this.isDependency = true;
            this.dependencyStartLine = this.locator.getLineNumber();
            this.dependencyStartColumn = this.locator.getColumnNumber() - (qName.length + 2);
            this.dependencyType = "";
        }
    } else if (equals(Constants.PLUGIN, qName)) {
        this.isPlugin = true;
        this.pluginArtifactId = "";
        this.pluginVersion = "";
        this.range = new Range();
    } else if (equals(Constants.REPOSITORY, qName)) {
        this.isRepository = true;
    } else if (equals(Constants.PLUGIN_REPOSITORY, qName)) {
        this.isPluginRepository = true;
    } else if (equals(Constants.PROPERTIES, qName)) {
        this.isProperties = true;
    }

  }

  endElement(uri: string, localName: string, qName: string): void {
    let value = String(this.contentBuffer).trim();
    let closingTagLength = qName.length + 3;
    let valueEndLine = this.locator.getLineNumber();
    let valueEndColumn = this.locator.getColumnNumber();
    if (this.isPlugin) {
        this.processPlugins(qName, value, this.valueStartLine, this.valueStartColumn, valueEndLine, valueEndColumn,
                closingTagLength);
    } else if (this.isDependency) {
        this.processDependencies(qName, value, valueEndLine, valueEndColumn);
    } else if (this.isRepository) {
        if (equals(Constants.REPOSITORY, qName)) {
            this.isRepository = false;
        }
    } else if (this.isPluginRepository) {
        if (equals(Constants.PLUGIN_REPOSITORY, qName)) {
            this.isPluginRepository = false;
        }
    } else if (this.isProperties) {
        this.processProperties(qName, value, this.valueStartLine, this.valueStartColumn, valueEndLine,
                valueEndColumn - closingTagLength);
    } else {
        this.processPrimaryDetails(qName, value, this.valueStartLine, this.valueStartColumn, valueEndLine,
                valueEndColumn - closingTagLength);
    }

  }

  processPlugins(qName: string, value: string, valueStartLine: number, valueStartColumn: number, valueEndLine: number, valueEndColumn: number, closingTagLength: number): void {
    switch (qName) {
        case Constants.ARTIFACT_ID:
            this.pluginArtifactId = value;
            break;
        case Constants.VERSION:
            this.pluginVersion = value;
            this.range = this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                    valueEndColumn - closingTagLength);
            break;
        case Constants.NAME:
            if (equals(Constants.DOCKER_MAVEN_PLUGIN, this.pluginArtifactId)) {
                this.pomDetailsResponse.getBuildDetails().getDockerDetails().setDockerName(
                        new Node(value, Either.forLeft(this.getRange(valueStartLine,
                                valueStartColumn, valueEndLine, valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_TYPE:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerType(
                        new Node(value, Either.forLeft(this.getRange(valueStartLine, valueStartColumn,
                                valueEndLine, valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_HOST:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerHost(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_PORT:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerPort(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_PATH:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerPath(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_VERSION:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerVersion(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.TEST_SERVER_DOWNLOAD_LINK:
            if(!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setServerDownloadLink(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.SKIP_TEST:
            if (!this.hasPropertiesUnitTestDetails) {
                this.pomDetailsResponse.getUnitTestDetails().setSkipTest(new Node(value,
                        Either.forLeft(this.getRange(valueStartLine, valueStartColumn, valueEndLine,
                                valueEndColumn - closingTagLength))));
            }
            break;
        case Constants.PLUGIN:
            switch (this.pluginArtifactId.trim()) {
                case Constants.VSCODE_CAR_PLUGIN:
                    if (matches(this.pluginVersion, "^\\d+\\.\\d+\\.\\d+(-[0-9A-Za-z]+)?$")) {
                        this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().getPluginDetails().
                                setProjectBuildPluginVersion(this.pluginVersion, this.range);
                    }
                    break;
                case Constants.MI_CONTAINER_CONFIG_MAPPER:
                    this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().getPluginDetails().
                            setMiContainerPluginVersion(new Node(this.pluginVersion, Either.forLeft(this.range)));
                    break;
                case Constants.SYNAPSE_UNIT_TEST_MAVEN_PLUGIN:
                    this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().getPluginDetails().
                            setUnitTestPluginVersion(new Node(this.pluginVersion, Either.forLeft(this.range)));
                    break;
            }
            this.isPlugin = false;
            break;
    }

  }

  processDependencies(qName: string, value: string, valueEndLine: number, valueEndColumn: number): void {
    switch (qName) {
        case Constants.GROUP_ID:
            if (StringUtils.isBlank(this.groupId)) {
                this.groupId = value;
            }
            break;
        case Constants.ARTIFACT_ID:
            if (StringUtils.isBlank(this.artifactId)) {
                this.artifactId = value;
            }
            break;
        case Constants.VERSION:
            this.version = value;
            break;
        case Constants.TYPE:
            this.dependencyType = value;
            break;
        case Constants.DEPENDENCY:
            let dependency = new DependencyDetails();
            dependency.setGroupId(this.groupId);
            dependency.setArtifact(this.artifactId);
            dependency.setVersion(this.version);
            if (!StringUtils.isEmpty(this.dependencyType)) {
                dependency.setType(this.dependencyType);
            }
            dependency.setRange(this.getRange(this.dependencyStartLine, this.dependencyStartColumn, valueEndLine, valueEndColumn));
            if (equals(Constants.ZIP, this.dependencyType)) {
                this.pomDetailsResponse.getDependenciesDetails().addConnectorDependencies(dependency);
            } else if (equals(Constants.CAR, this.dependencyType)) {
                this.pomDetailsResponse.getDependenciesDetails().addIntegrationProjectDependencies(dependency);
            } else {
                this.pomDetailsResponse.getDependenciesDetails().addOtherDependencies(dependency);
            }
            this.isDependency = false;
            this.groupId = StringUtils.EMPTY;
            this.artifactId = StringUtils.EMPTY;
            break;
    }

  }

  processProperties(qName: string, value: string, valueStartLine: number, valueStartColumn: number, valueEndLine: number, valueEndColumn: number): void {
    let range = this.getRange(valueStartLine, valueStartColumn, valueEndLine, valueEndColumn);
    switch (qName) {
        case Constants.PROJECT_RUNTIME_VERSION:
            this.pomDetailsResponse.getPrimaryDetails().setRuntimeVersion(new Node(value, Either.forLeft(range)));
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().setProjectRuntimeVersion(value);
            this.projectRuntimeVersion = value;
            if (this.pomDetailsResponse.getUnitTestDetails().getServerVersion() != null) {
                this.pomDetailsResponse.getUnitTestDetails().setServerVersionDisplayValue(this.projectRuntimeVersion);
            }
            break;
        case Constants.KEY_STORE_TYPE:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().
                    setKeyStoreType(new Node(value, Either.forLeft(range)));
            break;
        case Constants.KEY_STORE_NAME:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().
                    setKeyStoreName(new Node(value, Either.forLeft(range)));
            break;
        case Constants.KEY_STORE_PASSWORD:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().
                    setKeyStorePassword(new Node(value, Either.forLeft(range)));
            break;
        case Constants.KEY_STORE_ALIAS:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().
                    setKeyStoreAlias(new Node(value, Either.forLeft(range)));
            break;
        case Constants.FAT_CAR_ENABLE: this.pomDetailsResponse.getBuildDetails().setEnableFatCar(
                    new Node(value, Either.forLeft(range)));
            break;
        case Constants.VERSIONED_DEPLOYMENT: this.pomDetailsResponse.getBuildDetails().setVersionedDeployment(
                new Node(value, Either.forLeft(range)));
            break;
        case Constants.CIPHER_TOOL_ENABLE:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().setCipherToolEnable(
                    new Node(value, Either.forLeft(range)));
            break;
        case Constants.DOCKER_FILE_BASE_IMAGE:
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().setDockerFileBaseImage(
                    new Node(value, Either.forLeft(range)));
            break;
        case Constants.CAR_PLUGIN_VERSION:
            this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().getPluginDetails().initialiseRanges();
            this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().getPluginDetails()
                    .setProjectBuildPluginVersion(value, range);
            break;
        case Constants.PRO_TEST_SERVER_TYPE:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setServerType(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PRO_TEST_SERVER_HOST:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setServerHost(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PRO_TEST_SERVER_PORT:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setServerPort(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PRO_TEST_SERVER_PATH:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setServerPath(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PRO_TEST_SERVER_VERSION:
            this.hasPropertiesUnitTestDetails = true;
            let unitTestDetails = this.pomDetailsResponse.getUnitTestDetails();
            unitTestDetails.setServerVersion(new Node(value, Either.forLeft(range)));
            if (this.projectRuntimeVersion != null && equals(value, Constants.PROJECT_RUNTIME_VERSION_CONSTANT)) {
                unitTestDetails.setServerVersionDisplayValue(this.projectRuntimeVersion);
            } else {
                unitTestDetails.setServerVersionDisplayValue(value);
            }
            if (this.pomDetailsResponse.getUnitTestDetails().getServerDownloadLink() != null) {
                let link =  this.pomDetailsResponse.getUnitTestDetails().getServerDownloadLink();
                let linkValue = link.getValue();
                if (contains(linkValue, Constants.PROJECT_TEST_SERVER_VERSION_CONSTANT)) {
                    link.setDisplayValue(replaceAll(linkValue, Constants.PROJECT_TEST_SERVER_VERSION_CONSTANT_WITH_ESCAPE, this.pomDetailsResponse.getUnitTestDetails().getServerVersion().getDisplayValue()));
                    this.pomDetailsResponse.getUnitTestDetails().setServerDownloadLink(link);
                }
            }
            break;
        case Constants.TEST_SERVER_DOWNLOAD_LINK:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setServerDownloadLink(new Node(value,
                    Either.forLeft(range)));
            if (this.pomDetailsResponse.getUnitTestDetails().getServerVersion().getDisplayValue() != null &&
                    contains(value, Constants.PROJECT_TEST_SERVER_VERSION_CONSTANT)) {
                this.pomDetailsResponse.getUnitTestDetails().getServerDownloadLink().setDisplayValue(
                        replaceAll(value, Constants.PROJECT_TEST_SERVER_VERSION_CONSTANT_WITH_ESCAPE, this.pomDetailsResponse.getUnitTestDetails().getServerVersion().getDisplayValue()));
            }
            break;
        case Constants.MAVEN_SKIP_TEST:
            this.hasPropertiesUnitTestDetails = true;
            this.pomDetailsResponse.getUnitTestDetails().setSkipTest(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PROPERTIES:
            this.isProperties = false;
            break;
    }

  }

  processPrimaryDetails(qName: string, value: string, valueStartLine: number, valueStartColumn: number, valueEndLine: number, valueEndColumn: number): void {
    let range = this.getRange(valueStartLine, valueStartColumn, valueEndLine, valueEndColumn);
    switch (qName) {
        case Constants.GROUP_ID:
            this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().setProjectGroupId(
                    new Node(value, Either.forLeft(range)));
            break;
        case Constants.ARTIFACT_ID:
            this.pomDetailsResponse.getBuildDetails().getAdvanceDetails().
                    setProjectArtifactId(new Node(value, Either.forLeft(range)));
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().setProjectArtifactId(value);
            break;
        case Constants.VERSION:
            this.pomDetailsResponse.getPrimaryDetails().setProjectVersion(new Node(value, Either.forLeft(range)));
            this.pomDetailsResponse.getBuildDetails().getDockerDetails().setProjectVersion(value);
            break;
        case Constants.DESCRIPTION:
            this.pomDetailsResponse.getPrimaryDetails().setProjectDescription(new Node(value, Either.forLeft(range)));
            break;
        case Constants.NAME:
            this.pomDetailsResponse.getPrimaryDetails().setProjectName(new Node(value, Either.forLeft(range)));
            break;
        case Constants.PACKAGING:
            this.pomDetailsResponse.getPrimaryDetails().setProjectPackaging(new Node(value, Either.forLeft(range)));
            break;
    }

  }

  characters(ch: string, start: number, length: number): void {
    this.contentBuffer.append(ch.substring(start, start + length));

  }

  getRange(startLine: number, startColumn: number, endLine: number, endColumn: number): Range {
    return new Range(new Position(startLine, startColumn), new Position(endLine, endColumn));

  }
}
