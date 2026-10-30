// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/OldProjectResourceFinder.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, Logger } from "../../syntaxTree/javaCompat.js";
import { AbstractResourceFinder } from "./AbstractResourceFinder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { LegacyConfigFinder } from "../utils/LegacyConfigFinder.js";
import { Path } from "../host/nio.js";
import { ProjectType } from "../directoryTree/legacyBuilder/utils/ProjectType.js";
import { RequestedResource } from "./pojo/RequestedResource.js";
import { ResourceResponse } from "./pojo/ResourceResponse.js";

export class OldProjectResourceFinder extends AbstractResourceFinder {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("OldProjectResourceFinder");

  findResources(projectPath: string, type: string): ResourceResponse;
  findResources(projectPath: string, types: RequestedResource[]): ResourceResponse;
  findResources(projectPath: string, types: string | RequestedResource[]): ResourceResponse {
    if (typeof types === "string") {
      return super.findResources(projectPath, types);
    }
    let response = new ResourceResponse();
    let resourcesInArtifacts = [];
    let resourcesInRegistry = [];
    try {
        let esbConfigPaths = LegacyConfigFinder.getConfigPaths(projectPath, ProjectType.ESB_CONFIGS.value);
        for (let esbConfigPath of esbConfigPaths) {
            let artifactPath = Path.of(esbConfigPath, "src", "main", "synapse-config");
            let resourceInArtifacts = this.findResourceInArtifacts(artifactPath, types);
            let localEntryPath = Path.of(String(artifactPath), "local-entries");
            let resourceInLocalEntry = this.findResourceInLocalEntry(localEntryPath, types);
            resourceInArtifacts.push(...resourceInLocalEntry);
            resourcesInArtifacts.push(...resourceInArtifacts);
        }
        let registryConfigPaths = LegacyConfigFinder.getConfigPaths(projectPath,
                ProjectType.REGISTRY_RESOURCE.value);
        for (let registryConfigPath of registryConfigPaths) {
            let registryPath = Path.of(registryConfigPath);
            let resourceInRegistry = this.findResourceInRegistry(registryPath, types);
            resourcesInRegistry.push(...resourceInRegistry);
        }
    } catch (e) {
        OldProjectResourceFinder.LOGGER.warning("Error while finding resources in legacy project");
    }
    response.setResources(resourcesInArtifacts);
    response.setRegistryResources(resourcesInRegistry);
    return response;

  }

  findAllResources(projectPath: string): Map<string, ResourceResponse> {

    return new Map([]);

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
    } else if (equalsIgnoreCase(Constant.PROXY_SERVICE, type)) {
        return "proxy-services";
    }
    return null;

  }
}
