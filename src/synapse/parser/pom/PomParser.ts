// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/pom/PomParser.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, Logger, Level, StringBuilder, joinStr, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Constants } from "../Constants.js";
import { DependencyDetails } from "../DependencyDetails.js";
import { DeployPluginDetails } from "../DeployPluginDetails.js";
import { Files } from "../../host/nio.js";
import { OverviewPageDetailsResponse } from "../OverviewPageDetailsResponse.js";
import { PluginHandler } from "./PluginHandler.js";
import { SAXParserFactory } from "../../host/sax.js";
import { DocumentBuilderFactory, W3Document, W3Element, serializeElement, XMLStreamReader, XMLStreamConstants, XMLStreamException } from "../../host/xmlApis.js";
import { Position } from "../../lsp.js";
import { PropertyDetails } from "../PropertyDetails.js";
import { Range } from "../../lsp.js";
import { TextEdit } from "../../lsp.js";
import { UpdateDependencyRequest } from "../UpdateDependencyRequest.js";
import { UpdatePropertyRequest } from "../UpdatePropertyRequest.js";
import { UpdateResponse } from "../UpdateResponse.js";
import { JFile } from "../../host/JFile.js";

export class PomParser {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("PomParser");

  static pomDetailsResponse?: OverviewPageDetailsResponse;

  static factory: DocumentBuilderFactory = DocumentBuilderFactory.newInstance();

  static hasDependencies: boolean = false;

  static hasProperties: boolean = false;

  static getPomDetails(projectUri: string, detailsResponse: OverviewPageDetailsResponse): void {
    PomParser.pomDetailsResponse = detailsResponse;
    PomParser.extractPomContent(projectUri);

  }

  static updateProperty(projectUri: string, request: UpdatePropertyRequest): UpdateResponse {
    try {
        let builder = PomParser.factory.newDocumentBuilder();
        let document = builder.newDocument();
        let updateResponse = new UpdateResponse();
        let elementInString = new StringBuilder();
        let pomContent = PomParser.readPom(projectUri);

        let propertiesElement = null;
        let initialRange = PomParser.getPropertiesRange(pomContent);
        if (!PomParser.hasProperties) {
            propertiesElement = document.createElement(Constants.PROPERTIES);
        }
        for (let property of request.properties) {
            if (property != null && property.getRange() != null) {
                updateResponse.add(new TextEdit(property.getRange(),
                        PomParser.elementToString(PomParser.createPropertyElement(document, property))));
            } else {
                if (propertiesElement != null) {
                    propertiesElement.appendChild(PomParser.createPropertyElement(document, property));
                } else {
                    elementInString.append(PomParser.elementToString(PomParser.createPropertyElement(document, property)));
                }
            }
        }
        let value =
                (propertiesElement != null) ? PomParser.elementToString(propertiesElement) : String(elementInString);
        if (StringUtils.isEmpty(value)) {
            return null;
        }

        updateResponse.add(new TextEdit(new Range(initialRange.getStart(), initialRange.getStart()), value));
        return updateResponse;
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error parsing the POM file : " + e.getMessage());
        return null;
    }

  }

  static updateDependency(projectUri: string, request: UpdateDependencyRequest): UpdateResponse {
    try {
        let builder = PomParser.factory.newDocumentBuilder();
        let document = builder.newDocument();
        let pomContent: string[] | undefined;
        let updateResponse = new UpdateResponse();
        let dependenciesElement = null;
        let elementInString = new StringBuilder();
        pomContent = PomParser.readPom(projectUri);

        let initialRange = PomParser.getDependenciesStartPosition(pomContent);
        if (!PomParser.hasDependencies) {
            dependenciesElement = document.createElement(Constants.DEPENDENCIES);
        }
        for (let dependency of request.dependencies) {
            if (dependency.getRange() != null) {
                updateResponse.add(new TextEdit(dependency.getRange(),
                        PomParser.elementToString(PomParser.createDependencyElement(document, dependency))));
            } else {
                if (dependenciesElement != null) {
                    dependenciesElement.appendChild(PomParser.createDependencyElement(document, dependency));
                } else {
                    elementInString.append(PomParser.elementToString(PomParser.createDependencyElement(document, dependency)));
                }
            }
        }
        let value: string | undefined;
        if (dependenciesElement != null) {
            value = PomParser.elementToString(dependenciesElement);
        } else {
            value = String(elementInString);
        }
        if (value == null) {
            return null;
        }
        updateResponse.add(new TextEdit(new Range(initialRange, initialRange), value));
        return updateResponse;
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error parsing the POM file : " + e.getMessage());
        return null;
    }

  }

