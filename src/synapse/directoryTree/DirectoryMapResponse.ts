// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/DirectoryMapResponse.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, get, entrySet } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DirectoryMap } from "./legacyBuilder/DirectoryMap.js";
import { GsonBuilder } from "../gson.js";
import { JsonArray } from "../gson.js";
import { JsonElement } from "../gson.js";
import { JsonObject } from "../gson.js";
import type { Tree } from "./Tree.js";

export class DirectoryMapResponse {
  static readonly __fields: string[] = ["directoryMap"];

  directoryMap?: JsonElement;

  constructor(directoryMap: DirectoryMap);
  constructor(directoryTree: Tree);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof DirectoryMap) {
          const [directoryMap] = args;


                  let gson = new GsonBuilder()
                          .serializeNulls()
                          .disableHtmlEscaping()
                          .create();
                  let jsonTree = gson.toJsonTree(directoryMap);
                  this.directoryMap = jsonTree;

        } else if (true) {
          const [directoryTree] = args;


                  let gson = new GsonBuilder()
                          .serializeNulls()
                          .disableHtmlEscaping()
                          .create();
                  let jsonTree = gson.toJsonTree(directoryTree);
                  if (jsonTree != null && !jsonTree.isJsonNull()) {
                      let projectType = get(jsonTree.getAsJsonObject(), Constant.PROJECT_TYPE);
                      if (!projectType.isJsonNull() && equalsIgnoreCase(Constant.INTEGRATION_PROJECT, projectType.getAsString())) {
                          jsonTree = this.convertFormat(jsonTree);
                      }
                      this.directoryMap = jsonTree;
                  }

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  convertFormat(jsonTree: JsonElement): JsonElement {
    let jsonObject = jsonTree.getAsJsonObject();
    let convertedObject = new JsonObject();

    let src = new JsonObject();
    let main = new JsonObject();
    let wso2mi = new JsonObject();
    let artifacts = new JsonObject();

    let artifactNames = ["apis", "endpoints", "sequences", "proxyServices", "inboundEndpoints",
            "messageStores", "messageProcessors", "tasks", "localEntries", "connections", "templates",
            "dataServices", "dataSources"];
    this.processLocalEntries(jsonObject);
    for (let element of artifactNames) {
        artifacts.add(element, get(jsonObject, element));
    }

    wso2mi.add("artifacts", artifacts);
    let resources = get(jsonObject, "resources");
    wso2mi.add("resources", resources);

    main.add("wso2mi", wso2mi);
    let java = get(jsonObject, "java");
    main.add("java", java);

    let bal = get(jsonObject, Constant.BALLERINA);
    main.add(Constant.BALLERINA, bal);

    src.add("main", main);
    let tests = get(jsonObject, "tests");
    src.add("tests", tests);

    convertedObject.add("src", src);
    return convertedObject;

  }

  processLocalEntries(jsonElement: JsonObject): void {
    let localEntries = get(jsonElement, "localEntries");
    let connectionEntries = new JsonObject();
    let otherEntries = new JsonArray();
    localEntries.getAsJsonArray().forEach(localEntry => {
        let localEntryObject = localEntry.getAsJsonObject();
        let connectorNameEle = get(localEntryObject, "connectorName");
        if (connectorNameEle != null) {
            this.addToProcessedLocalEntries(connectionEntries, localEntryObject, connectorNameEle);
        } else {
            otherEntries.getAsJsonArray().add(localEntryObject);
        }
    });
    let processedLocalEntries = this.combineLocalEntries(connectionEntries, otherEntries);
    jsonElement.add("localEntries", processedLocalEntries);

  }

  addToProcessedLocalEntries(connectionEntries: JsonObject, localEntryObject: JsonObject, connectorNameEle: JsonElement): void {
    let connectorName = connectorNameEle.getAsString();
    if (!isEmpty(connectorName)) {
        let connectorElement = get(connectionEntries, connectorName);
        if (connectorElement != null) {
            connectorElement.getAsJsonArray().add(localEntryObject);
        } else {
            connectionEntries.add(connectorName, new JsonArray());
            get(connectionEntries, connectorName).getAsJsonArray().push(localEntryObject);
        }
    }

  }

  combineLocalEntries(connectionEntries: JsonObject, otherEntries: JsonArray): JsonElement {
    let localEntriesArray = new JsonArray();
    localEntriesArray.push(...otherEntries);
    entrySet(connectionEntries).forEach(entry => {
        let connectorObject = new JsonObject();
        connectorObject.add(entry.getKey(), entry.getValue());
        localEntriesArray.push(connectorObject);
    });
    return localEntriesArray;

  }

  getDirectoryMap(): JsonElement {
    return this.directoryMap;

  }

  setDirectoryMap(directoryMap: JsonElement): void {
    this.directoryMap = directoryMap;

  }
}
