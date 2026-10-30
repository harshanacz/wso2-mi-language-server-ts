// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/OverviewPage.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, Logger, Level, StringUtils } from "../../syntaxTree/javaCompat.js";
import { ConfigParser } from "./config/ConfigParser.js";
import { ConnectorDependency } from "../dependency/tree/pojo/ConnectorDependency.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Dependency } from "../dependency/tree/pojo/Dependency.js";
import { DependencyScanner } from "../dependency/tree/DependencyScanner.js";
import { DirectoryTreeBuilder } from "../directoryTree/DirectoryTreeBuilder.js";
import { ObjectMapper, JsonNode } from "../jackson.js";
import { PomParser } from "./pom/PomParser.js";
import { OverviewPageDetailsResponse } from "./OverviewPageDetailsResponse.js";
import { Utils } from "../../syntaxTree/utils.js";
import { WorkspaceFolder } from "../lsp.js";

export class OverviewPage {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("OverviewPage");

  static readonly AI_AGENT_SUPPORTED_ARTIFACTS: string[] = [Constant.API_ARTIFACTS, Constant.SEQUENCE];

  static getDetails(projectUri: string): OverviewPageDetailsResponse {
    let pomDetailsResponse = new OverviewPageDetailsResponse();
    PomParser.getPomDetails(projectUri, pomDetailsResponse);
    pomDetailsResponse.setConfigurables(ConfigParser.getConfigDetails(projectUri));
    return pomDetailsResponse;

  }

  static getProjectIntegrationType(projectFolder: WorkspaceFolder): string[] {
    let integrationTypes = [];
    let directoryMap = DirectoryTreeBuilder.getProjectExplorerModel(projectFolder);
    if (directoryMap != null) {
        try {
            let mapper = new ObjectMapper();
            let root = mapper.readTree(String(directoryMap.getDirectoryMap().getAsJsonObject()));
            let artifacts = root.path(Constant.SRC).path(Constant.MAIN).path(Constant.WSO2MI).path(Constant.ARTIFACTS);

            if (artifacts.has(Constant.API_ARTIFACTS) && !isEmpty(artifacts.path(Constant.API_ARTIFACTS))) {
                integrationTypes.push(Constant.DEVANT_API);
            }

            if (artifacts.has(Constant.EVENT_INTEGRATIONS) && !isEmpty(artifacts.path(Constant.EVENT_INTEGRATIONS))) {
                integrationTypes.push(Constant.DEVANT_EVENT);
            }

            if (artifacts.has(Constant.OTHER_ARTIFACTS) && artifacts.path(Constant.OTHER_ARTIFACTS).has(Constant.SEQUENCE_ARTIFACTS)) {
                let sequences = artifacts.path(Constant.OTHER_ARTIFACTS).path(Constant.SEQUENCE_ARTIFACTS);
                if (sequences.isArray()) {
                    for (let sequence of sequences) {
                        if (sequence.has(Constant.IS_MAIN_SEQUENCE) && sequence.path(Constant.IS_MAIN_SEQUENCE).asBoolean()) {
                            integrationTypes.push(Constant.DEVANT_AUTOMATION);
                            break;
                        }
                    }
                }
            }

            if (OverviewPage.hasAIAgent(projectFolder, artifacts)) {
                integrationTypes.push(Constant.AI_AGENT);
            }
        } catch (e) {
            OverviewPage.LOGGER.log(Level.SEVERE, "Error occurred while checking project integration type.", e);
        }
    }
    return integrationTypes;

  }

  static hasAIAgent(projectFolder: WorkspaceFolder, artifacts: JsonNode): boolean;
  static hasAIAgent(dependencyScanner: DependencyScanner, artifacts: JsonNode, artifactType: string): boolean;
  static hasAIAgent(...args: any[]): any {
    switch (args.length) {
      case 2: {
        const [projectFolder, artifacts] = args;


                let projectPath = Utils.getAbsolutePath(projectFolder.getUri());
                if (StringUtils.isEmpty(projectPath)) {
                    return false;
                }
                let dependencyScanner = new DependencyScanner(projectPath);

                for (let artifactType of OverviewPage.AI_AGENT_SUPPORTED_ARTIFACTS) {
                    if (OverviewPage.hasAIAgent(dependencyScanner, artifacts, artifactType)) {
                        return true;
                    }
                }
                return false;

        break;
      }
      case 3: {
        const [dependencyScanner, artifacts, artifactType] = args;


                if (!artifacts.has(artifactType) || isEmpty(artifacts.path(artifactType))) {
                    return false;
                }
                let artifactList = artifacts.path(artifactType);
                for (let apiArtifact of artifactList) {
                    let path = apiArtifact.path(Constant.PATH).asText();
                    let dependencyTree = dependencyScanner.analyzeArtifact(path);
                    let result = dependencyTree.getDependencyList().some((x) => x.isAIAgent());
                    if (result) {
                        return true;
                    }
                }
                return false;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static isAIAgent(dependency: Dependency): boolean {
    return dependency instanceof ConnectorDependency &&
            equalsIgnoreCase(Constant.AI, dependency.getName()) &&
            equalsIgnoreCase(Constant.AGENT, ((dependency as ConnectorDependency)).getOperationName());

  }
}
