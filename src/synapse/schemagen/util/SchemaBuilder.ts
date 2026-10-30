// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaBuilder.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, size, get, jreplace, jsplit, removeFrom, clear, entrySet, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { FileType } from "./FileType.js";
import { JsonArray } from "../../gson.js";
import { JsonElement } from "../../gson.js";
import { JsonNull } from "../../gson.js";
import { JsonObject } from "../../gson.js";
import { JsonParser } from "../../gson.js";
import { JsonPrimitive } from "../../gson.js";
import { JsonSchema } from "./JsonSchema.js";
import { Pattern } from "../../host/regex.js";

export class TypeEnum {
  static readonly __fields: string[] = [];



  static readonly STRING = new TypeEnum("STRING", 0);
  static readonly NUMBER = new TypeEnum("NUMBER", 1);
  static readonly BOOLEAN = new TypeEnum("BOOLEAN", 2);
  static readonly OBJECT = new TypeEnum("OBJECT", 3);
  static readonly ARRAY = new TypeEnum("ARRAY", 4);
  static readonly NULL = new TypeEnum("NULL", 5);
  static readonly ANY = new TypeEnum("ANY", 6);
  static readonly UNDEFINED = new TypeEnum("UNDEFINED", 7);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): TypeEnum[] { return [TypeEnum.STRING, TypeEnum.NUMBER, TypeEnum.BOOLEAN, TypeEnum.OBJECT, TypeEnum.ARRAY, TypeEnum.NULL, TypeEnum.ANY, TypeEnum.UNDEFINED]; }
  static valueOf(name: string): TypeEnum {
    const v = TypeEnum.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}

export class SchemaBuilder {
  static readonly HTTP_WSO2JSONSCHEMA_ORG: string = "http://wso2jsonschema.org";

  static readonly HTTP_JSON_SCHEMA_ORG_DRAFT_04_SCHEMA: string = "http://wso2.org/json-schema/wso2-data-mapper-v5.0.0/schema#";

  static readonly ARRAY: string = "array";

  static readonly OBJECT: string = "object";

  static readonly ID: string = "id";

  static readonly TYPE: string = "type";

  static readonly PROPERTIES: string = "properties";

  static readonly ELEMENT_IDENTIFIER_ARRAY_NAME: string = "arrayName";

  static readonly ROOT_TITLE: string = "root";

  static readonly AT_PREFIX: string = "@";

  static readonly DOLLLAR_AT_PREFIX: string = "$@";

  static readonly DOLLAR_PREFIX: string = "@#$";

  static readonly HASHCONTENT: string = "#@content";

  static readonly CONTENT: string = "content";

  static readonly XSI_TYPE_OLD: string = "_$@xsi:type_";

  static readonly XSI_TYPE_READABLE: string = ",xsi:type=";

  static readonly NAMESPACES: string = "namespaces";

  static readonly STRING: string = "string";

  static readonly XSI_NAMESPACE_URI: string = "http://www.w3.org/2001/XMLSchema-instance";

  static readonly XML: string = "xml";

  static readonly JSON: string = "json";

  static readonly ZERO: string = "0";

  root?: JsonSchema;

  objectMap: Map<string, JsonElement> = new Map();

  arrayKey: string = null;

  elementIdentifierMap: Map<string, string> = new Map();

  elementIdentifierArrayNameMap: Map<string, string> = new Map();

  elementsToModified: string[] = [];

  isRootJSON: boolean = false;

  constructor() {

  }

