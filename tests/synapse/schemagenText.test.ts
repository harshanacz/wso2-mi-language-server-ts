import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fixture } from "./helpers.js";
import { FileType } from "../../src/synapse/schemagen/util/FileType.js";
import { SchemaGeneratorForCSV } from "../../src/synapse/schemagen/util/SchemaGeneratorForCSV.js";
import { SchemaGeneratorForJSON } from "../../src/synapse/schemagen/util/SchemaGeneratorForJSON.js";
import { SchemaGeneratorForXML } from "../../src/synapse/schemagen/util/SchemaGeneratorForXML.js";

/** Ports SchemaGeneratorForCSVTest, SchemaGeneratorForJSONTest and SchemaGeneratorForXMLTest. */
type Case = [name: string, sample: string, expected: string | null, delimiter: string | null, throws: boolean];

const read = (rel: string) => readFileSync(fixture("synapse/schemagen/" + rel), "utf8");
const norm = (s: string) => s.replace(/\r\n/g, "").replace(/\n/g, "").replace(/ /g, "").trim();

function run(title: string, gen: () => { getSchemaContent(c: string, t: any, d: string | null): string }, type: any, cases: Case[]) {
  describe(title, () => {
    for (const [name, sample, expected, delimiter, throws] of cases) {
      it(name, () => {
        const generate = () => gen().getSchemaContent(read(sample), type, delimiter);
        if (throws) {
          expect(generate).toThrow();
          return;
        }
        expect(generate().trim().replace(/ /g, "").trim()).toBe(norm(read(expected!)));
      });
    }
  });
}

const csvCases: Case[] = [
  ["testGenerateSchemaWithBasicWithHeaders", "csv/sampleWithBasicWithHeaders.csv", "csv/expectedJsonSchema/sampleWithBasicWithHeaders.json", ",", false],
  ["testGenerateSchemaWithBasicWithoutHeaders", "csv/sampleWithBasicWithoutHeaders.csv", "csv/expectedJsonSchema/sampleWithBasicWithoutHeaders.json", ",", false],
  ["testGenerateSchemaWithDateTimeFormats", "csv/sampleWithDateTimeFormats.csv", "csv/expectedJsonSchema/sampleWithDateTimeFormats.json", ",", false],
  ["testGenerateSchemaWithDuplicateColumnNames", "csv/sampleWithDuplicateColumnNames.csv", "csv/expectedJsonSchema/sampleWithDuplicateColumnNames.json", ",", false],
  ["testGenerateSchemaWithEmptyContent", "csv/sampleWithEmptyContent.csv", null, ",", true],
  ["testGenerateSchemaWithEscapedQuotes", "csv/sampleWithEscapedQuotes.csv", "csv/expectedJsonSchema/sampleWithEscapedQuotes.json", ",", false],
  ["testGenerateSchemaWithInconsistentRows", "csv/sampleWithInconsistentRows.csv", null, ",", true],
  ["testGenerateSchemaWithLeadingTrailingSpaces", "csv/sampleWithLeadingTrailingSpaces.csv", "csv/expectedJsonSchema/sampleWithLeadingTrailingSpaces.json", ",", false],
  ["testGenerateSchemaWithMissingValues", "csv/sampleWithMissingValues.csv", "csv/expectedJsonSchema/sampleWithMissingValues.json", ",", false],
  ["testGenerateSchemaWithMixedDataTypes", "csv/sampleWithMixedDataTypes.csv", "csv/expectedJsonSchema/sampleWithMixedDataTypes.json", ",", false],
  ["testGenerateSchemaWithMixedLineEndings", "csv/sampleWithMixedLineEndings.csv", "csv/expectedJsonSchema/sampleWithMixedLineEndings.json", ",", false],
  ["testGenerateSchemaWithNumericColumnNames", "csv/sampleWithNumericColumnNames.csv", "csv/expectedJsonSchema/sampleWithNumericColumnNames.json", ",", false],
  ["testGenerateSchemaWithOnlyHeaders", "csv/sampleWithOnlyHeaders.csv", "csv/expectedJsonSchema/sampleWithOnlyHeaders.json", ",", false],
  ["testGenerateSchemaWithOutlierValues", "csv/sampleWithOutlierValues.csv", "csv/expectedJsonSchema/sampleWithOutlierValues.json", ",", false],
  ["testGenerateSchemaWithPipeDelimited", "csv/sampleWithPipeDelimited.csv", "csv/expectedJsonSchema/sampleWithPipeDelimited.json", "|", false],
  ["testGenerateSchemaWithQuotedValues", "csv/sampleWithQuotedValues.csv", "csv/expectedJsonSchema/sampleWithQuotedValues.json", ",", false],
  ["testGenerateSchemaWithSemicolonDelimited", "csv/sampleWithSemicolonDelimited.csv", "csv/expectedJsonSchema/sampleWithSemicolonDelimited.json", ";", false],
  ["testGenerateSchemaWithSpecialCharacters", "csv/sampleWithSpecialCharacters.csv", "csv/expectedJsonSchema/sampleWithSpecialCharacters.json", ",", false],
  ["testGenerateSchemaWithTabDelimited", "csv/sampleWithTabDelimited.csv", "csv/expectedJsonSchema/sampleWithTabDelimited.json", "\t", false],
];
run("SchemaGeneratorForCSV", () => new SchemaGeneratorForCSV(), FileType.CSV, csvCases);

