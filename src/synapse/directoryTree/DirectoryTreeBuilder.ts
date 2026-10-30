// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/DirectoryTreeBuilder.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, size, get, jsplit, Logger, Level, StringBuilder, removeFrom } from "../../syntaxTree/javaCompat.js";
import { APINode } from "./node/APINode.js";
import { APIResource } from "./node/APIResource.js";
import { AdvancedNode } from "./node/AdvancedNode.js";
import { ConnectionNode } from "./node/ConnectionNode.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { DOMNode } from "../../syntaxTree/dom/dom.js";
import { DirectoryMapResponse } from "./DirectoryMapResponse.js";
import { DirectoryTreeUtils } from "./utils/DirectoryTreeUtils.js";
import { DistributionDirectoryTree } from "./DistributionDirectoryTree.js";
import { FileNode } from "./node/FileNode.js";
import { FolderNode } from "./node/FolderNode.js";
import { IOException } from "../host/nio.js";
import { InboundEndpoint } from "../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { IntegrationDirectoryTree } from "./IntegrationDirectoryTree.js";
import { JsonParser } from "../gson.js";
import { ObjectMapper, JsonNode, ObjectNode, ArrayNode } from "../jackson.js";
import { LegacyDirectoryTreeBuilder } from "./legacyBuilder/LegacyDirectoryTreeBuilder.js";
import { MessageProcessor } from "../../syntaxTree/pojo/MessageProcessor.js";
import { MessageStore } from "../../syntaxTree/pojo/MessageStore.js";
import { NamedEndpoint } from "../../syntaxTree/pojo/endpoint/NamedEndpoint.js";
import { Node } from "./node/Node.js";
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { RegistryNode } from "./node/RegistryNode.js";
import { SequenceNode } from "./node/SequenceNode.js";
import { SyntaxTreeGenerator } from "../../syntaxTree/SyntaxTreeGenerator.js";
import { Template } from "../../syntaxTree/pojo/template/Template.js";
import { TestFolder } from "./node/TestFolder.js";
import { Utils } from "../../syntaxTree/utils.js";
import { WorkspaceFolder } from "../lsp.js";
import { JFile } from "../host/JFile.js";

export class DirectoryTreeBuilder {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("DirectoryTreeBuilder");

  static readonly MAIN: string = "main";

  static readonly WSO2MI: string = "wso2mi";

  static readonly RESOURCES: string = "resources";

  static readonly JAVA: string = "java";

  static projectPath?: string;

  static mainSequence?: string;

  static artifactResourcePaths: string[] = [];

  static buildDirectoryTree(projectFolder: WorkspaceFolder): DirectoryMapResponse {

    if (DirectoryTreeUtils.isLegacyProject(projectFolder)) {
        return LegacyDirectoryTreeBuilder.buildDirectoryTree(projectFolder);
    }
    try {
        let encodedPath = projectFolder.getUri();
        if (encodedPath.startsWith(Constant.FILE_PREFIX)) {
            encodedPath = encodedPath.substring(7);
        }
        DirectoryTreeBuilder.projectPath = decodeURIComponent(encodedPath);
    } catch (e) {
        DirectoryTreeBuilder.LOGGER.log(Level.SEVERE, "Could not decode the file path.", e);
    }
    let directoryTree = null;
    if (DirectoryTreeBuilder.projectPath != null) {
        let projectType = DirectoryTreeUtils.getProjectType(DirectoryTreeBuilder.projectPath);
        if (equalsIgnoreCase(Constant.INTEGRATION_PROJECT, projectType)) {
            DirectoryTreeBuilder.updateMainSequence();
            directoryTree = new IntegrationDirectoryTree(DirectoryTreeBuilder.projectPath, projectType);
            DirectoryTreeBuilder.analyzeIntegrationProject((directoryTree as IntegrationDirectoryTree));
            ((directoryTree as IntegrationDirectoryTree)).sort();
        } else if (equalsIgnoreCase(Constant.DOCKER_PROJECT, projectType) || equalsIgnoreCase(Constant.KUBERNETES_PROJECT, projectType)) {
            directoryTree = new DistributionDirectoryTree(DirectoryTreeBuilder.projectPath, projectType);
            DirectoryTreeBuilder.analyzeDistributionProject((directoryTree as DistributionDirectoryTree));
        }
    }

    let directoryMapResponse = new DirectoryMapResponse(directoryTree);
    return directoryMapResponse;

  }

