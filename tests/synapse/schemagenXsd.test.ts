import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fixture } from "./helpers.js";
import { FileType } from "../../src/synapse/schemagen/util/FileType.js";
import { SchemaGeneratorForXSD } from "../../src/synapse/schemagen/util/SchemaGeneratorForXSD.js";

/** Ports SchemaGeneratorForXSDTest. */
const read = (rel: string) => readFileSync(fixture("synapse/schemagen/" + rel), "utf8");
const norm = (s: string) => s.replace(/\s+/g, "");

const cases: Array<[string, string, string]> = [
  ["testGenerateSchemaWithAdvancedAttributes", "xsd/sampleWithAdvancedAttributes.xsd", "xsd/expectedJsonSchema/sampleWithAdvancedAttributes.json"],
  ["testGenerateSchemaWithAllIndicator", "xsd/sampleWithAllIndicator.xsd", "xsd/expectedJsonSchema/sampleWithAllIndicator.json"],
  ["testGenerateSchemaWithAllMultipleDataTypes", "xsd/sampleWithAllMultipleDataTypes.xsd", "xsd/expectedJsonSchema/sampleWithAllMultipleDataTypes.json"],
  ["testGenerateSchemaWithAttributes", "xsd/sampleWithAttributes.xsd", "xsd/expectedJsonSchema/sampleWithAttributes.json"],
  ["testGenerateSchemaWithBaseTypes", "xsd/sampleWithBaseTypes.xsd", "xsd/expectedJsonSchema/sampleWithBaseTypes.json"],
  ["testGenerateSchemaWithBasicChoices", "xsd/sampleWithBasicChoices.xsd", "xsd/expectedJsonSchema/sampleWithBasicChoices.json"],
  ["testGenerateSchemaWithBasicTypes", "xsd/sampleWithBasicTypes.xsd", "xsd/expectedJsonSchema/sampleWithBasicTypes.json"],
  ["testGenerateSchemaWithElementAndAttributeGroups", "xsd/sampleWithElementAndAttributeGroups.xsd", "xsd/expectedJsonSchema/sampleWithElementAndAttributeGroups.json"],
  ["testGenerateSchemaWithEmptyContent", "xsd/sampleWithEmptyContent.xsd", "xsd/expectedJsonSchema/sampleWithEmptyContent.json"],
  ["testGenerateSchemaWithEmptyContentRestriction", "xsd/sampleWithEmptyContentRestriction.xsd", "xsd/expectedJsonSchema/sampleWithEmptyContentRestriction.json"],
  ["testGenerateSchemaWithEnum", "xsd/sampleWithEnum.xsd", "xsd/expectedJsonSchema/sampleWithEnum.json"],
  ["testGenerateSchemaWithEnumFieldInObject", "xsd/sampleWithEnumFieldInObject.xsd", "xsd/expectedJsonSchema/sampleWithEnumFieldInObject.json"],
  ["testGenerateSchemaWithGroupElement", "xsd/sampleWithGroupElement.xsd", "xsd/expectedJsonSchema/sampleWithGroupElement.json"],
  ["testGenerateSchemaWithInDepthSubTypes", "xsd/sampleWithInDepthSubTypes.xsd", "xsd/expectedJsonSchema/sampleWithInDepthSubTypes.json"],
  ["testGenerateSchemaWithList", "xsd/sampleWithList.xsd", "xsd/expectedJsonSchema/sampleWithList.json"],
  ["testGenerateSchemaWithMaxOccursN", "xsd/sampleWithMaxOccursN.xsd", "xsd/expectedJsonSchema/sampleWithMaxOccursN.json"],
  ["testGenerateSchemaWithMaxOccursUnbounded", "xsd/sampleWithMaxOccursUnbounded.xsd", "xsd/expectedJsonSchema/sampleWithMaxOccursUnbounded.json"],
  ["testGenerateSchemaWithMaxOccursZero", "xsd/sampleWithMaxOccursZero.xsd", "xsd/expectedJsonSchema/sampleWithMaxOccursZero.json"],
  ["testGenerateSchemaWithMinOccursN", "xsd/sampleWithMinOccursN.xsd", "xsd/expectedJsonSchema/sampleWithMinOccursN.json"],
  ["testGenerateSchemaWithMinOccursOne", "xsd/sampleWithMinOccursOne.xsd", "xsd/expectedJsonSchema/sampleWithMinOccursOne.json"],
  ["testGenerateSchemaWithMinOccursZero", "xsd/sampleWithMinOccursZero.xsd", "xsd/expectedJsonSchema/sampleWithMinOccursZero.json"],
  ["testGenerateSchemaWithMixedType", "xsd/sampleWithMixedType.xsd", "xsd/expectedJsonSchema/sampleWithMixedType.json"],
  ["testGenerateSchemaWithMultipleComplexTypesInDepth", "xsd/sampleWithMultipleComplexTypesInDepth.xsd", "xsd/expectedJsonSchema/sampleWithMultipleComplexTypesInDepth.json"],
  ["testGenerateSchemaWithMultipleDataTypes", "xsd/sampleWithMultipleDataTypes.xsd", "xsd/expectedJsonSchema/sampleWithMultipleDataTypes.json"],
  ["testGenerateSchemaWithMultipleSimpleContent", "xsd/sampleWithMultipleSimpleContent.xsd", "xsd/expectedJsonSchema/sampleWithMultipleSimpleContent.json"],
  ["testGenerateSchemaWithSimpleContentInArray", "xsd/sampleWithSimpleContentInArray.xsd", "xsd/expectedJsonSchema/sampleWithSimpleContentInArray.json"],
  ["testGenerateSchemaWithSimpleContentWithoutAttribute", "xsd/sampleWithSimpleContentWithoutAttribute.xsd", "xsd/expectedJsonSchema/sampleWithSimpleContentWithoutAttribute.json"],
  ["testGenerateSchemaWithSimpleTypeInAttribute", "xsd/sampleWithSimpleTypeInAttribute.xsd", "xsd/expectedJsonSchema/sampleWithSimpleTypeInAttribute.json"],
  ["testGenerateSchemaWithSimpleTypeRestrictions", "xsd/sampleWithSimpleTypeRestrictions.xsd", "xsd/expectedJsonSchema/sampleWithSimpleTypeRestrictions.json"],
  ["testGenerateSchemaWithSimpleTypeWithEnumInArray", "xsd/sampleWithSimpleTypeWithEnumInArray.xsd", "xsd/expectedJsonSchema/sampleWithSimpleTypeWithEnumInArray.json"],
  ["testGenerateSchemaWithMultipleSubTypes", "xsd/sampleWithMultipleSubTypes.xsd", "xsd/expectedJsonSchema/sampleWithMultipleSubTypes.json"],
  ["testGenerateSchemaWithMultipleTopLevelComplexElements", "xsd/sampleWithMultipleTopLevelComplexElements.xsd", "xsd/expectedJsonSchema/sampleWithMultipleTopLevelComplexElements.json"],
  ["testGenerateSchemaWithMultipleTopLevelElements", "xsd/sampleWithMultipleTopLevelElements.xsd", "xsd/expectedJsonSchema/sampleWithMultipleTopLevelElements.json"],
  ["testGenerateSchemaWithMultipleTypes", "xsd/sampleWithMultipleTypes.xsd", "xsd/expectedJsonSchema/sampleWithMultipleTypes.json"],
  ["testGenerateSchemaWithNestedSimpleContent", "xsd/sampleWithNestedSimpleContent.xsd", "xsd/expectedJsonSchema/sampleWithNestedSimpleContent.json"],
  ["testGenerateSchemaWithNotationElement", "xsd/sampleWithNotationElement.xsd", "xsd/expectedJsonSchema/sampleWithNotationElement.json"],
  ["testGenerateSchemaWithOnlyAttributesInComplexType", "xsd/sampleWithOnlyAttributesInComplexType.xsd", "xsd/expectedJsonSchema/sampleWithOnlyAttributesInComplexType.json"],
  ["testGenerateSchemaWithAnnotationAndDocumentation", "xsd/sampleWithAnnotationAndDocumentation.xsd", "xsd/expectedJsonSchema/sampleWithAnnotationAndDocumentation.json"],
  ["testGenerateSchemaWithAnyAttribute", "xsd/sampleWithAnyAttribute.xsd", "xsd/expectedJsonSchema/sampleWithAnyAttribute.json"],
  ["testGenerateSchemaWithAnyElements", "xsd/sampleWithAnyElements.xsd", "xsd/expectedJsonSchema/sampleWithAnyElements.json"],
  ["testGenerateSchemaWithArray", "xsd/sampleWithArray.xsd", "xsd/expectedJsonSchema/sampleWithArray.json"],
  ["testGenerateSchemaWithReferencedSimpleContent", "xsd/sampleWithReferencedSimpleContent.xsd", "xsd/expectedJsonSchema/sampleWithReferencedSimpleContent.json"],
  ["testGenerateSchemaWithSelectorElement", "xsd/sampleWithSelectorElement.xsd", "xsd/expectedJsonSchema/sampleWithSelectorElement.json"],
  ["testGenerateSchemaWithSimpleChoiceInArray", "xsd/sampleWithSimpleChoiceInArray.xsd", "xsd/expectedJsonSchema/sampleWithSimpleChoiceInArray.json"],
  ["testGenerateSchemaWithSimpleContent", "xsd/sampleWithSimpleContent.xsd", "xsd/expectedJsonSchema/sampleWithSimpleContent.json"],
  ["testGenerateSchemaWithChoiceAndSimpleContent", "xsd/sampleWithChoiceAndSimpleContent.xsd", "xsd/expectedJsonSchema/sampleWithChoiceAndSimpleContent.json"],
  ["testGenerateSchemaWithChoiceInNestedObjects", "xsd/sampleWithChoiceInNestedObjects.xsd", "xsd/expectedJsonSchema/sampleWithChoiceInNestedObjects.json"],
  ["testGenerateSchemaWithChoiceInsideChoices", "xsd/sampleWithChoiceInsideChoices.xsd", "xsd/expectedJsonSchema/sampleWithChoiceInsideChoices.json"],
  ["testGenerateSchemaWithChoiceObjectInArray", "xsd/sampleWithChoiceObjectInArray.xsd", "xsd/expectedJsonSchema/sampleWithChoiceObjectInArray.json"],
  ["testGenerateSchemaWithChoicesAsObjects", "xsd/sampleWithChoicesAsObjects.xsd", "xsd/expectedJsonSchema/sampleWithChoicesAsObjects.json"],
  ["testGenerateSchemaWithComplexContent", "xsd/sampleWithComplexContent.xsd", "xsd/expectedJsonSchema/sampleWithComplexContent.json"],
  ["testGenerateSchemaWithComplexContentInArray", "xsd/sampleWithComplexContentInArray.xsd", "xsd/expectedJsonSchema/sampleWithComplexContentInArray.json"],
  ["testGenerateSchemaWithSimpleTypeInArray", "xsd/sampleWithSimpleTypeInArray.xsd", "xsd/expectedJsonSchema/sampleWithSimpleTypeInArray.json"],
  ["testGenerateSchemaWithSingleElement", "xsd/sampleWithSingleElement.xsd", "xsd/expectedJsonSchema/sampleWithSingleElement.json"],
  ["testGenerateSchemaWithUnionTypes", "xsd/sampleWithUnionTypes.xsd", "xsd/expectedJsonSchema/sampleWithUnionTypes.json"],
  ["testGenerateSchemaWithUniqueElement", "xsd/sampleWithUniqueElement.xsd", "xsd/expectedJsonSchema/sampleWithUniqueElement.json"],
];

describe("SchemaGeneratorForXSD", () => {
  for (const [name, xsd, expected] of cases) {
    it(name, () => {
      const jsonSchema = new SchemaGeneratorForXSD().getSchemaContent(read(xsd), FileType.XSD, ",");
      expect(norm(jsonSchema)).toBe(norm(read(expected)));
    });
  }
});
