// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/ComplexTypeProcessor.java by the java2ts converter (see tools/java2ts).
import { JsonSchemaArrayNode } from "./JsonSchemaArrayNode.js";
import { JsonSchemaElementValueNode } from "./JsonSchemaElementValueNode.js";
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { JsonSchemaObjectNode } from "./JsonSchemaObjectNode.js";
import { JsonSchemaOneOfNode } from "./JsonSchemaOneOfNode.js";
import { TypeProcessorFactory } from "./TypeProcessorFactory.js";
import { Utils } from "./Utils.js";

export class ComplexTypeProcessor {
  static readonly __fields: string[] = [];

  processType(element: XSElementDeclaration, elementStructure: XSParticle, node: ObjectNode, id: string, addTitle: boolean): void {
    ComplexTypeProcessor.processComplexType(element, elementStructure, node, id, addTitle);

  }

  processRootType(element: XSElementDeclaration, node: ObjectNode, id: string, addTitle: boolean): void {
    ComplexTypeProcessor.processComplexType(element, null, node, id, addTitle);

  }

  static processComplexType(element: XSElementDeclaration, elementStructure: XSParticle, node: ObjectNode, id: string, addTitle: boolean): void {
    let name = element.getName();
    let complexType = (element.getTypeDefinition() as XSComplexTypeDefinition);
    let childElementStructure = complexType.getParticle();
    if (isElementArray(elementStructure)) {
        ComplexTypeProcessor.processArrayType(node, id, childElementStructure, complexType);
    } else {
        ComplexTypeProcessor.processObjectType(node, id, childElementStructure, complexType, addTitle, name);
    }

  }

  static hasChoiceGroup(elementStructure: XSParticle): boolean {
    return elementStructure != null && elementStructure.getTerm() instanceof XSModelGroup &&
            ((elementStructure.getTerm() as XSModelGroup)).getCompositor() == XSModelGroup.COMPOSITOR_CHOICE;

  }

  static hasSimpleContent(complexType: XSComplexTypeDefinition): boolean {
    return complexType.getContentType() == XSComplexTypeDefinition.CONTENTTYPE_SIMPLE;

  }

  static processArrayType(node: ObjectNode, id: string, elementStructure: XSParticle, complexType: XSComplexTypeDefinition): void {
    let jsonSchemaArray = new JsonSchemaArrayNode(id, node);
    if (ComplexTypeProcessor.hasChoiceGroup(elementStructure)) {
        let item = new JsonSchemaOneOfNode();
        ComplexTypeProcessor.processChoiceGroup(elementStructure, item, jsonSchemaArray.getId());
        jsonSchemaArray.addItem(item);
    } else {
        let item = new JsonSchemaObjectNode(jsonSchemaArray.getId());
        jsonSchemaArray.addItem(item);
        ComplexTypeProcessor.processInnerContent(elementStructure, complexType, item);
        item.update(false);
    }

  }

  static processObjectType(node: ObjectNode, id: string, elementStructure: XSParticle, complexType: XSComplexTypeDefinition, addTitle: boolean, name: string): void {
    if (ComplexTypeProcessor.hasChoiceGroup(elementStructure)) {
        let schemaNode = new JsonSchemaOneOfNode(node, name);
        ComplexTypeProcessor.processChoiceGroup(elementStructure, schemaNode, id);
        schemaNode.update(addTitle);
    } else {
        let jsonSchemaObject = new JsonSchemaObjectNode(node, id, name);
        ComplexTypeProcessor.processInnerContent(elementStructure, complexType, jsonSchemaObject);
        jsonSchemaObject.update(addTitle);
    }

  }

  static processInnerContent(elementStructure: XSParticle, complexType: XSComplexTypeDefinition, jsonSchemaObject: JsonSchemaObjectNode): void {
    ComplexTypeProcessor.handleAttributes(complexType, jsonSchemaObject);
    if (ComplexTypeProcessor.hasSimpleContent(complexType)) {
        ComplexTypeProcessor.processSimpleContent(complexType, jsonSchemaObject);
    } else {
        ComplexTypeProcessor.processParticle(elementStructure, jsonSchemaObject);
    }

  }

