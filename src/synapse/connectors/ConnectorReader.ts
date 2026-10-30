// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/ConnectorReader.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, get, parseBoolean, replaceAll, jsplit, Logger, Level, StringUtils } from "../../syntaxTree/javaCompat.js";
import { Connector } from "./entity/Connector.js";
import { ConnectorAction } from "./entity/ConnectorAction.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { DOMNode } from "../../syntaxTree/dom/dom.js";
import { Files } from "../host/nio.js";
import { JsonArray } from "../gson.js";
import { JsonElement } from "../gson.js";
import { JsonObject } from "../gson.js";
import { JsonParser } from "../gson.js";
import { OperationParameter } from "./entity/OperationParameter.js";
import { Path } from "../host/nio.js";
import { Paths } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { StandardCharsets } from "../host/nio.js";
import { Utils } from "../../syntaxTree/utils.js";
import { ZipFile } from "../host/zip.js";
import { decodeUtf8 } from "../host/fs.js";
import { JFile } from "../host/JFile.js";

export class ConnectorReader {
  static readonly __fields: string[] = ["allowedConnectionTypesMap"];

  static readonly log: Logger = Logger.getLogger("ConnectorReader");

  static readonly ARTIFACT_VERSION_REGEX: Pattern = Pattern.compile("(.+)-(\\d+\\.\\d+\\.\\d+(?:-[A-Za-z0-9]+)*)");

  allowedConnectionTypesMap: Map<string, string[]> = new Map();

  static readonly BALLERINA_PACKAGE_NAME: string = "io.ballerina.stdlib.mi";

  static readonly EXCLUDED_AGENT_TOOLS: string[] = ["ai.chat", "ai.ragChat", "ai.agent"];

  readConnector(connectorPath: string, projectUri: string): Connector {
    let connector = null;
    if (connectorPath != null) {
        let connectorFile = new JFile(connectorPath + JFile.separator + "connector.xml");
        if (connectorFile.exists()) {
            try {
                let connectorDocument = Utils.getDOMDocument(connectorFile);
                let connectorElement = Utils.getChildNodeByName(connectorDocument, "connector");
                let componentElement = Utils.getChildNodeByName(connectorElement, "component");
                let displayNameElement = Utils.getChildNodeByName(connectorElement, Constant.DISPLAY_NAME);
                let name = componentElement.getAttribute(Constant.NAME);
                connector = new Connector();
                connector.setName(name);
                connector.setBallerinaModulePath(StringUtils.EMPTY);
                let packageName = componentElement.getAttribute(Constant.PACKAGE);
                if (equals(ConnectorReader.BALLERINA_PACKAGE_NAME, packageName)) {
                    connector.setBallerinaModulePath(this.getBallerinaModulePath(name,
                            String(get(Paths, projectUri))));
                }
                connector.setPackageName(packageName);
                if (displayNameElement != null && displayNameElement.isElement()) {
                    let displayName = Utils.getInlineString(displayNameElement.getFirstChild());
                    connector.setDisplayName(displayName);
                }
                connector.setExtractedConnectorPath(connectorPath);
                this.setConnectorArtifactIdAndVersion(connector, connectorPath);
                connector.setIconPath(connectorPath + JFile.separator + "icon");
                connector.setUiSchemaPath(connectorPath + JFile.separator + "uischema");
                connector.setOutputSchemaPath(connectorPath + JFile.separator + "outputschema");
                this.populateAllowedConnectionTypesMap(connector);
                this.populateConnectorActions(connector, componentElement);
                this.populateConnectionUiSchema(connector);
            } catch (e) {
                ConnectorReader.log.log(Level.SEVERE, "Error reading connector file", e);
            }
        }
    }
    return connector;

  }

  getBallerinaModulePath(moduleName: string, ballerinaFolder: string): string {
           let ballerinaPath = get(Paths, ballerinaFolder);
           if (!Files.isDirectory(ballerinaPath)) {

               return StringUtils.EMPTY;
           }
           let ballerinaTomlPaths = [];
           try {
    let stream = Files.walk(ballerinaPath);
               stream.filter(path => Files.isRegularFile(path)
                               && equals(String(path.getFileName()), "Ballerina.toml"))
                       .forEach(path => ballerinaTomlPaths.push(String(path)));
               for (let path of ballerinaTomlPaths) {
                   try {
                       if (equals(moduleName, this.readBallerinaToml(path))) {
                           return String(get(Paths, path).getParent());
                       }
                   } catch (e) {
                       ConnectorReader.log.log(Level.SEVERE, "Error occurred while reading Ballerina.toml file.", e);
                   }
               }
               return StringUtils.EMPTY;
           } catch (e) {
               ConnectorReader.log.log(Level.WARNING, "Error walking Ballerina folder: " + ballerinaFolder, e);
               return StringUtils.EMPTY;
           }

  }

