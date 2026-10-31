# WSO2 MI XML Language Server

A TypeScript Language Server Protocol (LSP) implementation for WSO2 Micro Integrator XML configuration files. Provides schema-aware editing, autocompletion, hover documentation, and strict validation powered by Apache Xerces WebAssembly.

## Features

- **Validation:** Strict XSD syntax and schema validation via Xerces WASM.
- **Completions & Hover:** Schema-driven $O(1)$ autocomplete suggestions and markdown hover documentation.
- **Navigation:** Go to definition, find references, and document symbols.
- **Editing:** Document formatting, range formatting, folding ranges, and symbol renaming.

- **Expression validation:** custom `synapse/expressionValidation` request, ported from the Java MI language server (ANTLR grammar + semantic checks for function arity/types, division by zero, arithmetic operands, filters). See `src/expression/`.

> Note: `pom.xml` files use strict Maven 4.0.0 validation (completions and hover are disabled).

## Java to TypeScript port status

The custom Synapse services of the Java MI language server (`customservice/synapse`) are being ported to TypeScript so the server can run in the browser. File system, zip and database access go through small host interfaces (`src/synapse/host/`), so the same code runs on Node or in a browser. Full table in [docs/PORT_STATUS.md](docs/PORT_STATUS.md).

| Area | Status |
| :--- | :--- |
| Expression validation, completions, helper panel, signature help | Done |
| Syntax tree (POJOs, factories, serializers) | Done |
| Connectors, connections, inbound connectors | Done |
| Directory tree, resource finder, definition, dependency tree | Done |
| Schema generation (JSON, XML, CSV, XSD), tryout schema visitors | Done |
| Debugger breakpoint info | Done |
| Mediator service (mediator UI schemas, config generation, AI agent tools), Mustache engine, `formatXml` | Done |
| Data service query generator (database access via `src/synapse/host/sql.ts`) | Done |
| Connector config (`connector-config.json`, `descriptor.yml` merge) | Done |
| Remaining Java test ports (pom parser, overview, parser) | In progress |
| Registering the new `synapse/*` requests in `requestHandlers.ts` | In progress |
| OpenAPI to Synapse API generator (`api/generator`) | Planned |
| Mediator tryout against a live MI server, JDBC driver loading, DB connection test | Not ported (needs processes, sockets or native drivers) |

Known differences from Java: `HashMap` iteration order is reproduced only where `JavaHashMap` is used (checked against the JDK); `Map.of` order is insertion order; the Mustache engine is a hand port without Java ground truth beyond the bundled templates; Jackson pretty printing is written from its documented format.

## Supported Schemas

| Target Version | Schema Location | Default Namespace |
| :--- | :--- | :--- |
| **MI 4.3.0** | `resources/schemas/430/` | `http://ws.apache.org/ns/synapse` |
| **MI 4.4.0** | `resources/schemas/440/` (Default) | `http://ws.apache.org/ns/synapse` |
| **Maven 4.0.0** | `resources/schemas/maven/` | `http://maven.apache.org/POM/4.0.0` |

## Project Structure

```text
src/
  server.ts             LSP entry point & lifecycle management
  requestHandlers.ts    LSP request event handlers
  diagnosticsHandler.ts Diagnostic reporting & Xerces WASM validation
  xmlLanguageService.ts Main service facade
  schema/               XSD schema provider & CST compilation engine
  services/             Feature implementations (completion, hover, etc.)
  parser/               XML parser wrapper (@xml-tools/parser)
  expression/           Synapse expression validator (ANTLR grammar in grammar/, generated parser in generated/)
xerces-wasm/            Pre-built Apache Xerces-C WebAssembly module
tests/                  Vitest test suite
```

## Quick Start

```bash
# Install dependencies
npm install

# Run unit tests
npm test

# Build production bundle (dist/)
npm run bundle
```

## Client Configuration

LSP clients can configure schema associations via `initializationOptions` or `workspace/didChangeConfiguration`:

```json
{
  "initializationOptions": {
    "schemas": [
      { "pattern": "**/*.xml", "schema": "440" }
    ]
  }
}
```

## Regenerating the expression parser

The parser in `src/expression/generated/` is produced from `src/expression/grammar/*.g4` with [antlr-ng](https://github.com/mike-lischke/antlr-ng) (no Java needed):

```bash
cd src/expression/grammar
npx antlr-ng -Dlanguage=TypeScript -v -l false -o ../generated ExpressionLexer.g4 ExpressionParser.g4
rm ../generated/*.interp ../generated/*.tokens
```
