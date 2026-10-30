// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectorAction.java by the java2ts converter (see tools/java2ts).
import { contains, get, entrySet, unmodifiable, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { JsonObject } from "../../gson.js";
import { OperationParameter } from "./OperationParameter.js";
import { Property } from "../../mediator/tryout/pojo/Property.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export class ConnectorAction {
  static readonly __fields: string[] = ["name", "tag", "displayName", "parameters", "allowedConnectionTypes", "description", "isHidden", "uiSchemaPath", "outputSchemaPath", "outputSchema", "groupName", "supportsResponseModel", "canActAsAgentTool"];

  name?: string;

  tag?: string;

  displayName?: string;

  parameters?: OperationParameter[];

  allowedConnectionTypes?: string[];

  description?: string;

  isHidden?: boolean;

  uiSchemaPath?: string;

  outputSchemaPath?: string;

  outputSchema?: Property;

  groupName?: string;

  supportsResponseModel: boolean = false;

  canActAsAgentTool: boolean = false;

  constructor() {
    this.parameters = [];
    this.allowedConnectionTypes = [];
    this.canActAsAgentTool = true;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTag(): string {
    return this.tag;

  }

  setTag(tag: string): void {
    this.tag = tag;

  }

  addParameter(parameter: OperationParameter): void {
    this.parameters.push(parameter);

  }

  getParameters(): OperationParameter[] {
    return unmodifiable(this.parameters);

  }

  setParameters(parameters: OperationParameter[]): void {
    this.parameters = parameters;

  }

  getHidden(): boolean {
    return this.isHidden;

  }

  setHidden(hidden: boolean): void {
    this.isHidden = hidden;

  }

  getAllowedConnectionTypes(): string[] {
    return unmodifiable(this.allowedConnectionTypes);

  }

  setAllowedConnectionTypes(allowedConnectionTypes: string[]): void {
    this.allowedConnectionTypes = allowedConnectionTypes;

  }

  getUiSchemaPath(): string {
    return this.uiSchemaPath;

  }

  setUiSchemaPath(uiSchemaPath: string): void {
    this.uiSchemaPath = uiSchemaPath;

  }

  getDisplayName(): string {
    return this.displayName;

  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;

  }

  setOutputSchemaPath(outputSchemaPath: string): void {
    this.outputSchemaPath = outputSchemaPath;

  }

  loadOutputSchema(): void {
    if (this.outputSchemaPath == null) {
        return;
    }
    let outputSchemaString = Utils.readFile(new JFile(this.outputSchemaPath));
    let outputSchemaJson = Utils.getJsonObject(outputSchemaString);
    if (outputSchemaJson != null) {
        this.outputSchema = this.createSchemaObject(outputSchemaJson);
    }

  }

  createSchemaObject(outputSchemaJson: JsonObject): Property {
    let properties = outputSchemaJson.getAsJsonObject(Constant.PROPERTIES);
    if (properties == null) {
        return null;
    }
    let outputSchemaObject = new Property("root", StringUtils.EMPTY);

    let definitions = outputSchemaJson.getAsJsonObject(Constant.DEFINITIONS);
    let propertiesList = this.extractProperties(properties, definitions, []);
    outputSchemaObject.setProperties(propertiesList);
    return outputSchemaObject;

  }

  extractProperties(propertiesObject: JsonObject, definitions: JsonObject, processedRefs: string[]): Property[] {
    let propertiesList = [];
    for (let entry of entrySet(propertiesObject)) {
        let key = entry.getKey();
        let value = entry.getValue();
        if (value.isJsonObject()) {
            let propertyObject = value.getAsJsonObject();


            if (propertyObject.has(Constant.REF)) {
                let ref = get(propertyObject, Constant.REF).getAsString();

                if (ref.startsWith(Constant.SCHEMA_DEFINITION) && definitions != null) {
                    let definitionKey = ref.substring(Constant.SCHEMA_DEFINITION.length);


                    if (!contains(processedRefs, definitionKey)) {
                        processedRefs.push(definitionKey);

                        let definitionObj = definitions.getAsJsonObject(definitionKey);
                        if (definitionObj != null) {

                            let property = new Property(key, StringUtils.EMPTY);


                            if (definitionObj.has(Constant.DESCRIPTION)) {
                                property.setDescription(get(definitionObj, Constant.DESCRIPTION).getAsString());
                            }


                            if (definitionObj.has(Constant.PROPERTIES)) {
                                let nestedProps = this.extractProperties(
                                        definitionObj.getAsJsonObject(Constant.PROPERTIES),
                                        definitions,
                                        Array.from(processedRefs)
                                );
                                property.setProperties(nestedProps);
                            }

                            propertiesList.push(property);
                        }
                    }
                    continue;
                }
            }


            let propDescriptionObj = get(propertyObject, Constant.DESCRIPTION);
            let propDescription = propDescriptionObj != null ?
                    propDescriptionObj.getAsString() : StringUtils.EMPTY;

            let property = new Property(key, StringUtils.EMPTY, propDescription);

            if (propertyObject.has(Constant.PROPERTIES)) {
                let properties = this.extractProperties(
                        propertyObject.getAsJsonObject(Constant.PROPERTIES),
                        definitions,
                        Array.from(processedRefs)
                );
                property.setProperties(properties);
            }

            propertiesList.push(property);
        }
    }
    return propertiesList;

  }

  getOutputSchema(): Property {
    if (this.outputSchema == null) {
        try {
            this.loadOutputSchema();
        } catch (e) {

        }
    }
    return this.outputSchema != null ? this.outputSchema.deepCopy() : null;

  }

  getGroupName(): string {
    return this.groupName;

  }

  setGroupName(groupName: string): void {
    this.groupName = groupName;

  }

  isSupportsResponseModel(): boolean {
    return this.supportsResponseModel;

  }

  setSupportsResponseModel(supportsResponseModel: boolean): void {
    this.supportsResponseModel = supportsResponseModel;

  }

  isCanActAsAgentTool(): boolean {
    return this.canActAsAgentTool;

  }

  setCanActAsAgentTool(canActAsAgentTool: boolean): void {
    this.canActAsAgentTool = canActAsAgentTool;

  }
}