  static addCarDeployPluginToPom(pomFile: JFile, pluginDetails: DeployPluginDetails): DeployPluginDetails {
    try {
        let content = pomFile.readText();
        let factory = DocumentBuilderFactory.newInstance();
        let builder = factory.newDocumentBuilder();
        let doc = builder.parse(content);

        let snippetDoc = builder.newDocument();
        let plugin = snippetDoc.createElement(Constants.PLUGIN);
        PomParser.appendTextElement(snippetDoc, plugin, Constant.GROUP_ID_KEY, "org.wso2.maven");
        PomParser.appendTextElement(snippetDoc, plugin, Constant.ARTIFACT_ID, "maven-car-deploy-plugin");
        PomParser.appendTextElement(snippetDoc, plugin, Constant.VERSION, "5.2.44");

        let executions = snippetDoc.createElement("executions");
        let execution = snippetDoc.createElement("execution");
        PomParser.appendTextElement(snippetDoc, execution, Constant.ID, "car-deploy");
        PomParser.appendTextElement(snippetDoc, execution, "phase", "deploy");
        let goals = snippetDoc.createElement("goals");
        PomParser.appendTextElement(snippetDoc, goals, "goal", "deploy-car");
        execution.appendChild(goals);
        executions.appendChild(execution);
        plugin.appendChild(executions);

        let dependencies = snippetDoc.createElement(Constants.DEPENDENCIES);
        let dependency = snippetDoc.createElement(Constant.DEPENDENCY);
        PomParser.appendTextElement(snippetDoc, dependency, Constant.GROUP_ID_KEY, "com.sun.activation");
        PomParser.appendTextElement(snippetDoc, dependency, Constant.ARTIFACT_ID, "javax.activation");
        PomParser.appendTextElement(snippetDoc, dependency, Constant.VERSION, "1.2.0");
        dependencies.appendChild(dependency);
        plugin.appendChild(dependencies);

        let configuration = snippetDoc.createElement("configuration");
        let carbonServers = snippetDoc.createElement("carbonServers");
        let carbonServer = snippetDoc.createElement("CarbonServer");

        PomParser.appendTextElement(snippetDoc, carbonServer, "trustStorePath", pluginDetails.getTruststorePath());
        PomParser.appendTextElement(snippetDoc, carbonServer, "trustStorePassword", pluginDetails.getTruststorePassword());
        PomParser.appendTextElement(snippetDoc, carbonServer, "trustStoreType", pluginDetails.getTruststoreType());
        PomParser.appendTextElement(snippetDoc, carbonServer, "serverUrl", pluginDetails.getServerUrl());
        PomParser.appendTextElement(snippetDoc, carbonServer, "userName", pluginDetails.getUsername());
        PomParser.appendTextElement(snippetDoc, carbonServer, "password", pluginDetails.getPassword());
        PomParser.appendTextElement(snippetDoc, carbonServer, "serverType", pluginDetails.getServerType());
        PomParser.appendTextElement(snippetDoc, carbonServer, "operation", "deploy");

        carbonServers.appendChild(carbonServer);
        configuration.appendChild(carbonServers);
        plugin.appendChild(configuration);

        let pluginSnippet = serializeElement(plugin, 4);

        let pomContent = PomParser.readPom(pomFile.getParentFile().getAbsolutePath());
        let pluginRange = PomParser.getDeployPluginRange(pomContent);
        if (pluginRange != null) {
            return new DeployPluginDetails(new TextEdit(new Range(pluginRange.getStart(),
                    new Position(pluginRange.getEnd().getLine(),
                    pluginRange.getEnd().getCharacter() + pluginSnippet.length + 1)), pluginSnippet));
        } else {
            let newPluginPosition = PomParser.getNewPluginAddPosition(pomContent);
            return new DeployPluginDetails(new TextEdit(new Range(newPluginPosition,
                     new Position(newPluginPosition.getLine(), newPluginPosition.getCharacter())), pluginSnippet));
        }

    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error occurred while generating plugin configuration: " + e.getMessage());
    }
    return null;

  }