  createSchema(jsonString: string, type: FileType): string {
    
    let firstObject = null;
    let title = SchemaBuilder.ROOT_TITLE;
    let jsonObject = null;
    let jsonArray = null;

    this.root = new JsonSchema();
    this.root.setDolarSchema(SchemaBuilder.HTTP_JSON_SCHEMA_ORG_DRAFT_04_SCHEMA);
    this.root.setId(SchemaBuilder.HTTP_WSO2JSONSCHEMA_ORG);

    if (JsonParser.parseString(jsonString) instanceof JsonObject) {

    	jsonObject = (JsonParser.parseString(jsonString) as JsonObject); 
    	let entrySetVal = entrySet(jsonObject);
    	if(equals(String(type).toLowerCase(), SchemaBuilder.XML)){

    		if (size(entrySetVal) == 1) {
    			for (let entry of entrySetVal) {
    				let element = entry.getValue();
    				if (element instanceof JsonObject) {
    					title = entry.getKey();
    					firstObject = element.getAsJsonObject();
    					break;
    				} else {

    					firstObject = jsonObject;
    				}
    			}
    		} else {
    			firstObject = jsonObject;
    		}
    	}else{

    		firstObject = jsonObject;
    	}

    	this.root.setType(SchemaBuilder.OBJECT);
    	this.createSchemaForObject(firstObject, this.root);

    } else {
    	jsonArray = (JsonParser.parseString(jsonString) as JsonArray);
    	this.root.setType(SchemaBuilder.ARRAY);
    	this.createSchemaForArrayRoot(jsonArray, this.root);
    }

    let identifierPattern = Pattern.compile("(_.+:type)");
    title = this.findAndModifyElements(identifierPattern, title, title);
    this.root.setTitle(title);
    let content = String(this.root.getAsJsonObject());

    for (let element of this.elementsToModified) {
    	content = this.findAndModifyElements(identifierPattern, content, element);
    }
    clear(this.elementsToModified);
    return content;

  }

  findAndModifyElements(identifierPattern: Pattern, content: string, element: string): string {
    let matcher = identifierPattern.matcher(element);
    while (matcher.find()) {
    	let s = matcher.group(0);
    	let prefix = jsplit(s, ":")[0].substring(3);
    	if (this.root.getCustomArray(SchemaBuilder.NAMESPACES) != null) {
    		let jsonArray = this.root.getCustomArray(SchemaBuilder.NAMESPACES);
    		for (let i = 0; i < size(jsonArray); ++i) {
    			let jsonElement = get(jsonArray, i);
    			if (equals(SchemaBuilder.XSI_NAMESPACE_URI, get(jsonElement.getAsJsonObject(), "url").getAsString())) {
    				content = jreplace(content, "_$@" + prefix + ":type_", "," + prefix + ":type=");
    				break;
    			}
    		}
    	}
    }
    return content;

  }

  isAPrimitiveWithAttributes(object: JsonObject): boolean {
    let entrySetVal = entrySet(object);
    for (let entry of entrySetVal) {
    	let id = entry.getKey();
    	if (!(id.startsWith(SchemaBuilder.AT_PREFIX) || equals(id, SchemaBuilder.HASHCONTENT))) {
    		return false;
    	}
    }
    return true;

  }

