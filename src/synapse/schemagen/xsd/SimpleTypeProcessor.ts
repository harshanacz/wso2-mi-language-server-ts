// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/SimpleTypeProcessor.java by the java2ts converter (see tools/java2ts).
import { JsonSchemaArrayNode } from "./JsonSchemaArrayNode.js";
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { JsonSchemaObjectNode } from "./JsonSchemaObjectNode.js";
import { Utils } from "./Utils.js";

export class SimpleTypeProcessor {
  static readonly __fields: string[] = [];

  processType(element: XSElementDeclaration, elementStructure: XSParticle, node: ObjectNode, id: string, addTitle: boolean): void {
    let jsonSchemaNode = new JsonSchemaNode(node, id);
    SimpleTypeProcessor.processSimpleType(element, elementStructure, jsonSchemaNode);

  }

  processRootType(element: XSElementDeclaration, node: ObjectNode, id: string, addTitle: boolean): void {
    let rootObject = new JsonSchemaObjectNode(node, id, Utils.ROOT);
    let property = new JsonSchemaNode(id + Utils.ID_VALUE_SEPERATOR + element.getName());
    rootObject.addProperty(element.getName(), property.getNode());
    rootObject.addRequiredElement(element.getName());
    SimpleTypeProcessor.processSimpleType(element, null, property);
    rootObject.update(true);

  }

  static processSimpleType(element: XSElementDeclaration, elementStructure: XSParticle, schemaNode: JsonSchemaNode): void {
    let isArray = isElementArray(elementStructure);
    let simpleType = (element.getTypeDefinition() as XSSimpleTypeDefinition);
    let type = Utils.mapXsdTypeToJsonType(getTypeName(simpleType));

    if (isArray) {
        let jsonSchemaArray = new JsonSchemaArrayNode(schemaNode.getId(), schemaNode.getNode());
        let item = new JsonSchemaNode(schemaNode.getId() + Utils.ARRAY_FIRST_ELEMENT_IDENTIFIER, type);
        jsonSchemaArray.addItem(item);
        schemaNode = item;
    } else {
        schemaNode.setType(type);
    }

    let lexicalEnumeration = simpleType.getLexicalEnumeration();
    if (lexicalEnumeration.getLength() > 0) {
        let enumArray = JsonNodeFactory.instance.arrayNode();
        for (let enumValue of lexicalEnumeration) {
            if (enumValue instanceof String) {
                enumArray.push((enumValue as string));
            }
        }
        schemaNode.set(Utils.ENUM, enumArray);
    }

  }
}
