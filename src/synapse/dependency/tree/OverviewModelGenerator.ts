// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/OverviewModelGenerator.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get } from "../../../syntaxTree/javaCompat.js";
import { ArtifactResource } from "../../resourceFinder/pojo/ArtifactResource.js";
import { Connection } from "./pojo/Connection.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Dependency } from "./pojo/Dependency.js";
import { DependencyScanner } from "./DependencyScanner.js";
import { DependencyTree } from "./pojo/DependencyTree.js";
import { Either } from "../../lsp.js";
import { Entrypoint } from "./pojo/Entrypoint.js";
import { NewProjectResourceFinder } from "../../resourceFinder/NewProjectResourceFinder.js";
import { OverviewModel } from "./pojo/OverviewModel.js";
import { Paths } from "../../host/nio.js";
import { RequestedResource } from "../../resourceFinder/pojo/RequestedResource.js";

export class OverviewModelGenerator {
  static readonly __fields: string[] = [];

  static connectionId: number = 1;

  static getOverviewModel(projectPath: string): OverviewModel {
    let dependencyTreeList = [];
    let types = [Constant.API, Constant.TASK, Constant.INBOUND_DASH_ENDPOINT];
    let requiredResources = [];
    for (let type of types) {
        requiredResources.push(new RequestedResource(type, false));
    }
    let newProjectResourceFinder = new NewProjectResourceFinder();
    let response = newProjectResourceFinder.getAvailableResources(projectPath, Either.forRight(requiredResources));
    for (let resource of response.getResources()) {
        let dependencyScanner = new DependencyScanner(projectPath);
        let dependencyTree = dependencyScanner.analyzeArtifact(((resource as ArtifactResource)).getAbsolutePath());
        dependencyTreeList.push(dependencyTree);
    }
    return OverviewModelGenerator.convertDataToOverviewModel(String(get(Paths, projectPath).getFileName()), dependencyTreeList);

  }

  static convertDataToOverviewModel(projectName: string, dependencyTreeList: DependencyTree[]): OverviewModel {
    let entrypoints = [];
    let connections = [];
    let connectionMap = new Map();
    let entrypointId = 1;

    for (let dependencyTree of dependencyTreeList) {
        let entrypointType = OverviewModelGenerator.getEntrypointType(dependencyTree.getType());
        if (equals(entrypointType, Constant.OTHER)) {
            continue;
        }

        let connectionIds = [];
        OverviewModelGenerator.extractConnections(dependencyTree.getDependencyList(), connections, connectionMap, connectionIds);
        let sortedConnectionIds = connectionIds.map((x) => x.parseInt()).sorted();

        entrypoints.push(new Entrypoint(String(entrypointId++), dependencyTree.getName(), entrypointType, dependencyTree.getPath(),
                [], sortedConnectionIds.map((x) => String(x))));
    }
    OverviewModelGenerator.connectionId = 1;
    return new OverviewModel(projectName, entrypoints, connections);

  }

  static extractConnections(dependencyList: Dependency[], connections: Connection[], connectionMap: Map<string, string>, connectionIds: string[]): void {
    for (let dependency of dependencyList) {
        if (equals(dependency.getType().name(), Constant.CONNECTION_UPPERCASE)) {
            if (!connectionMap.has(dependency.getName())) {
                let newConnectionId = String(OverviewModelGenerator.connectionId++);
                connections.push(new Connection(newConnectionId, dependency.getName(), dependency.getPath()));
                connectionMap.set(dependency.getName(), newConnectionId);
            }
            let currentConnectionId = get(connectionMap, dependency.getName());
            if (!contains(connectionIds, currentConnectionId)) {
                connectionIds.push(currentConnectionId);
            }
        }
        OverviewModelGenerator.extractConnections(dependency.getDependencyList(), connections, connectionMap, connectionIds);
    }

  }

  static getEntrypointType(type: string): string {
    switch (type) {
        case Constant.API_UPPERCASE:
            return Constant.SERVICE;
        case Constant.TASK_UPPERCASE:
            return Constant.SCHEDULED_TASK;
        case Constant.INBOUND_UPPERCASE:
            return Constant.TRIGGER;
        default:
            return Constant.OTHER;
    }

  }
}
