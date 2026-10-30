# java2ts

One-off tooling used to port `customservice/synapse/syntaxTree` (about 540 Java files) from the Java MI language server.

- `j2t.py` translates the very regular Java style used by the POJOs, factories and serializers (fields, getters/setters, enums, overloads, casts, collections).
- `post_fixes.py` applies the hand maintained fix-ups (import cycles, nested enums, connector seams, file access hook).
- `t2v.py` converts the Java serializer tests to Vitest (117 round trip tests).
- `run.sh` runs the pipeline. Paths at the top of each script point at the original clone locations and need adjusting.

The generated files carry `// @ts-nocheck` because they follow Java null semantics; behaviour is covered by the ported Java tests.
