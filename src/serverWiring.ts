import {
  Connection,
  TextDocuments,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
} from "vscode-languageserver/node.js";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as fs from "fs";
import * as path from "path";
import { getLanguageService } from "./xmlLanguageService.js";
import { DiagnosticsHandler } from "./diagnosticsHandler.js";
import { registerRequestHandlers } from "./requestHandlers.js";
import { formatError } from "./lspUtils.js";

type LanguageService = ReturnType<typeof getLanguageService>;

/** Dependencies and tunables required to wire the language server onto a connection. */
export interface ServerDeps {
  connection: Connection;
  documents: TextDocuments<TextDocument>;
  service: LanguageService;
  diagnosticsHandler: DiagnosticsHandler;
  /** Maps a schema-folder key (e.g. "430", "440") to an absolute folder path. Injected so tests can point it at fixtures. */
  schemaFolderMap: Record<string, string>;
  /** Debounce window for validation on document change. Defaults to 300ms. */
  debounceMs?: number;
}

/**
 * Handle returned from {@link createServer}, exposing the wired internals so that
 * lifecycle behavior (debounce coalescing, configuration sequencing, schema
 * registration) can be driven and inspected in tests without starting a real
 * connection. The production bootstrap ignores everything except the side effect
 * of registering handlers.
 */
export interface ServerHandle {
  registerSchemas(schemas: SchemaSetting[]): void;
  validateAndSendSafely(document: TextDocument, reason: string): Promise<void>;
  validateOpenDocumentsSafely(reason: string): Promise<void>;
  /** True once onInitialized has fired and initial configuration is considered loaded. */
  isInitialConfigurationLoaded(): boolean;
  /** Pending debounce timers keyed by document URI (live map, for assertions). */
  pendingValidations: Map<string, NodeJS.Timeout>;
  /** Schemas captured from initializationOptions, replayed on configuration change. */
  getInitializationSchemas(): SchemaSetting[];
}

/** A single schema association entry as received via initializationOptions. */
export interface SchemaSetting {
  pattern: string;
  schema: string;
}

const DEFAULT_DEBOUNCE_MS = 300;

/**
 * Wires all LSP lifecycle and request handlers onto the given connection.
 * Does NOT call `documents.listen` / `connection.listen` — the caller owns the
 * bootstrap so this function is safe to import and exercise in tests.
 */