  createSchemaForObject(jsonObject: JsonObject, parent: JsonSchema): string {
    let elementIdentifierValue = null;
    let identifierKey = null;
    let entrySetVal = entrySet(jsonObject);
    for (let entry of entrySetVal) {

    	let id = entry.getKey();

    	if (id.startsWith(SchemaBuilder.DOLLAR_PREFIX)) {
    		let entryValue = jreplace(String(entry.getValue()), "\"", "");
    		elementIdentifierValue = id.substring(2) + "=" + entryValue;
    		identifierKey = this.getKeyOfElementIdentifier(id);
    		this.elementIdentifierMap.set(identifierKey, id.substring(2));
    	}

    	let identifierPattern = Pattern.compile("(_.+:type)");
    	let matcher = identifierPattern.matcher(id);
    	while (matcher.find()) {
    		this.elementsToModified.add(id);
    	}

    	let element = entry.getValue();
    	let propertyValueType = SchemaBuilder.RealTypeOf(element);
    	if (propertyValueType == TypeEnum.NULL) {
    		propertyValueType = TypeEnum.STRING;
    	}
    	if (equals(entry.getKey(), SchemaBuilder.HASHCONTENT)) {
    		this.addPrimitiveToParent(parent, id, String(entry.getValue()), propertyValueType, this.elementIdentifierMap);
    	} else if (entry.getKey().startsWith(SchemaBuilder.AT_PREFIX)) {
    		if (!element.isJsonNull()) {
    			if (element instanceof JsonObject) {
    				let contentEntrySet = entrySet(element.getAsJsonObject());
    				for (let contentEntry of contentEntrySet) {
    					let contentKey = contentEntry.getKey();
    					if (equals(contentKey, SchemaBuilder.CONTENT)) {
    						let propertyType = SchemaBuilder.RealTypeOf(contentEntry.getValue());
    						this.addPrimitiveToParent(parent, id, String(propertyType).toLowerCase(), propertyValueType,
    								this.elementIdentifierMap);
    					}
    				}
    			} else {
    				let propertyType = SchemaBuilder.RealTypeOf(entry.getValue());
    				this.addPrimitiveToParent(parent, id, String(propertyType).toLowerCase(), propertyValueType,
    						this.elementIdentifierMap);
    			}
    		}
    	} else {
    		if (propertyValueType == TypeEnum.OBJECT) {
    			if (this.isAPrimitiveWithAttributes(element.getAsJsonObject())) {
    				this.addAttributedPrimitiveToParent(parent, id, element);
    			} else {
    				let schema = this.addObjectToParent(parent, id);
    				this.createSchemaForObject(element.getAsJsonObject(), schema);

    				if (StringUtils.isNotEmpty(this.arrayKey)) {
    					let arrayObj = new JsonObject();
    					if (!isEmpty(this.objectMap)) {
    						let proObj = this.createNewPropertiesObject();

    						arrayObj.add(SchemaBuilder.PROPERTIES, proObj);

    						let idTypeSet = entrySet(schema.getAsJsonObject());
    						for (let idType of idTypeSet) {
    							if (equals(idType.getKey(), SchemaBuilder.ID)) {
    								arrayObj.add(SchemaBuilder.ID, idType.getValue());
    							} else if (equals(idType.getKey(), SchemaBuilder.TYPE)) {
    								arrayObj.add(SchemaBuilder.TYPE, idType.getValue());
    							}
    						}
    					}

    					removeFrom(parent.getCustomObject(SchemaBuilder.PROPERTIES), id);
    					parent.getCustomObject(SchemaBuilder.PROPERTIES).add(id, arrayObj);
    					this.arrayKey = null;
    					clear(this.objectMap);
    				}
    			}
    		} else if (propertyValueType == TypeEnum.ARRAY) {

    			let newObject = null;
    			let jsonArray = element.getAsJsonArray();
    			if (size(jsonArray) > 0) {
    				for (let childElement of jsonArray) {
    					let schemaArray = this.addArrayToParent(parent, id);
    					this.elementIdentifierArrayNameMap.set(SchemaBuilder.ELEMENT_IDENTIFIER_ARRAY_NAME, id);
    					newObject = this.createSchemaForArray(childElement, schemaArray, id, jsonObject);
    					if (size(entrySet(newObject)) > 0) {
    						let entrySets = entrySet(newObject);
    						let key = null;
    						let value = null;
    						for (let entryNew of entrySets) {
    							key = entryNew.getKey();
    							value = entryNew.getValue();
    						}

    						this.objectMap.set(key, value);

    						this.arrayKey = entry.getKey();
    					}
    				}
    			} else {
    				this.addPrimitiveToParent(parent, id, "", propertyValueType, this.elementIdentifierMap);
    			}
    		} else {
    			if (element instanceof JsonNull) {

    				this.addPrimitiveToParent(parent, id, null, propertyValueType, this.elementIdentifierMap);
    			} else {
    				this.addPrimitiveToParent(parent, id, element.getAsString(), propertyValueType,
    						this.elementIdentifierMap);
    			}
    		}
    	}

    }
    return elementIdentifierValue;

  }

