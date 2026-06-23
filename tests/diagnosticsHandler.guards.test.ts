import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { DiagnosticsHandler } from "../src/diagnosticsHandler.js";
import { createConnection, makeTempDir, writeFile } from "./helpers/diagnosticsTestUtils.js";

// Limit/symlink guards in loadReferencedXsds (audit G3.3, G3.4). Driven by calling
// the private method directly (mirroring the existing referenceLoading tests), so no
// Xerces WASM is involved. The 20MB total-bytes guard is omitted as impractical to fixture.

const XSD = (body = "") => `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">${body}</xs:schema>`;

function newHandler() {
  const { connection, warnings } = createConnection();
  const handler = new DiagnosticsHandler(connection as any, {} as any) as any;
  return { handler, warnings };
}

describe("loadReferencedXsds — file count limit (G3.3)", () => {
  it("loads at most MAX_SCHEMA_IMPORT_FILES (200) referenced files", () => {
    const root = makeTempDir();
    const refs = Array.from({ length: 201 }, (_, i) => `f${i}.xsd`);
    const mainText = XSD(refs.map((r) => `<xs:include schemaLocation="${r}"/>`).join(""));
    writeFile(path.join(root, "main.xsd"), mainText);
    for (const r of refs) writeFile(path.join(root, r), XSD());

    const { handler, warnings } = newHandler();
    const imports = handler.loadReferencedXsds(path.join(root, "main.xsd"), mainText);

    expect(Object.keys(imports).length).toBe(200);
    expect(warnings.some((w) => w.includes("max import file count"))).toBe(true);
  });
});

describe("loadReferencedXsds — depth limit (G3.3)", () => {
  it("stops traversing at MAX_SCHEMA_IMPORT_DEPTH (10) levels", () => {
    const root = makeTempDir();
    // main → f1 → f2 → ... → f11 (a single linear include chain)
    const mainText = XSD(`<xs:include schemaLocation="f1.xsd"/>`);
    writeFile(path.join(root, "main.xsd"), mainText);
    for (let i = 1; i <= 11; i++) {
      const next = i < 11 ? `<xs:include schemaLocation="f${i + 1}.xsd"/>` : "";
      writeFile(path.join(root, `f${i}.xsd`), XSD(next));
    }

    const { handler } = newHandler();
    const imports = handler.loadReferencedXsds(path.join(root, "main.xsd"), mainText);

    // f1..f10 reachable within the depth budget; f11 is beyond it.
    for (let i = 1; i <= 10; i++) expect(imports[`f${i}.xsd`]).toBeDefined();
    expect(imports["f11.xsd"]).toBeUndefined();
  });
});

describe("loadReferencedXsds — symlink references are skipped (G3.4)", () => {
  it("does not load a symlinked schema file", () => {
    const root = makeTempDir();
    const mainText = XSD(`<xs:include schemaLocation="link.xsd"/>`);
    writeFile(path.join(root, "main.xsd"), mainText);
    writeFile(path.join(root, "target.xsd"), XSD());
    fs.symlinkSync(path.join(root, "target.xsd"), path.join(root, "link.xsd"));

    const { handler, warnings } = newHandler();
    const imports = handler.loadReferencedXsds(path.join(root, "main.xsd"), mainText);

    // Only the symlink was referenced; it is skipped, so no imports are produced.
    expect(imports?.["link.xsd"]).toBeUndefined();
    expect(warnings.some((w) => w.includes("non-file schema reference"))).toBe(true);
  });
});