const jsonCases: Case[] = [
  ["testGenerateSchemaWithArrayOfNulls", "json/sampleWithArrayOfNulls.json", "json/expectedJsonSchema/sampleWithArrayOfNulls.json", "", false],
  ["testGenerateSchemaWithArrays", "json/sampleWithArrays.json", "json/expectedJsonSchema/sampleWithArrays.json", "", false],
  ["testGenerateSchemaWithBooleans", "json/sampleWithBooleans.json", "json/expectedJsonSchema/sampleWithBooleans.json", "", false],
  ["testGenerateSchemaWithComplexArray", "json/sampleWithComplexArray.json", "json/expectedJsonSchema/sampleWithComplexArray.json", "", false],
  ["testGenerateSchemaWithControlCharacters", "json/sampleWithControlCharacters.json", "json/expectedJsonSchema/sampleWithControlCharacters.json", "", false],
  ["testGenerateSchemaWithDateTime", "json/sampleWithDateTime.json", "json/expectedJsonSchema/sampleWithDateTime.json", "", false],
  ["testGenerateSchemaWithDeepNestedArrays", "json/sampleWithDeepNestedArrays.json", "json/expectedJsonSchema/sampleWithDeepNestedArrays.json", "", false],
  ["testGenerateSchemaWithDeeplyNestedObjects", "json/sampleWithDeeplyNestedObjects.json", "json/expectedJsonSchema/sampleWithDeeplyNestedObjects.json", "", false],
  ["testGenerateSchemaWithDuplicateObjects", "json/sampleWithDuplicateObjects.json", "json/expectedJsonSchema/sampleWithDuplicateObjects.json", "", false],
  ["testGenerateSchemaWithEmptyArray", "json/sampleWithEmptyArray.json", "json/expectedJsonSchema/sampleWithEmptyArray.json", "", false],
  ["testGenerateSchemaWithEmptyFile", "json/sampleWithEmptyFile.json", null, "", true],
  ["testGenerateSchemaWithEmptyObject", "json/sampleWithEmptyObject.json", "json/expectedJsonSchema/sampleWithEmptyObject.json", "", false],
  ["testGenerateSchemaWithLargeNumbers", "json/sampleWithLargeNumbers.json", "json/expectedJsonSchema/sampleWithLargeNumbers.json", "", false],
  ["testGenerateSchemaWithMixedArray", "json/sampleWithMixedArray.json", "json/expectedJsonSchema/sampleWithMixedArray.json", "", false],
  ["testGenerateSchemaWithMixedDataTypes", "json/sampleWithMixedDataTypes.json", "json/expectedJsonSchema/sampleWithMixedDataTypes.json", "", false],
  ["testGenerateSchemaWithNestedArrays", "json/sampleWithNestedArrays.json", "json/expectedJsonSchema/sampleWithNestedArrays.json", "", false],
  ["testGenerateSchemaWithNestedObjects", "json/sampleWithNestedObjects.json", "json/expectedJsonSchema/sampleWithNestedObjects.json", "", false],
  ["testGenerateSchemaWithNullValues", "json/sampleWithNullValues.json", "json/expectedJsonSchema/sampleWithNullValues.json", "", false],
  ["testGenerateSchemaWithNumericValuesOnly", "json/sampleWithNumericValuesOnly.json", "json/expectedJsonSchema/sampleWithNumericValuesOnly.json", "", false],
  ["testGenerateSchemaWithOptionalFields", "json/sampleWithOptionalFields.json", "json/expectedJsonSchema/sampleWithOptionalFields.json", "", false],
  ["testGenerateSchemaWithRepeatedKeys", "json/sampleWithRepeatedKeys.json", "json/expectedJsonSchema/sampleWithRepeatedKeys.json", "", false],
  ["testGenerateSchemaWithSimpleKeyValue", "json/sampleWithSimpleKeyValue.json", "json/expectedJsonSchema/sampleWithSimpleKeyValue.json", "", false],
  ["testGenerateSchemaWithSingleBoolean", "json/sampleWithSingleBoolean.json", null, "", true],
  ["testGenerateSchemaWithSingleElementArray", "json/sampleWithSingleElementArray.json", "json/expectedJsonSchema/sampleWithSingleElementArray.json", "", false],
  ["testGenerateSchemaWithSingleNull", "json/sampleWithSingleNull.json", null, "", true],
  ["testGenerateSchemaWithSingleNumber", "json/sampleWithSingleNumber.json", null, "", true],
  ["testGenerateSchemaWithSingleString", "json/sampleWithSingleString.json", null, "", true],
  ["testGenerateSchemaWithSpecialCharacters", "json/sampleWithSpecialCharacters.json", "json/expectedJsonSchema/sampleWithSpecialCharacters.json", "", false],
  ["testGenerateSchemaWithStringValuesOnly", "json/sampleWithStringValuesOnly.json", "json/expectedJsonSchema/sampleWithStringValuesOnly.json", "", false],
  ["testGenerateSchemaWithUUID", "json/sampleWithUUID.json", "json/expectedJsonSchema/sampleWithUUID.json", "", false],
  ["testGenerateSchemaWithWhitespaceOnly", "json/sampleWithWhitespaceOnly.json", null, "", true],
];
run("SchemaGeneratorForJSON", () => new SchemaGeneratorForJSON(), FileType.JSON, jsonCases);