  static getProjectExplorerModel(projectFolder: WorkspaceFolder): DirectoryMapResponse {
    let directoryMap = DirectoryTreeBuilder.buildDirectoryTree(projectFolder);
    if (directoryMap.getDirectoryMap() == null) {
        DirectoryTreeBuilder.LOGGER.log(Level.SEVERE, "Error occurred while building directory tree.");
        return null;
    }
    try {
        let mapper = new ObjectMapper();
        let root = mapper.readTree(String(directoryMap.getDirectoryMap().getAsJsonObject()));
        DirectoryTreeBuilder.removeGitkeepFiles(root);
        let artifacts = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.WSO2MI).path(Constant.ARTIFACTS);
        let resources = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.WSO2MI).path(Constant.RESOURCES);
        let newArtifacts = mapper.createObjectNode();

        newArtifacts.set("APIs", artifacts.path(Constant.APIS));
        newArtifacts.set("Event Integrations", artifacts.path(Constant.INBOUNDENDPOINTS));
        newArtifacts.set("Automations", artifacts.path(Constant.TASKS));
        newArtifacts.set("Data Services", artifacts.path(Constant.DATA_SERVICES));

        let otherArtifacts = newArtifacts.putObject("Other Artifacts");
        otherArtifacts.set("Sequences", artifacts.path(Constant.SEQUENCES));
        otherArtifacts.set("Connections", artifacts.path(Constant.CONNECTIONS));
        otherArtifacts.set("Data Sources", artifacts.path(Constant.DATA_SOURCES));

