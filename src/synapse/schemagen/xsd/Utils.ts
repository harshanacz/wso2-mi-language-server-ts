// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/Utils.java by the java2ts converter (see tools/java2ts).

export class Utils {
  static readonly __fields: string[] = [];

  static readonly ROOT: string = "root";

  static readonly ATTRIBUTE_PREFIX: string = "attr_";

  static readonly ENUM: string = "enum";

  static readonly ONE_OF: string = "oneOf";

  static readonly ID: string = "id";

  static readonly TYPE: string = "type";

  static readonly PROPERTIES: string = "properties";

  static readonly REQUIRED: string = "required";

  static readonly ITEMS: string = "items";

  static readonly ARRAY: string = "array";

  static readonly TITLE: string = "title";

  static readonly OBJECT: string = "object";

  static readonly ARRAY_FIRST_ELEMENT_IDENTIFIER: string = "/0";

  static readonly ELEMENT_VALUE: string = "_ELEMVAL";

  static readonly ID_VALUE_SEPERATOR: string = "/";

  static mapXsdTypeToJsonType(xsdType: string): string {
    switch (xsdType) {
        case "int":
        case "integer":
        case "decimal":
        case "float":
        case "double":
        case "byte":
        case "long":
        case "negativeInteger":
        case "nonNegativeInteger":
        case "nonPositiveInteger":
        case "positiveInteger":
        case "short":
        case "unsignedLong":
        case "unsignedInt":
        case "unsignedShort":
        case "unsignedByte":
            return "number";
        case "boolean":
            return "boolean";
        case "string":
        case "date":
        case "dateTime":
        case "time":
        case "duration":
        default:
            return "string";
    }

  }

  static isElementArray(elementStructure: XSParticle): boolean {
    if (elementStructure == null) {
        return false;
    }
    let minOccurs = elementStructure.getMinOccurs();
    let maxOccurs = elementStructure.getMaxOccurs();
    return minOccurs > 1 || maxOccurs > 1 || maxOccurs == -1;

  }

  static getTypeName(simpleType: XSSimpleTypeDefinition): string {
    let typeName = simpleType.getName();
    if (typeName == null) {
        typeName = simpleType.getBaseType().getName();
        if (typeName == null) {
            typeName = simpleType.getPrimitiveType().getName();
        }
    }
    return typeName;

  }
}