  static extractCarDeployPluginFields(pomFile: JFile): DeployPluginDetails {
    try {
        let factory = DocumentBuilderFactory.newInstance();
        let builder = factory.newDocumentBuilder();
        let doc = builder.parse(pomFile);

        let plugins = doc.getElementsByTagName(Constants.PLUGIN);
        for (let i = 0; i < plugins.length; i++) {
            let plugin = (plugins[i] as W3Element);
            let groupId = PomParser.getTextValue(plugin, Constant.GROUP_ID_KEY);
            let artifactId = PomParser.getTextValue(plugin, Constant.ARTIFACT_ID);

            if (equals("org.wso2.maven", groupId) && equals("maven-car-deploy-plugin", artifactId)) {
                let configuration = PomParser.getFirstChildElementByTagName(plugin, "configuration");
                let carbonServers = PomParser.getFirstChildElementByTagName(configuration, "carbonServers");
                let carbonServer = PomParser.getFirstChildElementByTagName(carbonServers, "CarbonServer");

                if (carbonServer != null) {
                    return new DeployPluginDetails(
                            PomParser.getTextValue(carbonServer, "trustStorePath"),
                            PomParser.getTextValue(carbonServer, "trustStorePassword"),
                            PomParser.getTextValue(carbonServer, "trustStoreType"),
                            PomParser.getTextValue(carbonServer, "serverUrl"),
                            PomParser.getTextValue(carbonServer, "userName"),
                            PomParser.getTextValue(carbonServer, "password"),
                            PomParser.getTextValue(carbonServer, "serverType"));
                }
            }
        }
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error extracting CAR deploy plugin configurations: " + e.getMessage());
    }
    return null;

  }

  static getDeployPluginRange(pomContent: string[]): Range {
    let reader = PomParser.getXMLReader(pomContent);
    let insidePlugin = false;
    let insideArtifactId = false;
    let isTargetPlugin = false;
    let pluginStart = null;
    let pluginEnd = null;

    while (reader.hasNext()) {
        let event = reader.next();
        if (event == XMLStreamConstants.START_ELEMENT) {
            let localName = reader.getLocalName();
            if (equals(localName, Constants.PLUGIN)) {
                insidePlugin = true;
                let startLoc = reader.getLocation();
                pluginStart = new Position(startLoc.getLineNumber(), startLoc.getColumnNumber());
            } else if (insidePlugin && equals(localName, Constants.ARTIFACT_ID)) {
                insideArtifactId = true;
            }
        } else if (event == XMLStreamConstants.CHARACTERS) {
            if (insidePlugin && insideArtifactId) {
                let text = reader.getText().trim();
                if (equals("maven-car-deploy-plugin", text)) {
                    isTargetPlugin = true;
                }
            }
        } else if (event == XMLStreamConstants.END_ELEMENT) {
            let localName = reader.getLocalName();
            if (equals(localName, Constants.ARTIFACT_ID)) {
                insideArtifactId = false;
            } else if (equals(localName, Constants.PLUGIN)) {
                if (insidePlugin && isTargetPlugin) {
                    let endLoc = reader.getLocation();
                    pluginEnd = new Position(endLoc.getLineNumber(), endLoc.getColumnNumber() + "</plugin>".length);
                    break;
                }
                insidePlugin = false;
                isTargetPlugin = false;
                pluginStart = null;
            }
        }
    }
    if (pluginStart != null && pluginEnd != null) {
        return new Range(pluginStart, pluginEnd);
    }
    return null;

  }

  static removeDeployPlugin(pomFile: JFile): TextEdit {
    try {
        let pluginRange = PomParser.getDeployPluginRange(PomParser.readPom(pomFile.getParentFile().getAbsolutePath()));
        if (pluginRange != null) {
            return new TextEdit(pluginRange, StringUtils.EMPTY);
        }
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error getting plugin range from POM file: " + e.getMessage());
    }
    let defaultPosition = new Position(0,0);
    return new TextEdit(new Range(defaultPosition, defaultPosition), StringUtils.EMPTY);

  }

  static readPom(projectUri: string): string[] {
    let pomFile = new JFile(projectUri + JFile.separator + Constants.POM_FILE);
    if (!PomParser.isPomFileExist(pomFile)) {
        return null;
    }
    try {
        return Files.readAllLines(pomFile.toPath());
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error modifying the POM file: " + e.getMessage());
        return null;
    }

  }

