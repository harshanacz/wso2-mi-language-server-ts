import { describe, it, expect } from "vitest";
import path from "path";
import { fileURLToPath } from "url";
import { SchemaAssociator } from "../../src/schema/schemaAssociator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemasRoot = path.resolve(__dirname, "../../resources/schemas");
// A real, readable XSD to use as a custom-association target.
const customXsd = path.join(schemasRoot, "440", "synapse_config.xsd");

// ── G2.1: glob matching edge cases ──────────────────────────────────────────────

describe("SchemaAssociator — glob matching", () => {
  it("**/*.xml matches a file via its document path", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "**/*.xml", xsdPath: customXsd, isBuiltIn: false });
    const r = a.findSchema("b.xml", undefined, "/p/a/b.xml");
    expect(r?.source).toBe("custom");
  });

  it("a project-scoped glob matches only inside that project", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "project-430/**/*.xml", xsdPath: customXsd, isBuiltIn: false });
    expect(a.findSchema("b.xml", undefined, "/x/project-430/a/b.xml")?.source).toBe("custom");
    expect(a.findSchema("b.xml", undefined, "/x/other/b.xml")).toBeNull();
  });

  it("treats '.' in a pattern as a literal, not a wildcard", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "a.b.xml", xsdPath: customXsd, isBuiltIn: false });
    // exact filename match
    expect(a.findSchema("a.b.xml", undefined, "/p/a.b.xml")?.source).toBe("custom");
    // 'aXb.xml' must NOT match the escaped-dot pattern
    expect(a.findSchema("aXb.xml", undefined, "/p/aXb.xml")).toBeNull();
  });

  it("an exact filename pattern matches that filename", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "service.xml", xsdPath: customXsd, isBuiltIn: false });
    expect(a.findSchema("service.xml")?.source).toBe("custom");
    expect(a.findSchema("other.xml")).toBeNull();
  });
});

// ── G2.2: precedence — pom.xml hardcode beats a custom **/*.xml association ──────

describe("SchemaAssociator — precedence", () => {
  it("pom.xml resolves to the built-in Maven schema even with a custom **/*.xml association", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "**/*.xml", xsdPath: customXsd, isBuiltIn: false });
    const r = a.findSchema("pom.xml", undefined, "/x/pom.xml");
    expect(r).not.toBeNull();
    expect(r?.source).toBe("builtin");
    expect(r?.xsdPath).toContain("maven");
  });

  it("a non-pom file still matches the custom **/*.xml association", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "**/*.xml", xsdPath: customXsd, isBuiltIn: false });
    expect(a.findSchema("svc.xml", undefined, "/x/svc.xml")?.source).toBe("custom");
  });
});

// ── G2.3: missing custom XSD short-circuits to null (does NOT fall through) ──────

describe("SchemaAssociator — missing custom XSD", () => {
  it("returns null and does not fall through to built-ins when the custom XSD is missing", () => {
    const a = new SchemaAssociator();
    a.addUserAssociation({ pattern: "**/*.xml", xsdPath: "/nonexistent/missing.xsd", isBuiltIn: false });
    // Even though the synapse xmlns would match a built-in, the matched-but-unreadable
    // custom association returns null first.
    const r = a.findSchema("svc.xml", "http://ws.apache.org/ns/synapse", "/x/svc.xml");
    expect(r).toBeNull();
  });
});
