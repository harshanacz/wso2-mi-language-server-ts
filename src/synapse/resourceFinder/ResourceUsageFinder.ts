// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/ResourceUsageFinder.java by the java2ts converter (see tools/java2ts).
import { equals, entrySet } from "../../syntaxTree/javaCompat.js";
import { ArtifactFileScanner } from "./ArtifactFileScanner.js";
import { ConnectionFinder } from "../connectors/ConnectionFinder.js";
import { ConnectorHolder } from "../connectors/ConnectorHolder.js";
import { DependencyScanner } from "../dependency/tree/DependencyScanner.js";
import { DirectoryTreeBuilder } from "../directoryTree/DirectoryTreeBuilder.js";
import { Utils } from "../../syntaxTree/utils.js";
import { WorkspaceFolder } from "../lsp.js";

export class ResourceUsageFinder {
  static readonly __fields: string[] = [];

  static findResourceUsages(projectUri: string, resourceFilePath: string, connectorHolder: ConnectorHolder, isLegacyProject: boolean): string[] {
    let derivedKey = Utils.deriveResourceKeyFromFilePath(resourceFilePath);
    let resourceUsagesList = [];
    let artifactFilePaths = ArtifactFileScanner.scanArtifactFiles(projectUri, true);

    let dependencyScanner = new DependencyScanner(projectUri);

    for (let artifactFilePath of artifactFilePaths) {
        let artifactDependencyTree = dependencyScanner.analyzeArtifact(artifactFilePath);
        let dependencyList = artifactDependencyTree.getDependencyList();
        for (let dependency of dependencyList) {
            if (equals(dependency.getName(), derivedKey)) {
                resourceUsagesList.push(artifactFilePath);
            }
        }
    }

    let connectionsResult =
            ConnectionFinder.findConnections(projectUri, null, connectorHolder, isLegacyProject);
    if (connectionsResult.isRight()) {
        let connectionsMap = connectionsResult.getRight();
        for (let entry of entrySet(connectionsMap)) {
            let connections = entry.getValue();
            for (let connection of connections.getConnections()) {
                let parameters = connection.getParameters();
                for (let parameter of parameters) {
                    if (parameter.getValue() != null && equals(parameter.getValue(), derivedKey)) {
                        resourceUsagesList.push(connection.getPath());
                    }
                }
            }
        }
    }

    return resourceUsagesList;

  }

  static findResourceUsagesProjectIdentifiers(projectUri: string, resourceFilePath: string, connectorHolder: ConnectorHolder, isLegacyProject: boolean): string[] {
    let resourceUsagesList = ResourceUsageFinder.findResourceUsages(projectUri, resourceFilePath, connectorHolder, isLegacyProject);
    return DirectoryTreeBuilder.getProjectIdentifiers(new WorkspaceFolder(projectUri),
            resourceUsagesList);

  }
}