  static getPropertiesRange(pomContent: string[]): Range {
    if (pomContent == null || isEmpty(pomContent)) {
        return null;
    }
    let reader = null;
    try {
        reader = PomParser.getXMLReader(pomContent);
        let elementStack = [];
        let startLine = -1, startChar = -1;
        let endLine = -1, endChar = -1;

        while (reader.hasNext()) {
            let event = reader.next();

            if (event == XMLStreamConstants.START_ELEMENT) {
                let localName = reader.getLocalName();
                elementStack.push(localName);

                if (equals(Constants.PROPERTIES, localName) && size(elementStack) == 2 &&
                        equals(Constant.PROJECT, elementStack[0])) {
                    PomParser.hasProperties = true;
                    startLine = reader.getLocation().getLineNumber();
                    startChar = reader.getLocation().getColumnNumber() + localName.length + 2; 
                }
            }

            if (event == XMLStreamConstants.END_ELEMENT) {
                let localName = reader.getLocalName();

                if (equals(Constants.PROPERTIES, localName) && startLine != -1 && size(elementStack) == 2 &&
                        equals(Constant.PROJECT, elementStack[0])) {
                    endLine = reader.getLocation().getLineNumber();
                    endChar = reader.getLocation().getColumnNumber(); 
                    break;
                }

                elementStack.pop();
            }
        }

        if (startLine == -1 || endLine == -1 || startChar == -1 || endChar == -1) {
            return null;
        }

        let start = new Position(startLine, startChar);
        let end = new Position(endLine, endChar);
        return new Range(start, end);

    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error reading the POM file: " + e.getMessage());
        return null;
    } finally {
        if (reader != null) {
            try {
                reader.close();
            } catch (e) {
                PomParser.LOGGER.log(Level.WARNING, "Error closing XMLStreamReader: " + e.getMessage());
            }
        }
    }

  }

  static getDependenciesStartPosition(pomContent: string[]): Position {
    try {
        let reader = PomParser.getXMLReader(pomContent);
        let depth = 0;
        let insideProject = false;
        let propertiesEndPosition = null;

        while (reader.hasNext()) {
            let eventType = reader.next();
            if (eventType == XMLStreamConstants.START_ELEMENT) {
                let localName = reader.getLocalName();
                if (equals(localName, Constant.PROJECT)) {
                    insideProject = true;
                    depth = 1;
                } else if (insideProject) {
                    depth++;
                    if (equals(localName, Constants.DEPENDENCIES) && depth == 2) {
                        let location = reader.getLocation();
                        PomParser.hasDependencies = true;
                        let startLine = location.getLineNumber();
                        let startColumn = location.getColumnNumber();
                        let endColumn = startColumn + localName.length + 2;
                        return new Position(startLine, endColumn);
                    }
                }
            } else if (eventType == XMLStreamConstants.END_ELEMENT) {
                let localName = reader.getLocalName();
                if (equals(localName, Constants.PROPERTIES) && depth == 2) {
                    let location = reader.getLocation();
                    PomParser.hasDependencies = false;
                    let startLine = location.getLineNumber();
                    let startColumn = location.getColumnNumber();
                    let endColumn = startColumn + localName.length + 4;
                    propertiesEndPosition = new Position(startLine, endColumn);
                }
                depth--;
            }
        }
        return propertiesEndPosition != null ? propertiesEndPosition : new Position(0, 0);
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error reading the POM file: " + e.getMessage());
        return null;
    }

  }

  static createPropertyElement(document: W3Document, propertyDetails: PropertyDetails): W3Element {
    let property = document.createElement(propertyDetails.getName());
    property.setTextContent(propertyDetails.getValue());
    return property;

  }

  static createDependencyElement(document: W3Document, dependencyDetails: DependencyDetails): W3Element {
    let dependency = document.createElement(Constants.DEPENDENCY);
    let groupId = document.createElement(Constants.GROUP_ID);
    groupId.setTextContent(dependencyDetails.getGroupId());
    dependency.appendChild(groupId);
    let artifactId = document.createElement(Constants.ARTIFACT_ID);
    artifactId.setTextContent(dependencyDetails.getArtifact());
    dependency.appendChild(artifactId);
    let version = document.createElement(Constants.VERSION);
    version.setTextContent(dependencyDetails.getVersion());
    dependency.appendChild(version);
    if (dependencyDetails.getType() != null) {
        let type = document.createElement(Constants.TYPE);
        type.setTextContent(dependencyDetails.getType() );
        dependency.appendChild(type);
        let exclusion = document.createElement(Constants.EXCLUSION);
        let conGroupId = document.createElement(Constants.GROUP_ID);
        conGroupId.setTextContent("*");
        exclusion.appendChild(conGroupId);
        let conArtifactId = document.createElement(Constants.ARTIFACT_ID);
        conArtifactId.setTextContent("*");
        exclusion.appendChild(conArtifactId);
        let exclusions = document.createElement(Constants.EXCLUSIONS);
        exclusions.appendChild(exclusion);
        dependency.appendChild(exclusions);
    }
    return dependency;

  }