  createSchemaForArrayRoot(jsonArray: JsonArray, parent: JsonSchema): void {
    let id = SchemaBuilder.ROOT_TITLE;
    let newJObj = new JsonObject();
    for (let childElement of jsonArray) {
    	let propertyValueType = SchemaBuilder.RealTypeOf(childElement);
    	if (propertyValueType == TypeEnum.OBJECT) {
    		if (this.isAPrimitiveWithAttributes(childElement.getAsJsonObject())) {
    			this.addAttributedPrimitiveToParentItemsArray(parent, id, childElement);
    		} else {
    			let schema = this.addObjectToParentItemsArray(parent, "0");
    			let identifierValue = this.createSchemaForObject(childElement.getAsJsonObject(), schema);
    			let value = parent.getAsJsonObject();

    			if (StringUtils.isNotEmpty(identifierValue)) {
    				let name = null;
    				if (this.elementIdentifierArrayNameMap.has(SchemaBuilder.ELEMENT_IDENTIFIER_ARRAY_NAME)) {
    					name = get(this.elementIdentifierArrayNameMap, SchemaBuilder.ELEMENT_IDENTIFIER_ARRAY_NAME) + ","
    							+ identifierValue;
    				}
    				newJObj.add(name, value);
    			}
    		}
    	} else {
    		this.addPrimitiveToParentItemsArray(parent, "0", propertyValueType);
    	}

    }

  }

  createNewPropertiesObject(): JsonObject {

    let propertiesObject = new JsonObject();
    for (let object of entrySet(this.objectMap)) {
    	let newKey = object.getKey();
    	let ele = object.getValue();

    	propertiesObject.add(newKey, ele);
    }
    return propertiesObject;

  }

  getKeyOfElementIdentifier(id: string): string {
    let key = null;

    if (contains(id, ":")) {
    	let identifier = jsplit(id, ":");

    	key = identifier[0];
    	if (key.startsWith(SchemaBuilder.DOLLLAR_AT_PREFIX)) {
    		key = key.substring(2);
    	}
    }
    return key;

  }

  editJsonObject(jsonObject: JsonObject, schema: JsonSchema): JsonObject {
    let entrySetVal = entrySet(jsonObject);
    for (let entry of entrySetVal) {

    	if (equals(entry.getKey(), this.arrayKey)) {
    		if (contains(entrySet(jsonObject), this.arrayKey)) {
    			removeFrom(jsonObject.getAsJsonObject(), entry.getKey());
    		}
    	} else {
    		if (entry.getValue() instanceof JsonObject) {
    			let entrySetChild =entrySet(((entry.getValue() as JsonObject)));
    			for (let entryChild of entrySetChild) {
    				if (equals(entryChild.getKey(), this.arrayKey)) {
    					removeFrom(jsonObject.getAsJsonObject(entry.getKey()), entryChild.getKey());
    				}
    			}
    		} else {
    			if (entry.getValue() instanceof JsonArray) {


    			}
    		}
    	}
    }
    return jsonObject;

  }

  createSchemaForArray(childElement: JsonElement, parent: JsonSchema, id: string, jsonObject: JsonObject): JsonObject {
    let newJObj = new JsonObject();
    parent.createItemsArray();
    let propertyValueType = SchemaBuilder.RealTypeOf(childElement);
    if (propertyValueType == TypeEnum.OBJECT) {
    	if (this.isAPrimitiveWithAttributes(childElement.getAsJsonObject())) {
    		this.addAttributedPrimitiveToParentItemsArray(parent, id, childElement);
    	} else {
    		let schema = this.addObjectToParentItemsArray(parent, "0");
    		let identifierValue = this.createSchemaForObject(childElement.getAsJsonObject(), schema);




    		if (StringUtils.isNotEmpty(this.arrayKey)) {





    		}
    		let value = parent.getAsJsonObject();


    		if (StringUtils.isNotEmpty(identifierValue)) {
    			let name = null;
    			if (this.elementIdentifierArrayNameMap.has(SchemaBuilder.ELEMENT_IDENTIFIER_ARRAY_NAME)) {
    				name = get(this.elementIdentifierArrayNameMap, SchemaBuilder.ELEMENT_IDENTIFIER_ARRAY_NAME) + "," + identifierValue;
    			}
    			newJObj.add(name, value);
    		}
    	}
    } else if (propertyValueType == TypeEnum.ARRAY) {
    	for (let subChildElement of childElement.getAsJsonArray()) {
    		let schemaArray = this.addArrayToParentItemsArray(parent, SchemaBuilder.ZERO);
    		this.createSchemaForArray(subChildElement, schemaArray, SchemaBuilder.ZERO, jsonObject);
    		break;
    	}
    } else {
    	this.addPrimitiveToParentItemsArray(parent, "0", propertyValueType);
    }
    return newJObj;

  }

