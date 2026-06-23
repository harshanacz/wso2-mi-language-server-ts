import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as path from "path";
import { createServer } from "../src/serverWiring.js";
import { makeTempDir, writeFile } from "./helpers/diagnosticsTestUtils.js";

// Lifecycle tests for the wired server (audit G5): debounce coalescing,
// configuration sequencing, the init guard, schema registration, error
// isolation, and onInitialize option parsing.

type Handlers = Record<string, Function[]>;

function harness() {
  const handlers: Handlers = {};
  const reg = (name: string) => (cb: Function) => {
    (handlers[name] ??= []).push(cb);
    return { dispose() {} };
  };
  const connection: any = {
    console: { log: () => {}, warn: (m: string) => warnings.push(m), error: () => {} },
    sendDiagnostics: () => {},
    onInitialize: reg("initialize"),
    onInitialized: reg("initialized"),
    onDidChangeConfiguration: reg("config"),
    onShutdown: reg("shutdown"),
    onCompletion: reg("completion"),
    onHover: reg("hover"),
    onDocumentSymbol: reg("symbol"),
    onFoldingRanges: reg("folding"),
    onRenameRequest: reg("rename"),
    onDefinition: reg("definition"),
    onReferences: reg("references"),
    onDocumentFormatting: reg("formatting"),
    onDocumentRangeFormatting: reg("rangeFormatting"),
  };
  const warnings: string[] = [];
  const docList: any[] = [];
  const documents: any = {
    all: () => docList,
    get: (uri: string) => docList.find((d) => d.uri === uri),
    onDidChangeContent: reg("change"),
    onDidClose: reg("close"),
  };
  const fire = (name: string, arg?: any) => handlers[name]?.map((h) => h(arg));
  return { handlers, connection, documents, docList, warnings, fire };
}

function mockDeps(order: string[] = []) {
  const diagnosticsHandler = {
    validateAndSend: vi.fn(async () => { order.push("validate"); }),
    clearDiagnostics: vi.fn(),
    dispose: vi.fn(() => order.push("dispose")),
  };
  const service = {
    invalidateAutoSchemas: vi.fn(() => order.push("invalidate")),
    clearUserAssociations: vi.fn(() => order.push("clear")),
    addUserAssociation: vi.fn(() => order.push("register")),
    dispose: vi.fn(),
    parseXMLDocument: vi.fn(),
  };
  return { diagnosticsHandler, service };
}

const doc = (uri: string, version = 1) => ({ uri, version, getText: () => "<a/>" });

describe("G5.1 — debounce coalescing", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("coalesces rapid edits on one document into a single validation", async () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {}, debounceMs: 300 });
    await h.fire("initialized");

    for (let i = 1; i <= 5; i++) {
      h.fire("change", { document: doc("u1", i) });
      vi.advanceTimersByTime(50);
    }
    vi.advanceTimersByTime(300);

    expect(diagnosticsHandler.validateAndSend).toHaveBeenCalledTimes(1);
  });

  it("debounces two documents independently (one validation each)", async () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {}, debounceMs: 300 });
    await h.fire("initialized");

    h.fire("change", { document: doc("u1") });
    h.fire("change", { document: doc("u2") });
    vi.advanceTimersByTime(300);

    expect(diagnosticsHandler.validateAndSend).toHaveBeenCalledTimes(2);
  });

  it("cancels a pending validation when the document closes", async () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {}, debounceMs: 300 });
    await h.fire("initialized");

    h.fire("change", { document: doc("u1") });
    h.fire("close", { document: doc("u1") });
    vi.advanceTimersByTime(300);

    expect(diagnosticsHandler.validateAndSend).not.toHaveBeenCalled();
  });
});

