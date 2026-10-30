# Port status: Java MI language server custom services to TypeScript

| Area | Status | Verification |
| --- | --- | --- |
| Expression validation (`synapse/expressionValidation`) | Done | 79 tests ported from the Java suite |
| LemMinX compatible DOM + STNode base | Done | 17 unit tests |
| Syntax tree: POJOs, factories, serializers (~540 Java files) | Done | 117 Java serializer round trip tests ported and passing |
| `synapse/syntaxTree`, `synapse/getArtifactType` | Done | JSON shape test |
| Connectors (`ConnectorHolder`, loaders, connections) | Next | needs a virtual file system and zip support |
| Directory tree / project explorer, resource finder, definition | Planned | fixtures under `src/test/resources/synapse` |
| Mediator UI schema + mediator service | Planned | |
| Schema generation (JSON/XML/CSV/XSD) | Planned | 126 Java tests |
| Debugger breakpoint info | Planned | 70 Java tests |
| Data service, pom parser, overview, dependency tree | Planned | |
| DB connection test, driver download, Maven, tryout | Desktop only, not ported | need native process/JDBC access |

Regeneration tooling for the syntax tree lives in `tools/java2ts`.