  addAttributedPrimitiveToParent(parent: JsonSchema, id: string, element: JsonElement): void {
    let primitive = this.addPrimitiveToParent(parent, id, "", TypeEnum.NULL, this.elementIdentifierMap); 





    let attributeEntrySet = entrySet(element.getAsJsonObject());
    for (let attributeEntry of attributeEntrySet) {
    	let attributeId = attributeEntry.getKey();
    	let attributeElement = attributeEntry.getValue();
    	let attributeValueType = SchemaBuilder.RealTypeOf(attributeElement);
    	if (attributeId.startsWith(SchemaBuilder.AT_PREFIX)) {
    		let leaf = new JsonSchema();
    		let idwithoutAtSign = attributeId.substring(1);
    		leaf.setId(parent.getId() + "/" + idwithoutAtSign);
    		let type = this.getAttributeType(attributeElement);
    		leaf.setType(type);
    		primitive.setType(String(TypeEnum.OBJECT).toLowerCase());
    		primitive.addAttribute(idwithoutAtSign, leaf);
    	}else if (attributeId.startsWith(SchemaBuilder.HASHCONTENT)) {
    		this.addValueObject(primitive, attributeElement); 
    		primitive.setType(String(TypeEnum.OBJECT).toLowerCase());
    	}else {
    		primitive.setType(String(attributeValueType).toLowerCase());
    	}
    }

  }

  addAttributedPrimitiveToParentItemsArray(parent: JsonSchema, id: string, element: JsonElement): void {
    let primitive = this.addPrimitiveToParentItemsArray(parent, id, TypeEnum.NULL); 





    let attributeEntrySet = entrySet(element.getAsJsonObject());
    for (let attributeEntry of attributeEntrySet) {
    	let attributeId = attributeEntry.getKey();
    	let attributeElement = attributeEntry.getValue();
    	let attributeValueType = SchemaBuilder.RealTypeOf(attributeElement);
    	if (attributeId.startsWith(SchemaBuilder.AT_PREFIX)) {
    		let leaf = new JsonSchema();
    		let idwithoutAtSign = attributeId.substring(1);
    		leaf.setId(parent.getId() + "/" + idwithoutAtSign);
    		let type = this.getAttributeType(attributeElement);
    		leaf.setType(type);
    		primitive.addAttribute(idwithoutAtSign, leaf);
    		primitive.setType(String(TypeEnum.OBJECT).toLowerCase());
    	} else if (equals(attributeId, SchemaBuilder.HASHCONTENT)) {
    	    this.addValueObject(primitive, attributeElement); 
    		primitive.setType(String(TypeEnum.OBJECT).toLowerCase());
    	} else {
    		primitive.setType(String(attributeValueType).toLowerCase());
    	}
    }

  }

  addObjectToParent(parent: JsonSchema, id: string): JsonSchema {
    let schema = new JsonSchema();
    schema.setId(parent.getId() + "/" + id);
    schema.setType(SchemaBuilder.OBJECT);
    parent.addObject(id, schema);
    return schema;

  }