  readBallerinaToml(path: string): string {
    let lines = Files.readAllLines(get(Paths, path));
    let name = StringUtils.EMPTY;
    let isPackageSection = false;
    for (let line of lines) {
        if (line.trim().startsWith("[package]")) {
            isPackageSection = true;
        }
        if (isPackageSection) {
            if (line.trim().startsWith("name =")) {
                name = this.extractModuleName(line);
            }
        }
    }
    return name;

  }

  extractModuleName(line: string): string {
    let parts = jsplit(line, "=");
    if (parts.length > 1) {
        return replaceAll(parts[1].trim(), "\"", StringUtils.EMPTY);
    }
    return StringUtils.EMPTY;

  }

  populateAllowedConnectionTypesMap(connector: Connector): void {
    let uiSchemaPath = connector.getUiSchemaPath();
    let uiSchemaFolder = new JFile(uiSchemaPath);
    if (uiSchemaFolder.exists()) {
        let files = uiSchemaFolder.listFiles();
        if (files != null) {
            for (let file of files) {
                try {
                    let schema = Utils.readFile(file);
                    let uiJson = Utils.getJsonObject(schema);
                    let operation = get(uiJson, "operationName");
                    if (operation != null) {
                        let operationName = operation.getAsString();
                        this.getAllowedConnectionTypes(uiJson, operationName);
                    }
                } catch (e) {
                    ConnectorReader.log.log(Level.SEVERE, "Error while reading connector ui schema file.", e);
                }
            }
        }
    }

  }

  getAllowedConnectionTypes(uiJson: JsonObject, operationName: string): void {
    let elements = this.getElements(uiJson);
    if (elements != null) {
        for (let element of elements) {
            if (!this.allowedConnectionTypesMap.has(operationName)) {
                let type = get(element.getAsJsonObject(), Constant.TYPE).getAsString();
                if (equalsIgnoreCase(Constant.ATTRIBUTE, type)) {
                    let value = get(element.getAsJsonObject(), Constant.VALUE);
                    let allowedConnectionType = get(value.getAsJsonObject(), "allowedConnectionTypes");
                    if (allowedConnectionType != null) {
                        let allowedConnectionTypes = allowedConnectionType.getAsJsonArray();
                        let allowedConnectionTypeList = [];
                        for (let connectionType of allowedConnectionTypes) {
                            allowedConnectionTypeList.push(connectionType.getAsString());
                        }
                        this.allowedConnectionTypesMap.set(operationName, allowedConnectionTypeList);
                        break;
                    }
                } else if (equalsIgnoreCase("attributeGroup", type)) {
                    this.getAllowedConnectionTypes(element.getAsJsonObject(), operationName);
                }
            }
        }
    }

  }

  getElements(uiJson: JsonObject): JsonArray {
    let temp = uiJson;
    let value = get(uiJson, Constant.VALUE);
    if (value != null) {
        temp = value.getAsJsonObject();
    }
    let elements = get(temp, Constant.ELEMENTS);
    if (elements != null) {
        return elements.getAsJsonArray();
    }
    return null;

  }

  setConnectorArtifactIdAndVersion(connector: Connector, connectorPath: string): void {
    let connectorName = String(Path.of(connectorPath).getFileName());
    let matcher = ConnectorReader.ARTIFACT_VERSION_REGEX.matcher(connectorName);
    if (matcher.find()) {
        connector.setArtifactId(matcher.group(1));
        connector.setVersion(matcher.group(2));
    }

  }

  populateConnectorActions(connector: Connector, componentElement: DOMNode): void {
    let dependencies = this.getDependencies(componentElement);
    this.readDependencies(connector, dependencies);
    this.readUISchema(connector);
    this.readOutputSchema(connector);

  }

  readUISchema(connector: Connector): void {
    this.addUISchemasFromConnector(connector);



    this.updateRequiredFlags(connector);
    this.generateUISchemasIfNeeded(connector);

  }

