// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/AbstractResourceFinder.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, size, get, parseBoolean, jreplace, Logger, StringBuilder, removeFrom, entrySet, Comparator, computeIfAbsent, System } from "../../syntaxTree/javaCompat.js";
import { ArtifactResource } from "./pojo/ArtifactResource.js";
import { ArtifactType } from "../dependency/tree/ArtifactType.js";
import { ConflictingDependency } from "./pojo/ConflictingDependency.js";
import { ConnectorHolder } from "../connectors/ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { DatamapperHandler } from "./registryHander/DatamapperHandler.js";
import { Either } from "../lsp.js";
import { Files } from "../host/nio.js";
import { LoadDependentResourcesResponse } from "./pojo/LoadDependentResourcesResponse.js";
import { NonXMLRegistryHandler } from "./registryHander/NonXMLRegistryHandler.js";
import { OverviewPageDetailsResponse } from "../parser/OverviewPageDetailsResponse.js";
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { PomParser } from "../parser/pom/PomParser.js";
import { RegistryResource } from "./pojo/RegistryResource.js";
import { RequestedResource } from "./pojo/RequestedResource.js";
import { Resource } from "./pojo/Resource.js";
import { ResourceResponse } from "./pojo/ResourceResponse.js";
import { SchemaResourceHandler } from "./registryHander/SchemaResourceHandler.js";
import { SimpleResourceHandler } from "./registryHander/SimpleResourceHandler.js";
import { SwaggerResourceHandler } from "./registryHander/SwaggerResourceHandler.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export abstract class AbstractResourceFinder {
  static readonly __fields: string[] = ["dependentResourcesMap"];

  static readonly LOGGER: Logger = Logger.getLogger("AbstractResourceFinder");

  static readonly ARTIFACTS: string = "ARTIFACTS";

  static readonly REGISTRY: string = "REGISTRY";

  static readonly LOCAL_ENTRY: string = "LOCAL_ENTRY";

  static readonly CONFIG_PROPERTIES_REGISTRY_KEY: string = "resources:conf/config.properties";

  static readonly ARTIFACT_XML_REGISTRY_KEYS: Set<string> = new Set([
            "resources:artifact.xml",
            "resources:registry/artifact.xml"
    ]);

  static readonly CONNECTOR_REGISTRY_KEY_PREFIX: string = "resources:connectors/";

  static readonly HTTP_CONNECTOR_CORE_NAME: string = "mi-connector-http";

  static readonly resourceFromRegistryOnly: string[] = ["dataMapper", "js", "json", "smooksConfig",
            "wsdl", "ws_policy", "xsd", "xsl", "xslt", "yaml", "registry", "unitTestRegistry", "schema", "swagger"];

  static readonly typeToXmlTagMap: Map<string, string> = new Map();

  dependentResourcesMap: Map<string, ResourceResponse> = new Map();

  static {

    AbstractResourceFinder.typeToXmlTagMap.set("api", "api");
    AbstractResourceFinder.typeToXmlTagMap.set("endpoint", "endpoint");
    AbstractResourceFinder.typeToXmlTagMap.set("sequence", "sequence");
    AbstractResourceFinder.typeToXmlTagMap.set("messageStore", "messageStore");
    AbstractResourceFinder.typeToXmlTagMap.set("messageProcessor", "messageProcessor");
    AbstractResourceFinder.typeToXmlTagMap.set("endpointTemplate", "template");
    AbstractResourceFinder.typeToXmlTagMap.set("sequenceTemplate", "template");
    AbstractResourceFinder.typeToXmlTagMap.set("task", "task");
    AbstractResourceFinder.typeToXmlTagMap.set("localEntry", "localEntry");
    AbstractResourceFinder.typeToXmlTagMap.set("inbound-endpoint", "inboundEndpoint");
    AbstractResourceFinder.typeToXmlTagMap.set("dataService", "data");
    AbstractResourceFinder.typeToXmlTagMap.set("dataSource", "dataSource");
    AbstractResourceFinder.typeToXmlTagMap.set("ws_policy", "wsp:Policy");
    AbstractResourceFinder.typeToXmlTagMap.set("smooksConfig", "smooks-resource-list");
    AbstractResourceFinder.typeToXmlTagMap.set("proxyService", "proxy");
    AbstractResourceFinder.typeToXmlTagMap.set("xsl", "xsl:stylesheet");
    AbstractResourceFinder.typeToXmlTagMap.set("xslt", "xsl:stylesheet");
    AbstractResourceFinder.typeToXmlTagMap.set("xsd", "xs:schema");
    AbstractResourceFinder.typeToXmlTagMap.set("wsdl", "wsdl:definitions");

  }

  loadDependentResources(projectPath: string): LoadDependentResourcesResponse {
           this.dependentResourcesMap = new Map();
           let projectDependencyDir = this.findProjectDependencyDir(projectPath);
           if (projectDependencyDir == null) {
               AbstractResourceFinder.LOGGER.warning("No project dependency directory found for project: " + projectPath);
               return new LoadDependentResourcesResponse(LoadDependentResourcesResponse.STATUS_NO_DEPS_FOUND,
                       "No dependent integration projects found");
           }

           let extractedDir = projectDependencyDir.resolve(Constant.EXTRACTED);
           if (!Files.exists(extractedDir) || !Files.isDirectory(extractedDir)) {
               AbstractResourceFinder.LOGGER.warning("No project dependency extracted directory found for project: " + projectPath);
               return new LoadDependentResourcesResponse(LoadDependentResourcesResponse.STATUS_NO_DEPS_FOUND,
                       "No dependent integration projects found");
           }

           let existingResourceNames = [];
           this.collectResourceNames(this.findAllResources(projectPath), existingResourceNames);
           let existingConnectorArtifactIds = this.collectMainProjectConnectorArtifactIds();
           let loadedDepConnectorCoreNames = [];

           let dependencyConflicts = [];
           let downloadDirectory = projectDependencyDir.resolve(Constant.DOWNLOADED);

           try {
    let dependentProjects = Files.list(extractedDir);
               AbstractResourceFinder.LOGGER.info("Loading dependent resources from directory: " + extractedDir);
               let parentProjectDetails = new OverviewPageDetailsResponse();
               PomParser.getPomDetails(projectPath, parentProjectDetails);
               let isVersionedDeployment = this.isVersionedDeploymentEnabled(parentProjectDetails);
               AbstractResourceFinder.LOGGER.info("Loading dependent resources for project: " + projectPath
                       + " (versionedDeployment=" + isVersionedDeployment + ")");

               for (let dependentProject of this.sortedByAddedTime(dependentProjects)) {
                   AbstractResourceFinder.LOGGER.info("Processing dependent project: " + dependentProject);
                   let pomDetails = new OverviewPageDetailsResponse();
                   PomParser.getPomDetails(String(dependentProject), pomDetails);
                   let depResources = this.findAllResources(String(dependentProject));




                   let depResourceNamesRaw = this.collectDepResourceNames(depResources);
                   let depConnectorZipBaseNames = this.extractConnectorZipBaseNames(depResourceNamesRaw);

                   if (isVersionedDeployment) {
                       this.applyVersionedDeploymentToResources(depResources, pomDetails);
                   }

                   let depResourceNames = this.collectDepResourceNames(depResources);
                   this.excludeNonConflictableEntries(depResourceNames);

                   let conflictingArtifacts = this.detectArtifactConflicts(depResourceNames, existingResourceNames);
                   let conflictingConnectors = this.detectConnectorConflicts(depConnectorZipBaseNames,
                           existingConnectorArtifactIds, loadedDepConnectorCoreNames);

                   if (!isEmpty(conflictingArtifacts) || !isEmpty(conflictingConnectors)) {
                       let groupId = Utils.getNodeValue(pomDetails.getBuildDetails().getAdvanceDetails().getProjectGroupId());
                       let artifactId = Utils.getNodeValue(pomDetails.getBuildDetails().getAdvanceDetails().getProjectArtifactId());
                       let version = Utils.getNodeValue(pomDetails.getPrimaryDetails().getProjectVersion());
                       AbstractResourceFinder.LOGGER.warning("Conflict detected in dependent project: " + dependentProject
                               + " — conflicting artifacts: " + conflictingArtifacts
                               + ", conflicting connectors: " + conflictingConnectors);
                       dependencyConflicts.push(new ConflictingDependency(groupId, artifactId, version,
                               Array.from(conflictingArtifacts), Array.from(conflictingConnectors)));
                       this.cleanupConflictingDependency(dependentProject, downloadDirectory, groupId, artifactId, version);
                   } else {
                       AbstractResourceFinder.LOGGER.info("No conflicts detected. Merging " + size(depResources) + " resource type(s) from dependent project: "
                               + dependentProject);
                       this.mergeDepResources(depResources);
                       existingResourceNames.push(...depResourceNames);
                       depConnectorZipBaseNames
                               .map((x) => Utils.stripConnectorVersion(x))
                               .filter(n => !equals(AbstractResourceFinder.HTTP_CONNECTOR_CORE_NAME, n))
                               .forEach((a) => loadedDepConnectorCoreNames.push(a));
                   }
               }
           } catch (e) {
               return new LoadDependentResourcesResponse(LoadDependentResourcesResponse.STATUS_ERROR,
                       "Error loading dependent resources: " + e.getMessage());
           }

           if (!isEmpty(dependencyConflicts)) {
               this.sortConflictingArtifacts(dependencyConflicts);
               AbstractResourceFinder.LOGGER.warning("Conflicting dependencies detected: " + size(dependencyConflicts));
               return new LoadDependentResourcesResponse(LoadDependentResourcesResponse.STATUS_CONFLICT,
                       "The above dependencies have conflicting artifacts with the current project or other dependent " +
                               "projects. Please remove them from pom.xml and retry.", dependencyConflicts);
           }
           return new LoadDependentResourcesResponse(LoadDependentResourcesResponse.STATUS_SUCCESS,
                   "Dependent resources loaded successfully for project: " + projectPath);

  }

  sortConflictingArtifacts(conflicts: ConflictingDependency[]): void {
    for (let conflict of conflicts) {
        if (conflict.getConflictingArtifacts() != null) {
            conflict.getConflictingArtifacts().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        }
        if (conflict.getConflictingConnectors() != null) {
            conflict.getConflictingConnectors().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        }
    }

  }

  collectMainProjectConnectorArtifactIds(): string[] {
    return ConnectorHolder.getInstance().getConnectors()
            .filter((x) => x.isFromProject())
            .map((x) => x.getArtifactId())
            .filter((x) => x !== null && x !== undefined)
            ;

  }

  isVersionedDeploymentEnabled(pomDetails: OverviewPageDetailsResponse): boolean {
    return pomDetails.getBuildDetails().getVersionedDeployment() != null
            && parseBoolean(pomDetails.getBuildDetails().getVersionedDeployment().getValue());

  }

  /** Directories ordered by last modified time, then by name (as the Java Comparator chain did). */
  sortedByAddedTime(paths: Path[]): Path[] {
    const modified = (p: Path): number => {
      try {
        return Files.getLastModifiedTime(p).toMillis();
      } catch {
        return Number.MAX_SAFE_INTEGER;
      }
    };
    return paths
            .filter((x) => Files.isDirectory(x))
            .sort((a, b) => (modified(a) - modified(b)) || (String(a.getFileName()) < String(b.getFileName()) ? -1 : String(a.getFileName()) > String(b.getFileName()) ? 1 : 0));
  }

  collectDepResourceNames(depResources: Map<string, ResourceResponse>): string[] {
    let names = [];
    this.collectResourceNames(depResources, names);
    removeFrom(names, AbstractResourceFinder.CONFIG_PROPERTIES_REGISTRY_KEY);
    return names;

  }

  extractConnectorZipBaseNames(resourceNames: string[]): string[] {
    let baseNames = [];
    for (let name of resourceNames) {
        if (name.startsWith(AbstractResourceFinder.CONNECTOR_REGISTRY_KEY_PREFIX) && name.endsWith(Constant.ZIP_EXTENSION)) {
            let fileName = name.substring(AbstractResourceFinder.CONNECTOR_REGISTRY_KEY_PREFIX.length);
            baseNames.push(fileName.substring(0, fileName.lastIndexOf(Constant.DOT)));
        }
    }
    return baseNames;

  }

  excludeNonConflictableEntries(resourceNames: string[]): void {
    for (let i = resourceNames.length - 1; i >= 0; i--) {
      const n = resourceNames[i];
      if (contains(AbstractResourceFinder.ARTIFACT_XML_REGISTRY_KEYS, n) || n.startsWith(AbstractResourceFinder.CONNECTOR_REGISTRY_KEY_PREFIX)) {
        resourceNames.splice(i, 1);
      }
    }

  }

  detectArtifactConflicts(depResourceNames: string[], existingResourceNames: string[]): string[] {
    return depResourceNames.filter((n) => existingResourceNames.includes(n));

  }

  detectConnectorConflicts(depConnectorZipBaseNames: string[], existingConnectorArtifactIds: string[], loadedDepConnectorCoreNames: string[]): string[] {
        let conflicting = [];
        for (let zipBaseName of depConnectorZipBaseNames) {
            let coreName = Utils.stripConnectorVersion(zipBaseName);
            if (equals(AbstractResourceFinder.HTTP_CONNECTOR_CORE_NAME, coreName)) {
    AbstractResourceFinder.LOGGER.info("Skipping conflict check for built-in HTTP connector: " + zipBaseName);
                continue;
            }
            let conflictsWithHolder = contains(existingConnectorArtifactIds, coreName);
            let conflictsWithCurrentRun = contains(loadedDepConnectorCoreNames, coreName);
            if (conflictsWithHolder || conflictsWithCurrentRun) {
                conflicting.push(zipBaseName);
            }
        }
        return conflicting;

  }

  mergeDepResources(depResources: Map<string, ResourceResponse>): void {
    for (let type of [...depResources.keys()]) {
        computeIfAbsent(this.dependentResourcesMap, type, k => new ResourceResponse());
        this.mergeResourceResponses(get(this.dependentResourcesMap, type), get(depResources, type));
    }

  }

  getDependentResourcesMap(): Map<string, ResourceResponse> {
    return this.dependentResourcesMap;

  }

  getFullyQualifiedName(pomDetailsResponse: OverviewPageDetailsResponse, resource: Resource): string {

    if (equals(ArtifactType.DATA_SERVICE.name(), resource.getType()) || equals(ArtifactType.PROXY_SERVICE.name(), resource.getType())) {
        return resource.getName();
    }


    return pomDetailsResponse.getBuildDetails().getAdvanceDetails().getProjectGroupId().getValue()
                + "__" + pomDetailsResponse.getBuildDetails().getAdvanceDetails().getProjectArtifactId().getValue()
                + "__" + resource.getName();

  }

  getFullyQualifiedNameForRegistryArtifact(pomDetailsResponse: OverviewPageDetailsResponse, resource: RegistryResource): string {


    let lastSlash = resource.getRegistryKey().lastIndexOf('/');
    let dirPath = resource.getRegistryKey().substring(0, lastSlash + 1);
    let resourceName = resource.getRegistryKey().substring(lastSlash + 1);

    let fullyQualifiedName = pomDetailsResponse.getBuildDetails().getAdvanceDetails().getProjectGroupId().getValue()
            + "__" + pomDetailsResponse.getBuildDetails().getAdvanceDetails().getProjectArtifactId().getValue()
            + "__" + resourceName;

    return dirPath + fullyQualifiedName;

  }

  getUserHome(): string {
    return System.getProperty(Constant.USER_HOME);

  }

  findProjectDependencyDir(projectPath: string): Path {
    let dependenciesDir = Path.of(
            this.getUserHome(),
            Constant.WSO2_MI,
            Constant.INTEGRATION_PROJECT_DEPENDENCIES
    );
    let projectName = new JFile(projectPath).getName();
    let hashedPath = Utils.getHash(projectPath);
    let expectedDir = dependenciesDir.resolve(projectName + Constant.UNDERSCORE + hashedPath);
    if (Files.exists(expectedDir) && Files.isDirectory(expectedDir)) {
        return expectedDir;
    }
    return null;

  }

  applyVersionedDeploymentToResources(allResources: Map<string, ResourceResponse>, pomDetailsResponse: OverviewPageDetailsResponse): void {
    for (let resources of allResources.values()) {
        if (resources == null) {
            continue;
        }
        if (resources.getResources() != null) {
            resources.getResources().forEach(resource =>
                    resource.setName(this.getFullyQualifiedName(pomDetailsResponse, resource)));
        }
        if (resources.getRegistryResources() != null) {
            resources.getRegistryResources().forEach(resource =>
                    ((resource as RegistryResource)).setRegistryKey(
                            this.getFullyQualifiedNameForRegistryArtifact(pomDetailsResponse, (resource as RegistryResource))));
        }
    }

  }

  collectResourceNames(allResources: Map<string, ResourceResponse>, names: string[]): void {
    for (let resources of allResources.values()) {
        if (resources == null) {
            continue;
        }
        if (resources.getResources() != null) {
            for (let resource of resources.getResources()) {
                if (resource.getName() != null) {
                    names.push(resource.getName());
                }
            }
        }
        if (resources.getRegistryResources() != null) {
            for (let resource of resources.getRegistryResources()) {
                if (resource instanceof RegistryResource) {
                    let key = ((resource as RegistryResource)).getRegistryKey();
                    if (key != null) {
                        names.push(key);
                    }
                }
            }
        }
    }

  }

  cleanupConflictingDependency(dependentProjectPath: Path, downloadDirectory: Path, groupId: string, artifactId: string, version: string): void {
    try {
        Utils.deleteDirectory(dependentProjectPath);
    } catch (e) {
        AbstractResourceFinder.LOGGER.warning("Failed to delete dependency directory: " + dependentProjectPath + " - " + e.getMessage());
    }

    if (Files.exists(downloadDirectory) && Files.isDirectory(downloadDirectory)) {
        let baseName = groupId + Constant.HYPHEN + artifactId + Constant.HYPHEN + version;
        try {
            Files.deleteIfExists(downloadDirectory.resolve(baseName + Constant.CAR_EXTENSION));
            Files.deleteIfExists(downloadDirectory.resolve(baseName + Constant.ZIP_EXTENSION));
        } catch (e) {
            AbstractResourceFinder.LOGGER.warning("Failed to delete downloaded file for dependency: " + baseName + " - " + e.getMessage());
        }
    }

  }

  mergeResourceResponses(response1: ResourceResponse, response2: ResourceResponse): void {
    if (response1 != null && response2 != null) {
        let resources = response1.getResources();
        if (resources == null) {
            resources = [];
        }
        if (response2.getResources() != null) {
            resources.push(...response2.getResources());
        }
        response1.setResources(resources);
        let registryResources = response1.getRegistryResources();
        if (registryResources == null) {
            registryResources = [];
        }
        if (response2.getRegistryResources() != null) {
            registryResources.push(...response2.getRegistryResources());
        }
        response1.setRegistryResources(registryResources);
    } else if (response1 == null) {
        response1 = new ResourceResponse();
        response1.setResources(response2.getResources());
        response1.setRegistryResources(response2.getRegistryResources());
    }

  }

  getAvailableResources(uri: string, resourceTypes: Either<string, RequestedResource[]>): ResourceResponse {
    let response = null;
    if (uri != null) {
        if (resourceTypes.isLeft()) {
            response = this.findResources(uri, resourceTypes.getLeft());
        } else {
            response = this.findResources(uri, resourceTypes.getRight());
        }
    }
    return response;

  }

  findResources(projectPath: string, type: string): ResourceResponse;
  findResources(projectPath: string, type: RequestedResource[]): ResourceResponse;
  findResources(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (typeof args[1] === 'string') {
          const [projectPath, type] = args;


                  let requestedResource = new RequestedResource();
                  requestedResource.type = type;
                  requestedResource.needRegistry = true;
                  return this.findResources(projectPath, [requestedResource]);

        } else if (Array.isArray(args[1])) {
          const [projectPath, type] = args;
        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  findAllRegistryResources(registryPath: Path, allResources: Map<string, ResourceResponse>): void {
    let folder = registryPath.toFile();
    if (!folder.exists()) {
        return;
    }
    this.traverseRegistryFolder(folder, allResources);

  }

  traverseRegistryFolder(folder: JFile, allResources: Map<string, ResourceResponse>): void {
    let files = folder.listFiles();
    if (files == null) {
        return;
    }

    for (let file of files) {
        if (file.isDirectory()) {
            this.traverseRegistryFolder(file, allResources); 
        } else {
            let resource = this.createRegistryResourceFromFile(file);
            if (resource != null) {
                let type = resource.getType();
                let response = computeIfAbsent(allResources, type, k => new ResourceResponse());
                let resources = response.getRegistryResources();
                if (resources == null) {
                    resources = [];
                    response.setRegistryResources(resources);
                }
                resources.push(resource);
            }
        }
    }

  }

  abstract findAllResources(projectPath: string): Map<string, ResourceResponse>;

  findResourceInArtifacts(artifactsPath: Path, types: RequestedResource[]): Resource[] {
    let resources = [];
    for (let requestedResource of types) {
        if (!contains(AbstractResourceFinder.resourceFromRegistryOnly, requestedResource.type)) {
            let type = requestedResource.type;
            let resourceTypeFolder = this.getArtifactFolder(type);
            if (resourceTypeFolder != null) {
                let resourceFolderPath = Path.of(String(artifactsPath), resourceTypeFolder);
                let folder = new JFile(String(resourceFolderPath));
                let listOfFiles = folder.listFiles();
                if (listOfFiles != null) {
                    let resources1 = this.createResources(listOfFiles, type, AbstractResourceFinder.ARTIFACTS);
                    resources.push(...resources1);
                }
            }
        }
    }
    return resources;

  }

  findResourceInLocalEntry(localEntryPath: Path, types: RequestedResource[]): Resource[] {
    let resources = [];
    let folder = localEntryPath.toFile();

    if (folder.exists()) {
        for (let requestedResource of types) {
            let listOfFiles = folder.listFiles();
            if (listOfFiles != null) {
                let resources1 = this.createResources(listOfFiles, requestedResource.type,
                        AbstractResourceFinder.LOCAL_ENTRY);
                resources.push(...resources1);
            }

        }
    }
    return resources;

  }

  findAllLocalEntryResources(localEntryPath: Path, allResources: Map<string, ResourceResponse>): void {
    let folder = localEntryPath.toFile();
    if (!folder.exists()) {
        return;
    }

    let files = folder.listFiles();
    if (files == null) {
        return;
    }

    for (let file of files) {
        if (!file.isFile()) {
            continue;
        }
        let resource = this.createLocalEntryResource(file);
        if (resource != null) {
            let type = resource.getType();
            let response = computeIfAbsent(allResources, type, k => new ResourceResponse());
            let resources = response.getResources();
            if (resources == null) {
                resources = [];
                response.setResources(resources);
            }
            resources.push(resource);
        }
    }

  }

  createLocalEntryResource(file: JFile): Resource {
    try {
        let document = Utils.getDOMDocument(file);
        let rootElement = document.getDocumentElement();
        if (rootElement == null) {
            return null;
        }


        let artifactElt = Utils.getFirstElement(rootElement);
        if (artifactElt == null) {
            return null;
        }

        let artifactType = artifactElt.getNodeName();
        return this.createResource(file, artifactType, Constant.LOCAL_ENTRY);
    } catch (e) {
        AbstractResourceFinder.LOGGER.warning("Error reading local entry file: " + file.getName());
    }
    return null;

  }

  abstract getArtifactFolder(type: string): string;

  findResourceInRegistry(registryPath: Path, requestedResources: RequestedResource[]): Resource[] {
    let resources = [];
    let folder = registryPath.toFile();
    let isRegistryTypeRequested =
            requestedResources.some(requestedResource => equals("registry", requestedResource.type) ||
                    equals("unitTestRegistry", requestedResource.type));
    if (isRegistryTypeRequested) {
        this.traverseFolder(folder, null, null, resources);
    } else {
        let requestedTypeToXmlTagMap = this.getRequestedTypeToXmlTagMap(requestedResources);
        let nonXMLRegistryHandler = this.getNonXMLRegistryHandler(requestedResources, resources);
        this.traverseFolder(folder, requestedTypeToXmlTagMap, nonXMLRegistryHandler, resources);
    }
    return resources;

  }

  getNonXMLRegistryHandler(requestedResources: RequestedResource[], resources: Resource[]): NonXMLRegistryHandler {
    let handler = null;
    if (this.hasRequestedResourceOfType(requestedResources, "swagger")) {
        handler = new SwaggerResourceHandler(resources);
    }
    if (this.hasRequestedResourceOfType(requestedResources, "schema")) {
        if (handler == null) {
            handler = new SchemaResourceHandler(resources);
        } else {
            handler.setNextHandler(new SchemaResourceHandler(resources));
        }
    }
    if (this.hasRequestedResourceOfType(requestedResources, "dataMapper")) {
        if (handler == null) {
            handler = new DatamapperHandler(resources);
        } else {
            handler.setNextHandler(new DatamapperHandler(resources));
        }
    }
    for (let requestedResource of requestedResources) {
        if (equals(requestedResource.type, "schema") || equals(requestedResource.type, "swagger") || equals(requestedResource.type, "dataMapper")) {
            continue;
        }
        if (handler == null) {
            handler = new SimpleResourceHandler(requestedResources, resources);
        } else {
            handler.setNextHandler(new SimpleResourceHandler(requestedResources, resources));
        }
        break;
    }
    return handler;

  }

  hasRequestedResourceOfType(requestedResources: RequestedResource[], type: string): boolean {
    return requestedResources.some(requestedResource => equals(type, requestedResource.type) && requestedResource.needRegistry);

  }

  getRequestedTypeToXmlTagMap(requestedResources: RequestedResource[]): Map<string, string> {
    let requestedTypeToXmlTagMap = new Map();
    requestedResources.forEach(requestedResource => {
        let type = requestedResource.type;
        let xmlTag = get(AbstractResourceFinder.typeToXmlTagMap, type);
        if (xmlTag != null && requestedResource.needRegistry) {
            requestedTypeToXmlTagMap.set(type, xmlTag);
        }
    });
    return requestedTypeToXmlTagMap;

  }

  traverseFolder(folder: JFile, requestedTypeToXmlTagMap: Map<string, string>, handler: NonXMLRegistryHandler, resources: Resource[]): void {
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (file.isDirectory()) {
                if (!equals(".meta", file.getName())) {
                    this.traverseFolder(file, requestedTypeToXmlTagMap, handler, resources);
                }
            } else if (file.isFile()) {
                if (Utils.isRegistryPropertiesFile(file)) {
                    continue;
                }
                if (file.getAbsolutePath().endsWith(String(Path.of(Constant.RESOURCES, Constant.ARTIFACT_XML))) ||
                        file.getAbsolutePath().endsWith(String(Path.of(Constant.RESOURCES, Constant.REGISTRY, Constant.ARTIFACT_XML)))) {
                    continue;
                }
                if (handler == null && requestedTypeToXmlTagMap == null) {
                    let resource = this.createNonXmlResource(file, Constant.REGISTRY, AbstractResourceFinder.REGISTRY);
                    if (resource != null) {
                        resources.push(resource);
                    }
                    continue;
                }
                let pattern = Pattern.compile(".*\\.(.*)$");
                let matcher = pattern.matcher(file.getName());
                if (matcher.find()) {
                    let fileExtension = matcher.group(1);
                    if (equals(Constant.XML, fileExtension)) {
                        let resource = this.createResource(file, requestedTypeToXmlTagMap, AbstractResourceFinder.REGISTRY);
                        if (resource != null) {
                            resources.push(resource);
                        } else {
                            handler.handleFile(file);
                        }
                    } else {
                        handler.handleFile(file);
                    }
                }
            }
        }
    }

  }

  isFileInRegistry(file: JFile): boolean {
    return contains(file.getAbsolutePath(), Constant.GOV) || contains(file.getAbsolutePath(), Constant.CONF);

  }

  createResource(file: JFile, requestedTypeToXmlTagMap: Map<string, string>, from: string): Resource;
  createResource(file: JFile, type: string, from: string): Resource;
  createResource(...args: any[]): any {
    switch (args.length) {
      case 3: {
        if (args[1] instanceof Map) {
          const [file, requestedTypeToXmlTagMap, from] = args;


                  try {
                      let document = Utils.getDOMDocument(file);
                      if (document != null && document.getDocumentElement() != null) {
                          let rootElement = Utils.getRootElement(document);
                          if (rootElement != null) {
                              let type = rootElement.getNodeName();
                              if (type != null && [...requestedTypeToXmlTagMap.values()].includes(type)) {
                                  let resource = null;
                                  if (equals(AbstractResourceFinder.ARTIFACTS, from)) {
                                      resource = this.createArtifactResource(file, rootElement, type, false);
                                  } else if (equals(AbstractResourceFinder.REGISTRY, from)) {
                                      resource = this.createRegistryResource(file, rootElement, type);
                                  }
                                  return resource;
                              }
                          }
                      }
                  } catch (e) {
                      AbstractResourceFinder.LOGGER.warning("Error while reading file: " + file.getName() + " to create resource object");
                  }
                  return null;

        } else if (typeof args[1] === 'string') {
          const [file, type, from] = args;


                  try {
                      let document = Utils.getDOMDocument(file);
                      let rootElement: DOMElement | undefined;
                      let nodeName: string | undefined;
                      if (equals(AbstractResourceFinder.LOCAL_ENTRY, from)) {
                          nodeName = Constant.LOCAL_ENTRY;
                      } else {
                          nodeName = get(AbstractResourceFinder.typeToXmlTagMap, type);
                      }
                      rootElement = (Utils.getChildNodeByName(document, nodeName) as DOMElement);
                      if (rootElement != null && this.checkValid(rootElement, type, from)) {
                          let resource = null;
                          if (equals(AbstractResourceFinder.ARTIFACTS, from)) {
                              resource = this.createArtifactResource(file, rootElement, type, false);
                          } else if (equals(AbstractResourceFinder.REGISTRY, from)) {
                              resource = this.createRegistryResource(file, rootElement, type);
                          } else if (equals(AbstractResourceFinder.LOCAL_ENTRY, from)) {
                              resource = this.createArtifactResource(file, rootElement, type, true);
                          }
                          return resource;
                      }
                  } catch (e) {
                      AbstractResourceFinder.LOGGER.warning("Error while reading file: " + file.getName() + " to create resource object");
                  }
                  return null;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  createResources(files: JFile[], type: string, from: string): Resource[] {
    let resources = [];
    for (let file of files) {
        let resource = this.createResource(file, type, from);
        if (resource != null) {
            resources.push(resource);
        }
    }
    return resources;

  }

  createNonXmlResource(file: JFile, type: string, registry: string): Resource {
    let resource = new RegistryResource();
    resource.setName(file.getName());
    resource.setType(type);
    resource.setFrom(registry);
    ((resource as RegistryResource)).setRegistryPath(file.getAbsolutePath());
    if (Utils.isFileInRegistry(file)) {
        resource.setFrom(Constant.REGISTRY);
        ((resource as RegistryResource)).setRegistryKey(Utils.getRegistryKey(file));
    } else {
        resource.setFrom(Constant.RESOURCES);
        ((resource as RegistryResource)).setRegistryKey(Utils.getResourceKey(file));
    }
    return resource;

  }

  checkValid(rootElement: DOMElement, type: string, from: string): boolean {
    let nodeName = rootElement.getNodeName();
    if (equals(AbstractResourceFinder.LOCAL_ENTRY, from)) {
        let xmlTag = AbstractResourceFinder.typeToXmlTagMap.has(type) ? get(AbstractResourceFinder.typeToXmlTagMap, type) : type;
        let artifactElt = Utils.getFirstElement(rootElement);
        if (artifactElt != null) {
            let artifactType = artifactElt.getNodeName();
            return equals(xmlTag, artifactType);
        }
        return false;
    } else if (equals(Constant.TEMPLATE, nodeName)) {
        if (equals("sequenceTemplate", type)) {
            let sequenceElement = (Utils.getChildNodeByName(rootElement, Constant.SEQUENCE) as DOMElement);
            if (sequenceElement != null) {
                return true;
            }
        } else if (equals("endpointTemplate", type)) {
            let endpointElement = (Utils.getChildNodeByName(rootElement, Constant.ENDPOINT) as DOMElement);
            if (endpointElement != null) {
                return true;
            }
        }
        return false;
    }
    return true;

  }

  createArtifactResource(file: JFile, rootElement: DOMElement, type: string, isLocalEntry: boolean): Resource {
    let artifact = new ArtifactResource();
    let name = this.getArtifactName(rootElement);
    if (name != null) {
        artifact.setName(name);
        artifact.setType(type);
        artifact.setFrom(AbstractResourceFinder.ARTIFACTS);
        ((artifact as ArtifactResource)).setLocalEntry(isLocalEntry);
        ((artifact as ArtifactResource)).setArtifactPath(file.getName());
        ((artifact as ArtifactResource)).setAbsolutePath(file.getAbsolutePath());
        return artifact;
    }
    return null;

  }

  createRegistryResource(file: JFile, rootElement: DOMElement, type: string): Resource {
    let registry = new RegistryResource();
    let name = this.getArtifactName(rootElement);
    if (name == null) {
        name = file.getName();
    }
    registry.setName(name);
    type = jreplace(type, ":", "");
    registry.setType(type);
    registry.setFrom(AbstractResourceFinder.REGISTRY);
    ((registry as RegistryResource)).setRegistryPath(file.getAbsolutePath());
    if (Utils.isFileInRegistry(file)) {
        registry.setFrom(Constant.REGISTRY);
        ((registry as RegistryResource)).setRegistryKey(Utils.getRegistryKey(file));
    } else {
        registry.setFrom(Constant.RESOURCES);
        ((registry as RegistryResource)).setRegistryKey(Utils.getResourceKey(file));
    }
    return registry;

  }

  getArtifactName(rootElement: DOMElement): string {
    if (this.isApiArtifact(rootElement)) {
        return this.getApiArtifactName(rootElement);
    } else {
        return this.getNonApiArtifactName(rootElement);
    }

  }

  isApiArtifact(rootElement: DOMElement): boolean {
    return equalsIgnoreCase(Constant.API, rootElement.getNodeName());

  }

  getApiArtifactName(rootElement: DOMElement): string {
    let name = new StringBuilder();
    name.append(rootElement.getAttribute(Constant.NAME));
    if (rootElement.hasAttribute(Constant.VERSION)) {
        name.append(":v").append(rootElement.getAttribute(Constant.VERSION));
    }
    return String(name);

  }

  getNonApiArtifactName(rootElement: DOMElement): string {
    if (rootElement.hasAttribute(Constant.NAME)) {
        return rootElement.getAttribute(Constant.NAME);
    } else if (rootElement.hasAttribute(Constant.KEY)) {
        return rootElement.getAttribute(Constant.KEY);
    } else {
        let nameNode = Utils.getChildNodeByName(rootElement, Constant.NAME);
        if (nameNode != null) {
            return Utils.getInlineString(nameNode.getFirstChild());
        }
        return null;
    }

  }

  createRegistryResourceFromFile(file: JFile): Resource {
    try {
        let fileName = file.getName();
        let detectedType = null;

        if (fileName.endsWith(Constant.XML_EXTENSION)) {

            let document = Utils.getDOMDocument(file);
            let rootElement = document.getDocumentElement();
            if (rootElement == null) {
                return null;
            }


            for (let entry of entrySet(AbstractResourceFinder.typeToXmlTagMap)) {
                if (equals(entry.getValue(), rootElement.getNodeName())) {
                    if (equals(entry.getValue(), Constant.TEMPLATE)) {
                        detectedType = this.getTemplateType(rootElement);
                    } else {
                        detectedType = entry.getKey();
                    }
                }
            }

            if (detectedType == null) {

                detectedType = rootElement.getNodeName();
            }

            return this.createRegistryResource(file, rootElement, detectedType);

        } else {

            let dotIndex = fileName.lastIndexOf('.');
            if (dotIndex > 0 && dotIndex < fileName.length - 1) {
                detectedType = fileName.substring(dotIndex + 1); 
            } else {
                detectedType = "unknown"; 
            }
            return this.createNonXmlResource(file, detectedType, AbstractResourceFinder.REGISTRY);
        }

    } catch (e) {
        AbstractResourceFinder.LOGGER.warning("Error reading registry file: " + file.getName());
    }
    return null;

  }

  getTemplateType(rootElement: DOMElement): string {
    if (rootElement != null && equals(Constant.TEMPLATE, rootElement.getNodeName())) {
        if (rootElement.getChildren() != null && !isEmpty(rootElement.getChildren())) {
            let firstChildNodeName = get(rootElement.getChildren(), 0).getNodeName();
            if (equals(Constant.SEQUENCE, firstChildNodeName)) {
                return Constant.SEQUENCE_TEMPLATE;
            } else if (equals(Constant.ENDPOINT, firstChildNodeName)) {
                return Constant.ENDPOINT_TEMPLATE;
            }
        }
    }
    return Constant.TEMPLATE;

  }
}