  addArrayToParent(parent: JsonSchema, id: string): JsonSchema {
    let schema = new JsonSchema();
    schema.setId(parent.getId() + "/" + id);
    schema.setType(SchemaBuilder.ARRAY);
    parent.addArray(id, schema);
    return schema;

  }

  addPrimitiveToParent(parent: JsonSchema, id: string, value: string, propertyValueType: TypeEnum, elementIdentifierMap: Map<string, string>): JsonSchema {
    let leaf = new JsonSchema();
    leaf.setId(parent.getId() + "/" + id);
    leaf.setType(String(propertyValueType).toLowerCase());
    parent.addPrimitive(id, leaf);
    return leaf;

  }

  addObjectToParentItemsArray(parent: JsonSchema, id: string): JsonSchema {
    let schema = new JsonSchema();
    schema.setId(parent.getId() + "/" + id);
    schema.setType(SchemaBuilder.OBJECT);
    parent.addArrayItem(id, schema);
    return schema;

  }

  addArrayToParentItemsArray(parent: JsonSchema, id: string): JsonSchema {
    let schema = new JsonSchema();
    schema.setId(parent.getId() + "/" + id);
    schema.setType(SchemaBuilder.ARRAY);
    parent.addArrayItem(id, schema);
    return schema;

  }

  addPrimitiveToParentItemsArray(parent: JsonSchema, id: string, propertyValueType: TypeEnum): JsonSchema {
    let schema = new JsonSchema();
    schema.setId(parent.getId() + "/" + id);
    schema.setType(String(propertyValueType).toLowerCase());
    parent.addArrayItem(id, schema);
    return schema;

  }

  static RealTypeOf(element: JsonElement): TypeEnum {
    if (element == null || element.isJsonNull()) {
    	return TypeEnum.NULL;
    } else if (element.isJsonArray()) {
    	return TypeEnum.ARRAY;
    } else if (element.isJsonObject()) {
    	return TypeEnum.OBJECT;
    } else if (element.isJsonPrimitive()) {
    	let p = element.getAsJsonPrimitive();
    	if (p.isNumber()) {
    		return TypeEnum.NUMBER;
    	} else if (p.isBoolean()) {
    		return TypeEnum.BOOLEAN;
    	} else if (p.isString()) {
    		return TypeEnum.STRING;
    	}
    }
    return TypeEnum.UNDEFINED;

  }

  addValueObject(parent: JsonSchema, valueObject: JsonElement): void {
    if(valueObject instanceof JsonObject){
    	let contentEntrySet = entrySet(valueObject.getAsJsonObject());
    	for (let contentEntry of contentEntrySet) {
    		let contentKey = contentEntry.getKey();
    		if (equals(contentKey, SchemaBuilder.CONTENT)) {
    			let propertyType = SchemaBuilder.RealTypeOf(contentEntry.getValue());
    			let object = new JsonObject();
    			object.addProperty("type", String(propertyType).toLowerCase());
    			parent.addCustomObject("value", object);	
    		}
    	}
    }else if(valueObject instanceof JsonPrimitive){
    	let propertyType = SchemaBuilder.RealTypeOf(valueObject);
    	let object = new JsonObject();
    	object.addProperty("type", String(propertyType).toLowerCase());
    	parent.addCustomObject("value", object);
    }


  }

  getAttributeType(attrObject: JsonElement): string {
    let propertyType = null;
    if(attrObject instanceof JsonObject){
    let contentEntrySet = entrySet(attrObject.getAsJsonObject());
    	for (let contentEntry of contentEntrySet) {
    		let contentKey = contentEntry.getKey();
    		if (equals(contentKey, SchemaBuilder.CONTENT)) {
    			propertyType = SchemaBuilder.RealTypeOf(contentEntry.getValue());

    		}
    	}
    }else if(attrObject instanceof JsonPrimitive){
    	propertyType = SchemaBuilder.RealTypeOf(attrObject);
    }
    return String(propertyType).toLowerCase();

  }
}
