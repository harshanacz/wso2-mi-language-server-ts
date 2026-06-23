import { describe, it, expect } from "vitest";
import { inlineIncludes, resolveRelativePath } from "../../src/schema/schemaProvider.js";

// Unit tests for xs:include / xs:redefine inlining used to build the completion
// provider's flattened schema (audit G2.10).

const schema = (body: string, attrs = "") => `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"${attrs}>${body}</xs:schema>`;

describe("resolveRelativePath", () => {
  it("resolves a sibling against the entry filename", () => {
    expect(resolveRelativePath("entry.xsd", "b.xsd")).toBe("b.xsd");
  });

  it("resolves a nested sibling", () => {
    expect(resolveRelativePath("mediators/m.xsd", "n.xsd")).toBe("mediators/n.xsd");
  });

  it("resolves a parent-relative ../ path", () => {
    expect(resolveRelativePath("mediators/m.xsd", "../misc/c.xsd")).toBe("misc/c.xsd");
  });

  it("ignores ./ segments", () => {
    expect(resolveRelativePath("entry.xsd", "./b.xsd")).toBe("b.xsd");
  });
});

describe("inlineIncludes", () => {
  it("inlines a single xs:include body and removes the include tag", () => {
    const entry = schema(`<xs:include schemaLocation="b.xsd"/>`);
    const imports = { "b.xsd": schema(`<xs:element name="X"/>`) };
    const out = inlineIncludes(entry, imports);
    expect(out).toContain(`<xs:element name="X"/>`);
    expect(out).not.toContain("xs:include");
  });

  it("inlines xs:redefine the same way", () => {
    const entry = schema(`<xs:redefine schemaLocation="b.xsd"><xs:complexType name="T"/></xs:redefine>`);
    const imports = { "b.xsd": schema(`<xs:element name="Y"/>`) };
    const out = inlineIncludes(entry, imports);
    expect(out).toContain(`<xs:element name="Y"/>`);
    expect(out).not.toContain("xs:redefine");
  });

  it("does NOT inline xs:import (only include/redefine are handled)", () => {
    const entry = schema(`<xs:import namespace="urn:x" schemaLocation="b.xsd"/>`);
    const imports = { "b.xsd": schema(`<xs:element name="Z"/>`) };
    const out = inlineIncludes(entry, imports);
    expect(out).toContain("xs:import");
    expect(out).not.toContain(`name="Z"`);
  });

  it("recursively inlines an A→B→C chain", () => {
    const entry = schema(`<xs:include schemaLocation="b.xsd"/>`);
    const imports = {
      "b.xsd": schema(`<xs:include schemaLocation="c.xsd"/><xs:element name="B"/>`),
      "c.xsd": schema(`<xs:element name="C"/>`),
    };
    const out = inlineIncludes(entry, imports);
    expect(out).toContain(`name="B"`);
    expect(out).toContain(`name="C"`);
  });

  it("terminates on a cyclic A↔B include graph", () => {
    const entry = schema(`<xs:include schemaLocation="b.xsd"/>`);
    const imports = {
      "b.xsd": schema(`<xs:include schemaLocation="entry.xsd"/><xs:element name="B"/>`),
    };
    let out = "";
    expect(() => { out = inlineIncludes(entry, imports); }).not.toThrow();
    expect(out).toContain(`name="B"`);
  });

  it("replaces an include with no matching import key by empty content", () => {
    const entry = schema(`<xs:include schemaLocation="missing.xsd"/><xs:element name="Keep"/>`);
    const out = inlineIncludes(entry, {});
    expect(out).not.toContain("xs:include");
    expect(out).toContain(`name="Keep"`);
  });

  it("resolves a ../ include against the current file's directory", () => {
    const entry = schema(`<xs:include schemaLocation="mediators/m.xsd"/>`);
    const imports = {
      "mediators/m.xsd": schema(`<xs:include schemaLocation="../misc/c.xsd"/><xs:element name="M"/>`),
      "misc/c.xsd": schema(`<xs:element name="C"/>`),
    };
    const out = inlineIncludes(entry, imports);
    expect(out).toContain(`name="M"`);
    expect(out).toContain(`name="C"`);
  });
});