  addUISchemasFromConnector(connector: Connector): void {
    let uiSchemaPath = connector.getUiSchemaPath();
    let uiSchemaFolder = new JFile(uiSchemaPath);
    if (uiSchemaFolder.exists()) {
        let files = uiSchemaFolder.listFiles();
        if (files != null) {
            for (let file of files) {
                this.processUISchemaFile(file, connector);
            }
        }
    }

  }

  generateUISchemasIfNeeded(connector: Connector): void {
    for (let action of connector.getActions()) {
        if (action.getUiSchemaPath() == null && !action.getHidden()) {
            try {
                this.generateUISchema(action, connector);
            } catch (e) {
                ConnectorReader.log.log(Level.SEVERE, "Error while generating ui schema", e);
            }
        }
    }

  }

  generateUISchema(action: ConnectorAction, connector: Connector): void {
    let uiSchema = new JsonObject();
    uiSchema.addProperty(Constant.CONNECTOR_NAME, connector.getName());
    uiSchema.addProperty(Constant.OPERATION_NAME, action.getName());
    uiSchema.addProperty(Constant.TITLE, action.getDisplayName());
    uiSchema.addProperty(Constant.HELP, action.getDescription());
    let elements = new JsonArray();
    for (let parameter of action.getParameters()) {
        let element = new JsonObject();
        element.addProperty(Constant.TYPE, Constant.ATTRIBUTE);
        let value = new JsonObject();
        value.addProperty(Constant.NAME, parameter.getName());
        value.addProperty(Constant.DISPLAY_NAME, parameter.getName());
        value.addProperty(Constant.INPUT_TYPE, "stringOrExpression");
        value.addProperty(Constant.REQUIRED, false);
        value.addProperty(Constant.HELP_TIP, parameter.getDescription());
        element.add(Constant.VALUE, value);
        elements.add(element);
    }
    uiSchema.add(Constant.ELEMENTS, elements);
    let uiSchemaPath = Path.of(connector.getUiSchemaPath(), action.getName() + ".json");
    Utils.writeToFile(String(uiSchemaPath), String(uiSchema));
    action.setUiSchemaPath(String(uiSchemaPath));

  }

  processUISchemaFile(file: JFile, connector: Connector): void {
    try {
        let fileName = Utils.getFileName(file);
        if (connector.getAction(fileName) != null) {
            connector.addOperationUiSchema(fileName, file.getAbsolutePath());
        } else {
            let operation = this.getOperationNameFromUISchema(file);
            if (operation != null) {
                connector.addOperationUiSchema(operation.getAsString(), file.getAbsolutePath());
            }
        }
    } catch (e) {
        ConnectorReader.log.log(Level.SEVERE, "Error while reading connector ui schema file", e);
    }

  }

  getOperationNameFromUISchema(file: JFile): JsonElement {
    let schema = Utils.readFile(file);
    let uiJson = Utils.getJsonObject(schema);
    return get(uiJson, Constant.OPERATION_NAME);

  }

