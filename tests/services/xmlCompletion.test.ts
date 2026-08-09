import { describe, it, expect } from "vitest";
import { parseXMLDocument } from "../../src/parser/xmlParser.js";
import { doComplete } from "../../src/services/xmlCompletion.js";
import { XsdCompletionProvider } from "../../src/schema/xsdCompletionProvider.js";

// ─── Document-tree fallback (no schema) ──────────────────────────────────────
// line 0: <root><child/></root>
// offset 7 = textBefore '<root><'  → context 1 (after '<')
// offset 16 = textBefore '<root><child/></'  → context 3 (after '</')
const xml = "<root><child/></root>";
const uri = "file:///test.xml";

describe("doComplete — structural (no schema)", () => {
  const doc = parseXMLDocument(uri, xml);

  it("always returns a CompletionList (never null or undefined)", () => {
    const result = doComplete(doc, { line: 0, character: 0 });
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });

  it("CompletionList has an items array and an isIncomplete boolean", () => {
    const result = doComplete(doc, { line: 0, character: 0 });
    expect(Array.isArray(result.items)).toBe(true);
    expect(typeof result.isIncomplete).toBe("boolean");
  });

  it("context after '<' returns items with kind 'element'", () => {
    // offset 7: textBefore = '<root><' → context 1
    const result = doComplete(doc, { line: 0, character: 7 });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((i) => i.kind === "element")).toBe(true);
  });

  it("element completions include names from the document tree", () => {
    const result = doComplete(doc, { line: 0, character: 7 });
    const labels = result.items.map((i) => i.label);
    expect(labels).toContain("root");
    expect(labels).toContain("child");
  });

  it("context after '</' returns a closeTag kind item", () => {
    // offset 16: textBefore = '<root><child/></' → context 3 (after '</')
    const result = doComplete(doc, { line: 0, character: 16 });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.some((i) => i.kind === "closeTag")).toBe(true);
  });

  it("closeTag insertText ends with '>'", () => {
    const result = doComplete(doc, { line: 0, character: 16 });
    const closeItem = result.items.find((i) => i.kind === "closeTag");
    expect(closeItem?.insertText).toMatch(/>$/);
  });

  it("all items have a label and an insertText", () => {
    const result = doComplete(doc, { line: 0, character: 7 });
    for (const item of result.items) {
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
      expect(typeof item.insertText).toBe("string");
    }
  });

  it("isIncomplete is false for all contexts", () => {
    expect(doComplete(doc, { line: 0, character: 7 }).isIncomplete).toBe(false);
    expect(doComplete(doc, { line: 0, character: 16 }).isIncomplete).toBe(false);
    expect(doComplete(doc, { line: 0, character: 0 }).isIncomplete).toBe(false);
  });

  it("position with no active context returns an empty list (not null)", () => {
    // character 0 is before any '<' — falls through all patterns
    const result = doComplete(doc, { line: 0, character: 0 });
    expect(result).toBeDefined();
    expect(Array.isArray(result.items)).toBe(true);
  });
});

// ─── XSD-aware element completions ───────────────────────────────────────────

const xsd = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="project">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="groupId"/>
        <xs:element name="artifactId"/>
      </xs:sequence>
      <xs:attribute name="version" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

