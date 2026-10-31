# Port status: Java MI language server custom services to TypeScript

| Area | Status | Verification |
| --- | --- | --- |
| Expression validation, completions, helper panel, signature help | Done | Java tests ported (validator, function registry) plus provider tests |
| LemMinX compatible DOM + STNode base | Done | unit tests |
| Syntax tree: POJOs, factories, serializers (~540 Java files) | Done | 117 Java serializer round trip tests ported |
| Connectors, connections, inbound connectors, connector loaders | Done | Java loader, reader, connection and inbound tests ported |
| Directory tree, resource finder, definition, dependency tree | Done | Java directory tree and resource finder tests ported |
| Schema generation (JSON/XML/CSV/XSD), tryout schema visitors | Done | 126 Java schemagen tests ported |
| Debugger breakpoint info | Done | Java debugger tests ported |
| Mediator service (UI schemas, config generation, AI agent tools) | Done | smoke tests (no Java tests exist); Mustache engine tested on the bundled templates |
| Data service query generator | Done | Java QueryGeneratorTest ported (generated output matches the Java expected file); JDBC replaced by `host/sql.ts` interfaces, driver jar loading not supported |
| Connector config service | Done | 30 Java tests ported plus descriptor merge test |
| pom parser, overview, parser tests | In progress | |
| `synapse/*` request registration in `requestHandlers.ts` | In progress | |
| OpenAPI to Synapse API generator (`api/generator`) | Planned | no Java tests |
| `db`, `driver`, `dynamic/db` | Partly (query generator side done) | |
| Mediator tryout, JDBC driver loading, DB connection test, driver download | Not ported | need native process, socket or driver access |

Helpers added along the way: `JavaHashMap` (Java HashMap order, verified against JDK on 200 random cases), `XDocument` serializer (matches JDK Transformer output), Jackson style pretty printer, Mustache engine, `Utils.formatXml`.

Regeneration tooling for the syntax tree lives in `tools/java2ts`.
