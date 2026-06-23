import { describe, it, expect } from "vitest";
import { SchemaProvider } from "../../src/schema/schemaProvider.js";

// Lifecycle behavior of the validator/completion registry (audit G2.5–G2.7),
// exercised through the public API only.

const XSD = `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="root"><xs:complexType><xs:sequence>
    <xs:element name="child" type="xs:string"/>
  </xs:sequence></xs:complexType></xs:element>
</xs:schema>`;

describe("SchemaProvider — shared xsdKey across documents (G2.5)", () => {
  it("two documents sharing the same xsdPath both register", async () => {
    const p = new SchemaProvider();
    await p.buildAndCacheCompletionProvider({ uri: "auto://a", xsdText: XSD, xsdPath: "/shared.xsd" });
    await p.buildAndCacheCompletionProvider({ uri: "auto://b", xsdText: XSD, xsdPath: "/shared.xsd" });
    expect(p.hasSchema("auto://a")).toBe(true);
    expect(p.hasSchema("auto://b")).toBe(true);
  });
});

describe("SchemaProvider — key remap on changed xsdPath (G2.6)", () => {
  it("re-registering a uri under a different xsdPath does not throw and stays registered", async () => {
    const p = new SchemaProvider();
    await p.buildAndCacheCompletionProvider({ uri: "auto://a", xsdText: XSD, xsdPath: "/p1.xsd" });
    await expect(
      p.buildAndCacheCompletionProvider({ uri: "auto://a", xsdText: XSD, xsdPath: "/p2.xsd" })
    ).resolves.toBeUndefined();
    expect(p.hasSchema("auto://a")).toBe(true);
  });
});

describe("SchemaProvider — invalidateAutoSchemas (G2.7)", () => {
  it("removes auto:// document mappings", async () => {
    const p = new SchemaProvider();
    await p.buildAndCacheCompletionProvider({ uri: "auto:///x/doc.xml", xsdText: XSD, xsdPath: "/s.xsd" });
    expect(p.hasSchema("auto:///x/doc.xml")).toBe(true);
    p.invalidateAutoSchemas();
    expect(p.hasSchema("auto:///x/doc.xml")).toBe(false);
  });

  it("leaves a non-auto document mapping intact", async () => {
    const p = new SchemaProvider();
    await p.buildAndCacheCompletionProvider({ uri: "file:///keep.xml", xsdText: XSD, xsdPath: "/s.xsd" });
    p.invalidateAutoSchemas();
    expect(p.hasSchema("file:///keep.xml")).toBe(true);
  });
});

describe("SchemaProvider — dispose clears all state", () => {
  it("hasSchema is false for every uri after dispose()", async () => {
    const p = new SchemaProvider();
    await p.buildAndCacheCompletionProvider({ uri: "auto://a", xsdText: XSD, xsdPath: "/s.xsd" });
    await p.buildAndCacheCompletionProvider({ uri: "file:///b.xml", xsdText: XSD, xsdPath: "/s.xsd" });
    p.dispose();
    expect(p.hasSchema("auto://a")).toBe(false);
    expect(p.hasSchema("file:///b.xml")).toBe(false);
  });
});