        let classMediatorArray = mapper.createArrayNode();
        let mediatorFolders = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.JAVA).path(Constant.FOLDERS);
        DirectoryTreeBuilder.extractClassMediators(mediatorFolders, classMediatorArray);
        otherArtifacts.set("Class Mediators", classMediatorArray);

        let ballerinaModulesArray = mapper.createArrayNode();
        let moduleFolders = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(Constant.BALLERINA).path(Constant.FOLDERS);
        DirectoryTreeBuilder.extractBallerinaModules(moduleFolders, ballerinaModulesArray);
        otherArtifacts.set("Ballerina Modules", ballerinaModulesArray);

        otherArtifacts.set("Endpoints", artifacts.path(Constant.ENDPOINTS));
        otherArtifacts.set("Proxy Services", artifacts.path(Constant.PROXYSERVICES));
        otherArtifacts.set("Message Stores", artifacts.path(Constant.MESSAGE_STORES));
        otherArtifacts.set("Message Processors", artifacts.path(Constant.MESSAGE_PROCESSORS));
        otherArtifacts.set("Local Entries", artifacts.path(Constant.LOCALENTRIES));
        otherArtifacts.set("Templates", artifacts.path(Constant.TEMPLATES));

        let registryFolders = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.WSO2MI).path(Constant.RESOURCES)
                .path(Constant.REGISTRY).path(Constant.GOV).path(Constant.FOLDERS);
        let newResources = resources.path(Constant.NEW_RESOURCES);
        let newResourcesFolders = newResources.path(Constant.FOLDERS);
        newArtifacts.set("Resources", newResources);

        let dataMapperConfigs = DirectoryTreeBuilder.getDataMapperConfigs(mapper, registryFolders, newResourcesFolders);

        if (isEmpty(dataMapperConfigs)) {
            otherArtifacts.set("Data Mappers", mapper.createArrayNode());
        } else {
            otherArtifacts.set("Data Mappers", dataMapperConfigs);
        }

        ((root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.WSO2MI) as ObjectNode)).set(Constant.ARTIFACTS, newArtifacts);
        let objectMapper = new ObjectMapper();
        let jsonNodeAsString = objectMapper.writeValueAsString(root);
        directoryMap.setDirectoryMap(JsonParser.parseString(jsonNodeAsString));
        return directoryMap;

    } catch (e) {
        DirectoryTreeBuilder.LOGGER.log(Level.SEVERE, "Error occurred while building the project explorer directory tree.", e);
        return null;
    }

  }

  static removeGitkeepFiles(node: JsonNode): void {
    if (node == null || node.isMissingNode()) {
        return;
    }
    if (node.isObject()) {
        let obj = (node as ObjectNode);
        let fieldsToRemove = [];

        obj.fieldNames().forEachRemaining(field => {
            let child = get(obj, field);
            if (child.isObject() && child.has(Constant.NAME) &&
                    equals(Constant.GITKEEP, get(child, Constant.NAME).asText())) {
                fieldsToRemove.push(field);
            } else {
                DirectoryTreeBuilder.removeGitkeepFiles(child);
            }
        });
        fieldsToRemove.forEach((a) => removeFrom(obj, a));
    } else if (node.isArray()) {
        let arrayNode = (node as ArrayNode);
        let itemsToRemove = [];
        for (let index = 0; index < size(arrayNode); index++) {
            let child = get(arrayNode, index);
            if (child.isObject() && child.has(Constant.NAME) &&
                    equals(Constant.GITKEEP, get(child, Constant.NAME).asText())) {
                itemsToRemove.push(index);
            } else {
                DirectoryTreeBuilder.removeGitkeepFiles(child);
            }
        }
        for (let index = size(itemsToRemove) - 1; index >= 0; index--) {
            removeFrom(arrayNode, get(itemsToRemove, index));
        }
    }

  }

  static getDataMapperConfigs(mapper: ObjectMapper, registryFolders: JsonNode, newResourcesFolders: JsonNode): ArrayNode {
    let dataMappersNode = mapper.createArrayNode();
    for (let resourceFolder of newResourcesFolders) {
        if (equals(Constant.DATA_MAPPER, resourceFolder.path(Constant.NAME).asText())) {
            dataMappersNode.push(...(resourceFolder.path(Constant.FOLDERS) as ArrayNode));
            break;
        }
    }
    for (let registryFolder of registryFolders) {
        if (equals(Constant.DATA_MAPPER, registryFolder.path(Constant.NAME).asText())) {
            dataMappersNode.push(...(registryFolder.path(Constant.FOLDERS) as ArrayNode));
            break;
        }
    }
    return dataMappersNode;

  }

  static getProjectIdentifiers(projectFolder: WorkspaceFolder, filePaths: string[]): string[] {
    let result = [];
    let directoryMap = DirectoryTreeBuilder.buildDirectoryTree(projectFolder);
    try {
        let mapper = new ObjectMapper();
        let root = mapper.readTree(String(directoryMap.getDirectoryMap().getAsJsonObject()));
        let artifacts = root.path(Constant.SRC).path(DirectoryTreeBuilder.MAIN).path(DirectoryTreeBuilder.WSO2MI).path(Constant.ARTIFACTS);
        artifacts.fields().forEachRemaining(entry => {
            let artifactType = entry.getKey();
            let artifactEntries = entry.getValue();
            if (artifactEntries.isArray()) {
                for (let artifactEntryNode of artifactEntries) {
                    let path = artifactEntryNode.path(Constant.PATH).asText();
                    if (contains(filePaths, path)) {
                        result.push(artifactType + JFile.separator +
                                jsplit(path.substring(path.lastIndexOf(JFile.separator) + 1), "\\.")[0]);
                    }
                }
            }
        });
        return result;
    } catch (ex) {
        return [];
    }

  }

  static updateMainSequence(): void {
    DirectoryTreeBuilder.mainSequence = null;
    let pomPath = Path.of(DirectoryTreeBuilder.projectPath, "pom.xml");
    let pomFile = pomPath.toFile();
    if (pomFile.exists()) {
        try {
            let pom = Utils.getDOMDocument(pomFile);
            let profiles = Utils.getChildNodeByName(pom.getDocumentElement(), Constant.PROFILES);
            let profileList = profiles.getChildren();
            profileList.forEach(profile => {
                let profileId = Utils.getChildNodeByName(profile, Constant.ID);
                if (profileId != null && equals(Constant.DEFAULT, Utils.getInlineString(profileId.getFirstChild()))) {
                    let properties = Utils.getChildNodeByName(profile, Constant.PROPERTIES);
                    if (properties != null) {
                        let mainSequenceNode = Utils.getChildNodeByName(properties, Constant.MAIN_SEQUENCE);
                        if (mainSequenceNode != null) {
                            DirectoryTreeBuilder.mainSequence = Utils.getInlineString(mainSequenceNode.getFirstChild());
                            return;
                        }
                    }
                }
            });
        } catch (e) {
            DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Could not read project pom file");
        }
    }

  }

  static analyzeIntegrationProject(directoryTree: IntegrationDirectoryTree): void {
    DirectoryTreeBuilder.artifactResourcePaths = [];
    DirectoryTreeBuilder.analyzeArtifacts(directoryTree);
    DirectoryTreeBuilder.analyzeResources(directoryTree);
    DirectoryTreeBuilder.analyzeJavaProjects(directoryTree);
    DirectoryTreeBuilder.analyzeBallerinaProjects(directoryTree);
    DirectoryTreeBuilder.analyzeTestsFolder(directoryTree);

  }

  static analyzeDistributionProject(directoryTree: DistributionDirectoryTree): void {
    DirectoryTreeBuilder.artifactResourcePaths = [];
    let folder = new JFile(DirectoryTreeBuilder.projectPath);
    if (folder != null && folder.exists() && !folder.isHidden()) {
        let folderName = folder.getName();
        let folderNode = new FolderNode(folderName, DirectoryTreeBuilder.projectPath);
        DirectoryTreeBuilder.traverseFolder(folderNode, null);
        directoryTree.setFolders(folderNode.getFolders());
        directoryTree.setFiles(folderNode.getFiles());
    }

  }

  static analyzeArtifacts(directoryTree: IntegrationDirectoryTree): void {
    let artifactsPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + DirectoryTreeBuilder.MAIN
            + JFile.separator + DirectoryTreeBuilder.WSO2MI + JFile.separator + "artifacts";
    let folder = new JFile(artifactsPath);
    let listOfFiles = folder.listFiles((x) => x.isDirectory());
    if (listOfFiles != null) {
        for (let subFolder of listOfFiles) {
            try {
                if (subFolder.isDirectory()) {
                    let type = DirectoryTreeBuilder.getType(subFolder.getName());
                    DirectoryTreeBuilder.analyzeByType(directoryTree, subFolder, type);
                }
            } catch (e) {
                DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "No read access to the file.", e);
            }
        }
    }

  }

  static getType(name: string): string {
    let name1 = Utils.removeHyphen(name);
    name1 = Utils.pluralToSingular(name1);
    name1 = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    return name1;

  }

  static analyzeByType(directoryTree: IntegrationDirectoryTree, folder: JFile, type: string): void {
    try {
        let listOfFiles = folder.listFiles();
        if (listOfFiles != null) {
            for (let file of listOfFiles) {
                if (file.isFile() && !file.isHidden()) {
                    let name = file.getName();
                    let path = file.getAbsolutePath();
                    let advancedComponent = DirectoryTreeBuilder.createEsbComponent(type, name, path);
                    if (advancedComponent != null) {
                        try {
                            let methodName: string | undefined;
                            if (advancedComponent instanceof ConnectionNode) {
                                methodName = "addConnection";
                            } else {
                                methodName = "add" + type;
                            }
                            directoryTree[methodName](advancedComponent);
                        } catch (e) {
                            DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while trying to execute method.", e);
                        }
                    }
                }
            }
        }
    } catch (e) {
        DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "No read access to the file.", e);
    }

  }

  static analyzeResources(directoryTree: IntegrationDirectoryTree): void {
    DirectoryTreeBuilder.analyzeRegistryResources(directoryTree);
    DirectoryTreeBuilder.analyzeConnectorResources(directoryTree);
    DirectoryTreeBuilder.analyzeMetadataResources(directoryTree);
    DirectoryTreeBuilder.analyzeNewResources(directoryTree);

  }

  static analyzeNewResources(directoryTree: IntegrationDirectoryTree): void {
    let registryPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator +
            DirectoryTreeBuilder.MAIN + JFile.separator + DirectoryTreeBuilder.WSO2MI + JFile.separator + DirectoryTreeBuilder.RESOURCES;
    let folder = new JFile(registryPath);
    if (folder != null && folder.exists()) {
        if (!folder.isHidden()) {
            let folderName = folder.getName();
            let resourceFolderNode = new FolderNode(folderName, registryPath);
            DirectoryTreeBuilder.traverseFolder(resourceFolderNode, directoryTree);
            directoryTree.getResources().setNewResources(resourceFolderNode);
        }
    }

  }

  static analyzeRegistryResources(directoryTree: IntegrationDirectoryTree): void {
    DirectoryTreeBuilder.analyzeRegistryByType(directoryTree, Constant.GOV);
    DirectoryTreeBuilder.analyzeRegistryByType(directoryTree, Constant.CONF);

  }

  static analyzeRegistryByType(directoryTree: IntegrationDirectoryTree, type: string): void {
    let registryPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator +
            DirectoryTreeBuilder.MAIN + JFile.separator + DirectoryTreeBuilder.WSO2MI + JFile.separator + DirectoryTreeBuilder.RESOURCES +
            JFile.separator + Constant.REGISTRY + JFile.separator + type;
    let folder = new JFile(registryPath);
    if (folder != null && folder.exists()) {
        if (!folder.isHidden()) {
            let folderName = folder.getName();
            let registryFolderNode = new FolderNode(folderName, registryPath);
            DirectoryTreeBuilder.traverseFolder(registryFolderNode, directoryTree);
            if (equalsIgnoreCase(Constant.GOV, type)) {
                directoryTree.getResources().getRegistry().setGov(registryFolderNode);
            } else if (equalsIgnoreCase(Constant.CONF, type)) {
                directoryTree.getResources().getRegistry().setConf(registryFolderNode);
            }
        }
    }

  }

  static analyzeConnectorResources(directoryTree: IntegrationDirectoryTree): void {
    let connectorPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + DirectoryTreeBuilder.MAIN
            + JFile.separator + DirectoryTreeBuilder.WSO2MI + JFile.separator + DirectoryTreeBuilder.RESOURCES + JFile.separator + "connectors";
    let folder = new JFile(connectorPath);
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (Utils.isZipFile(file) && !file.isHidden()) {
                let name = file.getName();
                let path = file.getAbsolutePath();
                let resource = new Node("connector", name, path);
                directoryTree.getResources().addConnector(resource);
            }
        }
    }

  }

  static analyzeMetadataResources(directoryTree: IntegrationDirectoryTree): void {
    let metadataPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + DirectoryTreeBuilder.MAIN +
            JFile.separator + DirectoryTreeBuilder.WSO2MI + JFile.separator + DirectoryTreeBuilder.RESOURCES +
            JFile.separator + "metadata";
    let folder = new JFile(metadataPath);
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (file.isFile() && !file.isHidden()) {
                let name = file.getName();
                let path = file.getAbsolutePath();
                let resource = new Node("metadata", name, path);
                directoryTree.getResources().addMetadata(resource);
            }
        }
    }

  }

  static analyzeJavaProjects(directoryTree: IntegrationDirectoryTree): void {
    let javaPath =
            DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + DirectoryTreeBuilder.MAIN +
                    JFile.separator + DirectoryTreeBuilder.JAVA;
    let folder = new JFile(javaPath);
    if (folder != null && folder.exists()) {
        if (!folder.isHidden()) {
            let folderName = folder.getName();
            let javaFolderNode = new FolderNode(folderName, javaPath);
            DirectoryTreeBuilder.traverseFolder(javaFolderNode, null);
            directoryTree.setJava(javaFolderNode);
        }
    }

  }

  static analyzeBallerinaProjects(directoryTree: IntegrationDirectoryTree): void {
    let ballerinaPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + DirectoryTreeBuilder.MAIN +
                    JFile.separator + Constant.BALLERINA;
    let folder = new JFile(ballerinaPath);
    if (folder.exists() && !folder.isHidden()) {
        let folderName = folder.getName();
        let ballerinaFolderNode = new FolderNode(folderName, ballerinaPath);
        DirectoryTreeBuilder.traverseFolder(ballerinaFolderNode, null);
        directoryTree.setBallerina(ballerinaFolderNode);
    }

  }

  static analyzeTestsFolder(directoryTree: IntegrationDirectoryTree): void {
    let testFolder = new TestFolder();
    let testsPath = DirectoryTreeBuilder.projectPath + JFile.separator + Constant.SRC + JFile.separator + "test";
    DirectoryTreeBuilder.analyzeSubTestFolder(testsPath, DirectoryTreeBuilder.WSO2MI, (a) => testFolder.setWso2mi(a));
    DirectoryTreeBuilder.analyzeSubTestFolder(testsPath, DirectoryTreeBuilder.JAVA, (a) => testFolder.setJava(a));
    directoryTree.setTests(testFolder);

  }

  static analyzeSubTestFolder(testPath: string, testName: string, setter: (n: FolderNode) => void): void {
    let subFolder = new JFile(testPath + JFile.separator + testName);
    if (subFolder != null && subFolder.exists() && !subFolder.isHidden()) {
        let folderName = subFolder.getName();
        let testsFolderNode = new FolderNode(folderName, testPath);
        DirectoryTreeBuilder.traverseFolder(testsFolderNode, null);
        setter(testsFolderNode);
    }

  }

  static traverseFolder(folderNode: FolderNode, directoryTree: IntegrationDirectoryTree): void {
    let listOfFiles = folderNode.listFiles();
    for (let file of listOfFiles) {
        if (Utils.isRegistryPropertiesFile(file)) {
            continue;
        }
        if (file.getAbsolutePath().endsWith(String(Path.of(Constant.RESOURCES, Constant.ARTIFACT_XML))) ||
                file.getAbsolutePath().endsWith(String(Path.of(Constant.RESOURCES, Constant.REGISTRY, Constant.ARTIFACT_XML)))) {
            continue;
        }
        if (file.isFile() && !file.isHidden()) {
            let name = file.getName();
            let filePath = file.getAbsolutePath();
            let fileNodeComponent = new FileNode(name, filePath);
            folderNode.addFile(fileNodeComponent);
            if (directoryTree != null) {
                if (!contains(DirectoryTreeBuilder.artifactResourcePaths, filePath)) {
                    DirectoryTreeBuilder.addResourceToIntegrationTree(directoryTree, filePath);
                    DirectoryTreeBuilder.artifactResourcePaths.push(filePath);
                }
            }
        } else if (file.isDirectory() && !file.isHidden()) {
            let name = file.getName();
            let folderPath = file.getAbsolutePath();
            let subFolderNode = new FolderNode(name, folderPath);
            folderNode.addFolder(subFolderNode);
            DirectoryTreeBuilder.traverseFolder(subFolderNode, directoryTree);
        }
    }

  }

  static addResourceToIntegrationTree(directoryTree: IntegrationDirectoryTree, path: string): void {
    if (path.endsWith(".xml")) {
        try {
            let file = new JFile(path);
            let domDocument = Utils.getDOMDocument(file);
            let rootElement = Utils.getRootElementFromConfigXml(domDocument);

            if (rootElement != null) {
                let type = rootElement.getNodeName();
                let name = file.getName();
                type = DirectoryTreeBuilder.getType(type);
                let regNode = DirectoryTreeBuilder.createRegistryNode(name, type, path);
                let methodName = "add" + type;
                directoryTree[methodName](regNode);
            }
        } catch (e) {
            DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
        }
    }

  }

  static createRegistryNode(name: string, type: string, path: string): Node {
    let key = new StringBuilder();
    if (contains(path, Constant.GOV)) {
        key.append(Constant.GOV);
    } else {
        key.append(Constant.CONF);
    }
    let key1 = path.substring(path.indexOf(String(key)) + key.length() + 1,
            path.lastIndexOf(JFile.separator) + 1);
    key.append(":");
    key.append(key1);
    let node = DirectoryTreeBuilder.createEsbComponent(type, name, path);
    let registry = new RegistryNode(node, String(key));
    return registry;

  }

  static createEsbComponent(type: string, name: string, path: string): Node {
    let artifactName: string | undefined;
    let nodeType = Utils.addUnderscoreBetweenWords(type).toUpperCase();
    try {
        artifactName = DirectoryTreeBuilder.getArtifactName(type, path);
    } catch (e) {

        let invalidNode = new Node(nodeType, name, path);
        invalidNode.setFaulty(true);
        return invalidNode;
    }
    if (artifactName == null) artifactName = name;
    let component = new Node(nodeType, artifactName, path);
    DirectoryTreeBuilder.setSubType(component, type, path);
    if (equalsIgnoreCase(Constant.API, type) || equalsIgnoreCase(Constant.SEQUENCE, type) ||
            equalsIgnoreCase(Constant.PROXY_SERVICE, type) || equalsIgnoreCase(Constant.INBOUND_ENDPOINT, type)) {
        let advancedNode = DirectoryTreeBuilder.createAdvancedEsbComponent(component, type, path);
        return advancedNode;
    } else if (equalsIgnoreCase(Constant.LOCAL_ENTRY, type)) {
        let localEntry = DirectoryTreeBuilder.createLocalEntry(component, path);
        return localEntry;
    }

    return component;

  }

  static setSubType(component: Node, type: string, path: string): void {
    let file = new JFile(path);
    try {
        let domDocument = Utils.getDOMDocument(file);
        let stNode = SyntaxTreeGenerator.buildTree(domDocument.getDocumentElement());
        switch (type) {
            case "Endpoint":
                let endpoint = (stNode as NamedEndpoint);
                let endpointType = endpoint.getType().name();
                component.setSubType(endpointType);
                break;
            case "Template":
                let template = (stNode as Template);
                let templateType = template.getType().name();
                component.setSubType(templateType);
                break;
            case "MessageProcessor":
                let messageProcessor = (stNode as MessageProcessor);
                let mpType = messageProcessor.getType().name();
                component.setSubType(mpType);
                break;
            case "MessageStore":
                let messageStore = (stNode as MessageStore);
                let messageStoreType = messageStore.getType().name();
                component.setSubType(messageStoreType);
                break;
            case "InboundEndpoint":
                let inboundEndpoint = (stNode as InboundEndpoint);
                let ibType = inboundEndpoint.getType();
                component.setSubType(ibType);
                break;
        }
    } catch (e) {
        DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading artifact", e);
    }

  }

  static createAdvancedEsbComponent(component: Node, type: string, path: string): AdvancedNode {
    let advancedNode: AdvancedNode | undefined;
    switch (type.toLowerCase()) {
        case Constant.API:
            let context = DirectoryTreeBuilder.getApiContext(path);
            advancedNode = new APINode(component);
            ((advancedNode as APINode)).setContext(context);
            break;
        case Constant.SEQUENCE:
            advancedNode = new SequenceNode(component);
            if (DirectoryTreeBuilder.mainSequence != null) {
                if (equalsIgnoreCase(DirectoryTreeBuilder.mainSequence, advancedNode.getName())) {
                    ((advancedNode as SequenceNode)).setMainSequence(true);
                }
            }
            break;
        default:
            advancedNode = new AdvancedNode(component);
    }
    let file = new JFile(path);
    if (file.isFile() && !file.isHidden()) {
        let domDocument = null;
        try {
            domDocument = Utils.getDOMDocument(file);
        } catch (e) {
            DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
        }
        let rootElement = Utils.getRootElementFromConfigXml(domDocument);
        if (equalsIgnoreCase(Constant.API, type)) {
            DirectoryTreeBuilder.addResources(rootElement, advancedNode);
        }
    }
    return advancedNode;

  }

  static createLocalEntry(component: Node, path: string): Node {
    let file = new JFile(path);
    try {
        let domDocument = Utils.getDOMDocument(file);
        if (domDocument != null) {
            let rootElement = domDocument.getDocumentElement();
            let key = rootElement.getAttribute(Constant.KEY);
            let childElement = Utils.getFirstElement(rootElement);
            if (childElement != null) {
                let entryTag = childElement.getNodeName();
                let pattern = Pattern.compile("(.*)\\.init");
                let matcher = pattern.matcher(entryTag);
                if (matcher.find()) {
                    let connectorName = matcher.group(1);
                    let connectionType = DirectoryTreeBuilder.getConnectionType(childElement);
                    let connectionNode = new ConnectionNode(key, path, connectorName, connectionType);
                    return connectionNode;
                }
            }
        }
    } catch (e) {
        DirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
    }
    return component;

  }

  static getConnectionType(element: DOMElement): string {
    let children = element.getChildren();
    if (children != null) {
        for (let child of children) {
            let nodeName = child.getNodeName();
            if (equals("connectionType", nodeName)) {
                let connectionType = Utils.getInlineString(child.getFirstChild());
                return connectionType;
            }
        }
    }
    return null;

  }

  static getApiContext(path: string): string {
    let file = new JFile(path);
    let domDocument = null;
    try {
        domDocument = Utils.getDOMDocument(file);
        let node = Utils.getChildNodeByName(domDocument, Constant.API);
        if (node != null) {
            let context = node.getAttribute(Constant.CONTEXT);
            return context;
        }
    } catch (e) {

    }
    return null;

  }

  static getArtifactName(type: string, path: string): string {
    let file = new JFile(path);
    let domDocument = Utils.getDOMDocument(file);

    let tag = DirectoryTreeBuilder.getArtifactTag(type);

    let node = Utils.getChildNodeByName(domDocument, tag);
    if (node != null) {
        if (equalsIgnoreCase(Constant.API, type)) {
            return DirectoryTreeBuilder.getApiArtifactName(node);
        } else {
            return DirectoryTreeBuilder.getNonApiArtifactName(node);
        }
    } else {
        throw new IOException("Invalid artifact in the artifact folder: " + type);
    }

  }

  static getApiArtifactName(node: DOMNode): string {
    let name = new StringBuilder();
    name.append(node.getAttribute(Constant.NAME));
    if (node.hasAttribute(Constant.VERSION)) {
        name.append(":v").append(node.getAttribute(Constant.VERSION));
    }
    return String(name);

  }

  static getNonApiArtifactName(node: DOMNode): string {
    let name = node.getAttribute(Constant.NAME);
    if (name == null) {
        name = node.getAttribute(Constant.KEY);
        if (name == null) {
            let nameElt = Utils.getChildNodeByName(node, Constant.NAME);
            if (nameElt != null) {
                name = Utils.getInlineString(nameElt.getFirstChild());
            }
        }
    }
    return name;

  }

  static getArtifactTag(type: string): string {
    if (equalsIgnoreCase(Constant.PROXY_SERVICE, type)) {
        return Constant.PROXY;
    } else if (equalsIgnoreCase(Constant.DATA_SERVICE, type)) {
        return Constant.DATA;
    }
    return type;

  }

  static addResources(rootElement: DOMElement, advancedNode: AdvancedNode): void {
    let apiChildren = rootElement.getChildren();
    for (let child of apiChildren) {
        let name = child.getNodeName();
        if (equalsIgnoreCase(Constant.RESOURCE, name)) {
            let methods = child.getAttribute(Constant.METHODS);
            let uriTemplate = child.getAttribute(Constant.URI_TEMPLATE);
            let urlMapping = child.getAttribute(Constant.URL_MAPPING);
            let resource = new APIResource(methods, uriTemplate, urlMapping);
            ((advancedNode as APINode)).addResource(resource);
        }
    }

  }

  static extractClassMediators(mediatorFolders: JsonNode, classMediatorArray: ArrayNode): void {
    for (let classMediatorFolder of mediatorFolders) {
        if (classMediatorFolder.has(Constant.FILES)) {
            classMediatorArray.push(...(classMediatorFolder.path(Constant.FILES) as ArrayNode));
        }

        if (classMediatorFolder.has(Constant.FOLDERS)) {
            DirectoryTreeBuilder.extractClassMediators(classMediatorFolder.path(Constant.FOLDERS), classMediatorArray);
        }
    }

  }

  static extractBallerinaModules(moduleFolders: JsonNode, ballerinaModuleArray: ArrayNode): void {
    for (let ballerinaModuleFolder of moduleFolders) {
        if (ballerinaModuleFolder.has(Constant.FILES)) {
            ballerinaModuleArray.push(...(ballerinaModuleFolder.path(Constant.FILES) as ArrayNode));
        }

        if (ballerinaModuleFolder.has(Constant.FOLDERS)) {
            DirectoryTreeBuilder.extractBallerinaModules(ballerinaModuleFolder.path(Constant.FOLDERS), ballerinaModuleArray);
        }
    }

  }
}
