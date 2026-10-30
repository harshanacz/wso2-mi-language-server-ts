// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/config/ConfigParser.java by the java2ts converter (see tools/java2ts).
import { isEmpty, size, get, Logger, Level } from "../../../syntaxTree/javaCompat.js";
import { ConfigDetails } from "../ConfigDetails.js";
import { ConfigurableEntry } from "./ConfigurableEntry.js";
import { Constants } from "../Constants.js";
import { Either } from "../../lsp.js";
import { Files } from "../../host/nio.js";
import { Path } from "../../host/nio.js";
import { Pattern } from "../../host/regex.js";
import { Position } from "../../lsp.js";
import { Range } from "../../lsp.js";
import { TextEdit } from "../../lsp.js";
import { UpdateConfigRequest } from "../UpdateConfigRequest.js";
import { UpdateResponse } from "../UpdateResponse.js";
import { JFile } from "../../host/JFile.js";

export class ConfigParser {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("ConfigParser");

  static readonly ENV_KEY_VALUE_REGEX: string = "^(\\s*)([A-Za-z0-9_.-]+)(\\s*=\\s*)(.*)$";

  static getConfigDetails(projectUri: string): ConfigDetails[] {
           let result = [];
           let envValueList = ConfigParser.processEnvFile(Path.of(projectUri, ".env"));
           let propertyFilePath = ConfigParser.getFilePath(projectUri);
           if (ConfigParser.isConfigFileExist(propertyFilePath)) {
               try {
    let fileText = Files.readAllLines(propertyFilePath.toPath());
                   let line: string | undefined;
                   let lineNumber = 1;
                   for (line of fileText) {
                       line = line.trim();
                       if (line.startsWith(Constants.HASH) || isEmpty(line)) {
                           lineNumber++;
                           continue;
                       }
                       let delimiterIndex = line.indexOf(':');
                       if (delimiterIndex != -1) {
                           let key = line.substring(0, delimiterIndex).trim();
                           result.push(new ConfigDetails(key, line.substring(delimiterIndex + 1).trim(),
                                   get(envValueList, key),
                                   Either.forLeft(new Range(
                                           new Position(lineNumber, line.indexOf(key) + 1),
                                           new Position(lineNumber, line.length + 1)))));
                       }
                       lineNumber++;
                   }
               } catch (e) {
                   ConfigParser.LOGGER.log(Level.SEVERE, "Error processing the config file: " + e.getMessage());
               }
           }
           return result;

  }

  static updateConfigFile(projectUri: string, request: UpdateConfigRequest): UpdateResponse {
    let propertyFilePath = ConfigParser.getFilePath(projectUri);
    if (ConfigParser.isConfigFileExist(propertyFilePath)) {
        try {
            let fileLines = Array.from(Files.readAllLines(propertyFilePath.toPath()));
            let updateResponse = new UpdateResponse();
            let startLine = size(fileLines);
            for (let entry of request.configs) {
                let value = entry.getKey() + Constants.COLON + entry.getValue();
                if (entry.getRange() != null && entry.getRange().isLeft()) {
                    let range = entry.getRange().getLeft();
                    updateResponse.add(new TextEdit(new Range(range.getStart(),
                            new Position(range.getStart().getLine(), range.getEnd().getCharacter())), value));
                } else {
                    startLine++;
                    updateResponse.add(new TextEdit(new Range(new Position(startLine, 0),
                            new Position(startLine, value.length + 1)), value));
                }
            }
            return updateResponse;
        } catch (e) {
            ConfigParser.LOGGER.log(Level.SEVERE, "Error processing the config file: " + e.getMessage());
        }
    }
    return null;

  }

  static scanConfigurableEntries(projectPath: string): ConfigurableEntry[] {
    let configDetails = ConfigParser.getConfigDetails(projectPath);
    let configurableEntries = [];
    for (let configDetail of configDetails) {
        let configurableEntry = new ConfigurableEntry(configDetail.getKey(), configDetail.getType());
        configurableEntries.push(configurableEntry);
    }
    return configurableEntries;

  }

  static processEnvFile(envFilePath: Path): Map<string, string> {
    let envMap = new Map();
    let content = null;
    try {
        content = Files.readString(envFilePath);
    } catch (e) {
        ConfigParser.LOGGER.log(Level.WARNING, "Error occurred while reading env file.");
        return envMap;
    }

    let pattern = Pattern.compile(ConfigParser.ENV_KEY_VALUE_REGEX, Pattern.MULTILINE);
    let matcher = pattern.matcher(content);
    while (matcher.find()) {
        let key = matcher.group(2).trim();
        let value = matcher.group(4).trim();
        envMap.set(key, value);
    }
    return envMap;

  }

  static getFilePath(projectUri: string): JFile {
    return Path.of(projectUri, Constants.SRC, Constants.MAIN, Constants.WSO2_MI,
            Constants.RESOURCES, Constants.CONF ,Constants.CONFIG_FILE).toFile();

  }

  static isConfigFileExist(propertiesFile: JFile): boolean {
    if (!propertiesFile.exists()) {
        ConfigParser.LOGGER.log(Level.SEVERE, "Config file does not exist: " + propertiesFile.getAbsolutePath());
        return false;
    }
    return true;

  }
}