const xmlCases: Case[] = [
  ["testGenerateSchemaWithAllMultipleDataTypes", "xml/sampleWithAllMultipleDataTypes.xml", "xml/expectedJsonSchema/sampleWithAllMultipleDataTypes.json", ",", false],
  ["testGenerateSchemaWithAttributes", "xml/sampleWithAttributes.xml", "xml/expectedJsonSchema/sampleWithAttributes.json", ",", false],
  ["testGenerateSchemaWithAttributesInSimpleContent", "xml/sampleWithAttributesInSimpleContent.xml", "xml/expectedJsonSchema/sampleWithAttributesInSimpleContent.json", ",", false],
  ["testGenerateSchemaWithBaseTypes", "xml/sampleWithBaseTypes.xml", "xml/expectedJsonSchema/sampleWithBaseTypes.json", ",", false],
  ["testGenerateSchemaWithCDATA", "xml/sampleWithCDATA.xml", "xml/expectedJsonSchema/sampleWithCDATA.json", ",", false],
  ["testGenerateSchemaWithComplexContentInArray", "xml/sampleWithComplexContentInArray.xml", "xml/expectedJsonSchema/sampleWithComplexContentInArray.json", ",", false],
  ["testGenerateSchemaWithDeeplyNestedStructure", "xml/sampleWithDeeplyNestedStructure.xml", "xml/expectedJsonSchema/sampleWithDeeplyNestedStructure.json", ",", false],
  ["testGenerateSchemaWithEmptyElement", "xml/sampleWithEmptyElement.xml", "xml/expectedJsonSchema/sampleWithEmptyElement.json", ",", false],
  ["testGenerateSchemaWithHierarchicalStructureWithArray", "xml/sampleWithHierarchicalStructureWithArray.xml", "xml/expectedJsonSchema/sampleWithHierarchicalStructureWithArray.json", ",", false],
  ["testGenerateSchemaWithInDepthSubTypes", "xml/sampleWithInDepthSubTypes.xml", "xml/expectedJsonSchema/sampleWithInDepthSubTypes.json", ",", false],
  ["testGenerateSchemaWithMixedType", "xml/sampleWithMixedType.xml", "xml/expectedJsonSchema/sampleWithMixedType.json", ",", false],
  ["testGenerateSchemaWithMultipleAttributesInComplexContent", "xml/sampleWithMultipleAttributesInComplexContent.xml", "xml/expectedJsonSchema/sampleWithMultipleAttributesInComplexContent.json", ",", false],
  ["testGenerateSchemaWithMultipleComplexTypesInDepth", "xml/sampleWithMultipleComplexTypesInDepth.xml", "xml/expectedJsonSchema/sampleWithMultipleComplexTypesInDepth.json", ",", false],
  ["testGenerateSchemaWithMultipleSubTypes", "xml/sampleWithMultipleSubTypes.xml", "xml/expectedJsonSchema/sampleWithMultipleSubTypes.json", ",", false],
  ["testGenerateSchemaWithNamespaces", "xml/sampleWithNamespaces.xml", "xml/expectedJsonSchema/sampleWithNamespaces.json", ",", false],
  ["testGenerateSchemaWithOnlyAttributesInSingleElement", "xml/sampleWithOnlyAttributesInSingleElement.xml", "xml/expectedJsonSchema/sampleWithOnlyAttributesInSingleElement.json", ",", false],
  ["testGenerateSchemaWithSimpleContentArrayAmongOthers", "xml/sampleWithSimpleContentArrayAmongOthers.xml", "xml/expectedJsonSchema/sampleWithSimpleContentArrayAmongOthers.json", ",", false],
  ["testGenerateSchemaWithSimpleContentInArray", "xml/sampleWithSimpleContentInArray.xml", "xml/expectedJsonSchema/sampleWithSimpleContentInArray.json", ",", false],
  ["testGenerateSchemaWithSingleElementMultipleAttributes", "xml/sampleWithSingleElementMultipleAttributes.xml", "xml/expectedJsonSchema/sampleWithSingleElementMultipleAttributes.json", ",", false],
  ["testGenerateSchemaWithSpecialCharacters", "xml/sampleWithSpecialCharacters.xml", "xml/expectedJsonSchema/sampleWithSpecialCharacters.json", ",", false],
];
run("SchemaGeneratorForXML", () => new SchemaGeneratorForXML(), FileType.XML, xmlCases);