describe("G5.2 — onDidChangeConfiguration sequencing", () => {
  it("runs invalidate → dispose → clear → register → validate in order", async () => {
    const h = harness();
    const order: string[] = [];
    const { diagnosticsHandler, service } = mockDeps(order);
    const root = makeTempDir();
    writeFile(path.join(root, "synapse_config.xsd"), "<xs:schema/>");

    const handle = createServer({
      connection: h.connection, documents: h.documents, service: service as any,
      diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: { "440": root },
    });
    // Provide init schemas so registerSchemas runs during the config change.
    h.fire("initialize", { initializationOptions: { schemas: [{ pattern: "**/*.xml", schema: "440" }] } });
    h.docList.push(doc("u1"));
    await h.fire("initialized");
    order.length = 0; // ignore the initial-configuration validation

    h.fire("config");
    await Promise.resolve();

    expect(order).toEqual(["invalidate", "dispose", "clear", "register", "validate"]);
  });
});

describe("G5.3 — validation deferred until initial configuration loaded", () => {
  it("does not validate on config change or content change before onInitialized", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {} });
    h.docList.push(doc("u1"));

    h.fire("config");
    h.fire("change", { document: doc("u1") });

    expect(diagnosticsHandler.validateAndSend).not.toHaveBeenCalled();
  });
});

describe("G5.4 — registerSchemas path resolution", () => {
  it("prefers synapse_config.xsd over the first .xsd in a folder", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const root = makeTempDir();
    writeFile(path.join(root, "aaa.xsd"), "<xs:schema/>");
    writeFile(path.join(root, "synapse_config.xsd"), "<xs:schema/>");
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: { "440": root } });

    handle.registerSchemas([{ pattern: "**/*.xml", schema: "440" }]);

    expect(service.addUserAssociation).toHaveBeenCalledTimes(1);
    expect(service.addUserAssociation.mock.calls[0][0].xsdPath).toContain("synapse_config.xsd");
  });

  it("falls back to the first .xsd when no synapse_config.xsd exists", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const root = makeTempDir();
    writeFile(path.join(root, "z.xsd"), "<xs:schema/>");
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: { "440": root } });

    handle.registerSchemas([{ pattern: "**/*.xml", schema: "440" }]);
    expect(service.addUserAssociation.mock.calls[0][0].xsdPath).toContain("z.xsd");
  });

  it("warns and skips a folder with no .xsd", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const root = makeTempDir();
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: { "440": root } });

    handle.registerSchemas([{ pattern: "**/*.xml", schema: "440" }]);
    expect(service.addUserAssociation).not.toHaveBeenCalled();
    expect(h.warnings.some((w) => w.includes("No XSD found"))).toBe(true);
  });

  it("warns and skips an unknown schema-folder key", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {} });

    handle.registerSchemas([{ pattern: "**/*.xml", schema: "999" }]);
    expect(service.addUserAssociation).not.toHaveBeenCalled();
    expect(h.warnings.some((w) => w.includes("Unknown schema folder"))).toBe(true);
  });
});

describe("G5.7 — validateAndSendSafely isolates errors", () => {
  it("clears diagnostics and does not throw when validation throws", async () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    diagnosticsHandler.validateAndSend.mockRejectedValueOnce(new Error("boom"));
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {} });

    await expect(handle.validateAndSendSafely(doc("u1") as any, "test")).resolves.toBeUndefined();
    expect(diagnosticsHandler.clearDiagnostics).toHaveBeenCalledWith("u1");
  });
});

describe("G5.8 — onInitialize option parsing", () => {
  it("handles missing initializationOptions and returns capabilities", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: {} });

    const result = h.fire("initialize", {})![0];
    expect(result.capabilities.completionProvider.triggerCharacters).toContain("<");
    expect(handle.getInitializationSchemas()).toEqual([]);
  });

  it("captures schemas from initializationOptions", () => {
    const h = harness();
    const { diagnosticsHandler, service } = mockDeps();
    const root = makeTempDir();
    writeFile(path.join(root, "synapse_config.xsd"), "<xs:schema/>");
    const handle = createServer({ connection: h.connection, documents: h.documents, service: service as any, diagnosticsHandler: diagnosticsHandler as any, schemaFolderMap: { "440": root } });

    h.fire("initialize", { initializationOptions: { schemas: [{ pattern: "**/*.xml", schema: "440" }] } });
    expect(handle.getInitializationSchemas().length).toBe(1);
    expect(service.addUserAssociation).toHaveBeenCalledTimes(1);
  });
});
