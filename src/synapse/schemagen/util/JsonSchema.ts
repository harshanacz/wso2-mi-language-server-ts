// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/JsonSchema.java by the java2ts converter (see tools/java2ts).
import { get } from "../../../syntaxTree/javaCompat.js";
import { JsonArray } from "../../gson.js";
import { JsonObject } from "../../gson.js";

export class JsonSchema {
  static readonly __fields: string[] = ["schema"];

  schema?: JsonObject;

  getAsJsonObject(): JsonObject {
    return this.schema;

  }

  constructor() {
    this.schema = new JsonObject();

  }

  setDolarSchema(namespaceURl: string): void {
    this.schema.addProperty("$schema", namespaceURl);

  }

  setTitle(title: string): void {
    this.schema.addProperty("title", title);

  }

  setId(id: string): void {
    this.schema.addProperty("id", id);

  }

  setType(type: string): void {
    this.schema.addProperty("type", type);

  }

  getDolarSchema(): string {
    if (get(this.schema, "$schema") != null) {
    	return get(this.schema, "$schema").getAsString();
    }
    return "";

  }

  getTitle(title: string): string {
    if (get(this.schema, "title") != null) {
    	return get(this.schema, "title").getAsString();
    }
    return "";

  }

  getId(): string {
    if (get(this.schema, "id") != null) {
    	return get(this.schema, "id").getAsString();
    }
    return "";

  }

  getType(): string {
    if (get(this.schema, "type") != null) {
    	return get(this.schema, "type").getAsString();
    }
    return "";

  }

  getPropertiesObject(): JsonObject {
    if (get(this.schema, "properties") == null) {
    	this.schema.add("properties", new JsonObject());
    } 
    return get(this.schema, "properties").getAsJsonObject();

  }

  getAttributesObject(): JsonObject {
    if (get(this.schema, "attributes") == null) {
    	this.schema.add("attributes", new JsonObject());
    } 
    return get(this.schema, "attributes").getAsJsonObject();

  }

  getRequiredObject(): JsonArray {
    if (get(this.schema, "required") == null) {
    	this.schema.add("required", new JsonArray());
    }
    return get(this.schema, "required").getAsJsonArray();

  }

  getItemsArrayObject(): JsonArray {
    if (get(this.schema, "items") == null) {
    	this.schema.add("items", new JsonArray());
    }
    return get(this.schema, "items").getAsJsonArray();

  }

  addObject(name: string, obj: JsonSchema): void {
    let propertiesObj = this.getPropertiesObject();
    propertiesObj.add(name, obj.getAsJsonObject());

  }

  addAttribute(name: string, obj: JsonSchema): void {
    let attribObj = this.getAttributesObject();
    attribObj.add(name, obj.getAsJsonObject());

  }

  addArray(name: string, obj: JsonSchema): void {
    let propertiesObj = this.getPropertiesObject();
    propertiesObj.getAsJsonObject().add(name, obj.getAsJsonObject());

  }

  addPrimitive(name: string, leaf: JsonSchema): void {
    let propertiesObj = this.getPropertiesObject();
    propertiesObj.add(name, leaf.getAsJsonObject());

  }

  createItemsArray(): void {
    this.getItemsArrayObject();

  }

  addArrayItem(name: string, obj: JsonSchema): void {
    let itemsObj = this.getItemsArrayObject();
    itemsObj.push(obj.getAsJsonObject());

  }

  addCustomArray(name: string): void {
    this.schema.add(name, new JsonArray());

  }

  addCustomObject(name: string, jsonObject: JsonObject): void {
    this.schema.add(name, jsonObject);

  }

  getCustomArray(name: string): JsonArray {
    if (get(this.schema, name) != null) {
    	return get(this.schema, name).getAsJsonArray();
    }
    return null;

  }

  getCustomObject(name: string): JsonObject {
    if (get(this.schema, name) != null) {
    	return get(this.schema, name).getAsJsonObject();
    }
    return null;

  }
}
