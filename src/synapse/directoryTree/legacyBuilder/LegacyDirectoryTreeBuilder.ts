// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/legacyBuilder/LegacyDirectoryTreeBuilder.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, Logger, Level } from "../../../syntaxTree/javaCompat.js";
import { APINode } from "../node/APINode.js";
import { APIResource } from "../node/APIResource.js";
import { AdvancedNode } from "../node/AdvancedNode.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { DOMElement } from "../../../syntaxTree/dom/dom.js";
import { DirectoryMap } from "./DirectoryMap.js";
import { DirectoryMapResponse } from "../DirectoryMapResponse.js";
import { ESBNode } from "../node/ESBNode.js";
import { LegacyConfigFinder } from "../../utils/LegacyConfigFinder.js";
import { Node } from "../node/Node.js";
import { ProjectType } from "./utils/ProjectType.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { WorkspaceFolder } from "../../lsp.js";
import { JFile } from "../../host/JFile.js";

export class LegacyDirectoryTreeBuilder {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("LegacyDirectoryTreeBuilder");

  static projectPath?: string;

  static buildDirectoryTree(workspaceFolder: WorkspaceFolder): DirectoryMapResponse {
    let rootPath = workspaceFolder.getUri();
    let directoryMap = new DirectoryMap();

    LegacyDirectoryTreeBuilder.projectPath = rootPath;
    if (LegacyDirectoryTreeBuilder.projectPath != null) {
        LegacyDirectoryTreeBuilder.analyze(directoryMap);
    }
    let directoryMapResponse = new DirectoryMapResponse(directoryMap);
    return directoryMapResponse;

  }

  static analyze(directoryMap: DirectoryMap): void {
    let folder = new JFile(LegacyDirectoryTreeBuilder.projectPath);
    let listOfFiles = folder.listFiles((x) => x.isDirectory());
    if (listOfFiles != null) {
        for (let subProject of listOfFiles) {
            LegacyDirectoryTreeBuilder.analyzeByProjectType(subProject, directoryMap);
        }
    }

  }

  static analyzeByProjectType(subProject: JFile, directoryMap: DirectoryMap): ProjectType {
    let projectFilePath = subProject.getAbsolutePath() + JFile.separator + Constant.DOT_PROJECT;
    let projectFile = new JFile(projectFilePath);
    if (projectFile == null || !projectFile.exists()) {
        return null;
    }
    let projectDOM = null;
    try {
        projectDOM = Utils.getDOMDocument(projectFile);
    } catch (e) {
        LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
    }
    let descriptionNode = Utils.findDescriptionNode(projectDOM);
    if (descriptionNode != null) {
        let naturesNode = Utils.findNaturesNode(descriptionNode);
        if (naturesNode != null) {
            let children = naturesNode.getChildren();
            for (let child of children) {
                let nature = Utils.getInlineString(child.getFirstChild());
                if (equalsIgnoreCase(ProjectType.DATA_SERVICE_CONFIGS.value, nature)) {
                    directoryMap.addDataServiceConfig(ProjectType.DATA_SERVICE_CONFIGS.name(),
                            subProject.getName(), subProject.getAbsolutePath());
                    return ProjectType.DATA_SERVICE_CONFIGS;
                } else if (equalsIgnoreCase(ProjectType.ESB_CONFIGS.value, nature)) {
                    let esbNode = new ESBNode(ProjectType.ESB_CONFIGS.name(),
                            subProject.getName(), subProject.getAbsolutePath());
                    LegacyDirectoryTreeBuilder.analyzeEsbConfigs(subProject.getAbsolutePath() +
                            Constant.SYNAPSE_CONFIG_PATH, esbNode);
                    directoryMap.addEsbComponent(esbNode);
                    return ProjectType.ESB_CONFIGS;
                } else if (equalsIgnoreCase(ProjectType.COMPOSITE_EXPORTER.value, nature)) {
                    directoryMap.addCompositeExporter(ProjectType.COMPOSITE_EXPORTER.name(), subProject.getName()
                            , subProject.getAbsolutePath());
                    return ProjectType.COMPOSITE_EXPORTER;
                } else if (equalsIgnoreCase(ProjectType.CONNECTOR_EXPORTER.value, nature)) {
                    directoryMap.addConnectorExporter(ProjectType.CONNECTOR_EXPORTER.name(), subProject.getName()
                            , subProject.getAbsolutePath());
                    return ProjectType.CONNECTOR_EXPORTER;
                } else if (equalsIgnoreCase(ProjectType.DATA_SOURCE_CONFIGS.value, nature)) {
                    directoryMap.addDataSourceConfig(ProjectType.DATA_SOURCE_CONFIGS.name(), subProject.getName()
                            , subProject.getAbsolutePath());
                    return ProjectType.DATA_SOURCE_CONFIGS;
                } else if (equalsIgnoreCase(ProjectType.MEDIATOR_PROJECT.value, nature)) {
                    directoryMap.addMediatorProject(ProjectType.MEDIATOR_PROJECT.name(), subProject.getName(),
                            subProject.getAbsolutePath());
                    return ProjectType.MEDIATOR_PROJECT;
                } else if (equalsIgnoreCase(ProjectType.REGISTRY_RESOURCE.value, nature)) {
                    directoryMap.addRegistryResource(ProjectType.REGISTRY_RESOURCE.name(), subProject.getName(),
                            subProject.getAbsolutePath());
                    return ProjectType.REGISTRY_RESOURCE;
                } else if (equalsIgnoreCase(ProjectType.DOCKER_EXPORTER.value, nature)) {
                    directoryMap.addDockerExporter(ProjectType.DOCKER_EXPORTER.name(), subProject.getName(),
                            subProject.getAbsolutePath());
                    return ProjectType.DOCKER_EXPORTER;
                } else if (equalsIgnoreCase(ProjectType.KUBERNETES_EXPORTER.value, nature)) {
                    directoryMap.addKubernetesExporter(ProjectType.KUBERNETES_EXPORTER.name(),
                            subProject.getName(), subProject.getAbsolutePath());
                    return ProjectType.KUBERNETES_EXPORTER;
                } else if (equalsIgnoreCase(ProjectType.JAVA_LIBRARY_PROJECT.value, nature)) {
                    directoryMap.addJavaLibraryProject(ProjectType.JAVA_LIBRARY_PROJECT.name(),
                            subProject.getName(), subProject.getAbsolutePath());
                    return ProjectType.JAVA_LIBRARY_PROJECT;
                }
            }
        }
    }
    return null;

  }

