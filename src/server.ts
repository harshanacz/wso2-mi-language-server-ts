import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
} from "vscode-languageserver/node.js";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as path from "path";
import { fileURLToPath } from "url";
import { getLanguageService } from "./xmlLanguageService.js";
import { DiagnosticsHandler } from "./diagnosticsHandler.js";
import { createServer } from "./serverWiring.js";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const service = getLanguageService();
const diagnosticsHandler = new DiagnosticsHandler(connection, service);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHEMAS_ROOT = path.join(__dirname, "resources", "schemas");

const SCHEMA_FOLDER_MAP: Record<string, string> = {
  "430": path.join(SCHEMAS_ROOT, "430"),
  "440": path.join(SCHEMAS_ROOT, "440"),
};

createServer({
  connection,
  documents,
  service,
  diagnosticsHandler,
  schemaFolderMap: SCHEMA_FOLDER_MAP,
});

documents.listen(connection);
connection.listen();
