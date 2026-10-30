// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaBuilderWithNamepaces.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, jsplit, clear, entrySet, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { JsonElement } from "../../gson.js";
import { JsonObject } from "../../gson.js";
import { JsonParser } from "../../gson.js";
import { JsonPrimitive } from "../../gson.js";
import { JsonSchema } from "./JsonSchema.js";
import { SchemaBuilder } from "./SchemaBuilder.js";

export class SchemaBuilderWithNamepaces extends SchemaBuilder {
  static readonly __fields: string[] = [];

  static readonly NAMESPACES: string = "namespaces";

  static readonly XMLNS: string = "xmlns:";

  static readonly ELEMENT_IDENTIFIERS: string = "elementIdentifiers";

  static readonly DEFAULT_NAMESPACE: string = "xmlns";

  static readonly TYPE: string = "type";

  static readonly VALUE: string = "value";

  static readonly PREFIX: string = "prefix";

  static readonly URL: string = "url";

  static readonly STRING: string = "string";

  static readonly NULL: string = "null";

  static readonly DOLLLAR_AT_PREFIX: string = "$@";

  addPrimitiveToParent(parent: JsonSchema, id: string, value: string, propertyValueType: TypeEnum, elementIdentifierMap: Map<string, string>): JsonSchema {
    if (contains(id, SchemaBuilderWithNamepaces.XMLNS)) {
    	let prefix = id.substring(SchemaBuilderWithNamepaces.XMLNS.length);
    	let obj = new JsonObject();
    	obj.addProperty(SchemaBuilderWithNamepaces.PREFIX, prefix);
    	obj.addProperty(SchemaBuilderWithNamepaces.URL, value);
    	let namespaces = this.root.getCustomArray(SchemaBuilderWithNamepaces.NAMESPACES);
    	if (namespaces != null) {
    		namespaces.push(obj);
    	} else {
    		this.root.addCustomArray(SchemaBuilderWithNamepaces.NAMESPACES);
    		namespaces = this.root.getCustomArray(SchemaBuilderWithNamepaces.NAMESPACES);
    		namespaces.push(obj);
    	}

    	if (elementIdentifierMap.has(prefix)) {
    		let identifiers = this.root.getCustomArray(SchemaBuilderWithNamepaces.ELEMENT_IDENTIFIERS);
    		let identifierObj = new JsonObject();
    		identifierObj.addProperty(SchemaBuilderWithNamepaces.TYPE, get(elementIdentifierMap, prefix));
    		if (identifiers != null) {
    			identifiers.push(identifierObj);
    		} else {
    			this.root.addCustomArray(SchemaBuilderWithNamepaces.ELEMENT_IDENTIFIERS);
    			identifiers = this.root.getCustomArray(SchemaBuilderWithNamepaces.ELEMENT_IDENTIFIERS);
    			identifiers.push(identifierObj);
    		}
    		clear(elementIdentifierMap);
    	}
    	return null;
    } else if (id.startsWith(SchemaBuilderWithNamepaces.DOLLLAR_AT_PREFIX)) {
    	let leaf = new JsonSchema();
    	let idwithoutAtSign = id.substring(2);
    	leaf.setId(parent.getId() + "/" + idwithoutAtSign);
    	leaf.setType(String(propertyValueType).toLowerCase());
    	parent.addAttribute(idwithoutAtSign, leaf);
    	return leaf;
    } else if (id.startsWith(SchemaBuilder.AT_PREFIX)) {
    	let leaf = new JsonSchema();
    	let idwithoutAtSign = id.substring(1);
    	leaf.setId(parent.getId() + "/" + idwithoutAtSign);
    	leaf.setType(value);
    	parent.addAttribute(idwithoutAtSign, leaf);
    	return leaf;
    } else if (equals(id, SchemaBuilder.HASHCONTENT)) {
    	
    	if (StringUtils.isNotEmpty(value)) {
    		if (JsonParser.parseString(value) instanceof JsonObject) {
    			let valueObject = (JsonParser.parseString(value) as JsonObject);
    			this.addValueObject(parent, valueObject);
    		}
    		if (JsonParser.parseString(value) instanceof JsonPrimitive) {
    			let valueObject = (JsonParser.parseString(value) as JsonPrimitive);
    			this.addValueObject(parent, valueObject);
    		}
    	}
    	return null;
    } else if (equals(id, SchemaBuilderWithNamepaces.DEFAULT_NAMESPACE)) {
    	return null;
    } else {
    	return super.addPrimitiveToParent(parent, id, value, propertyValueType, elementIdentifierMap);
    }

  }

  addValueObject(parent: JsonSchema, valueObject: JsonElement): void {
    if (valueObject instanceof JsonObject) {
    	let contentEntrySet = entrySet(valueObject.getAsJsonObject());
    	for (let contentEntry of contentEntrySet) {
    		let contentKey = contentEntry.getKey();
    		if (equals(contentKey, SchemaBuilder.CONTENT)) {
    			let propertyType = SchemaBuilderWithNamepaces.RealTypeOf(contentEntry.getValue());
    			if (!equals(String(propertyType).toLowerCase(), SchemaBuilderWithNamepaces.NULL)) {
    				let object = new JsonObject();
    				object.addProperty(SchemaBuilderWithNamepaces.TYPE, String(propertyType).toLowerCase());
    				parent.addCustomObject(SchemaBuilderWithNamepaces.VALUE, object);
    			}
    		}
    	}
    } else if (valueObject instanceof JsonPrimitive) {
    	let propertyType = SchemaBuilderWithNamepaces.RealTypeOf(valueObject);
    	if (!equals(String(propertyType).toLowerCase(), SchemaBuilderWithNamepaces.NULL)) {
    		let object = new JsonObject();
    		object.addProperty(SchemaBuilderWithNamepaces.TYPE, String(propertyType).toLowerCase());
    		parent.addCustomObject(SchemaBuilderWithNamepaces.VALUE, object);
    	}
    }


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
    		let value = p.getAsString();
    		if (StringUtils.isNotEmpty(value)) {
    			return TypeEnum.STRING;
    		} else {
    			return TypeEnum.NULL;
    		}
    	}
    }
    return TypeEnum.UNDEFINED;

  }

  getKeyOfElementIdentifier(id: string): string {
    let key = null;

    if (contains(id, ":")) {
    	let identifier = jsplit(id, ":");

    	key = identifier[0];
    	if (key.startsWith(SchemaBuilderWithNamepaces.DOLLLAR_AT_PREFIX)) {
    		key = key.substring(2);
    	}
    }
    return key;

  }
}