  static processChoiceGroup(elementStructure: XSParticle, schemaNode: JsonSchemaOneOfNode, id: string): void {
    let choiceGroup = (elementStructure.getTerm() as XSModelGroup);
    let choices = choiceGroup.getParticles();
    let oneOfArray = JsonNodeFactory.instance.arrayNode();
    for (let choice of choices) {
        if (choice instanceof XSParticle) {
            let choiceSchemaNode = new JsonSchemaObjectNode(id);
            ComplexTypeProcessor.processParticle((choice as XSParticle), choiceSchemaNode);
            choiceSchemaNode.update(false);
            oneOfArray.push(choiceSchemaNode.getNode());
        }
    }
    schemaNode.setOneOf(oneOfArray);

  }

  static handleAttributes(complexType: XSComplexTypeDefinition, schemaObjectNode: JsonSchemaObjectNode): void {
    if (complexType.getAttributeUses().getLength() > 0) {
        for (let attributeUseObj of complexType.getAttributeUses()) {
            if (attributeUseObj instanceof XSAttributeUse) {
                let attributeUse = (attributeUseObj as XSAttributeUse);
                let attributeDeclaration = attributeUse.getAttrDeclaration();

                let attributeName = Utils.ATTRIBUTE_PREFIX + attributeDeclaration.getName();
                let simpleType = attributeDeclaration.getTypeDefinition();
                let attributeType = Utils.mapXsdTypeToJsonType(Utils.getTypeName(simpleType));
                let attributeNode =
                        new JsonSchemaNode(schemaObjectNode.getId() + Utils.ID_VALUE_SEPERATOR + attributeName,
                                attributeType);

                let lexicalEnumeration = simpleType.getLexicalEnumeration();
                if (lexicalEnumeration.getLength() > 0) {
                    let enumArray = JsonNodeFactory.instance.arrayNode();
                    for (let enumValue of lexicalEnumeration) {
                        if (enumValue instanceof String) {
                            enumArray.push((enumValue as string));
                        }
                    }
                    attributeNode.set(Utils.ENUM, enumArray);
                }
                schemaObjectNode.addProperty(attributeName, attributeNode.getNode());
            }
        }
    }

  }

  static processSimpleContent(complexType: XSComplexTypeDefinition, simpleContentObject: JsonSchemaObjectNode): void {
    let simpleType = complexType.getSimpleType();
    let jsonType = Utils.mapXsdTypeToJsonType(simpleType.getName());
    let valueNode = new JsonSchemaElementValueNode(simpleContentObject.getId(), jsonType);
    simpleContentObject.addProperty(Utils.ELEMENT_VALUE, valueNode.getNode());

  }

  static processParticle(elementStructure: XSParticle, jsonSchemaObject: JsonSchemaObjectNode): void {
    if (elementStructure != null) {
        let term = elementStructure.getTerm();
        if (term instanceof XSModelGroup) {
            let modelGroup = (term as XSModelGroup);
            let childStructures = modelGroup.getParticles();
            for (let childStructureObj of childStructures) {
                if (childStructureObj instanceof XSParticle) {
                    let childStructure = (childStructureObj as XSParticle);
                    ComplexTypeProcessor.processParticle(childStructure, jsonSchemaObject);
                }
            }
        } else if (term instanceof XSElementDeclaration) {
            let element = (term as XSElementDeclaration);
            let emptyObjectNode = JsonNodeFactory.instance.objectNode();
            jsonSchemaObject.addProperty(element.getName(), emptyObjectNode);

            let processor = TypeProcessorFactory.getTypeProcessor(element);
            processor.processType(element, elementStructure, emptyObjectNode,
                    jsonSchemaObject.getId() + Utils.ID_VALUE_SEPERATOR + element.getName(), false);

            if (elementStructure.getMinOccurs() > 0) {
                jsonSchemaObject.addRequiredElement(element.getName());
            }
        }
    }

  }
}