  static extractPomContent(projectUri: string): void {
    try {
        let pomFile = new JFile(projectUri + JFile.separator + Constants.POM_FILE);
        if (!PomParser.isPomFileExist(pomFile)) {
            return;
        }
        let factory = new SAXParserFactory();
        let saxParser = factory.newSAXParser();
        let handler = new PluginHandler(PomParser.pomDetailsResponse);
        saxParser.parse(pomFile, handler);
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error configuring the parser for the POM file: " + e.getMessage());
    }

  }

  static isPomFileExist(pomFile: JFile): boolean {
    if (!pomFile.exists()) {
        PomParser.LOGGER.log(Level.SEVERE, "POM file does not exist: " + pomFile.getAbsolutePath());
        return false;
    }
    return true;

  }

  static elementToString(element: W3Element): string {
    try {
        return serializeElement(element, 4).trim();
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error processing the XML element: " + e.getMessage());
        return null;
    }
  }

  static getNewPluginAddPosition(pomContent: string[]): Position {
    try {
        let reader = PomParser.getXMLReader(pomContent);
        let inProfiles = false;
        let inProfile = false;
        let isDefaultProfile = false;
        let inId = false;
        let inPlugins = false;
        let lastPluginEnd = null;
        let depth = 0;

        while (reader.hasNext()) {
            let event = reader.next();
            if (event == XMLStreamConstants.START_ELEMENT) {
                depth++;
                let localName = reader.getLocalName();
                if (equals(localName, Constant.PROFILES)) {
                    inProfiles = true;
                } else if (inProfiles && equals(localName, Constant.PROFILE)) {
                    inProfile = true;
                    isDefaultProfile = false;
                } else if (inProfile && equals(localName, Constant.ID)) {
                    inId = true;
                } else if (inProfile && isDefaultProfile && equals(localName, Constants.PLUGINS)) {
                    inPlugins = true;
                }
            } else if (event == XMLStreamConstants.CHARACTERS) {
                if (inId && inProfile) {
                    let idText = reader.getText().trim();
                    if (equals(idText, Constant.DEFAULT)) {
                        isDefaultProfile = true;
                    }
                }
            } else if (event == XMLStreamConstants.END_ELEMENT) {
                let localName = reader.getLocalName();
                if (equals(localName, Constant.ID)) {
                    inId = false;
                } else if (equals(localName, Constants.PLUGINS)) {
                    inPlugins = false;
                } else if (equals(localName, Constant.PROFILE)) {
                    inProfile = false;
                } else if (equals(localName, Constant.PROFILES)) {
                    inProfiles = false;
                }
                if (inPlugins && equals(localName, Constants.PLUGIN)) {
                    let location = reader.getLocation();
                    lastPluginEnd = new Position(location.getLineNumber(), location.getColumnNumber() + localName.length + 3);
                }
                depth--;
            }
        }
        return lastPluginEnd != null ? lastPluginEnd : new Position(0, 0);
    } catch (e) {
        PomParser.LOGGER.log(Level.SEVERE, "Error reading the POM file: " + e.getMessage());
        return null;
    }

  }

  static appendTextElement(doc: W3Document, parent: W3Element, tag: string, value: string): void {
    let elem = doc.createElement(tag);
    elem.setTextContent(value);
    parent.appendChild(elem);

  }

  static getTextValue(parent: W3Element, tagName: string): string {
    let list = parent.getElementsByTagName(tagName);
    if (list.length > 0) {
        return list[0].getTextContent().trim();
    }
    return null;

  }

  static getFirstChildElementByTagName(parent: W3Element, tagName: string): W3Element {
    let children = parent.getElementsByTagName(tagName);
    for (let i = 0; i < children.length; i++) {
        let item = children[i];
        if (item.getParentNode() === parent) {
            return (item as W3Element);
        }
    }
    return null;

  }

  static getXMLReader(pomContent: string[]): XMLStreamReader {
    let xml = joinStr("\n", pomContent);
    return new XMLStreamReader(xml);

  }
}
