import {
  Connection,
  TextDocuments,
  CompletionParams,
  HoverParams,
  DocumentSymbolParams,
  FoldingRangeParams,
  DocumentFormattingParams,
  DocumentRangeFormattingParams,
  RenameParams,
  DefinitionParams,
  ReferenceParams,
} from "vscode-languageserver/node.js";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLanguageService } from "./xmlLanguageService.js";
import { DiagnosticsHandler } from "./diagnosticsHandler.js";
import { expressionValidation } from "./expression/index.js";
import type { ExpressionParam } from "./expression/index.js";
import { syntaxTreeForDocument, artifactTypeForDocument } from "./syntaxTree/index.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  getFileName,
  getDocumentPath,
  toLSPCompletionList,
  toLSPDocumentSymbol,
  toLSPHover,
  toLSPFoldingRange,
} from "./lspUtils.js";

type LanguageService = ReturnType<typeof getLanguageService>;
type ParsedXMLDoc = ReturnType<LanguageService["parseXMLDocument"]>;

export function registerRequestHandlers(
  connection: Connection,
  documents: TextDocuments<TextDocument>,
  service: LanguageService,
  diagnosticsHandler: DiagnosticsHandler,
): void {
  // Cache parsed XMLDocument per URI, keyed by document version.
  // Avoids re-parsing on every LSP request when the document hasn't changed.
  const xmlDocCache = new Map<string, { version: number; doc: ParsedXMLDoc }>();

  function getParsedDoc(document: TextDocument): ParsedXMLDoc {
    const cached = xmlDocCache.get(document.uri);
    if (cached && cached.version === document.version) return cached.doc;
    const doc = service.parseXMLDocument(document.uri, document.getText());
    xmlDocCache.set(document.uri, { version: document.version, doc });
    return doc;
  }

  documents.onDidClose((e) => xmlDocCache.delete(e.document.uri));

  // ── Custom Synapse requests (ported from the Java MI language server) ──

  // Validates a Synapse expression (`${...}` wrapper optional). Same method name and
  // response shape as the Java server's `synapse/expressionValidation`.
  connection.onRequest("synapse/expressionValidation", (param: ExpressionParam) => {
    connection.console.log("[synapse/expressionValidation] Triggered");
    return expressionValidation(param);
  });

  function readDocumentText(uri: string): string | null {
    const open = documents.get(uri);
    if (open) return open.getText();
    try {
      return readFileSync(fileURLToPath(uri), "utf-8");
    } catch {
      return null;
    }
  }

  // Syntax tree of a Synapse artifact as JSON (same method and response shape as the Java server).
  connection.onRequest("synapse/syntaxTree", (param: { uri: string }) => {
    connection.console.log("[synapse/syntaxTree] Triggered");
    const text = readDocumentText(param.uri);
    if (text === null) return { syntaxTree: null, defFilePath: param.uri };
    return syntaxTreeForDocument(text, param.uri);
  });

  connection.onRequest("synapse/getArtifactType", (param: { uri: string }) => {
    let path = param.uri;
    try {
      path = param.uri.startsWith("file:") ? fileURLToPath(param.uri) : param.uri;
    } catch {
      /* keep the raw uri */
    }
    return artifactTypeForDocument(path, readDocumentText(param.uri));
  });

  connection.onCompletion((params: CompletionParams) => {
    connection.console.log(
      `[onCompletion] Triggered for ${params.textDocument.uri} at line ${params.position.line}, char ${params.position.character}`
    );
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    if (document.uri.endsWith("pom.xml")) return [];

    const xmlDoc = getParsedDoc(document);
    return toLSPCompletionList(
      service.doComplete(xmlDoc, params.position, getFileName(document.uri), getDocumentPath(document.uri))
    );
  });

  connection.onHover((params: HoverParams) => {
    connection.console.log(
      `[onHover] Triggered for ${params.textDocument.uri} at line ${params.position.line}, char ${params.position.character}`
    );
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;

    if (document.uri.endsWith("pom.xml")) return null;

    const { line, character } = params.position;

    // Don't show schema hover for elements that Xerces has already flagged as invalid.
    // VS Code displays the diagnostic natively; returning null avoids misleading hover
    // content from local-only XSD element definitions (e.g. xquery's <variable>).
    if (diagnosticsHandler.hasErrorAt(document.uri, line, character)) return null;

    const xmlDoc = getParsedDoc(document);
    const result = service.doHover(xmlDoc, params.position, getFileName(document.uri), getDocumentPath(document.uri));
    connection.console.log(`[onHover] Result: ${JSON.stringify(result)}`);
    return result ? toLSPHover(result) : null;
  });

  connection.onDocumentSymbol((params: DocumentSymbolParams) => {
    connection.console.log(`[onDocumentSymbol] Triggered for ${params.textDocument.uri}`);
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];
    const xmlDoc = getParsedDoc(document);
    return service.findDocumentSymbols(xmlDoc).map(toLSPDocumentSymbol);
  });

  connection.onFoldingRanges((params: FoldingRangeParams) => {
    connection.console.log(`[onFoldingRanges] Triggered for ${params.textDocument.uri}`);
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];
    const xmlDoc = getParsedDoc(document);
    return service.getFoldingRanges(xmlDoc).map(toLSPFoldingRange);
  });

  connection.onRenameRequest((params: RenameParams) => {
    connection.console.log(
      `[onRename] Triggered for ${params.textDocument.uri} at line ${params.position.line}, char ${params.position.character} to '${params.newName}'`
    );
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;
    const xmlDoc = getParsedDoc(document);
    const edits = service.doRename(xmlDoc, params.position, params.newName);
    if (!edits) return null;
    return {
      changes: {
        [document.uri]: edits.map((e) => ({
          range: {
            start: document.positionAt(e.startOffset),
            end: document.positionAt(e.endOffset),
          },
          newText: e.newText,
        })),
      },
    };
  });

  connection.onDefinition((params: DefinitionParams) => {
    connection.console.log(
      `[onDefinition] Triggered for ${params.textDocument.uri} at line ${params.position.line}, char ${params.position.character}`
    );
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;
    const xmlDoc = getParsedDoc(document);
    const result = service.doDefinition(xmlDoc, params.position);
    return result ? { uri: result.uri, range: result.range } : null;
  });

  connection.onReferences((params: ReferenceParams) => {
    connection.console.log(
      `[onReferences] Triggered for ${params.textDocument.uri} at line ${params.position.line}, char ${params.position.character}`
    );
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];
    const xmlDoc = getParsedDoc(document);
    return service.findReferences(xmlDoc, params.position).map((r) => ({ uri: r.uri, range: r.range }));
  });

  connection.onDocumentFormatting((params: DocumentFormattingParams) => {
    connection.console.log(`[onDocumentFormatting] Triggered for ${params.textDocument.uri}`);
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];
    const xmlDoc = getParsedDoc(document);
    return service.format(xmlDoc, {
      tabSize: params.options.tabSize,
      insertSpaces: params.options.insertSpaces,
    }).map((edit) => ({
      range: {
        start: document.positionAt(edit.startOffset),
        end: document.positionAt(edit.endOffset),
      },
      newText: edit.newText,
    }));
  });

  connection.onDocumentRangeFormatting((params: DocumentRangeFormattingParams) => {
    connection.console.log(`[onDocumentRangeFormatting] Triggered for ${params.textDocument.uri}`);
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];
    const xmlDoc = getParsedDoc(document);
    const startOffset = document.offsetAt(params.range.start);
    const endOffset = document.offsetAt(params.range.end);
    return service.formatRange(xmlDoc, startOffset, endOffset, {
      tabSize: params.options.tabSize,
      insertSpaces: params.options.insertSpaces,
    }).map((edit) => ({
      range: {
        start: document.positionAt(edit.startOffset),
        end: document.positionAt(edit.endOffset),
      },
      newText: edit.newText,
    }));
  });
}
