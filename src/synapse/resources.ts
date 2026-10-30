import { getHostFileSystem } from "./host/fs.js";

/**
 * Access to the JSON resources that the Java server loaded from its jar (`/org/eclipse/lemminx/...`).
 * They are plain files under a root folder on the host file system, so the same code runs in Node (real disk) and
 * in the browser (a MemoryFileSystem preloaded with the bundle).
 */
let root = "resources";

export function setResourceRoot(path: string): void {
  root = path.replace(/\/+$/, "");
}

export function getResourceRoot(): string {
  return root;
}

function full(rel: string): string {
  return root + "/" + rel.replace(/^\/org\/eclipse\/lemminx\//, "").replace(/^org\/eclipse\/lemminx\//, "").replace(/^\/+/, "");
}

/** Contents of a bundled resource, or null when it does not exist. */
export function readResourceText(rel: string): string | null {
  const fs = getHostFileSystem();
  const p = full(rel);
  const st = fs.stat(p);
  if (!st || !st.isFile) return null;
  return new TextDecoder("utf-8").decode(fs.readBytes(p));
}

/** Names of the files in a bundled resource folder (empty when missing). */
export function listResourceFolder(rel: string): string[] {
  const fs = getHostFileSystem();
  const p = full(rel);
  const st = fs.stat(p);
  if (!st || !st.isDirectory) return [];
  return fs.readDir(p).filter((n) => !n.startsWith(".")).sort();
}
