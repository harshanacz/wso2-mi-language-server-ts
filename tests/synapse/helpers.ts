import { resolve } from "node:path";
import { setHostFileSystem } from "../../src/synapse/host/fs.js";
import { NodeFileSystem } from "../../src/synapse/host/nodeFs.js";

setHostFileSystem(new NodeFileSystem());

/** Absolute path of a fixture under tests/fixtures (the Java tests' src/test/resources). */
export function fixture(rel: string): string {
  return resolve(__dirname, "../fixtures", rel.replace(/^\//, ""));
}