  updateRequiredFlags(connector: Connector): void {
    for (let action of connector.getActions()) {
        let uiSchemaPath = action.getUiSchemaPath();
        if (StringUtils.isEmpty(uiSchemaPath)) {
            continue;
        }
        try {
            let uiSchemaFile = new JFile(uiSchemaPath);
            if (!uiSchemaFile.exists()) {
                continue;
            }
            let content = Utils.readFile(uiSchemaFile);
            let uiJson = JsonParser.parseString(content).getAsJsonObject();
            if (!uiJson.has(Constant.ELEMENTS)) {
                continue;
            }
            let elements = uiJson.getAsJsonArray(Constant.ELEMENTS);
            for (let elem of elements) {
                let element = elem.getAsJsonObject();
                if (!element.has(Constant.TYPE) || !equals(Constant.ATTRIBUTE, get(element, Constant.TYPE).getAsString())) {
                    continue;
                }
                if (!element.has(Constant.VALUE)) {
                    continue;
                }
                let value = element.getAsJsonObject(Constant.VALUE);
                if (value.has(Constant.NAME)) {
                    let paramName = get(value, Constant.NAME).getAsString();
                    for (let param of action.getParameters()) {
                        if (equals(paramName, param.getName())) {
                            if (value.has(Constant.REQUIRED) &&
                                    get(value, Constant.REQUIRED).getAsBoolean()) {
                                param.setRequired(true);
                            }
                            if (value.has(Constant.INPUT_TYPE)) {
                                let inputType = get(value, Constant.INPUT_TYPE).getAsString();
                                param.setXsdType(ConnectorReader.mapInputTypeToXsd(inputType));
                            }
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            ConnectorReader.log.log(Level.WARNING, "Error reading UI schema for required flags: " + action.getName(), e);
        }
    }

  }

  static mapInputTypeToXsd(inputType: string): string {
    if (inputType == null) {
        return "xs:string";
    }
    switch (inputType) {
        case "number":
        case "integer":
            return "integerOrExpression";
        case "boolean":
        case "booleanOrExpression":
            return "xs:boolean";
        default:
            return "xs:string";
    }

  }

  readOutputSchema(connector: Connector): void {
    let outputSchemaPath = connector.getOutputSchemaPath();
    let outputSchemaFolder = new JFile(outputSchemaPath);
    if (outputSchemaFolder.exists()) {
        let files = outputSchemaFolder.listFiles();
        if (files != null) {
            for (let file of files) {
                let fileName = file.getName();
                let operationName = fileName.substring(0, fileName.indexOf("."));
                connector.addOperationOutputSchema(operationName, file.getAbsolutePath());
            }
        }
    }

  }

  populateConnectionUiSchema(connector: Connector): void {
    let uiSchemaFolder = new JFile(connector.getUiSchemaPath());
    if (uiSchemaFolder.exists()) {
        let files = uiSchemaFolder.listFiles();
        if (files != null) {
            for (let file of files) {
                let connectionName = this.getConnectionSchemaName(file);
                if (connectionName != null) {
                    connector.addConnectionUiSchema(connectionName.toUpperCase(), file.getAbsolutePath());
                }
            }
        }
    }

  }

  getConnectionSchemaName(file: JFile): string {
    let connectionName = null;
    try {
        let schema = Utils.readFile(file);
        let uiJson = Utils.getJsonObject(schema);
        if (uiJson != null) {
            let connectionNameEle = get(uiJson, "connectionName");
            if (connectionNameEle != null) {
                connectionName = connectionNameEle.getAsString();
            }
        }
    } catch (e) {
        ConnectorReader.log.log(Level.WARNING, "Error while reading connection ui schema file", e);
    }
    return connectionName;

  }

  getDependencies(connectorElement: DOMNode): string[] {
    let dependencies = [];
    let children = connectorElement.getChildren();
    for (let child of children) {
        if (equals(child.getNodeName(), Constant.DEPENDENCY)) {
            let dependency = child.getAttribute(Constant.COMPONENT);
            dependencies.push(dependency);
        }
    }
    return dependencies;

  }

  readDependencies(connector: Connector, dependencies: string[]): void {
    for (let dependency of dependencies) {
        let dependencyFile = Path.of(connector.getExtractedConnectorPath(), dependency, "component.xml")
                .toFile();
        if (dependencyFile.exists()) {
            this.readSubComponents(connector, dependencyFile);
        }
    }

  }

  readSubComponents(connector: Connector, dependencyFile: JFile): void {
    try {
        let dependencyDocument = Utils.getDOMDocument(dependencyFile);
        let componentElement = Utils.getChildNodeByName(dependencyDocument, "component");
        let groupName = componentElement.getAttribute(Constant.DISPLAY_NAME);
        let subComponents = Utils.getChildNodeByName(componentElement, "subComponents");
        let children = subComponents.getChildren();
        for (let child of children) {
            if (equals(child.getNodeName(), Constant.COMPONENT)) {
                let action = new ConnectorAction();
                if (StringUtils.isNotEmpty(groupName)) {
                    action.setGroupName(groupName);
                }
                let name = child.getAttribute(Constant.NAME);
                action.setName(name);
                let tag = connector.getName() + Constant.DOT + name;
                if (contains(ConnectorReader.EXCLUDED_AGENT_TOOLS, tag)) { 
                    action.setCanActAsAgentTool(false);
                }
                action.setTag(tag);
                let displayNameNode = Utils.getChildNodeByName(child, Constant.DISPLAY_NAME);
                if (displayNameNode != null) {
                    let displayName = Utils.getInlineString(displayNameNode.getFirstChild());
                    action.setDisplayName(displayName);
                }
                let descriptionNode = Utils.getChildNodeByName(child, Constant.DESCRIPTION);
                if (descriptionNode != null) {
                    let description = Utils.getInlineString(descriptionNode.getFirstChild());
                    action.setDescription(description);
                }
                let fileNode = Utils.getChildNodeByName(child, "file");
                if (fileNode != null) {
                    let fileName = Utils.getInlineString(fileNode.getFirstChild());
                    let actionPath = dependencyFile.getParent() + JFile.separator + fileName;
                    this.populateParameters(action, actionPath);
                }
                let hiddenNode = Utils.getChildNodeByName(child, "hidden");
                if (hiddenNode != null) {
                    let isHidden = Utils.getInlineString(hiddenNode.getFirstChild());
                    action.setHidden(parseBoolean(isHidden));
                } else {
                    action.setHidden(false);
                }
                if (this.allowedConnectionTypesMap.has(action.getName())) {
                    action.setAllowedConnectionTypes(get(this.allowedConnectionTypesMap, action.getName()));
                }
                connector.addAction(action);
            }
        }
    } catch (e) {
        ConnectorReader.log.log(Level.WARNING, "Error while reading " + connector.getName() + " connector", e);
    }

  }

  populateParameters(action: ConnectorAction, actionPath: string): void {
    let actionFile = this.getActionPath(actionPath);
    if (actionFile != null) {
        try {
            let actionDom = Utils.getDOMDocument(actionFile);
            let templateNode = Utils.getChildNodeByName(actionDom, "template");
            if (templateNode != null) {
                let children = templateNode.getChildren();
                let hasResponseVariable = false;
                let hasOverwriteBody = false;
                for (let child of children) {
                    if (equalsIgnoreCase("parameter", child.getNodeName())) {
                        let name = child.getAttribute("name");
                        let description = child.getAttribute("description");
                        action.addParameter(new OperationParameter(name, description));
                        hasResponseVariable = hasResponseVariable || equals(Constant.RESPONSE_VARIABLE, name);
                        hasOverwriteBody = hasOverwriteBody || equals(Constant.OVERWRITE_BODY, name);
                    }
                }
                action.setSupportsResponseModel(hasResponseVariable && hasOverwriteBody);
            }
        } catch (e) {
            ConnectorReader.log.log(Level.WARNING, "Error while reading " + action.getName() + " connector action", e);
        }
    }

  }

  getActionPath(actionPath: string): JFile {
    let dependencyPath = actionPath.substring(0, actionPath.lastIndexOf(JFile.separator));
    let dependencyFolder = new JFile(dependencyPath);
    let files = dependencyFolder.listFiles();
    if (files != null) {
        for (let file of files) {
            if (equalsIgnoreCase(actionPath, file.getAbsolutePath())) {
                return file;
            }
        }
    }
    return null;

  }

  getConnectorName(connectorFolder: JFile): string;
  getConnectorName(zipFile: ZipFile): string;
  getConnectorName(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof JFile) {
          const [connectorFolder] = args;


                  let connectorName = null;
                  let connectorFile = new JFile(connectorFolder.getAbsolutePath() + JFile.separator + "connector.xml");
                  if (connectorFile.exists()) {
                      try {
                          let connectorDocument = Utils.getDOMDocument(connectorFile);
                          connectorName = this.extractConnectorName(connectorDocument);
                      } catch (e) {
                          ConnectorReader.log.log(Level.WARNING, "Error reading connector file", e);
                      }
                  }
                  return connectorName;

        } else if (args[0] instanceof ZipFile) {
          const [zipFile] = args;


                  let connectorName = null;
                  let entry = zipFile.getEntry("connector.xml");
                  if (entry != null) {
                      try {
           let is = zipFile.getInputStream(entry);
                          let content = decodeUtf8(is.readAllBytes());
                          let connectorDocument = Utils.getDOMDocument(content);
                          connectorName = this.extractConnectorName(connectorDocument);
                      } catch (e) {
                          ConnectorReader.log.log(Level.WARNING, "Error reading connector.xml from zip", e);
                      }
                  }
                  return connectorName;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  extractConnectorName(connectorDocument: DOMDocument): string {
    let connectorElement = Utils.getChildNodeByName(connectorDocument, "connector");
    let componentElement = Utils.getChildNodeByName(connectorElement, "component");
    return componentElement.getAttribute(Constant.NAME);

  }
}
