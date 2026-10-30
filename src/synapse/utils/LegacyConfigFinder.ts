// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/utils/LegacyConfigFinder.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Path } from "../host/nio.js";
import { ProjectType } from "../directoryTree/legacyBuilder/utils/ProjectType.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class LegacyConfigFinder {
  static readonly __fields: string[] = [];

  static findEsbComponentPath(key: string, type: string, projectPath: string): string {
    if (key != null && !isEmpty(key)) {
        let resourceFrom = ProjectType.ESB_CONFIGS.value;
        if (contains(key, Constant.GOV_REGISTRY_PREFIX) || contains(key, Constant.CONF_REGISTRY_PREFIX)) {
            resourceFrom = ProjectType.REGISTRY_RESOURCE.value;
            key = key.substring(key.indexOf(':') + 1);
        }
        let configPaths = LegacyConfigFinder.getConfigPaths(projectPath, resourceFrom);
        let path = null;
        for (let configPath of configPaths) {
            let foundPath = null;
            if (equalsIgnoreCase(ProjectType.ESB_CONFIGS.value, resourceFrom)) {
                let configPath1 = configPath + Constant.SYNAPSE_CONFIG_PATH + JFile.separator + type;
                foundPath = LegacyConfigFinder.searchInConfigs(configPath1, key);
            } else {
                let fileName = key.substring(key.indexOf('/') + 1);
                let filePath = Path.of(configPath, fileName);
                if (Utils.isFileExists(String(filePath))) {
                    foundPath = String(filePath);
                }
            }

            if (foundPath != null) {
                path = foundPath;
                break;
            }
            let localEntryPath =
                    configPath + Constant.SYNAPSE_CONFIG_PATH + JFile.separator + Constant.LOCAL_ENTRIES;
            foundPath = LegacyConfigFinder.searchInConfigs(localEntryPath, key);
            if (foundPath != null) {
                path = foundPath;
                break;
            }
        }
        return path;
    }
    return null;

  }

  static getConfigPaths(projectPath: string, configType: string): string[] {
    let file = new JFile(projectPath);
    let listOfFiles = file.listFiles((x) => x.isDirectory());
    let configPaths = [];
    if (listOfFiles != null) {
        for (let subProject of listOfFiles) {
            let projectFilePath = subProject.getAbsolutePath() + JFile.separator + Constant.DOT_PROJECT;
            let projectFile = new JFile(projectFilePath);
            if (projectFile.exists()) {
                let projectDOM = Utils.getDOMDocument(projectFile);
                let descriptionNode = Utils.findDescriptionNode(projectDOM);
                if (descriptionNode != null) {
                    let naturesNode = Utils.findNaturesNode(descriptionNode);
                    if (naturesNode != null) {
                        let children = naturesNode.getChildren();
                        for (let child of children) {
                            let nature = Utils.getInlineString(child.getFirstChild());
                            if (equalsIgnoreCase(configType, nature)) {
                                configPaths.push(subProject.getAbsolutePath());
                            }
                        }
                    }
                }
            }
        }
    }
    return configPaths;

  }

  static searchInConfigs(configPath: string, key: string): string {
    let folder = new JFile(configPath);
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (file.isFile() && Utils.isXml(file)) {
                let domDocument = Utils.getDOMDocument(file);
                if (domDocument != null) {
                    let rootElement = Utils.getRootElementFromConfigXml(domDocument);
                    if (rootElement != null) {
                        let rootElementName = rootElement.getAttribute(Constant.NAME);
                        if (equals(key, rootElementName)) {
                            return file.getAbsolutePath();
                        }
                        let rootElementKey = rootElement.getAttribute(Constant.KEY);
                        if (equals(key, rootElementKey)) {
                            return file.getAbsolutePath();
                        }
                    }
                }
            }
        }
    }
    return null;

  }
}
