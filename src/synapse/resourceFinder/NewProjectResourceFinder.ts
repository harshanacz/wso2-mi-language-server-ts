// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/NewProjectResourceFinder.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, get, computeIfAbsent } from "../../syntaxTree/javaCompat.js";
import { AbstractResourceFinder } from "./AbstractResourceFinder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Path } from "../host/nio.js";
import { RegistryResource } from "./pojo/RegistryResource.js";
import { RequestedResource } from "./pojo/RequestedResource.js";
import { Resource } from "./pojo/Resource.js";
import { ResourceResponse } from "./pojo/ResourceResponse.js";

export class NewProjectResourceFinder extends AbstractResourceFinder {
  static readonly __fields: string[] = [];

  static readonly ARTIFACT_TYPES: string[] = [
            Constant.API, Constant.ENDPOINT, Constant.SEQUENCE,
            Constant.MESSAGE_STORE, Constant.MESSAGE_PROCESSOR,
            Constant.ENDPOINT_TEMPLATE, Constant.SEQUENCE_TEMPLATE,
            Constant.TASK, Constant.LOCAL_ENTRY,
            Constant.INBOUND_DASH_ENDPOINT, Constant.DATA_SERVICE,
            Constant.DATA_SOURCE_TYPE, Constant.PROXY_SERVICE_TYPE
    ];

  findResources(projectPath: string, type: string): ResourceResponse;
  findResources(projectPath: string, types: RequestedResource[]): ResourceResponse;
  findResources(projectPath: string, types: string | RequestedResource[]): ResourceResponse {
    if (typeof types === "string") {
      return super.findResources(projectPath, types);
    }
    let response = new ResourceResponse();

    this.findArtifactResources(projectPath, types, response);
    this.findRegistryResources(projectPath, types, response);

    let dependentResourcesMap = this.getDependentResourcesMap();
    for (let type of types) {
        let resourceType = type.getType();
        if (dependentResourcesMap.has(resourceType)) {
            let dependentResponse = get(dependentResourcesMap, resourceType);
            this.mergeResourceResponses(response, dependentResponse);
        }
    }
    return response;

  }

  findArtifactResources(projectPath: string, types: RequestedResource[], response: ResourceResponse): void;
  findArtifactResources(projectPath: string, allResources: Map<string, ResourceResponse>): void;
  findArtifactResources(...args: any[]): any {
    switch (args.length) {
      case 3: {
        const [projectPath, types, response] = args;


                let artifactsPath = Path.of(projectPath, "src", "main", "wso2mi", "artifacts");
                let resourcesInArtifacts = this.findResourceInArtifacts(artifactsPath, types);
                let localEntryPath = Path.of(String(artifactsPath), "local-entries");
                let resourcesInLocalEntry = this.findResourceInLocalEntry(localEntryPath, types);
                resourcesInArtifacts.push(...resourcesInLocalEntry);
                response.setResources(resourcesInArtifacts);

        break;
      }
      case 2: {
        const [projectPath, allResources] = args;

                let artifactsPath = Path.of(projectPath, Constant.SRC, Constant.MAIN, Constant.WSO2MI, Constant.ARTIFACTS);

                for (let type of NewProjectResourceFinder.ARTIFACT_TYPES) {
                    let folderName = this.getArtifactFolder(type);
                    if (folderName != null) {
                        let folderPath = artifactsPath.resolve(folderName);
                        let folder = folderPath.toFile();
                        let listOfFiles = folder.listFiles();
                        if (listOfFiles != null) {
                            let resources = this.createResources(listOfFiles, type, AbstractResourceFinder.ARTIFACTS);
                            if (!isEmpty(resources)) {
                                let response = computeIfAbsent(allResources, type, k => new ResourceResponse());
                                response.setResources(resources);
                            }
                        }
                    }
                }

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  findRegistryResources(projectPath: string, types: RequestedResource[], response: ResourceResponse): void {
    let registryPath = Path.of(projectPath, Constant.SRC, Constant.MAIN, Constant.WSO2MI, Constant.RESOURCES);
    let resourcesInRegistry = this.findResourceInRegistry(registryPath, types);
    if (types.some(requestedResource =>  equals("unitTestRegistry", requestedResource.type))) {
        this.filterResourcesForUnitTestRegistry(resourcesInRegistry);
    }
    response.setRegistryResources(resourcesInRegistry);

  }

  findAllResources(projectPath: string): Map<string, ResourceResponse> {
    let allResources = new Map();


    this.findArtifactResources(projectPath, allResources);


    let localEntryPath = Path.of(projectPath, Constant.SRC, Constant.MAIN, Constant.WSO2MI, Constant.LOCAL_ENTRIES);
    this.findAllLocalEntryResources(localEntryPath, allResources);


    let registryPath = Path.of(projectPath, Constant.SRC, Constant.MAIN, Constant.WSO2MI, Constant.RESOURCES);
    this.findAllRegistryResources(registryPath, allResources);

    return allResources;

  }

  filterResourcesForUnitTestRegistry(resourcesInRegistry: Resource[]): void {
    for (let i = 0; i < resourcesInRegistry.length; ) {
        let resource = resourcesInRegistry[i];
        let name = resource.getName();
        if (name.endsWith("dm-utils.ts") || name.endsWith(".gitkeep")) {
            resourcesInRegistry.splice(i, 1);
            continue;
        } else if (contains(((resource as RegistryResource)).getRegistryKey(), "datamapper") && name.endsWith(".ts")) {
            let registryResource = ((resource as RegistryResource));
            registryResource.setRegistryKey(registryResource.getRegistryKey().
                    substring(0, registryResource.getRegistryKey().length - 3));
        }
        i++;
    }

  }

  getArtifactFolder(type: string): string {
    if (equalsIgnoreCase(Constant.API, type)) {
        return "apis";
    } else if (equalsIgnoreCase(Constant.ENDPOINT, type)) {
        return "endpoints";
    } else if (equalsIgnoreCase(Constant.SEQUENCE, type)) {
        return "sequences";
    } else if (equalsIgnoreCase(Constant.MESSAGE_STORE, type)) {
        return "message-stores";
    } else if (equalsIgnoreCase(Constant.MESSAGE_PROCESSOR, type)) {
        return "message-processors";
    } else if (equalsIgnoreCase("endpointTemplate", type)) {
        return "templates";
    } else if (equalsIgnoreCase("sequenceTemplate", type)) {
        return "templates";
    } else if (equalsIgnoreCase(Constant.TASK, type)) {
        return "tasks";
    } else if (equalsIgnoreCase(Constant.LOCAL_ENTRY, type)) {
        return "local-entries";
    } else if (equalsIgnoreCase(Constant.INBOUND_DASH_ENDPOINT, type)) {
        return "inbound-endpoints";
    } else if (equalsIgnoreCase(Constant.DATA_SERVICE, type)) {
        return "data-services";
    } else if (equalsIgnoreCase(Constant.DATA_SOURCE, type)) {
        return "data-sources";
    } else if (equalsIgnoreCase(Constant.PROXY_SERVICE, type)) {
        return "proxy-services";
    }
    return null;

  }
}
