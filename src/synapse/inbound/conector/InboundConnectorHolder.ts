// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/inbound/conector/InboundConnectorHolder.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, jreplace, Logger, Level, StringBuilder, StringUtils, System } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { InboundConnectorResponse } from "./InboundConnectorResponse.js";
import { InboundEndpoint } from "../../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { InboundEndpointInfo } from "./InboundEndpointInfo.js";
import { JsonObject } from "../../gson.js";
import { JsonParser } from "../../gson.js";
import { ObjectMapper, NullNode } from "../../jackson.js";
import { PomParser } from "../../parser/pom/PomParser.js";
import { readResourceText } from "../../resources.js";
import { OverviewPageDetailsResponse } from "../../parser/OverviewPageDetailsResponse.js";
import { Path } from "../../host/nio.js";
import { SyntaxTreeGenerator } from "../../../syntaxTree/SyntaxTreeGenerator.js";
import { UISchemaMapper } from "../../utils/UISchemaMapper.js";
import { UiSchemaFlattener } from "../../connectors/UiSchemaFlattener.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export class InboundConnectorHolder {
  static readonly __fields: string[] = ["projectId", "projectPath", "tempFolderPath", "connectorIdMap", "inboundConnectors", "localInboundConnectors", "inboundConnectorListJson", "projectRuntimeVersion", "localInboundEndpointsListForCopilot", "FALLBACK_TO_440"];

  static readonly LOGGER: Logger = Logger.getLogger("InboundConnectorHolder");

  projectId?: string;

  projectPath?: string;

  tempFolderPath?: string;

  connectorIdMap?: Map<string, string>;

  inboundConnectors?: Map<string, string>;

  localInboundConnectors?: Map<string, JsonObject>;

  inboundConnectorListJson?: JsonObject;

  projectRuntimeVersion?: string;

  localInboundEndpointsListForCopilot?: string;

  FALLBACK_TO_440: Set<string> = new Set([
            Constant.MI_460_VERSION,
            Constant.MI_450_VERSION
    ]);

  constructor() {
    this.inboundConnectors = new Map();
    this.connectorIdMap = new Map();

  }

  init(projectPath: string, projectRuntimeVersion: string): void {
    if (projectPath == null) {
        InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Project path is null. Cannot initialize inbound connector holder.");
        return;
    }
    this.projectPath = projectPath;
    this.projectId = Utils.getHash(projectPath);


    let pomDetailsResponse = new OverviewPageDetailsResponse();
    PomParser.getPomDetails(projectPath, pomDetailsResponse);
    let node = pomDetailsResponse.getPrimaryDetails().getRuntimeVersion();
    if (node != null && contains(this.FALLBACK_TO_440, node.getValue())) {
        this.projectRuntimeVersion = node.getValue();
    } else {
        this.projectRuntimeVersion = projectRuntimeVersion;
    }
    this.tempFolderPath = System.getProperty("user.home") + JFile.separator + ".wso2-mi" + JFile.separator +
            Constant.INBOUND_CONNECTORS + JFile.separator + new JFile(projectPath).getName() + "_" + this.projectId;
    let referenceRuntime = contains(this.FALLBACK_TO_440, this.projectRuntimeVersion) ? Constant.MI_440_VERSION
                                : this.projectRuntimeVersion;
    this.localInboundConnectors = Utils.getUISchemaMap("org/eclipse/lemminx/inbound-endpoints/"
            + jreplace(referenceRuntime, ".", StringUtils.EMPTY));
    this.getCustomInboundConnectors();
    this.loadInboundConnectors();
    this.localInboundEndpointsListForCopilot = this.generateInboundConnectorArray();

  }

  loadInboundConnectors(): void {
    let folder = new JFile(this.tempFolderPath);
    if (folder.exists() && folder.isDirectory()) {
        let files = folder.listFiles();
        if (files != null) {
            for (let file of files) {
                if (!file.isHidden()) {
                    this.loadInboundConnector(file);
                }
            }
        }
    }

  }

  getCustomInboundConnectors(): void {
    let extractFolder = new JFile(String(Path.of(this.projectPath, Constant.SRC, Constant.MAIN, Constant.WSO2MI,
            Constant.RESOURCES, Constant.INBOUND_CONNECTORS_DIR)));
    let inputStream = readResourceText("/org/eclipse/lemminx/inbound-endpoints/inbound_endpoints_"
                    + jreplace(this.projectRuntimeVersion, ".", StringUtils.EMPTY) + Constant.JSON_FILE_EXT);
    this.inboundConnectorListJson = JsonParser.parseString(inputStream).getAsJsonObject();
    let inboundConnectorZips = this.getInboundConnectorZips(extractFolder);
    for (let zip of inboundConnectorZips) {
        let zipName = jreplace(zip.getName(), Constant.DOT + "zip", StringUtils.EMPTY);
        let extractToFolder = new JFile(extractFolder.getAbsolutePath() + JFile.separator + zipName);
        try {
            Utils.extractZip(zip, extractToFolder);
            let schema = Utils.readFile(extractToFolder.toPath().resolve(Constant.RESOURCES)
                    .resolve(Constant.UI_SCHEMA_JSON).toFile());
            this.saveInboundConnector(get(Utils.getJsonObject(schema), Constant.NAME).getAsString(), schema);
            let newConnector = new JsonObject();
            let connectorSchema = Utils.getJsonObject(schema);
            newConnector.addProperty(Constant.NAME, get(connectorSchema, Constant.TITLE) != null ?
                    get(connectorSchema, Constant.TITLE).getAsString() : StringUtils.EMPTY);
            newConnector.addProperty(Constant.ID, get(connectorSchema, Constant.ID) != null ?
                    get(connectorSchema, Constant.ID).getAsString() : StringUtils.EMPTY);
            newConnector.addProperty(Constant.DESCRIPTION, get(connectorSchema, Constant.DESCRIPTION) != null ?
                    get(connectorSchema, Constant.DESCRIPTION).getAsString() : StringUtils.EMPTY);
            newConnector.addProperty(Constant.TYPE, Constant.INBOUND_DASH_ENDPOINT);
            let connectorArray = this.inboundConnectorListJson.getAsJsonArray(Constant.INBOUND_CONNECTOR_DATA);
            connectorArray.push(newConnector);
        } catch (e) {
            InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Failed to import custom inbound-connector:" + zipName, e);
        }
        if (extractToFolder.exists() && extractToFolder.isDirectory()) {
            try {
                Utils.deleteDirectory(extractToFolder.toPath());
            } catch (e) {
                InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Failed to delete extracted inbound-connector:" + zipName, e);
            }
        }
    }

  }

  getInboundConnectorZips(extractFolder: JFile): JFile[] {
    let inboundConnectorZips = [];
    if (extractFolder.exists() && extractFolder.isDirectory()) {
        let files = extractFolder.listFiles();
        if (files != null) {
            for (let f of files) {
                if (Utils.isZipFile(f)) {
                    inboundConnectorZips.push(f);
                }
            }
        }
    }
    return inboundConnectorZips;

  }

  loadInboundConnector(file: JFile): void {
    try {
        let connectorName = jreplace(file.getName(), ".json", "");
        let uiSchema = Utils.readFile(file);
        let inboundConnector = Utils.getJsonObject(uiSchema);
        if (inboundConnector == null || !inboundConnector.has(Constant.ID)) {
            return;
        }
        let id = get(inboundConnector, Constant.ID).getAsString();
        this.connectorIdMap.set(connectorName, id);
        this.inboundConnectors.set(id, file.getAbsolutePath());
    } catch (e) {
        InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Error occurred while loading inbound connector schema from file", e);
    }

  }

  saveInboundConnector(connectorName: string, uiSchema: string): boolean {

    let inboundConnector = Utils.getJsonObject(uiSchema);
    if (inboundConnector == null || !inboundConnector.has(Constant.ID)) {
        return false;
    }
    let id = get(inboundConnector, Constant.ID).getAsString();
    let filePath = Path.of(this.tempFolderPath, connectorName + ".json");
    if (this.saveToFile(filePath.toFile(), uiSchema)) {
        this.connectorIdMap.set(connectorName, id);
        this.inboundConnectors.set(id, String(filePath));
        return true;
    }
    return false;

  }

  getInboundConnectorSchema(inboundEPFile: JFile): InboundConnectorResponse;
  getInboundConnectorSchema(connectorName: string): InboundConnectorResponse;
  getInboundConnectorSchema(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof JFile) {
          const [inboundEPFile] = args;


                  try {
                      let inboundEPElement = Utils.getDOMDocument(inboundEPFile);
                      if (inboundEPElement != null) {
                          let ib =
                                  (SyntaxTreeGenerator.buildTree(inboundEPElement.getDocumentElement()) as InboundEndpoint);
                          if (ib != null) {
                              let id = this.getIdFromInboundEP(ib);
                              if (id != null) {
                                  let response = this.getInboundConnectorSchemaFromId(id);
                                  if (response.getUiSchema() != null) {
                                      let schemaWithValues =
                                              UISchemaMapper.mapInputToUISchemaForInboundEndpoint(ib, response.getUiSchema());
                                      response.setUiSchema(schemaWithValues);
                                  }
                                  return response;
                              }
                          }
                      }
                  } catch (e) {
                      InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Error occurred while reading inbound endpoint file", e);
                  }
                  return new InboundConnectorResponse();

        } else if (typeof args[0] === 'string') {
          const [connectorName] = args;


                  let inboundConnector = new InboundConnectorResponse();
                  inboundConnector.connectorName = connectorName;
                  let connectorId = get(this.connectorIdMap, connectorName);
                  return this.getInboundConnectorSchemaFromId(connectorId);

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getIdFromInboundEP(ib: InboundEndpoint): string {
    let id = ib.getProtocol();
    if (id == null) {
        id = ib.getClazz();
    }
    return id;

  }

  getLocalInboundConnectorList(): JsonObject {
    return this.inboundConnectorListJson;

  }

  getLocalInboundEndpointsListForCopilot(): string {
    return this.localInboundEndpointsListForCopilot;

  }

  getInboundConnectorSchemaFromId(connectorId: string): InboundConnectorResponse {
    let inboundConnector = new InboundConnectorResponse();

    if (this.localInboundConnectors.has(connectorId)) {
        inboundConnector.uiSchema = get(this.localInboundConnectors, connectorId);
        return inboundConnector;
    }

    let uiSchemaPath = get(this.inboundConnectors, connectorId);
    if (uiSchemaPath == null) {
        return inboundConnector;
    }
    try {
        let uiSchema = Utils.readFile(new JFile(uiSchemaPath));
        let inboundConnectorJson = Utils.getJsonObject(uiSchema);
        inboundConnector.uiSchema = inboundConnectorJson;
    } catch (e) {
        InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Error occurred while reading inbound connector schema from file", e);
    }
    return inboundConnector;

  }

  saveToFile(file: JFile, text: string): boolean {
           try {
               if (!file.exists()) {
                   file.getParentFile().mkdirs();
               }
               file.writeText(text);
               return true;
           } catch (e) {
               InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Error occurred while saving inbound connector schema to file", e);
           }
           return false;

  }

  setProjectPath(projectPath: string): void {
    this.projectPath = projectPath;

  }

  generateInboundConnectorArray(): string {
    let localInboundConnectorList = StringUtils.EMPTY;
    let metadataJson = String(this.inboundConnectorListJson);
    let mapper = new ObjectMapper();
    let inboundConnectorMetadata = null;
    try {
        inboundConnectorMetadata = mapper.readTree(metadataJson);
    } catch (e) {
        InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Failed to parse inbound-connector metadata JSON.", e);
        return localInboundConnectorList;
    }
    let connectorArray = mapper.createArrayNode();

    for (let inboundConnectorData of inboundConnectorMetadata.path(Constant.INBOUND_CONNECTOR_DATA)) {
        if (!equals(Constant.BUILTIN_INBOUND_ENDPOINT, inboundConnectorData.path(Constant.TYPE).asText())) {
            continue;
        }
        let id = inboundConnectorData.path(Constant.ID).asText();
        let connectorName = id;
        let description = inboundConnectorData.path(Constant.DESCRIPTION).asText(StringUtils.EMPTY);

        let inputStream = readResourceText("/org/eclipse/lemminx/inbound-endpoints/"
                        + jreplace(this.projectRuntimeVersion, ".", StringUtils.EMPTY) + "/" + id + Constant.JSON_FILE_EXT);
        if (inputStream == null) {
            continue;
        }
        let inboundConnectorUISchema = null;
        try {
            inboundConnectorUISchema = mapper.readTree(inputStream);
        } catch (e) {
            InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Failed to read or parse the inbound-connector UI schema JSON.", e);
            return localInboundConnectorList;
        }
        let inboundConnectorObject = mapper.createObjectNode();

        inboundConnectorObject.set(Constant.CONNECTOR_NAME, connectorName);
        inboundConnectorObject.set(Constant.DESCRIPTION, description);
        inboundConnectorObject.set(Constant.CONNECTOR_TYPE, Constant.EVENT_INTEGRATION);

        let versionNode = mapper.createObjectNode();
        let operationsArray = mapper.createArrayNode();
        let initOperation = mapper.createObjectNode();
        initOperation.set(Constant.NAME, Constant.INIT);
        let parametersArray = mapper.createArrayNode();

        for (let group of inboundConnectorUISchema.path(Constant.ELEMENTS)) {
            let elements = group.path(Constant.VALUE).path(Constant.ELEMENTS);
            for (let element of elements) {
                if (!equals(Constant.ATTRIBUTE, element.path(Constant.TYPE).asText())) {
                    continue;
                }

                let val = element.path(Constant.VALUE);
                let param = mapper.createObjectNode();

                let paramName = val.path(Constant.NAME).asText();
                let inputType = val.path(Constant.INPUT_TYPE).asText();
                let displayName = val.path(Constant.DISPLAY_NAME).asText();
                let required = equals(Constant.TRUE, val.path(Constant.REQUIRED).asText());
                let defaultValue = val.has(Constant.DEFAULT_VALUE) ? get(val, Constant.DEFAULT_VALUE) : NullNode.getInstance();

                param.set(Constant.NAME, paramName);
                param.set(Constant.TYPE, inputType);
                param.set(Constant.REQUIRED, required);
                param.set(Constant.DEFAULT_VALUE, defaultValue);

                let descBuilder = new StringBuilder(displayName);
                if (equals(Constant.COMBO, inputType) && val.has(Constant.COMBO_VALUES)) {
                    let values = [];
                    for (let item of val.path(Constant.COMBO_VALUES)) {
                        values.push(item.asText());
                    }
                    descBuilder.append(" - supported values: ").append("[" + values.join(", ") + "]");
                }
                param.set(Constant.DESCRIPTION, String(descBuilder));

                parametersArray.push(param);
            }
        }

        initOperation.set(Constant.PARAMETERS, parametersArray);
        operationsArray.push(initOperation);
        versionNode.set(Constant.OPERATIONS, operationsArray);
        inboundConnectorObject.set(Constant.VERSION, versionNode);

        connectorArray.push(inboundConnectorObject);
    }

    try {
        localInboundConnectorList = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(connectorArray);
    } catch (e) {
        InboundConnectorHolder.LOGGER.log(Level.SEVERE, "Failed to serialize inbound-connector metadata to a JSON string.", e);
    }
    return localInboundConnectorList;

  }

  getBundledInboundEndpoint(id: string): InboundEndpointInfo {
    if (id == null || this.localInboundConnectors == null) {
        return null;
    }
    let schema = get(this.localInboundConnectors, id);
    if (schema == null) {
        return null;
    }
    return InboundConnectorHolder.buildInboundEndpointInfo(schema, "bundled");

  }

  static buildInboundEndpointInfo(schema: JsonObject, source: string): InboundEndpointInfo {
    let info = new InboundEndpointInfo();
    info.setSource(source);
    if (schema.has(Constant.NAME)) {
        info.setName(get(schema, Constant.NAME).getAsString());
    }
    if (schema.has(Constant.ID)) {
        info.setId(get(schema, Constant.ID).getAsString());
    }
    if (schema.has(Constant.TITLE)) {
        info.setDisplayName(get(schema, Constant.TITLE).getAsString());
    }
    if (schema.has(Constant.HELP)) {
        info.setDescription(get(schema, Constant.HELP).getAsString());
    } else if (schema.has(Constant.DESCRIPTION)) {
        info.setDescription(get(schema, Constant.DESCRIPTION).getAsString());
    }
    if (schema.has(Constant.TYPE)) {
        info.setType(get(schema, Constant.TYPE).getAsString());
    }
    if (schema.has(Constant.ELEMENTS) && get(schema, Constant.ELEMENTS).isJsonArray()) {
        info.setParameters(UiSchemaFlattener.flatten(schema.getAsJsonArray(Constant.ELEMENTS)));
    }
    return info;

  }
}