  static analyzeEsbConfigs(configPath: string, esbNode: ESBNode): void {
    let folder = new JFile(configPath);
    let listOfFiles = folder.listFiles((x) => x.isDirectory());
    if (listOfFiles != null) {
        for (let subFolder of listOfFiles) {
            try {
                if (subFolder.isDirectory()) {
                    let type = subFolder.getName();
                    LegacyDirectoryTreeBuilder.analyzeByType(esbNode, subFolder, type);
                }
            } catch (e) {
                LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "No read access to the file.", e);
            }
        }
    }

  }

  static analyzeByType(esbNode: ESBNode, folder: JFile, type: string): void {
    try {
        let listOfFiles = folder.listFiles();
        if (listOfFiles != null) {
            for (let file of listOfFiles) {
                if (file.isFile()) {
                    let name = file.getName();
                    let path = file.getAbsolutePath();
                    let advancedComponent = LegacyDirectoryTreeBuilder.createEsbComponent(type, name, path);
                    esbNode.addEsbConfig(type, advancedComponent);
                }
            }
        }
    } catch (e) {
        LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "No read access to the file.", e);
    }

  }

  static createEsbComponent(type: string, name: string, path: string): Node {
    let component = new Node(type, name, path);
    if (equalsIgnoreCase(Constant.API, type) || equalsIgnoreCase(Constant.SEQUENCES, type) ||
            equalsIgnoreCase(Constant.PROXY_SERVICES, type) || equalsIgnoreCase(Constant.INBOUND_ENDPOINTS, type)) {
        let advancedNode: AdvancedNode | undefined;
        if (equalsIgnoreCase(Constant.API, type)) {
            advancedNode = new APINode(component);
        } else {
            advancedNode = new AdvancedNode(component);
        }
        let file = new JFile(path);
        if (file.isFile()) {
            let domDocument = null;
            try {
                domDocument = Utils.getDOMDocument(file);
            } catch (e) {
                LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
            }
            let rootElement = Utils.getRootElementFromConfigXml(domDocument);
            if (equalsIgnoreCase(Constant.API, type)) {
                LegacyDirectoryTreeBuilder.addResources(rootElement, advancedNode);
            }
            LegacyDirectoryTreeBuilder.traverseAndFind(rootElement, advancedNode);
        }
        return advancedNode;
    }
    return component;

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

  static traverseAndFind(rootElement: DOMElement, advancedNode: AdvancedNode): void {
    rootElement.getChildren().forEach(child => {
        if (equalsIgnoreCase(Constant.ENDPOINT, child.getNodeName())) {
            let endpointName = child.getAttribute(Constant.KEY);
            let epPath = null;
            try {
                epPath = LegacyConfigFinder.findEsbComponentPath(endpointName, Constant.ENDPOINTS, LegacyDirectoryTreeBuilder.projectPath);
            } catch (e) {
                LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
            }
            if (epPath != null) {
                let endpoint = new Node(Constant.ENDPOINT, endpointName, epPath);
                advancedNode.addEndpoint(endpoint);
            }
        } else if (equalsIgnoreCase(Constant.SEQUENCE, child.getNodeName())) {
            let sequenceName = child.getAttribute(Constant.KEY);
            let seqPath = null;
            try {
                seqPath = LegacyConfigFinder.findEsbComponentPath(sequenceName, Constant.SEQUENCES, LegacyDirectoryTreeBuilder.projectPath);
            } catch (e) {
                LegacyDirectoryTreeBuilder.LOGGER.log(Level.WARNING, "Error while reading file content", e);
            }
            if (seqPath != null) {
                let sequence = new Node(Constant.SEQUENCE, sequenceName, seqPath);
                advancedNode.addSequence(sequence);
            }
        } else if (child.hasChildNodes()) {
            LegacyDirectoryTreeBuilder.traverseAndFind((child as DOMElement), advancedNode);
        }
    });

  }
}