export function createServer(deps: ServerDeps): ServerHandle {
  const { connection, documents, service, diagnosticsHandler, schemaFolderMap } = deps;
  const debounceMs = deps.debounceMs ?? DEFAULT_DEBOUNCE_MS;

  let initialConfigurationLoaded = false;
  let initializationSchemas: SchemaSetting[] = [];

  // ── Validation helpers ───────────────────────────────────────────────────────

  async function validateAndSendSafely(document: TextDocument, reason: string): Promise<void> {
    try {
      await diagnosticsHandler.validateAndSend(document);
    } catch (error) {
      connection.console.error(
        `[diagnostics] Validation failed during ${reason} for ${document.uri}: ${formatError(error)}`
      );
      diagnosticsHandler.clearDiagnostics(document.uri);
    }
  }

  async function validateOpenDocumentsSafely(reason: string): Promise<void> {
    await Promise.all(documents.all().map((doc) => validateAndSendSafely(doc, reason)));
  }

  // ── Schema registration ──────────────────────────────────────────────────────

  function registerSchemas(schemas: SchemaSetting[]): void {
    for (const schema of schemas) {
      const pattern: string = schema.pattern;
      const schemaFolder: string = schema.schema;

      const folderPath = schemaFolderMap[schemaFolder];
      if (!folderPath) {
        connection.console.warn(`[server] Unknown schema folder: ${schemaFolder}`);
        continue;
      }

      let xsdFile: string | undefined;
      try {
        // prefer synapse_config.xsd as the main entry point, fall back to first .xsd
        const files = fs.readdirSync(folderPath);
        const main = files.find((f) => f === "synapse_config.xsd");
        const first = files.find((f) => f.endsWith(".xsd"));
        xsdFile = main ?? first;
      } catch (e) {
        connection.console.warn(`[server] Cannot read schema folder ${folderPath}: ${e}`);
        continue;
      }

      if (!xsdFile) {
        connection.console.warn(`[server] No XSD found in: ${folderPath}`);
        continue;
      }

      const xsdPath = path.join(folderPath, xsdFile);
      service.addUserAssociation({ pattern, xsdPath, isBuiltIn: false, namespace: "" });
      connection.console.log(`[server] Registered: ${pattern} → ${schemaFolder}`);
    }
  }

  // ── LSP lifecycle ────────────────────────────────────────────────────────────

  connection.onInitialize((params: InitializeParams): InitializeResult => {
    connection.console.log("=== STARTUP WAS TRIGGERED!===");
    connection.console.log("==================");
    connection.console.log(`intalize params:\n${JSON.stringify(params, null, 2)}`);
    connection.console.log(`initalize options:\n${JSON.stringify(params.initializationOptions, null, 2)}`);
    connection.console.log("==================");

    const options = params.initializationOptions ?? {};
    initializationSchemas = options.schemas ?? [];

    connection.console.log(`[server] Received ${initializationSchemas.length} initial schema(s)`);

    if (initializationSchemas.length > 0) {
      registerSchemas(initializationSchemas);
    }

    return {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        completionProvider: { resolveProvider: false, triggerCharacters: ["<", " ", '"', "/"] },
        hoverProvider: true,
        documentSymbolProvider: true,
        foldingRangeProvider: true,
        renameProvider: true,
        definitionProvider: true,
        referencesProvider: true,
        documentFormattingProvider: true,
        documentRangeFormattingProvider: true,
        workspace: {
          workspaceFolders: { supported: true },
          fileOperations: {},
        },
      },
    };
  });

  connection.onInitialized(async () => {
    initialConfigurationLoaded = true;
    await validateOpenDocumentsSafely("initial configuration");
  });

  connection.onDidChangeConfiguration(() => {
    connection.console.log("[server] Configuration changed — rebuilding schema associations");

    service.invalidateAutoSchemas();
    diagnosticsHandler.dispose();
    service.clearUserAssociations();

    if (initializationSchemas.length > 0) {
      registerSchemas(initializationSchemas);
    }

    if (!initialConfigurationLoaded) {
      connection.console.log("[config] Deferring validation until initial configuration is loaded");
      return;
    }
    void validateOpenDocumentsSafely("configuration change");
  });

  // Debounce validation per document so rapid keystrokes trigger a single
  // validation after the user pauses, instead of one full Xerces pass per edit.
  const pendingValidations = new Map<string, NodeJS.Timeout>();

  documents.onDidChangeContent((change) => {
    if (!initialConfigurationLoaded) {
      connection.console.log(
        `[onDidChangeContent] Deferring validation for ${change.document.uri} until initial configuration is loaded`
      );
      return;
    }
    const uri = change.document.uri;
    clearTimeout(pendingValidations.get(uri));
    pendingValidations.set(uri, setTimeout(() => {
      pendingValidations.delete(uri);
      connection.console.log(`[onDidChangeContent] Validating ${uri}`);
      void validateAndSendSafely(change.document, "document change");
    }, debounceMs));
  });

  documents.onDidClose((event) => {
    const timer = pendingValidations.get(event.document.uri);
    if (timer) {
      clearTimeout(timer);
      pendingValidations.delete(event.document.uri);
    }
  });

  connection.onShutdown(() => {
    diagnosticsHandler.dispose();
    service.dispose();
  });

  registerRequestHandlers(connection, documents, service, diagnosticsHandler);

  return {
    registerSchemas,
    validateAndSendSafely,
    validateOpenDocumentsSafely,
    isInitialConfigurationLoaded: () => initialConfigurationLoaded,
    pendingValidations,
    getInitializationSchemas: () => initializationSchemas,
  };
}
