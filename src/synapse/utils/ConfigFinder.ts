// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/utils/ConfigFinder.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, jsplit } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Path } from "../host/nio.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class ConfigFinder {
  static readonly __fields: string[] = [];

  static getTemplatePath(key: string, projectPath: string): string {
    return ConfigFinder.findEsbComponentPath(key, "templates", projectPath);

  }

  static findEsbComponentPath(key: string, type: string, projectPath: string): string {
    let foundPath = null;
    if (key != null && !isEmpty(key)) {
        let resourceFrom: string | undefined;
        let configPath: Path | undefined;
        if (contains(key, Constant.GOV_REGISTRY_PREFIX) || contains(key, Constant.CONF_REGISTRY_PREFIX)) {
            resourceFrom = "resources" + JFile.separator + "registry" + JFile.separator + jsplit(key, ":")[0];
            key = key.substring(key.indexOf(':') + 1);
            let possiblePath = Path.of(projectPath, "src", "main", "wso2mi", resourceFrom, key);
            if (Utils.isFileExists(String(possiblePath))) {
                foundPath = String(possiblePath);
            }
        } else if (contains(key, Constant.RESOURCES)) {
            key = key.substring(key.indexOf(':') + 1);
            let possiblePath = Path.of(projectPath, "src", "main", "wso2mi", "resources", key);
            if (Utils.isFileExists(String(possiblePath))) {
                foundPath = String(possiblePath);
            }
        } else {
            resourceFrom = "artifacts" + JFile.separator + type;
            configPath = Path.of(projectPath, "src", "main", "wso2mi", resourceFrom);
            foundPath = ConfigFinder.searchInConfigs(String(configPath), key);
        }
        let localEntryPath = Path.of(projectPath, "src", "main", "wso2mi", "artifacts", "local-entries");
        if (foundPath == null) {
            foundPath = ConfigFinder.searchInConfigs(String(localEntryPath), key);
        }
    }
    return foundPath;

  }

  static searchInConfigs(configPath: string, key: string): string {
    let folder = new JFile(configPath);
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (file.isFile() && (Utils.isXml(file) || file.getName().endsWith(".dbs"))) {
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