describe("doComplete — XSD-aware element completions", () => {
  // '<project><' — cursor after '<', inside project context
  const xmlWithSchema = "<project><groupId/></project>";
  const doc = parseXMLDocument(uri, xmlWithSchema);
  const provider = new XsdCompletionProvider(xsd);

  it("with a schema provider returns children of the enclosing element", () => {
    // character 10 is after '<project><' — inside project, after '<'
    const result = doComplete(doc, { line: 0, character: 10 }, provider);
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("XSD-driven items include 'groupId'", () => {
    const result = doComplete(doc, { line: 0, character: 10 }, provider);
    const labels = result.items.map((i) => i.label);
    expect(labels).toContain("groupId");
  });

  it("XSD-driven items include 'artifactId'", () => {
    const result = doComplete(doc, { line: 0, character: 10 }, provider);
    const labels = result.items.map((i) => i.label);
    expect(labels).toContain("artifactId");
  });

  it("XSD-driven element items have kind 'element'", () => {
    const result = doComplete(doc, { line: 0, character: 10 }, provider);
    expect(result.items.every((i) => i.kind === "element")).toBe(true);
  });

  it("XSD-driven element insertText wraps with open/close tags", () => {
    const result = doComplete(doc, { line: 0, character: 10 }, provider);
    for (const item of result.items) {
      // insertText should look like 'name>$0</name>'
      expect(item.insertText).toContain(item.label);
      expect(item.insertText).toContain("</");
    }
  });
});

describe("doComplete — XSD child maxOccurs", () => {
  const cardinalityXsd = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="project">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="once"/>
        <xs:element name="twice" maxOccurs="2"/>
        <xs:element name="many" maxOccurs="unbounded"/>
        <xs:sequence maxOccurs="2">
          <xs:element name="throughSequence"/>
        </xs:sequence>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
  const provider = new XsdCompletionProvider(cardinalityXsd);

  function completionLabels(text: string): string[] {
    const doc = parseXMLDocument(uri, text);
    return doComplete(doc, { line: 0, character: text.length }, provider).items.map((item) => item.label);
  }

  it("does not suggest a default maxOccurs=1 child after it exists", () => {
    const labels = completionLabels("<project><once/><");
    expect(labels).not.toContain("once");
    expect(labels).toContain("twice");
    expect(labels).toContain("many");
  });

  it("continues suggesting a bounded child until its limit is reached", () => {
    expect(completionLabels("<project><twice/><")).toContain("twice");
    expect(completionLabels("<project><twice/><twice/><")).not.toContain("twice");
  });

  it("continues suggesting an unbounded child after existing occurrences", () => {
    expect(completionLabels("<project><many/><many/><")).toContain("many");
  });

  it("honors occurrence limits inherited from an enclosing sequence", () => {
    expect(completionLabels("<project><throughSequence/><")).toContain("throughSequence");
    expect(
      completionLabels("<project><throughSequence/><throughSequence/><")
    ).not.toContain("throughSequence");
  });
});

// ─── XSD-aware attribute completions ─────────────────────────────────────────

describe("doComplete — XSD-aware attribute completions", () => {
  // '<project version' — cursor is in attribute position
  const xmlAttr = "<project version";
  const doc = parseXMLDocument(uri, xmlAttr);
  const provider = new XsdCompletionProvider(xsd);

  it("attribute context returns items with kind 'attribute'", () => {
    // character 9 = after '<project ' — in attribute position
    const result = doComplete(doc, { line: 0, character: 9 }, provider);
    const attrItems = result.items.filter((i) => i.kind === "attribute");
    expect(attrItems.length).toBeGreaterThan(0);
  });

  it("required attribute 'version' is included in suggestions", () => {
    const result = doComplete(doc, { line: 0, character: 9 }, provider);
    const labels = result.items.map((i) => i.label);
    expect(labels).toContain("version");
  });

  it("filters out multiple attributes that are already specified on the tag", () => {
    const multiAttrXsd = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="api">
    <xs:complexType>
      <xs:attribute name="context" type="xs:string"/>
      <xs:attribute name="name" type="xs:string"/>
      <xs:attribute name="xmlns" type="xs:string"/>
      <xs:attribute name="transports" type="xs:string"/>
      <xs:attribute name="trace" type="xs:string"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
    const multiProvider = new XsdCompletionProvider(multiAttrXsd);
    const xmlWithAttrs = '<api context="/d" name="d" xmlns="http://ws.apache.org/ns/synapse" ';
    const testDoc = parseXMLDocument(uri, xmlWithAttrs);
    const result = doComplete(testDoc, { line: 0, character: xmlWithAttrs.length }, multiProvider);
    const labels = result.items.map((i) => i.label);

    expect(labels).not.toContain("context");
    expect(labels).not.toContain("name");
    expect(labels).not.toContain("xmlns");
    expect(labels).toContain("transports");
    expect(labels).toContain("trace");
  });

  it("filters out attributes on multi-attribute tags like <resource>", () => {
    const resourceXsd = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="resource">
    <xs:complexType>
      <xs:attribute name="methods" type="xs:string"/>
      <xs:attribute name="uri-template" type="xs:string"/>
      <xs:attribute name="url-mapping" type="xs:string"/>
      <xs:attribute name="protocol" type="xs:string"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
    const provider = new XsdCompletionProvider(resourceXsd);
    const xml = '<resource methods="GET" uri-template="/" ';
    const testDoc = parseXMLDocument(uri, xml);
    const result = doComplete(testDoc, { line: 0, character: xml.length }, provider);
    const labels = result.items.map((i) => i.label);

    expect(labels).not.toContain("methods");
    expect(labels).not.toContain("uri-template");
    expect(labels).toContain("url-mapping");
    expect(labels).toContain("protocol");
  });
});

// ─── Fallback attribute completions (no schema) ───────────────────────────────

describe("doComplete — fallback attribute completions (no schema)", () => {
  const xmlAttr = "<root xml";
  const doc = parseXMLDocument(uri, xmlAttr);

  it("without schema returns built-in XML attribute suggestions", () => {
    const result = doComplete(doc, { line: 0, character: 9 });
    const attrItems = result.items.filter((i) => i.kind === "attribute");
    expect(attrItems.length).toBeGreaterThan(0);
  });

  it("built-in suggestions include xml:lang or xmlns", () => {
    const result = doComplete(doc, { line: 0, character: 9 });
    const labels = result.items.map((i) => i.label);
    expect(labels.some((l) => l.startsWith("xml"))).toBe(true);
  });

  it("filters out already specified fallback attributes", () => {
    const fallbackDoc = parseXMLDocument(uri, '<root xmlns="http://foo" ');
    const result = doComplete(fallbackDoc, { line: 0, character: 25 });
    const labels = result.items.map((i) => i.label);
    expect(labels).not.toContain("xmlns");
    expect(labels).toContain("xml:lang");
  });
});
